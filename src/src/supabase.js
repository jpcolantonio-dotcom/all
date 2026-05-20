import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://quqtceabwkmmruiqwlg.supabase.co'
const SUPABASE_KEY = 'sb_publishable_aNfXB2LzYxx_krHg0MnKTQ_zSTgQ'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
