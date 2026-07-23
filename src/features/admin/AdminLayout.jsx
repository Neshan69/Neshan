import { useState } from "react";
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
  const [drawerOpen, setDrawerOpen] = useState(false);

  if (loading) return null;
  if (profile?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  const displayName = profile?.full_name || user?.email?.split("@")[0] || "Admin User";

  return (
    <div className="flex h-screen w-full bg-surface text-on-surface overflow-hidden">
      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 left-0 w-full z-40 flex items-center justify-between px-4 h-14 border-b dark:border-white/5 border-black/5 bg-surface/90 backdrop-blur-xl">
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open menu"
          className="p-2 -ml-2 text-primary"
        >
          <span className="material-symbols-outlined text-2xl">menu</span>
        </button>
        <h1 className="font-display text-lg font-bold text-primary">Admin Panel</h1>
        <button
          type="button"
          onClick={() => navigate("/")}
          aria-label="Back to portfolio home"
          className="p-2 -mr-2 text-on-surface-variant"
        >
          <span className="material-symbols-outlined text-xl">home</span>
        </button>
      </header>

      {/* Backdrop for mobile drawer */}
      {drawerOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Navigation Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[280px] transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto lg:block border-r dark:border-white/5 border-black/5 backdrop-blur-xl bg-surface ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="mb-10 px-4">
            <div className="flex items-center justify-between lg:block">
              <div>
                <h1 className="font-display text-2xl font-bold text-primary">Admin Panel</h1>
                <p className="text-on-surface-variant font-metadata text-[12px]">Systems Monitor</p>
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close menu"
                className="lg:hidden p-2 -mr-2 -mt-2 text-on-surface-variant"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>
            <button
              type="button"
              onClick={() => { navigate("/"); setDrawerOpen(false); }}
              aria-label="Back to portfolio home"
              className="mt-4 hidden lg:flex items-center gap-3 px-4 py-3 rounded-xl transition-colors cursor-pointer active:scale-95 text-on-surface-variant font-medium hover:bg-black/10 dark:hover:bg-white/10 text-left w-full"
            >
              <span className="material-symbols-outlined" aria-hidden="true">home</span>
              <span>Back to site</span>
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
                    <span>{item.label}</span>
                  </span>
                );
              }
              return (
                <NavLink
                  key={item.label}
                  to={item.path}
                  end={item.end}
                  onClick={() => setDrawerOpen(false)}
                  className={({ isActive }) =>
                    `${base} ${
                      isActive
                        ? "text-primary font-bold bg-black/5 dark:bg-white/5"
                        : "text-on-surface-variant font-medium hover:bg-black/10 dark:hover:bg-white/10"
                    }`
                  }
                >
                  <span className="material-symbols-outlined">{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
          <div className="mt-auto pt-6 border-t dark:border-white/5 border-black/5 px-2">
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
                onClick={() => setDrawerOpen(false)}
                className="text-on-surface-variant hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined">settings</span>
              </NavLink>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-screen overflow-y-auto pt-14 lg:pt-0" aria-label="Admin content">
        <Outlet />
      </main>
    </div>
  );
}
