/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect, createContext, useContext, useCallback } from "react";
import { authService } from "../services/supabase.service";
import { profileService } from "../services/profile.service";
import { login as loginService, register as registerService, logout as logoutService } from "../features/auth/auth.service";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (userId) => {
    const { data } = await profileService.getProfile(userId);
    if (data) setProfile(data);
  }, []);

  useEffect(() => {
    let isMounted = true;

    authService.getSession().then((session) => {
      if (!isMounted) return;
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
      setLoading(false);
    }).catch((err) => {
      if (!isMounted) return;
      console.error("Failed to get session:", err);
      setUser(null);
      setProfile(null);
      setLoading(false);
    });

    const subscription = authService.onAuthStateChange(async (session) => {
      if (!isMounted) return;
      setUser(session?.user ?? null);
      if (session?.user) {
        try {
          await fetchProfile(session.user.id);
        } catch (err) {
          console.error("Failed to fetch profile on auth change:", err);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [fetchProfile]);

  const login = async (email, password) => {
    const { data, error } = await loginService(email, password);
    if (!error && data?.user) {
      fetchProfile(data.user.id);
    }
    return { data, error };
  };

  const register = async (email, password) => {
    const { data, error } = await registerService(email, password);
    if (!error && data?.user) {
      fetchProfile(data.user.id);
    }
    return { data, error };
  };

  const logout = async () => {
    const { error } = await logoutService();
    setProfile(null);
    return { error };
  };

  const updateProfile = async (userId, updates) => {
    const { data, error } = await profileService.updateProfile(userId, updates);
    if (!error && data) setProfile(data);
    return { data, error };
  };

  const displayName = profile?.full_name || user?.email?.split("@")[0] || "User";

  const value = { user, profile, loading, login, register, logout, updateProfile, displayName };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
