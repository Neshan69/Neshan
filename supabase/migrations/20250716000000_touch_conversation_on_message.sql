-- Keep conversations.updated_at in sync with the latest message.
-- Additive only (no structural schema change). Run in the Supabase SQL Editor
-- or apply as a new migration. Safe to re-run.

create or replace function public.touch_conversation_on_message()
returns trigger
language plpgsql
as $$
begin
  update public.conversations
  set updated_at = timezone('utc'::text, now())
  where id = new.conversation_id;
  return new;
end;
$$;

drop trigger if exists on_message_touch_conversation on public.messages;

create trigger on_message_touch_conversation
  after insert on public.messages
  for each row execute function public.touch_conversation_on_message();
