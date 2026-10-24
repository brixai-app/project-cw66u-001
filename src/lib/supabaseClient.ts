// Supabase integration utility for Tafouq.
// This file is safe to import even when '@supabase/supabase-js' is not installed.
//
// Behaviour:
// - If the official SDK is available AND env vars are set, we create a real client.
// - Otherwise we fall back to a clearly labeled demo-mode disabled client.

// Minimal type shims that cover only the methods we actually use
export type SupabaseSession = {
  access_token?: string;
  expires_at?: number;
};

export type SupabaseAuthLike = {
  getSession: () => Promise<{ data: { session: SupabaseSession | null }; error: Error | null }>;
  getUser: () => Promise<{ data: { user: any | null }; error: Error | null }>;
  signOut: () => Promise<{ error: Error | null }>;
  // The following methods are used in AppContext for auth flows.
  // In demo mode they always return null errors and no-op data so the
  // rest of the app can call them safely without the real SDK.
  signInWithPassword: (params: {
    email: string;
    password: string;
  }) => Promise<{ data: { user: any | null }; error: Error | null }>;
  signUp: (params: {
    email: string;
    password: string;
    options?: { data?: Record<string, unknown> };
  }) => Promise<{ data: { user: any | null }; error: Error | null }>;
};

export type SupabaseClientLike = {
  auth: SupabaseAuthLike;
};

// Disabled client implementation (demo-only)
const disabledClient: SupabaseClientLike = {
  auth: {
    async getSession() {
      return { data: { session: null }, error: null };
    },
    async getUser() {
      return { data: { user: null }, error: null };
    },
    async signOut() {
      return { error: null };
    },
    async signInWithPassword() {
      // Simulate "no real user" so AppContext falls back to demo user
      return { data: { user: null }, error: null };
    },
    async signUp() {
      // Simulate "no real user" so AppContext falls back to demo user
      return { data: { user: null }, error: null };
    },
  },
};

const supabaseUrl = import.meta?.env?.VITE_SUPABASE_URL ?? '';
const supabaseAnonKey = import.meta?.env?.VITE_SUPABASE_ANON_KEY ?? '';

let realClient: SupabaseClientLike | null = null;
let isRealSupabaseReady = false;

// We avoid using ((_pkg?: any) => ({}))() because Vite runs in a pure ESM/browser environment where
// require is not available. Instead we only create a real client when the SDK is
// installed and imported normally. Since '@supabase/supabase-js' is not guaranteed
// to be present in this demo environment, we skip importing it here and always
// fall back to the disabled demo client unless you explicitly wire a real client
// elsewhere.

// If in the future you install '@supabase/supabase-js' and want to enable a real
// client, you can safely import { createClient } in this file and construct
// realClient when env vars are configured.
if (!supabaseUrl || !supabaseAnonKey) {
  // eslint-disable-next-line no-console
  console.warn(
    '[Supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Running in demo mode (no real Supabase connection).'
  );
}

// Public client used across the app. Never claim a real connection when
// we are using the disabled demo client.
export const supabaseClient: SupabaseClientLike = realClient ?? disabledClient;

export function isSupabaseConnected(): boolean {
  return isRealSupabaseReady;
}

export async function getCurrentSession(): Promise<SupabaseSession | null> {
  if (!isRealSupabaseReady) {
    // In demo mode always return null so AppContext falls back to demo user.
    return null;
  }
  try {
    const { data, error } = await supabaseClient.auth.getSession();
    if (error) {
      // eslint-disable-next-line no-console
      console.error('[Supabase] getSession error', error);
      return null;
    }
    return data?.session ?? null;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[Supabase] getSession exception', err);
    return null;
  }
}

export async function getCurrentUser() {
  if (!isRealSupabaseReady) {
    // In demo mode always return null so AppContext uses demo user.
    return null;
  }
  try {
    const { data, error } = await supabaseClient.auth.getUser();
    if (error) {
      // eslint-disable-next-line no-console
      console.error('[Supabase] getUser error', error);
      return null;
    }
    return data?.user ?? null;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[Supabase] getUser exception', err);
    return null;
  }
}

export async function signOutSafely() {
  if (!isRealSupabaseReady) {
    // In demo mode we simply no-op so logout flows still clear local state.
    return;
  }
  try {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      // eslint-disable-next-line no-console
      console.error('[Supabase] signOut error', error);
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[Supabase] signOut exception', err);
  }
}

export default supabaseClient;
