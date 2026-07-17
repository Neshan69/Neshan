import { supabase } from "../lib/supabase";

export const adminService = {
  getUsers: async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });
    return { data, error };
  },

  getUserCount: async () => {
    const { count, error } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true });
    return { count, error };
  },

  getMessageCount: async () => {
    const { count, error } = await supabase
      .from("messages")
      .select("*", { count: "exact", head: true });
    return { count, error };
  },

  getConversationCount: async () => {
    const { count, error } = await supabase
      .from("conversations")
      .select("*", { count: "exact", head: true });
    return { count, error };
  },
};
