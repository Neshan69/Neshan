import { supabase } from "../lib/supabase";

export const profileService = {
  getProfile: async (userId) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    return { data, error };
  },

  createProfile: async (userId, defaults = {}) => {
    const { data, error } = await supabase
      .from("profiles")
      .upsert([{ id: userId, ...defaults }])
      .select("*")
      .single();
    return { data, error };
  },

  updateProfile: async (userId, updates) => {
    const { data, error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", userId)
      .select("*")
      .single();
    return { data, error };
  },
};
