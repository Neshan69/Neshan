import { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { adminService } from "../../../services/admin.service";

export default function AdminUsers() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await adminService.getUsers();
      if (error) {
        setError(error.message);
      } else {
        setUsers(data || []);
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="font-display text-4xl font-bold text-primary mb-8">Users</h2>
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <caption className="sr-only">Registered users</caption>
            <thead>
              <tr className="border-b border-white/5">
                <th scope="col" className="text-left text-[10px] font-bold tracking-widest text-on-surface-variant/80 uppercase px-6 py-4">Name</th>
                <th scope="col" className="text-left text-[10px] font-bold tracking-widest text-on-surface-variant/80 uppercase px-6 py-4">Email</th>
                <th scope="col" className="text-left text-[10px] font-bold tracking-widest text-on-surface-variant/80 uppercase px-6 py-4">Role</th>
                <th scope="col" className="text-left text-[10px] font-bold tracking-widest text-on-surface-variant/80 uppercase px-6 py-4">Joined</th>
                <th scope="col" className="text-left text-[10px] font-bold tracking-widest text-on-surface-variant/80 uppercase px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td scope="row" colSpan={5} className="px-6 py-8 text-center text-on-surface-variant">Loading users...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td scope="row" colSpan={5} className="px-6 py-8 text-center text-error">{error}</td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td scope="row" colSpan={5} className="px-6 py-8 text-center text-on-surface-variant">No users found.</td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="border-b border-white/5 last:border-b-0">
                    <th scope="row" className="text-left font-normal px-6 py-4 text-primary">{u.full_name || "—"}</th>
                    <td className="px-6 py-4 text-on-surface-variant">{u.email || "—"}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-bold tracking-widest uppercase ${u.role === "admin" ? "text-secondary" : "text-on-surface-variant"}`}>
                        {u.role || "user"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant">{formatDate(u.created_at)}</td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold tracking-widest uppercase text-on-surface-variant">Active</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <p className="text-on-surface-variant mt-4">Logged in as {user?.email}.</p>
    </div>
  );
}
