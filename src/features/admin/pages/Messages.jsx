import { useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { chatService } from "../../../services/chat.service";
import { supabase } from "../../../lib/supabase";
import ChatBubble from "../../../components/ChatBubble";
import { timeAgo } from "../../../lib/chat-utils";
import ConfirmDialog from "../../../components/ConfirmDialog";

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
  const [query, setQuery] = useState("");
  const [confirmComplete, setConfirmComplete] = useState(false);
  const containerRef = useRef(null);

  const filteredConversations = conversations.filter((c) => {
    if (!query.trim()) return true;
    const name = c.user?.full_name || c.user?.email || "";
    const email = c.user?.email || "";
    const last = c.lastMessage?.message || "";
    const q = query.trim().toLowerCase();
    return (
      name.toLowerCase().includes(q) ||
      email.toLowerCase().includes(q) ||
      last.toLowerCase().includes(q)
    );
  });

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
      setConfirmComplete(false);
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
    setConfirmComplete(false);
  };

  const selectedConversation = conversations.find((c) => c.id === selectedId);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="glass-card rounded-2xl overflow-hidden border border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/5 md:h-[640px]">
          {/* Conversation list */}
          <section className="md:col-span-1 flex flex-col md:max-h-[640px] min-h-0 bg-surface-container-low/30 border-r border-white/5">
            <header className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-2xl font-bold text-on-surface">Messages</h2>
                {conversations.some((c) => c.unread > 0) && (
                  <span className="bg-secondary/20 text-secondary px-2 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase">
                    {conversations.reduce((n, c) => n + (c.unread || 0), 0)} NEW
                  </span>
                )}
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Filter conversations..."
                  aria-label="Filter conversations"
                  className="w-full bg-surface-container-lowest/50 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-secondary transition-colors"
                />
              </div>
            </header>
            <div className="flex-1 overflow-y-auto scrollbar-hide space-y-1 px-3 pb-3">
              {loading ? (
                <p className="text-sm text-on-surface-variant p-4">Loading...</p>
              ) : filteredConversations.length === 0 ? (
                <p className="text-sm text-on-surface-variant p-4">
                  {conversations.length === 0 ? "No conversations yet." : "No matches."}
                </p>
              ) : (
                filteredConversations.map((c) => {
                  const displayName = c.user?.full_name || c.user?.email || "Unknown User";
                  const email = c.user?.email || "";
                  const avatar = c.user?.avatar_url;
                  const lastMessage = c.lastMessage?.message || "";
                  const isCompleted = c.status === "completed";
                  const active = selectedId === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setSelectedId(c.id)}
                      className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                        active
                          ? "bg-white/5 border-white/10"
                          : "border-transparent hover:bg-white/5"
                      }`}
                    >
                      <div className="w-12 h-12 rounded-lg bg-surface-container-high overflow-hidden shrink-0">
                        {avatar ? (
                          <img src={avatar} alt={displayName} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-sm font-bold text-secondary uppercase">
                              {getInitials(c.user?.full_name, email)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className={`font-semibold truncate ${active ? "text-on-surface" : "text-on-surface-variant"}`}>
                            {displayName}
                          </h3>
                          <span className="text-[10px] text-on-surface-variant flex-shrink-0 ml-2">
                            {formatTime(c.lastMessageAt)}
                          </span>
                        </div>
                        <p className="text-[11px] text-on-surface-variant/80 truncate mb-2 italic">
                          {lastMessage || (isCompleted ? "Completed" : "No messages yet")}
                        </p>
                        <div className="flex items-center gap-2">
                          {isCompleted ? (
                            <span className="px-2 py-0.5 rounded-full bg-white/5 text-on-surface-variant text-[10px] font-bold tracking-widest uppercase">
                              Completed
                            </span>
                          ) : (
                            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-secondary/10 text-secondary text-[10px] font-bold tracking-widest uppercase">
                              <span className="w-1.5 h-1.5 rounded-full bg-secondary status-pulse" />
                              Active
                            </span>
                          )}
                          {c.unread > 0 && (
                            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-secondary/10 text-secondary text-[10px] font-bold tracking-widest uppercase">
                              {c.unread} Unread
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </section>

          {/* Chat detail */}
          <div className="md:col-span-2 flex flex-col md:h-full min-h-0">
            {selectedConversation ? (
              <>
                 <header className="flex items-center justify-between px-6 h-20 border-b border-white/5 shrink-0">
                   <div className="flex items-center gap-4">
                     <button
                       type="button"
                       onClick={() => setSelectedId(null)}
                       aria-label="Back to conversations"
                       className="p-2 -ml-2 text-on-surface-variant hover:text-secondary transition-colors rounded-full"
                     >
                       <span className="material-symbols-outlined text-xl">arrow_back</span>
                     </button>
                     <div className="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden border border-white/10 shrink-0">
                      {selectedConversation.user?.avatar_url ? (
                        <img src={selectedConversation.user.avatar_url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-xs font-bold text-secondary uppercase">
                            {getInitials(selectedConversation.user?.full_name, selectedConversation.user?.email || "")}
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      <h2 className="font-display text-xl font-bold text-on-surface">
                        {selectedConversation.user?.full_name || selectedConversation.user?.email || "Unknown User"}
                      </h2>
                      <p className="text-[11px] text-on-surface-variant">
                        {selectedConversation.user?.email || ""}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {selectedConversation.status !== "completed" && (
                      <button
                        type="button"
                        onClick={() => setConfirmComplete(true)}
                        className="bg-secondary text-on-secondary px-6 py-2 rounded-lg text-sm font-bold transition-all shadow-[0_0_20px_rgba(60,215,255,0.3)] hover:brightness-110 active:scale-95 flex items-center gap-2"
                      >
                        <span className="material-symbols-outlined text-sm">check_circle</span>
                        Complete
                      </button>
                    )}
                  </div>

                  <ConfirmDialog
                    open={confirmComplete}
                    title="Mark conversation as completed?"
                    message="This will close the conversation. You can still view messages, but no new replies can be sent."
                    confirmLabel="Complete"
                    cancelLabel="Cancel"
                    onConfirm={completeConversation}
                    onCancel={() => setConfirmComplete(false)}
                  />
                </header>

                <div
                  ref={containerRef}
                  className="flex-1 min-h-0 overflow-y-auto px-6 py-8 scrollbar-hide chat-container"
                >
                  <div className="max-w-[600px] mx-auto space-y-4">
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
                </div>

                <footer className="p-6 bg-surface/40 backdrop-blur-xl border-t border-white/5 shrink-0">
                  <div className="max-w-[600px] mx-auto">
                    <div className="relative bg-surface-container-lowest rounded-2xl border border-white/10 focus-within:border-secondary/50 transition-colors shadow-xl">
                      {error && <p className="text-error text-xs px-5 pt-3">{error}</p>}
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
                        className="w-full bg-transparent border-none focus:ring-0 text-on-surface px-5 py-4 pr-32 resize-none overflow-y-auto leading-relaxed placeholder:text-on-surface-variant/40"
                      />
                      <div className="absolute right-4 bottom-3 flex items-center gap-4">
                        <span className="text-[10px] font-bold tracking-widest text-on-surface-variant/40 whitespace-nowrap">
                          {draft.length} / 2000
                        </span>
                        <div className="flex items-center gap-1 border-l border-white/10 pl-4">
                          <button
                            type="button"
                            aria-label="Attach file"
                            className="text-on-surface-variant hover:text-secondary transition-colors p-1"
                          >
                            <span className="material-symbols-outlined">attach_file</span>
                          </button>
                          <button
                            onClick={send}
                            disabled={sending || !draft.trim()}
                            aria-label="Send reply"
                            className="bg-secondary text-on-secondary w-10 h-10 rounded-xl flex items-center justify-center shadow-lg hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
                          >
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </footer>
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
