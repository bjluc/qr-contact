export type Database = {
  public: {
    tables: {
      profiles: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string
          created_at: string
        }
        Insert: {
          id: string
          first_name: string
          last_name: string
          email: string
          created_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          email?: string
          created_at?: string
        }
      }
      // ... other tables
    }
  }
}
