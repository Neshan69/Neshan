import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function AuthModal({ onClose, onSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    previousFocusRef.current = document.activeElement;

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    const handleTab = (e) => {
      if (!modalRef.current) return;
      const focusable = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleEsc);
    document.addEventListener("keydown", handleTab);
    const firstInput = modalRef.current?.querySelector("input");
    firstInput?.focus();

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.removeEventListener("keydown", handleTab);
      previousFocusRef.current?.focus?.();
    };
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setError("Please fill in all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (trimmedPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setError("");
    setLoading(true);
    const fn = isLogin ? login : register;
    const { error } = await fn(trimmedEmail, trimmedPassword);
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setEmail("");
      setPassword("");
      onSuccess?.();
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="auth-title">
      <div ref={modalRef} className="glass-card w-full max-w-md mx-4 p-6 rounded-2xl" onClick={(e) => e.stopPropagation()}>
        <h2 id="auth-title" className="font-display text-2xl font-bold text-primary mb-1">{isLogin ? "Welcome back" : "Create account"}</h2>
        <p className="text-on-surface-variant text-sm mb-6">
          {isLogin ? "Sign in to access the full experience." : "Join to unlock portfolio features."}
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="auth-email" className="text-[10px] font-bold tracking-widest text-on-surface-variant/80 uppercase">Email</label>
            <input
              id="auth-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-transparent border-b-2 border-outline-variant py-3 focus:border-secondary outline-none text-primary"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="auth-password" className="text-[10px] font-bold tracking-widest text-on-surface-variant/80 uppercase">Password</label>
            <input
              id="auth-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full bg-transparent border-b-2 border-outline-variant py-3 focus:border-secondary outline-none text-primary"
              placeholder="••••••••"
              autoComplete={isLogin ? "current-password" : "new-password"}
            />
          </div>
          {error && <p className="text-error text-xs" role="alert">{error}</p>}
          <button type="submit" disabled={loading} className="w-full bg-secondary text-surface py-3 rounded-xl font-bold text-sm tracking-widest hover:brightness-110 transition-all disabled:opacity-50">
            {loading ? (isLogin ? "SIGNING IN…" : "CREATING ACCOUNT…") : (isLogin ? "SIGN IN" : "CREATE ACCOUNT")}
          </button>
        </form>
        <p className="text-center text-xs text-on-surface-variant mt-4">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => { setIsLogin(!isLogin); setError(""); }} className="text-secondary hover:underline">
            {isLogin ? "Register" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}