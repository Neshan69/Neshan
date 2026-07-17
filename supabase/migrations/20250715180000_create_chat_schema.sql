-- ============================================================
-- Simplified chat schema for user-to-admin messaging
-- Drop old schema and create new one
-- ============================================================

-- Drop old objects first
drop trigger if exists on_message_notify on public.messages;
drop function if exists public.notify_on_message();
drop function if exists public.create_conversation();
drop policy if exists "Users can view conversations they participate in." on public.conversations;
drop policy if exists "Users can create conversations." on public.conversations;
drop policy if exists "Users can view participants in their conversations." on public.conversation_participants;
drop policy if exists "Users can join conversations." on public.conversation_participants;
drop policy if exists "Users can update their own participation." on public.conversation_participants;
drop policy if exists "Participants can view messages." on public.messages;
drop policy if exists "Participants can send messages." on public.messages;
drop policy if exists "Users can view their own notifications." on public.notifications;
drop policy if exists "System can insert notifications." on public.notifications;
drop policy if exists "Users can update their own notifications." on public.notifications;
drop table if exists public.notifications;
drop table if exists public.conversation_participants;
drop table if exists public.messages;
drop table if exists public.conversations;

-- Conversations: direct user <-> admin chat
create table public.conversations (
  id uuid not null default gen_random_uuid() primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  admin_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'active'::text,
  created_at timestamp with time zone not null default timezone('utc'::text, now()),
  updated_at timestamp with time zone not null default timezone('utc'::text, now()),
  unique(user_id, admin_id)
);

-- Messages
create table public.messages (
  id uuid not null default gen_random_uuid() primary key,
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null references public.profiles(id) on delete cascade,
  message text not null,
  is_read boolean not null default false,
  created_at timestamp with time zone not null default timezone('utc'::text, now())
);

alter table public.conversations enable row level security;
alter table public.messages enable row level security;

-- Conversations RLS
create policy "Users can view their own conversations."
  on public.conversations for select
  using (
    auth.uid() = user_id
    or exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

create policy "Users can create conversations."
  on public.conversations for insert
  with check ( auth.uid() = user_id );

create policy "Users can update own conversation status."
  on public.conversations for update
  using (
    auth.uid() = user_id
    or exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  )
  with check (
    auth.uid() = user_id
    or exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- Messages RLS
create policy "Users can view messages in their conversations."
  on public.messages for select
  using (
    exists (
      select 1 from public.conversations c
      where c.id = messages.conversation_id
        and (c.user_id = auth.uid() or c.admin_id = auth.uid())
    )
  );

create policy "Users can send messages to their conversations."
  on public.messages for insert
  with check (
    auth.uid() = sender_id
    and exists (
      select 1 from public.conversations c
      where c.id = messages.conversation_id
        and (
          c.user_id = auth.uid()
          or c.admin_id = auth.uid()
          or exists (
            select 1 from public.profiles p
            where p.id = auth.uid() and p.role = 'admin'
          )
        )
    )
  );

create policy "Users can update read status of messages in their conversations."
  on public.messages for update
  using (
    exists (
      select 1 from public.conversations c
      where c.id = messages.conversation_id
        and (c.user_id = auth.uid() or c.admin_id = auth.uid())
    )
  )
  with check (
    exists (
      select 1 from public.conversations c
      where c.id = messages.conversation_id
        and (c.user_id = auth.uid() or c.admin_id = auth.uid())
    )
  );

-- Enable Realtime for messages and conversations
alter publication supabase_realtime add table public.messages;
alter publication supabase_realtime add table public.conversations;
