import { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { adminService } from "../../../services/admin.service";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    users: { count: null, loading: true, error: null },
    messages: { count: null, loading: true, error: null },
    conversations: { count: null, loading: true, error: null },
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [usersResult, messagesResult, conversationsResult] = await Promise.all([
        adminService.getUserCount(),
        adminService.getMessageCount(),
        adminService.getConversationCount(),
      ]);

      setStats({
        users: { count: usersResult.count, loading: false, error: usersResult.error?.message },
        messages: { count: messagesResult.count, loading: false, error: messagesResult.error?.message },
        conversations: { count: conversationsResult.count, loading: false, error: conversationsResult.error?.message },
      });
    };
    fetchStats();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="font-display text-4xl font-bold text-primary mb-8">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-xl">
          <p className="text-[10px] font-bold tracking-widest text-secondary uppercase mb-2">Users</p>
          <p className="text-3xl font-display font-bold text-primary">
            {stats.users.loading ? "…" : stats.users.count ?? "—"}
          </p>
          {stats.users.error && <p className="text-error text-xs mt-1">{stats.users.error}</p>}
        </div>
        <div className="glass-card p-6 rounded-xl">
          <p className="text-[10px] font-bold tracking-widest text-secondary uppercase mb-2">Messages</p>
          <p className="text-3xl font-display font-bold text-primary">
            {stats.messages.loading ? "…" : stats.messages.count ?? "—"}
          </p>
          {stats.messages.error && <p className="text-error text-xs mt-1">{stats.messages.error}</p>}
        </div>
        <div className="glass-card p-6 rounded-xl">
          <p className="text-[10px] font-bold tracking-widest text-secondary uppercase mb-2">Conversations</p>
          <p className="text-3xl font-display font-bold text-primary">
            {stats.conversations.loading ? "…" : stats.conversations.count ?? "—"}
          </p>
          {stats.conversations.error && <p className="text-error text-xs mt-1">{stats.conversations.error}</p>}
        </div>
      </div>
      <p className="text-on-surface-variant mt-8">Welcome back, {user?.email}.</p>
    </div>
  );
}
