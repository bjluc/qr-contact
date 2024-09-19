import { createClient } from '@/lib/supabaseClient'
import { generateContactQRCode } from '@/utils/qrCode'
import type { Contact as ImportedContact } from '@/types'

const supabase = createClient()

type Contact = {
  id: string
  user_id: string
  name: string
  company?: string
  phone?: string
  email?: string
  job_title?: string
  qr?: string
  location?: string
  contact_type?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export async function createContact(
  contactData: Omit<Contact, 'id' | 'created_at' | 'updated_at'>
): Promise<Contact> {
  let qr: string | null = null
  if (contactData.qr) {
    try {
      qr = await generateContactQRCode(JSON.stringify(contactData))
    } catch (error) {
      console.error('Failed to generate QR code:', error)
    }
  }

  const { data, error } = await supabase
    .from('contacts')
    .insert({ ...contactData, qr })
    .select()

  if (error) {
    console.error('Supabase insert error:', error)
    throw error
  }
  if (!data || data.length === 0)
    throw new Error('No data returned from insert')

  return data[0]
}

export async function getContact(contactId: string): Promise<Contact | null> {
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .eq('id', contactId)
    .single()

  if (error) throw error
  return data
}

export async function updateContact(
  contactId: string,
  updateData: Partial<Contact>
): Promise<Contact> {
  const { data, error } = await supabase
    .from('contacts')
    .update(updateData)
    .eq('id', contactId)
    .select()

  if (error) throw error
  if (!data || data.length === 0)
    throw new Error('No data returned from update')

  return data[0]
}

export async function deleteContact(contactId: string): Promise<void> {
  const { error } = await supabase.from('contacts').delete().eq('id', contactId)

  if (error) throw error
}

export async function listContacts(userId: string): Promise<Contact[]> {
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}
