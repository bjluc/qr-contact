'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabaseClient'
import DashboardLayout from '@/components/DashboardLayout'
import ContactForm from '@/components/ContactForm'
import { toast } from 'react-toastify'

interface Contact {
  id: string
  name: string
  job_title: string
  email: string
  phone: string
  location: string
  notes: string
  contact_type: 'personal' | 'business'
}

export default function EditContactPage({
  params,
}: {
  params: { id: string }
}) {
  const [contact, setContact] = useState<Contact | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function fetchContact() {
      setLoading(true)
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('id', params.id)
        .single()

      if (error) {
        console.error('Error fetching contact:', error)
        toast.error('Failed to fetch contact details.')
        router.push('/contacts')
      } else {
        setContact(data)
      }
      setLoading(false)
    }

    fetchContact()
  }, [params.id, router, supabase])

  const handleSubmit = async (updatedContact: Partial<Contact>) => {
    try {
      const { error } = await supabase
        .from('contacts')
        .update(updatedContact)
        .eq('id', params.id)

      if (error) throw error

      toast.success('Contact updated successfully!')
      router.push(`/contacts/${params.id}`)
    } catch (error) {
      console.error('Error updating contact:', error)
      toast.error('Failed to update contact. Please try again.')
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className='flex-grow p-6 overflow-y-auto'>
          <h1 className='text-2xl font-bold mb-6'>Edit Contact</h1>
          <p>Loading contact details...</p>
        </div>
      </DashboardLayout>
    )
  }

  if (!contact) {
    return (
      <DashboardLayout>
        <div className='flex-grow p-6 overflow-y-auto'>
          <h1 className='text-2xl font-bold mb-6'>Edit Contact</h1>
          <p>No contact found with the given ID.</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className='flex-grow p-6 overflow-y-auto'>
        <h1 className='text-2xl font-bold mb-6'>Edit Contact</h1>
        <ContactForm
          initialData={{
            ...contact,
            user_id: '', // Add appropriate default value or fetch from context
            qr: '', // Changed from null to an empty string
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }}
          onSubmit={handleSubmit}
        />
      </div>
    </DashboardLayout>
  )
}
