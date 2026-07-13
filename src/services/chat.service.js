import { supabase } from "../lib/supabase";

export const chatService = {
  getAdmin: async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("role", "admin")
      .single();
    return { data, error };
  },

  createConversation: async (creatorId, participantIds) => {
    const { data, error } = await supabase
      .from("conversations")
      .insert([{}])
      .select("*")
      .single();
    if (error || !data) return { data, error };

    const uniqueIds = [...new Set([creatorId, ...participantIds])];
    const rows = uniqueIds.map((uid) => ({
      conversation_id: data.id,
      user_id: uid,
      joined_at: new Date().toISOString(),
    }));

    const { error: joinError } = await supabase
      .from("conversation_participants")
      .insert(rows);
    if (joinError) {
      await supabase.from("conversations").delete().eq("id", data.id);
      return { data: null, error: joinError };
    }

    return { data, error: null };
  },

  getUserConversations: async (userId) => {
    const { data, error } = await supabase
      .from("conversation_participants")
      .select(`
        conversation_id,
        joined_at,
        conversation:conversations (
          id,
          created_at,
          updated_at
        )
      `)
      .eq("user_id", userId)
      .order("joined_at", { ascending: false });
    return { data, error };
  },

  getMessages: async (conversationId) => {
    const { data, error } = await supabase
      .from("messages")
      .select(`
        *,
        sender:profiles!messages_sender_id_fkey (
          id,
          full_name,
          email
        )
      `)
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });
    return { data, error };
  },

  sendMessage: async (conversationId, senderId, content) => {
    const { data, error } = await supabase
      .from("messages")
      .insert([{ conversation_id: conversationId, sender_id: senderId, content }])
      .select("*")
      .single();
    return { data, error };
  },

  joinConversation: async (conversationId, userId) => {
    const { data, error } = await supabase
      .from("conversation_participants")
      .insert([{ conversation_id: conversationId, user_id: userId }])
      .select("*")
      .single();
    return { data, error };
  },

  getAllConversations: async (adminId) => {
    const { data, error } = await supabase
      .from("conversation_participants")
      .select(`
        conversation_id,
        joined_at,
        last_read_at,
        conversation:conversations (
          id,
          created_at,
          updated_at
        )
      `)
      .eq("user_id", adminId)
      .order("joined_at", { ascending: false });
    if (error || !data) return { data, error };

    const enriched = await Promise.all(
      data.map(async (row) => {
        const { data: participants } = await supabase
          .from("conversation_participants")
          .select(`
            user_id,
            profile:profiles (
              id,
              full_name,
              email,
              role
            )
          `)
          .eq("conversation_id", row.conversation_id);

        const other = participants?.find((p) => p.user_id !== adminId);
        const profile = other?.profile;

        const { data: lastMessage } = await supabase
          .from("messages")
          .select("content, created_at, sender_id")
          .eq("conversation_id", row.conversation_id)
          .order("created_at", { ascending: false })
          .limit(1)
          .single();

        const unreadFilter = row.last_read_at
          ? supabase.from("messages").select("*", { count: "exact", head: true }).gt("created_at", row.last_read_at)
          : supabase.from("messages").select("*", { count: "exact", head: true });

        const { count: unreadCount } = await unreadFilter
          .eq("conversation_id", row.conversation_id)
          .neq("sender_id", adminId);

        return {
          conversationId: row.conversation_id,
          createdAt: row.conversation?.created_at,
          updatedAt: row.conversation?.updated_at,
          profile,
          otherUserId: other?.user_id,
          lastMessage,
          unreadCount: unreadCount || 0,
        };
      })
    );

    return { data: enriched, error: null };
  },

  searchUsers: async (query) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .or(`full_name.ilike.%${query}%,email.ilike.%${query}%`)
      .eq("role", "user")
      .limit(20);
    return { data, error };
  },

  markAsRead: async (conversationId, userId) => {
    const { error } = await supabase
      .from("conversation_participants")
      .update({ last_read_at: new Date().toISOString() })
      .eq("conversation_id", conversationId)
      .eq("user_id", userId);
    return { error };
  },
};
