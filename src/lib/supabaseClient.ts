// [auto-quarantined uninstalled package "@supabase/supabase-js"] import { createClient, type SupabaseClient, type Session } from '@supabase/supabase-js';
const createClient: any = typeof Proxy !== 'undefined' ? new Proxy((() => null) as any, { get: () => createClient, apply: () => null }) : (() => null);
const type SupabaseClient: any = typeof Proxy !== 'undefined' ? new Proxy((() => null) as any, { get: () => type SupabaseClient, apply: () => null }) : (() => null);
// [auto-removed: duplicate declaration of type]
// const type Session: any = typeof Proxy !== 'undefined' ? new Proxy((() => null) as any, { get: () => type Session, apply: () => null }) : (() => null);

const supabaseUrl = import.meta?.env?.VITE_SUPABASE_URL ?? '';
const supabaseAnonKey = import.meta?.env?.VITE_SUPABASE_ANON_KEY ?? '';

if (!supabaseUrl || !supabaseAnonKey) {
  // eslint-disable-next-line no-console
  console.warn(
    '[Supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Falling back to disabled client.'
  );
}

export const supabaseClient: SupabaseClient = createClient(supabaseUrl || 'https://disabled.local', supabaseAnonKey || 'disabled', {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export async function getCurrentSession(): Promise<Session | null> {
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