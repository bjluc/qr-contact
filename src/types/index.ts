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
  created_at: string
  updated_at: string
}
