import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from './database.types'

export const createClient = () => createClientComponentClient<Database>()

// For backwards compatibility, also export a pre-created client
export const supabase = createClient()
