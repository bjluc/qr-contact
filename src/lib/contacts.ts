import { createClient } from '@/lib/supabaseClient'

export interface ContactData {
  user_id: string
  name: string
  job_title?: string
  phone?: string
  email?: string
  location?: string
  avatar_url?: string
  notes?: string
  contact_type: 'personal' | 'business'
}

export type Contact = {
  id: string
  user_id: string
  name: string
  job_title?: string
  phone?: string
  email?: string
  location?: string
  avatar_url?: string
  notes?: string
  contact_type: 'personal' | 'business'
  qr?: string
  created_at: string
  updated_at: string
}

export async function createContact(
  contactData: Omit<ContactData, 'user_id'>
): Promise<Contact> {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('User not authenticated')
  }

  const { data, error } = await supabase.rpc('create_contact_with_qr', {
    p_name: contactData.name,
    p_email: contactData.email,
    p_phone: contactData.phone,
    p_user_id: user.id,
    p_job_title: contactData.job_title,
    p_location: contactData.location,
    p_notes: contactData.notes,
    p_contact_type: contactData.contact_type,
  })

  if (error) throw error
  return data[0]
}

// Make sure the deleteContact function is exported
export async function deleteContact(id: string) {
  // Implementation of deleteContact
}
