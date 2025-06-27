import { createClient } from "@supabase/supabase-js";

// Check if the env variables are defined
export const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL or Key is missing in environment variables!')
}

export const supabase = createClient(supabaseUrl, supabaseKey)
