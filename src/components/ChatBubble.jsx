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

  const senderName =
    message.sender?.full_name || (isUser ? "You" : "Support");
  const time = formatMessageTime(message.created_at);

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
              <span className="text-[10px] text-on-surface-variant/80">
                {time}
              </span>
              <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
                {senderName}
              </span>
            </>
           ) : (
            <>
              <span className="text-[11px] font-bold text-secondary uppercase tracking-wider">
                {senderName}
              </span>
              <span className="text-[10px] text-on-surface-variant/80">
                {time}
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
        role="group"
        aria-label={`Message from ${senderName}${time ? ` at ${time}` : ""}`}
      >
        {message.message ?? message.content}
      </div>
      {variant === "compact" && (
        <span className="text-[9px] text-on-surface-variant/80 px-1">
          {time}
        </span>
      )}
    </motion.div>
  );
}
