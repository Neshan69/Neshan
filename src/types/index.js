/**
 * @typedef {(string|number)} ID
 *
 * @typedef {Object} Profile
 * @property {ID} id
 * @property {string} email
 * @property {string} [full_name]
 * @property {'user'|'admin'} [role]
 * @property {string} [avatar_url]
 * @property {string} [created_at]
 * @property {string} [updated_at]
 *
 * @typedef {Object} Conversation
 * @property {ID} id
 * @property {string} [created_at]
 * @property {string} [updated_at]
 *
 * @typedef {Object} ConversationParticipant
 * @property {ID} conversation_id
 * @property {ID} user_id
 * @property {string} [joined_at]
 * @property {string} [last_read_at]
 *
 * @typedef {Object} Message
 * @property {ID} id
 * @property {ID} conversation_id
 * @property {ID} sender_id
 * @property {string} content
 * @property {string} [created_at]
 *
 * @typedef {Object} Notification
 * @property {ID} id
 * @property {ID} user_id
 * @property {ID} [message_id]
 * @property {string} type
 * @property {boolean} read
 * @property {string} [created_at]
 */

export const Database = {
  tables: {
    profiles: "profiles",
    conversations: "conversations",
    conversation_participants: "conversation_participants",
    messages: "messages",
    notifications: "notifications",
  },
};

export const UserRole = {
  USER: "user",
  ADMIN: "admin",
};

export const AdminRoutes = {
  DASHBOARD: "/admin",
  USERS: "/admin/users",
  MESSAGES: "/admin/messages",
  SETTINGS: "/admin/settings",
};
