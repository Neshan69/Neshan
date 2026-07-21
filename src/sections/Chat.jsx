import { useEffect, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { chatService } from "../services/chat.service";
import { supabase } from "../lib/supabase";
import ChatBubble from "../components/ChatBubble";

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

const NAV = [
  { label: "EXPERTISE", index: 0 },
  { label: "WORK", index: 1 },
  { label: "HOME", index: 2 },
  { label: "ABOUT", index: 3 },
  { label: "PROFILE", index: 4 },
  { label: "CONTACT", index: 5 },
];

export default function Chat({ onBack, onExit }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const containerRef = useRef(null);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const fetchAdmin = async () => {
      const { data, error } = await chatService.getAdmin();
      if (error) {
        setError("Could not load chat.");
      } else if (data) {
        setAdmin(data);
      } else {
        setError("Messaging is unavailable right now.");
        setLoading(false);
      }
    };
    fetchAdmin();
  }, []);

  useEffect(() => {
    if (!user || !admin) return;

    const setupConversation = async () => {
      setLoading(true);
      setError("");

      const { data: existing } = await chatService.getUserConversations(user.id);
      let conv = existing?.[0];

      if (!conv) {
        const { data: newConv, error: createError } = await chatService.createConversation(
          user.id,
          admin.id
        );
        if (createError || !newConv) {
          setError("Failed to create conversation.");
          setLoading(false);
          return;
        }
        conv = newConv;
      }

      if (conv) {
        setConversationId(conv.id);
        const { data: msgs } = await chatService.getMessages(conv.id);
        setMessages(msgs || []);
        await chatService.markAsRead(conv.id, user.id);
      }

      setLoading(false);
    };

    setupConversation();
  }, [user, admin]);

  useEffect(() => {
    if (!conversationId) return;

    const channel = supabase
      .channel(`messages:${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
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
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const id = requestAnimationFrame(() => {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    });
    return () => cancelAnimationFrame(id);
  }, [messages]);

  const send = async () => {
    const text = draft.trim();
    if (!text || !conversationId || sending) return;
    if (text.length > 2000) {
      setError("Message must be under 2000 characters.");
      return;
    }

    setSending(true);
    setError("");

    const { data, error: sendError } = await chatService.sendMessage(
      conversationId,
      user.id,
      text
    );

    if (sendError) {
      setError("Failed to send message.");
    } else if (data) {
      setMessages((prev) => [...prev, data]);
    }

    setDraft("");
    setSending(false);
  };

  return (
    <div className="relative z-10 flex flex-col h-screen">
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-[#0f1113]" />
        <div className="absolute inset-0 opacity-20 mix-blend-screen">
          <img
            alt=""
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida/AP1WRLsaLWX2cSlhXe-oT3Uo4oL9L-gc-AIjHRo4zzI3zeLsbe3zGDxtoJXfaLcWkqQ0KArurPLHpKtVpeAk38Ay7LXHTNS8nE5Cp4MR7mMhz4FvzrpR8-HjZ7qK71U0HHDOaUPJpXFiwtnwBdo8zrPlN4Pjsaan5z1VpZU_JG5Mnq0-cPVp07t5P4CjBPGa9bOGjhxAluI-1mYZUWi7lW_g2HaGjrJlyAO9HOujChU2SPxGsvvznKijVyZT7w"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1113]/80 via-transparent to-[#0f1113]/90" />
      </div>

      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-16 py-6 md:py-8">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to portfolio"
          className="font-display font-bold text-lg md:text-2xl tracking-tight text-primary uppercase truncate"
        >
          <span className="sr-only">Neshan Niroula — </span>Back to portfolio
        </button>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse shadow-[0_0_8px_#3cd7ff]" />
          <span className="text-primary text-[10px] font-bold tracking-widest uppercase hidden sm:inline">
            Neshan
          </span>
        </div>
      </header>

      <main
        ref={containerRef}
        className="flex-1 overflow-y-auto chat-container space-y-8 pr-2 pt-32 pb-32 px-6 md:pr-24 max-w-3xl mx-auto w-full"
        aria-label="Conversation with support"
      >
        <h1 className="sr-only">Chat with support</h1>
        {admin && (
          <div className="flex items-center gap-4 mb-6 pb-4 border-b border-white/5">
            <div className="w-12 h-12 rounded-xl bg-surface-container-high overflow-hidden shrink-0 border border-white/10">
              {admin.avatar_url ? (
                <img src={admin.avatar_url} alt={admin.full_name || "Admin"} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-sm font-bold text-secondary uppercase">
                    {getInitials(admin.full_name, admin.email)}
                  </span>
                </div>
              )}
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-on-surface">
                {admin.full_name || "Support Team"}
              </h2>
              <p className="text-[11px] text-on-surface-variant capitalize">
                {admin.role === "admin" ? "Admin" : "Support"}
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-center" aria-hidden="true">
          <span className="text-[10px] font-bold tracking-[0.2em] text-on-surface-variant uppercase">
            Today
          </span>
        </div>

        {loading ? (
          <div className="text-center text-on-surface-variant py-8" role="status">Loading messages…</div>
        ) : error ? (
          <div className="text-center text-error py-8" role="alert">{error}</div>
        ) : (
          <div className="space-y-8" aria-label="Messages">
            {messages.map((m) => (
              <ChatBubble key={m.id} message={m} isUser={m.sender_id === user.id} />
            ))}
          </div>
        )}
        <div aria-live="polite" className="sr-only">
          {messages.length > 0
            ? `${messages[messages.length - 1]?.sender?.full_name || (messages[messages.length - 1]?.sender_id === user.id ? "You" : "Support")} sent a message.`
            : ""}
        </div>
      </main>

      <div className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 md:px-6 z-50">
        <form
          className="glass-nav rounded-2xl p-2 flex items-center gap-2 shadow-2xl border border-white/5"
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
        >
          <label htmlFor="chat-message-input" className="sr-only">Type your message</label>
          <input
            id="chat-message-input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            maxLength={2000}
            className="flex-1 bg-transparent border-none focus:ring-0 text-primary placeholder:text-on-surface-variant py-2 md:py-3 outline-none text-sm md:text-base"
            placeholder="Describe your vision..."
            type="text"
            aria-label="Message"
            autoComplete="off"
          />
          <span className="text-[9px] text-on-surface-variant mr-2" aria-hidden="true">{draft.length}/2000</span>
          <button
            type="submit"
            disabled={sending}
            className="bg-secondary text-surface px-4 md:px-6 py-2 md:py-3 rounded-xl font-bold text-[10px] tracking-widest hover:brightness-110 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            SEND
            <span className="material-symbols-outlined text-sm" aria-hidden="true">send</span>
          </button>
        </form>
      </div>

      <nav
        aria-label="Section navigation"
        className="fixed right-2 md:right-8 top-1/2 -translate-y-1/2 z-50 glass-nav px-2 md:px-4 py-4 md:py-8 rounded-full flex flex-col items-center gap-4 md:gap-8 shadow-2xl"
      >
        {NAV.map((item) => {
          const isActive = item.label === "CONTACT";
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => onExit(item.index)}
              aria-current={isActive ? "true" : undefined}
              className={`relative nav-item text-[9px] md:text-[10px] tracking-widest px-2 md:px-4 py-1 md:py-2 transition-all whitespace-nowrap ${
                isActive
                  ? "text-secondary font-bold border border-secondary"
                  : "text-on-surface-variant hover:text-secondary"
              }`}
            >
              {item.label}
              {isActive && (
                <span className="absolute -top-0.5 -right-0.5 md:-top-1 md:-right-1 w-1.5 h-1.5 md:w-2 md:h-2 bg-secondary rounded-full shadow-[0_0_5px_#3cd7ff]" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
