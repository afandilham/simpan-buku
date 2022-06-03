import { createClient } from "@supabase/supabase-js";

const options = {
  headers: {'x-app-name': 'simpan-buku-app'},
  autoRefreshToken: true,
};

export const supabase = createClient(import.meta.env.VITE_API_URL, import.meta.env.VITE_API_KEY, options);
