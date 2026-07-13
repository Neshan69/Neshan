/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect, createContext, useContext, useCallback } from "react";
import { authService } from "../services/supabase.service";
import { profileService } from "../services/profile.service";
import { login as loginService, register as registerService, logout as logoutService } from "../features/auth/auth.service";
import { notificationService } from "../services/notification.service";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchProfile = useCallback(async (userId) => {
    const { data } = await profileService.getProfile(userId);
    if (data) setProfile(data);
  }, []);

  const fetchUnreadCount = useCallback(async (userId) => {
    const { count } = await notificationService.getUnreadCount(userId);
    setUnreadCount(count || 0);
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
        try {
          await fetchUnreadCount(session.user.id);
        } catch (err) {
          console.error("Failed to fetch unread count:", err);
        }
      } else {
        setProfile(null);
        setUnreadCount(0);
      }
      setLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [fetchProfile, fetchUnreadCount]);

  const login = async (email, password) => {
    const { data, error } = await loginService(email, password);
    if (!error && data?.user) {
      fetchProfile(data.user.id);
      fetchUnreadCount(data.user.id);
    }
    return { data, error };
  };

  const register = async (email, password) => {
    const { data, error } = await registerService(email, password);
    if (!error && data?.user) {
      fetchProfile(data.user.id);
      fetchUnreadCount(data.user.id);
    }
    return { data, error };
  };

  const logout = async () => {
    const { error } = await logoutService();
    setProfile(null);
    setUnreadCount(0);
    return { error };
  };

  const updateProfile = async (userId, updates) => {
    const { data, error } = await profileService.updateProfile(userId, updates);
    if (!error && data) setProfile(data);
    return { data, error };
  };

  const refreshNotifications = async () => {
    if (user) await fetchUnreadCount(user.id);
  };

  const displayName = profile?.full_name || user?.email?.split("@")[0] || "User";

  const value = { user, profile, loading, unreadCount, login, register, logout, updateProfile, refreshNotifications, displayName };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
