'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabaseClient'
import { toast } from 'react-toastify'
import DashboardLayout from '@/components/DashboardLayout'
import Link from 'next/link'

interface Contact {
  id: string
  name: string
  job_title: string
  email: string
  phone: string
  location: string
  notes: string
  type: 'personal' | 'business'
}

export default function ContactDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const [contact, setContact] = useState<Contact | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
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
        toast.error('Failed to load contact details.')
        setIsLoading(false)
      } else {
        setContact(data)
        setIsLoading(false)
      }
    }

    fetchContact()
  }, [id])

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this contact?')) {
      const supabase = createClient()
      const { error } = await supabase.from('contacts').delete().eq('id', id)

      if (error) {
        console.error('Error deleting contact:', error)
        toast.error('Failed to delete contact.')
      } else {
        toast.success('Contact deleted successfully.')
        router.push('/contacts')
      }
    }
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div>Loading...</div>
      </DashboardLayout>
    )
  }

  if (!contact) {
    return (
      <DashboardLayout>
        <div>Contact not found.</div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className='max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md'>
        <h1 className='text-3xl font-bold mb-4'>{contact.name}</h1>
        <div className='space-y-2'>
          <p>
            <strong>Job Title:</strong> {contact.job_title}
          </p>
          <p>
            <strong>Email:</strong> {contact.email}
          </p>
          <p>
            <strong>Phone:</strong> {contact.phone}
          </p>
          <p>
            <strong>Location:</strong> {contact.location}
          </p>
          <p>
            <strong>Notes:</strong> {contact.notes}
          </p>
          <p>
            <strong>Type:</strong> {contact.type}
          </p>
        </div>
        <div className='mt-6 space-x-4'>
          <Link
            href={`/contacts/${contact.id}/edit`}
            className='inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'
          >
            Edit Contact
          </Link>
          <button
            onClick={handleDelete}
            className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded'
          >
            Delete Contact
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
}
