import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import ConfirmDialog from "../../../components/ConfirmDialog";

function formatDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function AdminSettings() {
  const { user, profile, logout } = useAuth();
  const [signingOut, setSigningOut] = useState(false);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);

  const handleSignOut = async () => {
    setSigningOut(true);
    await logout();
    setSigningOut(false);
    setShowSignOutConfirm(false);
  };

  const fullName = profile?.full_name || "—";
  const email = profile?.email || user?.email || "—";
  const role = profile?.role || "user";
  const createdAt = profile?.created_at || user?.created_at;

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-0">
      <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-6 md:mb-8">Settings</h2>

      <div className="glass-card rounded-xl overflow-hidden divide-y dark:divide-white/5 divide-black/5">
        <div className="p-6">
          <p className="text-[10px] font-bold tracking-widest text-on-surface-variant/80 uppercase mb-4">
            Admin Profile
          </p>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4">
              <span className="text-sm text-on-surface-variant">Full name</span>
              <span className="text-sm font-semibold text-primary truncate w-full md:w-auto">{fullName}</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4">
              <span className="text-sm text-on-surface-variant">Email</span>
              <span className="text-sm font-semibold text-primary truncate w-full md:w-auto">{email}</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4">
              <span className="text-sm text-on-surface-variant">Role</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">
                {role}
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4">
              <span className="text-sm text-on-surface-variant">Account created</span>
              <span className="text-sm font-semibold text-primary truncate w-full md:w-auto">{formatDate(createdAt)}</span>
            </div>
          </div>
        </div>

        <div className="p-6 flex items-center justify-between gap-4 border-t dark:border-white/5 border-black/5">
          <div>
            <p className="text-sm font-semibold text-primary">Sign out</p>
            <p className="text-xs text-on-surface-variant">End your admin session.</p>
          </div>
          <button
            type="button"
            onClick={() => setShowSignOutConfirm(true)}
            disabled={signingOut}
            className="bg-secondary text-on-secondary px-6 py-2 rounded-lg text-sm font-bold transition-all shadow-[0_0_20px_rgba(60,215,255,0.3)] hover:brightness-110 active:scale-95 disabled:opacity-50"
          >
            {signingOut ? "Signing out..." : "Sign out"}
          </button>
        </div>

        <ConfirmDialog
          open={showSignOutConfirm}
          title="Sign out?"
          message="You will need to sign in again to access the admin panel."
          confirmLabel="Sign out"
          cancelLabel="Cancel"
          onConfirm={handleSignOut}
          onCancel={() => setShowSignOutConfirm(false)}
        />
      </div>
    </div>
  );
}
