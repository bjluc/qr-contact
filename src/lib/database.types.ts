export type Database = {
  public: {
    tables: {
      profiles: {
        // ... existing profile type ...
      }
      contacts: {
        Row: {
          id: string
          user_id: string
          name: string
          job_title: string | null
          phone: string | null
          email: string | null
          location: string | null
          avatar_url: string | null
          notes: string | null
          contact_type: 'personal' | 'business' | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          job_title?: string | null
          phone?: string | null
          email?: string | null
          location?: string | null
          avatar_url?: string | null
          notes?: string | null
          contact_type?: 'personal' | 'business' | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          job_title?: string | null
          phone?: string | null
          email?: string | null
          location?: string | null
          avatar_url?: string | null
          notes?: string | null
          contact_type?: 'personal' | 'business' | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
