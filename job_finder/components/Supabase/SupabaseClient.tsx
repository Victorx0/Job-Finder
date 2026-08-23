
import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
const public_key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!

export const supabaseDBClient = createClient(url, public_key)






