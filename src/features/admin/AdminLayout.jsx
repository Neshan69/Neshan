import { Outlet, NavLink, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { AdminRoutes } from "../../types";

const NAV = [
  { path: AdminRoutes.DASHBOARD, label: "Dashboard", end: true },
  { path: AdminRoutes.USERS, label: "Users" },
  { path: AdminRoutes.MESSAGES, label: "Messages" },
  { path: AdminRoutes.SETTINGS, label: "Settings" },
];

export default function AdminLayout() {
  const { profile, loading } = useAuth();

  if (loading) return null;
  if (profile?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-surface pt-24 pb-12 px-6 md:px-16">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-2xl font-bold text-primary">Admin</h1>
          <span className="text-[10px] font-bold tracking-widest text-secondary uppercase">Restricted</span>
        </div>
        <nav className="flex gap-1 mb-8 overflow-x-auto">
          {NAV.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `text-xs font-bold tracking-widest px-4 py-2 rounded-full transition-colors ${
                  isActive ? "bg-secondary text-surface" : "text-on-surface-variant hover:text-primary"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <Outlet />
      </div>
    </div>
  );
}