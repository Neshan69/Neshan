export function formatTime(iso) {
  if (!iso) return "Just now";
  return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function timeAgo(iso) {
  if (!iso) return "";
  const date = new Date(iso);
  const now = new Date();
  const diff = now - date;
  if (diff < 60000) return "Just now";
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
}
