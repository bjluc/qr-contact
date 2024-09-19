'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { createClient } from '@/lib/supabaseClient'
import DashboardSidebar from '@/components/DashboardSidebar'

interface Contact {
  id: string
  name: string
  job_title: string | null
  phone: string | null
  email: string | null
  location: string | null
  avatar_url: string | null
  notes: string | null
  contact_type: 'personal' | 'business'
}

export default function ContactDetailPage() {
  const [contact, setContact] = useState<Contact | null>(null)
  const params = useParams()
  const { id } = params

  useEffect(() => {
    const fetchContact = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching contact:', error)
      } else {
        setContact(data)
      }
    }

    fetchContact()
  }, [id])

  if (!contact) {
    return <div>Loading...</div>
  }

  return (
    <div className='flex h-screen overflow-hidden'>
      <DashboardSidebar />
      <main className='flex-1 overflow-y-auto p-6'>
        <div className='max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md'>
          <h1 className='text-2xl font-bold mb-4'>{contact.name}</h1>
          {contact.job_title && (
            <p>
              <strong>Job Title:</strong> {contact.job_title}
            </p>
          )}
          {contact.email && (
            <p>
              <strong>Email:</strong> {contact.email}
            </p>
          )}
          {contact.phone && (
            <p>
              <strong>Phone:</strong> {contact.phone}
            </p>
          )}
          {contact.location && (
            <p>
              <strong>Location:</strong> {contact.location}
            </p>
          )}
          {contact.notes && (
            <p>
              <strong>Notes:</strong> {contact.notes}
            </p>
          )}
          <p>
            <strong>Type:</strong> {contact.contact_type}
          </p>
        </div>
      </main>
    </div>
  )
}
