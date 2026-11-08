import { createClient } from '@supabase/supabase-js';

// Fallback directly to the user's project URL and key if env variables aren't set
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://miqsmgmsrmhhuqqtoapj.supabase.co';

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_KW4fRQEhmEDShajYFLCa4w_oJdMakxb';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
