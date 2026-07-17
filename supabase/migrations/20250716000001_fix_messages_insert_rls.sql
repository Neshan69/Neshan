-- Fix messages INSERT RLS so an admin who can VIEW a conversation can
-- also REPLY to it. Previously the INSERT WITH CHECK only permitted the
-- conversation's owning admin_id, while the SELECT policy (via the
-- conversations admin rule) lets ANY admin read every conversation. That
-- mismatch made admin replies fail with "new row violates row-level
-- security policy" even though history loaded fine.
-- Additive: only replaces the messages insert policy.

drop policy if exists "Users can send messages to their conversations." on public.messages;

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
