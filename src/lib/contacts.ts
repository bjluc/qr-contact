import { createClient } from '@/lib/supabaseClient'
import { generateQRCode } from '@/utils/qrCode' // You'll need to implement this

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

export async function createContact(contactData: ContactData): Promise<void> {
  const supabase = createClient()
  try {
    // Generate QR code
    const qr = await generateQRCode(`${contactData.name}-${contactData.email}`)

    const { data, error } = await supabase.from('contacts').insert({
      ...contactData,
      qr,
    })

    if (error) throw error
  } catch (error) {
    console.error('Error creating contact:', error)
    throw error
  }
}
