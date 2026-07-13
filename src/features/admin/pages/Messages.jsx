import { useEffect, useRef, useState, useCallback } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { chatService } from "../../../services/chat.service";
import { notificationService } from "../../../services/notification.service";
import ChatBubble from "../../../components/ChatBubble";
import { timeAgo } from "../../../lib/chat-utils";

function formatTime(iso) {
  return timeAgo(iso);
}

export default function AdminMessages() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const containerRef = useRef(null);

  const loadConversations = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await chatService.getAllConversations(user.id);
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
    const el = containerRef.current;
    if (!el) return;
    const id = requestAnimationFrame(() => {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    });
    return () => cancelAnimationFrame(id);
  }, [messages]);

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    const { data } = await chatService.searchUsers(query);
    setSearchResults(data || []);
  };

  const startConversation = async (profile) => {
    if (!user) return;
    setError("");
    const { data, error } = await chatService.createConversation(user.id, [profile.id]);
    if (error) {
      setError(error.message);
      return;
    }
    setSelectedId(data.id);
    setSearch("");
    setSearchResults([]);
    await loadConversations();
  };

  const selectedConversation = conversations.find((c) => c.conversationId === selectedId);

  const send = async () => {
    const text = draft.trim();
    if (!text || !selectedId || sending) return;
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
      content: text,
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, optimistic]);
    setDraft("");

    const { data, error: sendError } = await chatService.sendMessage(
      selectedId,
      user.id,
      text
    );

    if (sendError) {
      setError("Failed to send message.");
      setMessages((prev) => prev.filter((m) => m.id !== optimistic.id));
    } else if (data) {
      setMessages((prev) =>
        prev.map((m) => (m.id === optimistic.id ? data : m))
      );
      const otherUser = selectedConversation?.otherUserId;
      if (otherUser) {
        await notificationService.createNotification(otherUser, data.id, "new_message");
      }
    }

    setSending(false);
    loadConversations();
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="font-display text-4xl font-bold text-primary mb-8">Messages</h2>

      <div className="glass-card rounded-xl overflow-hidden border border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/5">
          {/* Conversation list */}
          <div className="md:col-span-1 flex flex-col max-h-[600px]">
            <div className="p-4 border-b border-white/5">
              <input
                type="text"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search users..."
                aria-label="Search users"
                className="w-full bg-transparent border-b-2 border-outline-variant py-2 focus:border-secondary outline-none text-primary text-sm placeholder:text-on-surface-variant/80"
              />
              {searchResults.length > 0 && (
                <div className="mt-2 border border-white/5 rounded-lg overflow-hidden">
                  {searchResults.map((u) => (
                    <button
                      key={u.id}
                      onClick={() => startConversation(u)}
                      className="w-full text-left px-4 py-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-b-0"
                    >
                      <p className="text-sm font-bold text-primary">
                        {u.full_name || u.email}
                      </p>
                      <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">
                        {u.email}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <p className="text-sm text-on-surface-variant p-4">Loading...</p>
              ) : conversations.length === 0 ? (
                <p className="text-sm text-on-surface-variant p-4">No conversations yet.</p>
              ) : (
                conversations.map((c) => (
                  <button
                    key={c.conversationId}
                    onClick={() => setSelectedId(c.conversationId)}
                    className={`w-full text-left p-4 border-b border-white/5 hover:bg-white/5 transition-colors ${
                      selectedId === c.conversationId ? "bg-white/5" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-bold text-primary truncate">
                        {c.profile?.full_name || c.profile?.email || "Unknown User"}
                      </p>
                      <span className="text-[9px] text-on-surface-variant/80 ml-2">
                        {formatTime(c.lastMessage?.created_at)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-on-surface-variant truncate max-w-[160px]">
                        {c.lastMessage?.content || "No messages yet"}
                      </p>
                      {c.unreadCount > 0 && (
                        <span className="ml-2 bg-secondary text-surface text-[9px] font-bold px-2 py-0.5 rounded-full">
                          {c.unreadCount}
                        </span>
                      )}
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Chat detail */}
          <div className="md:col-span-2 flex flex-col h-[600px]">
            {selectedConversation ? (
              <>
                <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-primary">
                      {selectedConversation.profile?.full_name || "User"}
                    </p>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">
                      {selectedConversation.profile?.email}
                    </p>
                  </div>
                </div>
                <div
                  ref={containerRef}
                  className="flex-1 overflow-y-auto p-6 space-y-4 chat-container"
                >
                  {messages.length === 0 ? (
                    <p className="text-sm text-on-surface-variant text-center py-8">
                      No messages yet.
                    </p>
                  ) : (
                    messages.map((m) => (
                      <ChatBubble key={m.id} message={m} isUser={m.sender_id !== user.id} variant="compact" showSender={false} />
                    ))
                  )}
                </div>
                <div className="p-4 border-t border-white/5">
                  {error && <p className="text-error text-xs mb-2">{error}</p>}
                  <div className="flex items-center gap-3">
                    <input
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && send()}
                      maxLength={2000}
                      placeholder="Type a reply..."
                    aria-label="Type a reply"
                      className="flex-1 bg-transparent border-b-2 border-outline-variant py-2 focus:border-secondary outline-none text-primary text-sm placeholder:text-on-surface-variant/80"
                    />
                    <span className="text-[9px] text-on-surface-variant/80 mr-2">{draft.length}/2000</span>
                    <button
                      onClick={send}
                      disabled={sending || !draft.trim()}
                      className="bg-secondary text-surface px-6 py-2 rounded-xl font-bold text-xs tracking-widest hover:brightness-110 transition-all disabled:opacity-50"
                    >
                      {sending ? "SENDING…" : "SEND"}
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
