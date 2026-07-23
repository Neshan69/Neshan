import { supabase } from "../lib/supabase";

export const chatService = {
  getAdmin: async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("role", "admin")
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();
    return { data, error };
  },

  createConversation: async (userId, adminId) => {
    const { data, error } = await supabase
      .from("conversations")
      .insert([{ user_id: userId, admin_id: adminId, status: "active" }])
      .select("*")
      .single();
    return { data, error };
  },

  getUserConversations: async (userId) => {
    const { data, error } = await supabase
      .from("conversations")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    return { data, error };
  },

  getAdminConversations: async (adminId) => {
    const { data: conversations, error } = await supabase
      .from("conversations")
      .select(`
        *,
        user:profiles!conversations_user_id_fkey (id, full_name, email, avatar_url),
        admin:profiles!conversations_admin_id_fkey (id, full_name, email, avatar_url)
      `)
      .eq("admin_id", adminId)
      .order("updated_at", { ascending: false });
    if (error) return { data: null, error };
    if (!conversations || conversations.length === 0) return { data: [], error: null };

    const ids = conversations.map((c) => c.id);
    const { data: messages } = await supabase
      .from("messages")
      .select("id, conversation_id, sender_id, message, is_read, created_at")
      .in("conversation_id", ids)
      .order("created_at", { ascending: true });

    const byConversation = new Map();
    for (const m of messages || []) {
      if (!byConversation.has(m.conversation_id)) {
        byConversation.set(m.conversation_id, []);
      }
      byConversation.get(m.conversation_id).push(m);
    }

    const data = conversations.map((c) => {
      const msgs = byConversation.get(c.id) || [];
      const lastMessage = msgs[msgs.length - 1] || null;
      const unread = msgs.filter((m) => !m.is_read && m.sender_id !== adminId).length;
      const lastMessageAt = lastMessage?.created_at || c.updated_at;
      return { ...c, lastMessage, unread, lastMessageAt };
    });

    data.sort((a, b) => new Date(b.lastMessageAt) - new Date(a.lastMessageAt));

    return { data, error: null };
  },

  getMessages: async (conversationId) => {
    const { data, error } = await supabase
      .from("messages")
      .select(`
        *,
        sender:profiles!messages_sender_id_fkey (id, full_name, email, avatar_url)
      `)
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });
    return { data, error };
  },

  sendMessage: async (conversationId, senderId, message) => {
    const context = {
      conversation_id: conversationId,
      sender_id: senderId,
      authenticated_user: (await supabase.auth.getUser()).data?.user?.id ?? null,
      message_text: message,
    };
    try {
      const { data, error } = await supabase
        .from("messages")
        .insert([{ conversation_id: conversationId, sender_id: senderId, message }])
        .select("*")
        .single();

      if (error) {
        console.error("[chatService.sendMessage] Supabase insert failed", {
          ...context,
          error,
        });
        return { data: null, error };
      }

      return { data, error: null };
    } catch (err) {
      console.error("[chatService.sendMessage] Unexpected exception during insert", {
        ...context,
        error: err,
      });
      return { data: null, error: err };
    }
  },

  markAsRead: async (conversationId, userId) => {
    const { error } = await supabase
      .from("messages")
      .update({ is_read: true })
      .eq("conversation_id", conversationId)
      .neq("sender_id", userId);
    return { error };
  },

  completeConversation: async (conversationId) => {
    const { data, error } = await supabase
      .from("conversations")
      .update({ status: "completed" })
      .eq("id", conversationId)
      .select("*")
      .single();
    return { data, error };
  },

  activateConversation: async (conversationId) => {
    const { data, error } = await supabase
      .from("conversations")
      .update({ status: "active" })
      .eq("id", conversationId)
      .select("*")
      .single();
    return { data, error };
  },

  inactivateConversation: async (conversationId) => {
    const { data, error } = await supabase
      .from("conversations")
      .update({ status: "inactive" })
      .eq("id", conversationId)
      .select("*")
      .single();
    return { data, error };
  },

};
