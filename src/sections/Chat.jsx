import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

const NAV = [
  { id: "expertise", label: "EXPERTISE" },
  { id: "work", label: "WORK" },
  { id: "home", label: "HOME" },
  { id: "about", label: "ABOUT" },
  { id: "contact", label: "CONTACT" },
];

const INITIAL_MESSAGES = [
  {
    id: "m1",
    role: "admin",
    time: "10:42 AM",
    text: "Hello there! I'm glad you reached out. I'm currently architecting some new logic, but I'd love to hear what's on your mind.",
  },
  {
    id: "m2",
    role: "admin",
    time: "10:42 AM",
    text: "What kind of digital experience are we looking to build today?",
  },
  {
    id: "m3",
    role: "user",
    time: "10:43 AM",
    text: "I've been following your work on \"Ether Reality OS\". I'm looking for someone to help us bridge the gap between our security infrastructure and a more editorial user interface.",
  },
];

const AUTO_REPLY =
  "Love it. That intersection of security and editorial UI is exactly where I do my best work. Let's set up a call to map the logic together.";

function Bubble({ message }) {
  const prefersReduced = usePrefersReducedMotion();
  const systemReduced = useReducedMotion();
  const reduced = prefersReduced || systemReduced;
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col gap-2 max-w-[85%] ${
        isUser ? "items-end ml-auto" : ""
      }`}
    >
      <div className="flex items-center gap-2 mb-1">
        {isUser ? (
          <>
            <span className="text-[9px] text-on-surface-variant/50">
              {message.time}
            </span>
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
              Prospect
            </span>
          </>
        ) : (
          <>
            <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">
              Neshan
            </span>
            <span className="text-[9px] text-on-surface-variant/50">
              {message.time}
            </span>
          </>
        )}
      </div>
      <div
        className={`rounded-2xl p-5 leading-relaxed ${
          isUser
            ? "chat-bubble-user rounded-tr-none text-primary shadow-[0_0_20px_rgba(60,215,255,0.05)]"
            : "chat-bubble-admin rounded-tl-none text-on-surface-variant"
        }`}
      >
        {message.text}
      </div>
    </motion.div>
  );
}

export default function Chat({ onBack, onExit }) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState("");
  const containerRef = useRef(null);
  const replyTimer = useRef(null);

  // Keep the latest message in view the moment it is added (or typing starts).
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const id = requestAnimationFrame(() => {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    });
    return () => cancelAnimationFrame(id);
  }, [messages, typing]);

  // Cancel a pending auto-reply if the user leaves the chat mid-conversation.
  useEffect(
    () => () => {
      if (replyTimer.current) clearTimeout(replyTimer.current);
    },
    []
  );

  // `send` is the extension point for a future real backend (api-design.md):
  // swap the simulated reply for a POST to the chat API and stream the response.
  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      { id: `u${Date.now()}`, role: "user", time: "Just now", text },
    ]);
    setDraft("");
    setTyping(true);
    replyTimer.current = window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: `a${Date.now()}`, role: "admin", time: "Just now", text: AUTO_REPLY },
      ]);
      setTyping(false);
    }, 1200);
  };

  return (
    <div className="relative z-10 flex flex-col h-screen">
      {/* Page background (matches the chat design reference) */}
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

      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-16 py-6 md:py-8">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to portfolio"
          className="font-display font-bold text-lg md:text-2xl tracking-tight text-primary uppercase truncate"
        >
          Neshan Niroula
        </button>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse shadow-[0_0_8px_#3cd7ff]" />
          <span className="text-primary text-[10px] font-bold tracking-widest uppercase hidden sm:inline">
            Neshan
          </span>
        </div>
      </header>

      {/* Chat thread */}
      <main
        ref={containerRef}
        className="flex-1 overflow-y-auto chat-container space-y-8 pr-2 pt-32 pb-32 px-6 md:pr-24 max-w-3xl mx-auto w-full"
      >
        <div className="flex justify-center">
          <span className="text-[10px] font-bold tracking-[0.2em] text-on-surface-variant/40 uppercase">
            Today
          </span>
        </div>

        {messages.map((m) => (
          <Bubble key={m.id} message={m} />
        ))}

        {typing && (
          <div className="flex flex-col gap-2 max-w-[85%]">
            <div className="flex items-center gap-3 py-2 px-4 bg-white/5 rounded-full w-fit border border-white/5">
              <div className="flex gap-1">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
              <span className="text-[10px] font-medium text-on-surface-variant uppercase tracking-widest">
                Neshan is typing
              </span>
            </div>
          </div>
        )}
      </main>

      {/* Input bar */}
      <div className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 md:px-6 z-50">
        <div className="glass-nav rounded-2xl p-2 flex items-center gap-2 shadow-2xl border border-white/5">
          <button
            type="button"
            aria-label="Add attachment"
            className="p-2 md:p-3 text-on-surface-variant hover:text-secondary transition-colors"
          >
            <span className="material-symbols-outlined">add_circle</span>
          </button>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            className="flex-1 bg-transparent border-none focus:ring-0 text-primary placeholder:text-on-surface-variant/40 py-2 md:py-3 outline-none text-sm md:text-base"
            placeholder="Describe your vision..."
            type="text"
            aria-label="Message"
          />
          <button
            type="button"
            onClick={send}
            className="bg-secondary text-surface px-4 md:px-6 py-2 md:py-3 rounded-xl font-bold text-[10px] tracking-widest hover:brightness-110 transition-all flex items-center gap-2"
          >
            SEND
            <span className="material-symbols-outlined text-sm">send</span>
          </button>
        </div>
      </div>

      {/* Right-side vertical nav */}
      <nav
        aria-label="Section navigation"
        className="fixed right-2 md:right-8 top-1/2 -translate-y-1/2 z-50 glass-nav px-2 md:px-4 py-4 md:py-8 rounded-full flex flex-col items-center gap-4 md:gap-8 shadow-2xl"
      >
        {NAV.map((item, i) => {
          const isActive = item.id === "contact";
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onExit(i)}
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
