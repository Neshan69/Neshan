-- Fix chat RLS + admin privilege escalation.
-- Run in Supabase (migrations apply automatically in filename order,
-- after 20250712190000 and 20250712205500).

-- 1) Lock the `role` column so an authenticated user cannot promote
--    themselves to admin via the client update policy.
drop policy if exists "Users can update own profile." on public.profiles;
create policy "Users can update own non-role profile."
  on public.profiles for update
  using ( auth.uid() = id )
  with check ( role = ( select role from public.profiles where id = auth.uid() ) );

-- 2) Conversation creation must insert BOTH participants. A client-side
--    multi-row insert is rejected by the per-row WITH CHECK, so do it
--    in a SECURITY DEFINER function (bypasses RLS).
create or replace function public.create_conversation(p_creator uuid, p_participant uuid)
returns uuid
language plpgsql
security definer
as $$
declare
  v_id uuid := gen_random_uuid();
begin
  insert into public.conversations (id) values (v_id);
  insert into public.conversation_participants (conversation_id, user_id)
  values (v_id, p_creator), (v_id, p_participant);
  return v_id;
end;
$$;

-- 3) Notifications must be created for the OTHER participant whenever a
--    message is sent. Do it in a trigger (server-side) so clients
--    cannot spoof notifications for arbitrary users.
create or replace function public.notify_on_message()
returns trigger
language plpgsql
security definer
as $$
declare
  v_other uuid;
begin
  select user_id into v_other
  from public.conversation_participants
  where conversation_id = new.conversation_id
    and user_id <> new.sender_id
  limit 1;
  if v_other is not null then
    insert into public.notifications (user_id, message_id, type)
    values (v_other, new.id, 'new_message');
  end if;
  return new;
end;
$$;

drop trigger if exists on_message_notify on public.messages;
create trigger on_message_notify
  after insert on public.messages
  for each row execute function public.notify_on_message();

-- 4) Clients must not insert notifications directly (the trigger owns this).
drop policy if exists "System can insert notifications." on public.notifications;
create policy "System can insert notifications."
  on public.notifications for insert
  with check ( false );
