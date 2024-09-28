import { supabase } from './supabaseClient'
import { Profile } from '@/types'

export async function getProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('Error fetching profile:', error)
    return null
  }

  return data
}

export async function updateProfile(
  profile: Partial<Profile>
): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .update(profile)
    .eq('id', profile.id)
    .single()

  if (error) {
    console.error('Error updating profile:', error)
    return null
  }

  return data
}

// Remove unused functions
