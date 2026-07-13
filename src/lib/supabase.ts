import { createClient } from "@supabase/supabase-js";

const rawUrl = import.meta.env.VITE_SUPABASE_URL;
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseUrl = typeof rawUrl === "string" ? rawUrl.trim() : "";
const supabaseAnonKey = typeof rawKey === "string" ? rawKey.trim() : "";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local"
  );
}

if (!supabaseUrl.startsWith("https://") || !supabaseUrl.includes(".supabase.co")) {
  throw new Error(
    `Invalid Supabase URL format: "${supabaseUrl}". Expected format: https://<project-ref>.supabase.co`
  );
}

if (!supabaseAnonKey.startsWith("sb_publishable_") && !supabaseAnonKey.startsWith("eyJ")) {
  throw new Error(
    `Invalid Supabase anon key format. Key must start with "sb_publishable_" or "eyJ". Got: "${supabaseAnonKey.slice(0, 15)}..."`
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);