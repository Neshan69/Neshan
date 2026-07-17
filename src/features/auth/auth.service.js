import { authService } from "../../services/supabase.service";
import { profileService } from "../../services/profile.service";

export const login = async (email, password) => {
  const { data, error } = await authService.signInWithPassword(email, password);
  if (data?.user) {
    const { data: profile } = await profileService.getProfile(data.user.id);
    return { data: { ...data, profile }, error };
  }
  return { data, error };
};

export const register = async (email, password) => {
  const { data, error } = await authService.signUp(email, password);
  if (data?.user && !error) {
    const { error: profileError } = await profileService.createProfile(data.user.id, { email });
    if (profileError) {
      console.warn("Profile creation failed, trigger may handle it:", profileError);
    }
    const getProfileWithRetry = async (userId, retries = 3, delay = 500) => {
      for (let i = 0; i < retries; i++) {
        const { data: profile } = await profileService.getProfile(userId);
        if (profile) return profile;
        if (i < retries - 1) await new Promise((resolve) => setTimeout(resolve, delay));
      }
      return null;
    };
    const profile = await getProfileWithRetry(data.user.id);
    return { data: { ...data, profile }, error };
  }
  return { data, error };
};

export const logout = async () => {
  return authService.signOut();
};
