export interface Contact {
  id: string
  user_id: string
  name: string
  job_title: string
  phone: string
  email: string
  location: string
  avatar_url?: string
  notes?: string
  contact_type: 'personal' | 'business'
  qr: string // Add this line
  created_at: string
  updated_at: string
}

export interface Profile {
  id: string
  user_id: string
  username: string
  full_name?: string
  avatar_url?: string
  website?: string
  email?: string
  qr: string // Added the qr field
  created_at: string
  updated_at: string
}
