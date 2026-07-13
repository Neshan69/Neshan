import { useAuth } from "../../../contexts/AuthContext";

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="font-display text-4xl font-bold text-primary mb-8">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-xl">
          <p className="text-[10px] font-bold tracking-widest text-secondary uppercase mb-2">Users</p>
          <p className="text-3xl font-display font-bold text-primary">—</p>
        </div>
        <div className="glass-card p-6 rounded-xl">
          <p className="text-[10px] font-bold tracking-widest text-secondary uppercase mb-2">Messages</p>
          <p className="text-3xl font-display font-bold text-primary">—</p>
        </div>
        <div className="glass-card p-6 rounded-xl">
          <p className="text-[10px] font-bold tracking-widest text-secondary uppercase mb-2">Sessions</p>
          <p className="text-3xl font-display font-bold text-primary">—</p>
        </div>
      </div>
      <p className="text-on-surface-variant mt-8">Welcome back, {user?.email}.</p>
    </div>
  );
}