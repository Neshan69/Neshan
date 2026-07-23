# contact-email-system.md

**Purpose:** Contact form, messaging/chat system, and how users reach the site owner.
**When to use:** Editing Contact.jsx, Chat.jsx, chat.service.js, or adding a real email backend.

---

## Current Architecture

This project does **not** send traditional email. It uses two contact channels:

1. **Public contact form** (`src/sections/Contact.jsx`) — client-side validated, currently stubbed (no backend send).
2. **Real-time chat** (`src/sections/Chat.jsx` + `src/services/chat.service.js`) — Supabase-backed messaging between authenticated users and the admin. This is the actual working contact channel.

The header CTA ("LET'S TALK") routes logged-out users to the auth modal, then opens Chat. Logged-in users go straight to Chat.

---

## Contact Form (Contact.jsx)

### State
```js
const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
const [errors, setErrors] = useState({});
const [touched, setTouched] = useState({});
const [status, setStatus] = useState("idle"); // idle | sending | sent | error
```

### Validation
- **Name:** required, 2–50 chars.
- **Email:** required, regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`.
- **Subject:** required, 5–100 chars.
- **Message:** required, 10–2000 chars.
- Validation runs on blur (after first touch) and on submit.
- Errors show inline with `aria-describedby` + `role="alert"`.

### Submit Behavior
```js
const handleSubmit = async (e) => {
  e.preventDefault();
  if (status === "sending") return;
  if (!validateForm()) return;

  setStatus("sending");
  setErrors({});

  await new Promise((resolve) => setTimeout(resolve, 600)); // demo delay

  setStatus("sent");
  setForm({ name: "", email: "", subject: "", message: "" });
  setTouched({});
};
```

- **No backend call.** Submitting shows a 600ms loading spinner, then a success message.
- Success state: `"Thank you — your proposal is on its way. We will be in touch shortly."`
- Error state: `"Something went wrong. Please try again."` (never triggered in current code).

### Styling
- Bottom-border inputs: `border-b-2 border-outline-variant`, `focus:border-secondary`.
- `font-display` for input values, `text-xl`.
- Labels: `text-[10px] font-bold tracking-widest text-on-surface-variant/80 uppercase`.
- Submit button: text-only style (`SEND PROPOSAL` + arrow icon), `text-xl font-display font-bold text-primary hover:text-secondary`.

### Social Links (Footer)
- LinkedIn, Dribbble, Instagram — currently `href="#"` (placeholder).
- `text-[10px] font-bold tracking-widest text-on-surface-variant/80`.

---

## Chat / Messaging System

### Overview
Supabase real-time chat between a **user** and the **admin**. Replaces traditional contact email.

### Data Model
- **profiles** — `role` column distinguishes `admin` from `user`.
- **conversations** — `user_id`, `admin_id`, `status` (`active` | `inactive` | `completed`).
- **messages** — `conversation_id`, `sender_id`, `message`, `is_read`, `created_at`.

### Flow (Chat.jsx)
1. Fetch admin profile via `chatService.getAdmin()` (first admin row).
2. Load or create conversation for current `user.id` + `admin.id`.
3. Subscribe to real-time `INSERT` on `messages` for that conversation.
4. Render messages with `ChatBubble` (compact variant).
5. Auto-scroll to bottom on new messages.
6. Admin reply view: `src/features/admin/pages/Messages.jsx`.

### Auth Requirement
- Chat requires `user` from `useAuth()`.
- If no user, header opens `AuthModal` first.
- Once logged in, Chat auto-creates a conversation.

### Input
- Single input (not textarea) at bottom: `placeholder="Describe your vision..."`.
- `Enter` sends, no Shift+Enter newline.
- 2000 char limit with counter.

### Realtime
```js
const channel = supabase
  .channel(`messages:${conversationId}`)
  .on("postgres_changes", {
    event: "INSERT",
    schema: "public",
    table: "messages",
    filter: `conversation_id=eq.${conversationId}`,
  }, async (payload) => {
    const { data } = await supabase
      .from("messages")
      .select(`*, sender:profiles!messages_sender_id_fkey (id, full_name, email, avatar_url)`)
      .eq("id", payload.new.id)
      .single();
    if (data) setMessages((prev) => [...prev, data]);
  })
  .subscribe();
```

### Message Status
- Optimistic UI: messages appear immediately on send.
- On error: optimistic message removed, error shown.
- `markAsRead`: updates `is_read = true` for messages not from current user.

---

## Admin Contact Management

### Routes
- `/admin/messages` — inbox showing all conversations with newest first.
- Conversation statuses: `active`, `inactive`, `completed`.
- Admin can reply, mark complete, mark inactive, reopen.
- Conversation list shows user avatar, name, last message preview, time, unread count.

### Notifications
- Bell icon in header with unread badge.
- Users see unread admin replies; admin sees unread user messages.
- Click notification marks it read.

---

## What Is Missing (Production Blockers)

1. **No email delivery.** Contact form is purely cosmetic. Submissions are lost after the demo timeout.
2. **No contact details.** Contact section has no email address, phone, or location.
3. **Social links are `#`.** LinkedIn, Dribbble, Instagram links are non-functional.
4. **No notification service implementation.** `src/services/notification.service.js` is referenced but does not exist.
5. **No email backend.** No Resend, SendGrid, Nodemailer, or Supabase Edge Function for email.

---

## Recommended Production Path

### Option A: Keep Chat, Remove Fake Form
- Remove or clearly label the Contact form as "Demo — use chat below".
- Keep `src/sections/Chat.jsx` as the primary contact channel.
- Add actual social links to the footer.

### Option B: Add Real Email Behind Chat
- Keep Chat as primary real-time channel.
- Add email as secondary via Supabase Edge Function or external API:
  - User fills Contact form → Edge Function sends email to admin.
  - Or email creates a new conversation automatically.
- Required: `RESEND_API_KEY` or similar in env vars.

### Option C: Replace Form with Contact Details
- Remove the form entirely.
- Show email (`mailto:`), location, availability, and social links.
- Redirect "LET'S TALK" CTA to open mail client or chat.

---

## Rules

- **Do:** Use chat as the working contact channel. Preserve real-time subscription cleanup.
- **Do:** Keep validation, `aria-describedby`, `role="alert"`, and touch states on the contact form.
- **Do:** Gate chat behind `useAuth()` — require login before messaging.
- **Don't:** Ship a form that posts nowhere without a clear "demo" or "coming soon" indicator.
- **Don't:** Add an email backend without measuring first (dependency-management.md).
- **Don't:** Expose admin email or conversation data to unauthenticated users.

---

## Checklist

- [ ] Contact form has validation, error states, and accessible labels.
- [ ] Chat requires authentication before access.
- [ ] No sensitive data leaks in chat/contact client code.
- [ ] Social links are either real URLs or removed.
- [ ] If email is added, it uses a backend function, not client-side only.
- [ ] Admin conversation access is role-gated.

---

## References

- `src/sections/Contact.jsx` — public contact form
- `src/sections/Chat.jsx` — real-time chat UI
- `src/services/chat.service.js` — chat data layer
- `src/features/admin/pages/Messages.jsx` — admin inbox
- `src/contexts/AuthContext.jsx` — auth state
- `src/features/auth/AuthModal.jsx` — login/register gate
- `forms.md` — form styling rules
- `accessibility.md` — a11y requirements for forms
- `error-handling.md` — error display patterns
