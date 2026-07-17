import { useEffect, useRef, useState, useCallback } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { chatService } from "../../../services/chat.service";
import { supabase } from "../../../lib/supabase";
import ChatBubble from "../../../components/ChatBubble";
import { timeAgo } from "../../../lib/chat-utils";

function formatTime(iso) {
  return timeAgo(iso);
}

function getInitials(name, email) {
  if (name && name.trim()) {
    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase() || "")
      .join("");
  }
  return email?.[0]?.toUpperCase() || "?";
}

export default function AdminMessages() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const containerRef = useRef(null);

  const loadConversations = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await chatService.getAdminConversations(user.id);
    if (error) setError(error.message);
    else setConversations(data || []);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      loadConversations();
    });
    return () => cancelAnimationFrame(raf);
  }, [user, loadConversations]);

  useEffect(() => {
    if (!selectedId || !user) return;
    const load = async () => {
      const { data } = await chatService.getMessages(selectedId);
      setMessages(data || []);
      await chatService.markAsRead(selectedId, user.id);
      loadConversations();
    };
    load();
  }, [selectedId, user, loadConversations]);

  useEffect(() => {
    if (!selectedId) return;

    const channel = supabase
      .channel(`admin-messages:${selectedId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${selectedId}`,
        },
        async (payload) => {
          const { data } = await supabase
            .from("messages")
            .select(`
              *,
              sender:profiles!messages_sender_id_fkey (id, full_name, email, avatar_url)
            `)
            .eq("id", payload.new.id)
            .single();
          if (data) {
            setMessages((prev) => {
              if (prev.some((m) => m.id === data.id)) return prev;
              return [...prev, data];
            });
          }
          loadConversations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedId, loadConversations]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    // Single rAF fires before the new bubble (with its enter animation) is
    // laid out, leaving the newest message just below the viewport. Delay a
    // tick so layout settles, then jump to the bottom reliably.
    const t = setTimeout(() => {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }, 60);
    return () => clearTimeout(t);
  }, [messages]);

  const send = async () => {
    const text = draft.trim();
    if (!user || !text || !selectedId || sending) return;
    if (text.length > 2000) {
      setError("Message must be under 2000 characters.");
      return;
    }

    setSending(true);
    setError("");

    const optimistic = {
      id: `temp-${Date.now()}`,
      conversation_id: selectedId,
      sender_id: user.id,
      message: text,
      is_read: false,
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, optimistic]);
    setDraft("");
    const ta = document.getElementById("admin-reply-input");
    if (ta) ta.style.height = "auto";

    const { data, error: sendError } = await chatService.sendMessage(
      selectedId,
      user.id,
      text
    );

    if (sendError) {
      const detail =
        sendError.message ||
        sendError.error_description ||
        "Failed to send message.";
      console.error("[AdminMessages.send] Reply failed", {
        conversation_id: selectedId,
        sender_id: user.id,
        authenticated_user: user.id,
        message_text: text,
        error: sendError,
      });
      setError(`Failed to send: ${detail}${sendError.code ? ` (${sendError.code})` : ""}`);
      setMessages((prev) => prev.filter((m) => m.id !== optimistic.id));
    } else if (data) {
      setMessages((prev) =>
        prev.map((m) => (m.id === optimistic.id ? data : m))
      );
    }

    setSending(false);
    loadConversations();
  };

  const completeConversation = async () => {
    if (!selectedId) return;
    const { data, error } = await chatService.completeConversation(selectedId);
    if (error) {
      setError("Failed to complete conversation.");
    } else if (data) {
      setConversations((prev) =>
        prev.map((c) => (c.id === selectedId ? data : c))
      );
    }
  };

  const selectedConversation = conversations.find((c) => c.id === selectedId);

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="font-display text-4xl font-bold text-primary mb-8">Messages</h2>

      <div className="glass-card rounded-xl overflow-hidden border border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/5 md:h-[600px]">
          {/* Conversation list */}
          <div className="md:col-span-1 flex flex-col md:max-h-[600px] min-h-0">
            <div className="p-4 border-b border-white/5">
              <p className="text-[10px] font-bold tracking-widest text-on-surface-variant/80 uppercase">
                Conversations
              </p>
            </div>
            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <p className="text-sm text-on-surface-variant p-4">Loading...</p>
              ) : conversations.length === 0 ? (
                <p className="text-sm text-on-surface-variant p-4">No conversations yet.</p>
              ) : (
                conversations.map((c) => {
                  const displayName = c.user?.full_name || c.user?.email || "Unknown User";
                  const email = c.user?.email || "";
                  const avatar = c.user?.avatar_url;
                  const lastMessage = c.lastMessage?.message || "";
                  const isCompleted = c.status === "completed";
                  return (
                    <button
                      key={c.id}
                      onClick={() => setSelectedId(c.id)}
                      className={`w-full text-left p-4 border-b border-white/5 hover:bg-white/5 transition-colors flex items-start gap-3 ${
                        selectedId === c.id ? "bg-white/5" : ""
                      }`}
                    >
                      <div className="flex-shrink-0 w-9 h-9 rounded-full overflow-hidden bg-secondary/20 flex items-center justify-center">
                        {avatar ? (
                          <img
                            src={avatar}
                            alt={displayName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-[11px] font-bold text-secondary uppercase">
                            {getInitials(c.user?.full_name, email)}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-0.5">
                          <p className="text-sm font-bold text-primary truncate">
                            {displayName}
                          </p>
                          <span className="text-[9px] text-on-surface-variant/80 flex-shrink-0">
                            {formatTime(c.lastMessageAt)}
                          </span>
                        </div>
                        <p className="text-[10px] text-on-surface-variant/80 truncate mb-1">
                          {email}
                        </p>
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs text-on-surface-variant truncate">
                            {lastMessage || (isCompleted ? "Completed" : "No messages yet")}
                          </p>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {c.unread > 0 && (
                              <span className="text-[9px] font-bold text-surface bg-secondary rounded-full min-w-[16px] h-4 px-1 flex items-center justify-center">
                                {c.unread > 99 ? "99+" : c.unread}
                              </span>
                            )}
                            <span
                              className={`text-[9px] uppercase tracking-widest ${
                                isCompleted ? "text-on-surface-variant/80" : "text-secondary"
                              }`}
                            >
                              {isCompleted ? "Completed" : "Active"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Chat detail */}
          <div className="md:col-span-2 flex flex-col md:h-full min-h-0">
            {selectedConversation ? (
              <>
                <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-primary">
                      {selectedConversation.user?.full_name || selectedConversation.user?.email || "Unknown User"}
                    </p>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">
                      {selectedConversation.user?.email || ""}
                    </p>
                  </div>
                  {selectedConversation.status !== "completed" && (
                    <button
                      onClick={completeConversation}
                      className="text-[10px] font-bold tracking-widest uppercase text-secondary hover:text-primary transition-colors border border-secondary/40 px-3 py-1 rounded-full"
                    >
                      Complete
                    </button>
                  )}
                </div>
                 <div
                   ref={containerRef}
                   className="flex-1 min-h-0 overflow-y-auto p-6 space-y-4 chat-container"
                 >
                   {messages.length === 0 ? (
                     <p className="text-sm text-on-surface-variant text-center py-8">
                       No messages yet.
                     </p>
                   ) : (
                      messages.map((m) => (
                        <ChatBubble key={m.id} message={m} isUser={m.sender_id === user.id} variant="compact" showSender={true} />
                      ))
                   )}
                 </div>
                  <div className="sticky bottom-0 shrink-0 p-4 border-t border-white/5 bg-surface">
                    {error && <p className="text-error text-xs mb-2">{error}</p>}
                    <div className="flex items-end gap-3">
                      <textarea
                        value={draft}
                        onChange={(e) => {
                          setDraft(e.target.value);
                          e.target.style.height = "auto";
                          e.target.style.height = `${Math.min(e.target.scrollHeight, 160)}px`;
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            send();
                          }
                        }}
                        rows={1}
                        maxLength={2000}
                        id="admin-reply-input"
                        placeholder="Type a reply..."
                        aria-label="Type a reply"
                        className="flex-1 min-h-[44px] bg-transparent border-b-2 border-outline-variant py-2.5 focus:border-secondary outline-none text-primary text-sm placeholder:text-on-surface-variant/80 resize-none overflow-y-auto leading-relaxed"
                      />
                      <span className="text-[9px] text-on-surface-variant/80 mb-2.5 mr-1 whitespace-nowrap">{draft.length}/2000</span>
                      <button
                        onClick={send}
                        disabled={sending || !draft.trim()}
                        className="bg-secondary text-surface px-6 py-2.5 rounded-xl font-bold text-xs tracking-widest hover:brightness-110 transition-all disabled:opacity-50"
                      >
                        SEND
                      </button>
                    </div>
                  </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-sm text-on-surface-variant">
                  Select a conversation to view messages.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
