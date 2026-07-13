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
    await profileService.createProfile(data.user.id, { email });
    const { data: profile } = await profileService.getProfile(data.user.id);
    return { data: { ...data, profile }, error };
  }
  return { data, error };
};

export const logout = async () => {
  return authService.signOut();
};
