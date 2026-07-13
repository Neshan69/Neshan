import { useAuth } from "../../../contexts/AuthContext";

export default function AdminUsers() {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="font-display text-4xl font-bold text-primary mb-8">Users</h2>
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <p className="text-sm text-on-surface-variant">User management interface will be implemented here.</p>
        </div>
      </div>
      <p className="text-on-surface-variant mt-4">Logged in as {user?.email}.</p>
    </div>
  );
}