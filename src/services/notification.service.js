import { supabase } from "../lib/supabase";

export const notificationService = {
  getNotifications: async (userId) => {
    const { data, error } = await supabase
      .from("notifications")
      .select(`
        *,
        message:messages (
          id,
          content,
          conversation_id,
          created_at,
          sender:sender_id (
            id,
            full_name,
            email
          )
        )
      `)
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(50);
    return { data, error };
  },

  getUnreadCount: async (userId) => {
    const { count, error } = await supabase
      .from("notifications")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("read", false);
    return { count: count || 0, error };
  },

  markAsRead: async (notificationId, userId) => {
    const { error } = await supabase
      .from("notifications")
      .update({ read: true })
      .eq("id", notificationId)
      .eq("user_id", userId);
    return { error };
  },

  markAllAsRead: async (userId) => {
    const { error } = await supabase
      .from("notifications")
      .update({ read: true })
      .eq("user_id", userId)
      .eq("read", false);
    return { error };
  },

  createNotification: async (userId, messageId, type = "new_message") => {
    const { data, error } = await supabase
      .from("notifications")
      .insert([{ user_id: userId, message_id: messageId, type }])
      .select("*")
      .single();
    return { data, error };
  },
};
