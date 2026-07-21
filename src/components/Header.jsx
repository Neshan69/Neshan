import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import AuthModal from "../features/auth/AuthModal";
import { AdminRoutes } from "../types";
import ConfirmDialog from "../components/ConfirmDialog";

export default function Header({ onContact }) {
  const navigate = useNavigate();
  const { user, profile, logout, loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  const menuRef = useRef(null);

  const displayName = profile?.full_name || user?.email?.split("@")[0] || "User";

  useEffect(() => {
    if (!showMenu) return;
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    const handleEsc = (e) => {
      if (e.key === "Escape") setShowMenu(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [showMenu]);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-16 py-6">
        <div className="font-display font-bold text-xl md:text-2xl tracking-tight text-primary uppercase">
          Neshan Niroula
        </div>
        <div className="relative">
          {loading ? (
            <div className="w-20 h-8 bg-white/10 rounded-full animate-pulse" />
          ) : user ? (
            <>
              <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowMenu(!showMenu)}
            aria-expanded={showMenu}
            aria-haspopup="true"
            className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:border-secondary/40 transition-colors"
          >
            <span className="text-primary text-xs font-bold tracking-widest">{displayName}</span>
            <span className="material-symbols-outlined text-sm text-primary" aria-hidden="true">expand_more</span>
          </button>
              </div>
              {showMenu && (
                <div ref={menuRef} role="menu" aria-label="Account menu" className="absolute right-0 top-full mt-2 w-48 glass-card rounded-xl overflow-hidden py-2">
                  {profile?.role === "admin" && (
                    <button role="menuitem" onClick={() => { navigate(AdminRoutes.DASHBOARD); setShowMenu(false); }} className="w-full text-left px-4 py-2 text-sm text-primary hover:bg-white/5 transition-colors">
                      Admin
                    </button>
                  )}
                  <button role="menuitem" onClick={() => { onContact?.(); setShowMenu(false); }} className="w-full text-left px-4 py-2 text-sm text-primary hover:bg-white/5 transition-colors">
                    Chat
                  </button>
                  <button role="menuitem" onClick={() => setShowSignOutConfirm(true)} className="w-full text-left px-4 py-2 text-sm text-primary hover:bg-white/5 transition-colors">
                    Sign out
                  </button>
                </div>
              )}
            </>
          ) : (
            <button
              type="button"
              onClick={() => setShowAuthModal(true)}
              aria-label="Start a conversation — go to contact"
              className="bg-primary text-surface px-4 md:px-6 py-2 text-[10px] font-bold tracking-widest hover:bg-secondary hover:text-white transition-all duration-500"
            >
              LET'S TALK
            </button>
          )}
        </div>
      </header>
      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onSuccess={() => {
            setShowAuthModal(false);
            onContact?.();
          }}
        />
      )}
      <ConfirmDialog
        open={showSignOutConfirm}
        title="Sign out?"
        message="You will need to sign in again to access all features."
        confirmLabel="Sign out"
        cancelLabel="Cancel"
        onConfirm={async () => {
          await logout();
          setShowSignOutConfirm(false);
          setShowMenu(false);
        }}
        onCancel={() => setShowSignOutConfirm(false)}
      />
    </>
  );
}
