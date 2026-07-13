import { supabase } from "../lib/supabase";

export const adminService = {
  getUsers: async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });
    return { data, error };
  },
};
