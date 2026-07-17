import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";
import { useAuth } from "../contexts/AuthContext";
import { notificationService } from "../services/notification.service";

function timeAgo(iso) {
  if (!iso) return "";
  const date = new Date(iso);
  const now = new Date();
  const diff = now - date;
  if (diff < 60000) return "Just now";
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
}

export default function NotificationDropdown() {
  const { user, refreshNotifications } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const prefersReduced = usePrefersReducedMotion();
  const dropdownRef = useRef(null);

  const load = useCallback(async () => {
    if (!user) return;
    const { data } = await notificationService.getNotifications(user.id);
    setNotifications(data || []);
  }, [user]);

  useEffect(() => {
    if (!open) return;
    const raf = requestAnimationFrame(() => {
      load();
    });
    return () => cancelAnimationFrame(raf);
  }, [open, user, load]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkRead = async (id) => {
    await notificationService.markAsRead(id, user.id);
    await load();
    refreshNotifications();
  };

  const handleMarkAllRead = async () => {
    await notificationService.markAllAsRead(user.id);
    await load();
    refreshNotifications();
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 text-on-surface-variant hover:text-secondary transition-colors"
        aria-label="Notifications"
      >
        <span className="material-symbols-outlined text-xl">notifications</span>
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-secondary text-surface text-[9px] font-bold rounded-full flex items-center justify-center shadow-[0_0_8px_#3cd7ff]">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 top-full mt-2 w-80 glass-card rounded-xl overflow-hidden shadow-2xl border border-white/5 z-50"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
            <p className="text-[10px] font-bold tracking-widest text-primary uppercase">Notifications</p>
            {unreadCount > 0 && (
              <button onClick={handleMarkAllRead} className="text-[10px] text-secondary hover:underline">
                Mark all read
              </button>
            )}
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="text-xs text-on-surface-variant p-4 text-center">No notifications yet.</p>
            ) : (
              notifications.map((n) => (
                <button
                  key={n.id}
                  onClick={() => handleMarkRead(n.id)}
                  className={`w-full text-left p-4 border-b border-white/5 last:border-b-0 transition-colors hover:bg-white/5 ${
                    n.read ? "opacity-60" : "bg-white/[0.02]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs text-primary leading-relaxed">
                      {n.message?.message || n.message?.content || "New message"}
                    </p>
                    {!n.read && (
                      <span className="w-2 h-2 bg-secondary rounded-full mt-1 flex-shrink-0 shadow-[0_0_5px_#3cd7ff]" />
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px] text-on-surface-variant uppercase tracking-widest">
                      {n.message?.sender?.full_name || "Someone"}
                    </span>
                    <span className="text-[9px] text-on-surface-variant/80">
                      {timeAgo(n.created_at)}
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
