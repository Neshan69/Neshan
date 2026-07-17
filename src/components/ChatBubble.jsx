import { motion } from "framer-motion";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

function formatMessageTime(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function ChatBubble({ message, isUser, showSender = true, variant = "default" }) {
  const prefersReduced = usePrefersReducedMotion();

  const bubbleClass =
    variant === "compact"
      ? "rounded-2xl px-5 py-3 leading-relaxed"
      : "rounded-2xl p-5 leading-relaxed";

  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col gap-1 max-w-[85%] ${isUser ? "items-end ml-auto" : ""}`}
    >
      {showSender && (
        <div className="flex items-center gap-2 mb-1">
          {isUser ? (
            <>
              <span className="text-[9px] text-on-surface-variant/80">
                {formatMessageTime(message.created_at)}
              </span>
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                {message.sender?.full_name || "You"}
              </span>
            </>
           ) : (
            <>
              <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">
                {message.sender?.full_name || "Admin"}
              </span>
              <span className="text-[9px] text-on-surface-variant/80">
                {formatMessageTime(message.created_at)}
              </span>
            </>
          )}
        </div>
      )}
      <div
        className={`${bubbleClass} ${
          isUser
            ? variant === "compact"
              ? "chat-bubble-user rounded-tr-none text-primary"
              : "chat-bubble-user rounded-tr-none text-primary shadow-[0_0_20px_rgba(60,215,255,0.05)]"
            : variant === "compact"
              ? "chat-bubble-admin rounded-tl-none text-on-surface-variant"
              : "chat-bubble-admin rounded-tl-none text-on-surface-variant"
        }`}
      >
        {message.message ?? message.content}
      </div>
      {variant === "compact" && (
        <span className="text-[9px] text-on-surface-variant/80 px-1">
          {formatMessageTime(message.created_at)}
        </span>
      )}
    </motion.div>
  );
}
