import { Outlet, NavLink, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { AdminRoutes } from "../../types";

const NAV = [
  { path: AdminRoutes.DASHBOARD, label: "Dashboard", icon: "dashboard", end: true },
  { path: AdminRoutes.MESSAGES, label: "Inbox", icon: "inbox" },
  { path: AdminRoutes.USERS, label: "Users", icon: "group" },
  { path: AdminRoutes.SETTINGS, label: "Settings", icon: "settings" },
  { path: "#", label: "Analytics", icon: "monitoring", future: true },
  { path: "#", label: "Archive", icon: "archive", future: true },
];

export default function AdminLayout() {
  const { profile, user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return null;
  if (profile?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  const displayName = profile?.full_name || user?.email?.split("@")[0] || "Admin User";

  return (
    <div className="flex h-screen w-full bg-surface text-on-surface overflow-hidden">
      {/* Navigation Drawer */}
      <aside className="w-[280px] h-screen fixed left-0 top-0 flex flex-col p-6 border-r border-white/5 backdrop-blur-xl bg-surface z-50">
        <div className="mb-10 px-4">
          <h1 className="font-display text-2xl font-bold text-primary">Admin Panel</h1>
          <p className="text-on-surface-variant font-metadata text-[12px]">Systems Monitor</p>
          <button
            type="button"
            onClick={() => navigate("/")}
            aria-label="Back to portfolio home"
            className="mt-4 flex items-center gap-3 px-4 py-3 rounded-xl transition-colors cursor-pointer active:scale-95 text-on-surface-variant font-medium hover:bg-white/10 text-left w-full"
          >
            <span className="material-symbols-outlined" aria-hidden="true">home</span>
            <span className="">Back to site</span>
          </button>
        </div>
        <nav className="flex-1 space-y-1">
          {NAV.map((item) => {
            const base =
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors cursor-pointer active:scale-95";
            if (item.future) {
              return (
                <span
                  key={item.label}
                  className={`${base} text-on-surface-variant/50 font-medium cursor-default opacity-60`}
                  title="Coming soon"
                >
                  <span className="material-symbols-outlined">{item.icon}</span>
                  <span className="">{item.label}</span>
                </span>
              );
            }
            return (
              <NavLink
                key={item.label}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `${base} ${
                    isActive
                      ? "text-primary font-bold bg-white/5"
                      : "text-on-surface-variant font-medium hover:bg-white/10"
                  }`
                }
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
        <div className="mt-auto pt-6 border-t border-white/5 px-2">
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-high relative">
              {profile?.avatar_url ? (
                <img className="w-full h-full object-cover" src={profile.avatar_url} alt="" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-sm font-bold text-secondary uppercase">
                    {displayName.slice(0, 1)}
                  </span>
                </div>
              )}
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-secondary rounded-full border-2 border-surface" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-on-surface font-semibold truncate">{displayName}</p>
              <p className="text-on-surface-variant text-[12px] truncate">Active Now</p>
            </div>
            <NavLink
              to={AdminRoutes.SETTINGS}
              className="text-on-surface-variant hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined">settings</span>
            </NavLink>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-[280px] h-screen overflow-y-auto" aria-label="Admin content">
        <Outlet />
      </main>
    </div>
  );
}
