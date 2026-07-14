import { createClient } from "@supabase/supabase-js";

const rawUrl = import.meta.env.VITE_SUPABASE_URL;
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseAnonKey = typeof rawKey === "string" ? rawKey.trim() : "";

// The SDK derives /auth/v1, /rest/v1, /storage/v1, etc. from this base
// URL. Strip any trailing path (e.g. a stray "/rest/v1") so endpoints stay
// correct: https://<project>.supabase.co/auth/v1/* — never /rest/v1/auth/v1/*.
let supabaseUrl = typeof rawUrl === "string" ? rawUrl.trim() : "";
try {
  const parsed = new URL(supabaseUrl);
  supabaseUrl = `${parsed.protocol}//${parsed.host}`;
} catch {
  // fall through to the validation below
}

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