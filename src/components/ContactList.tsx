'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabaseClient'
import { useAuth } from '@/hooks/useAuth'
import { QRCodeSVG } from 'qrcode.react'
import { toast } from 'react-toastify'
import { deleteContact } from '@/lib/contacts'
import { Contact } from '@/types'

export function ContactList() {
  const { user } = useAuth()
  const [contacts, setContacts] = useState<Contact[]>([])

  useEffect(() => {
    const fetchContacts = async () => {
      if (user) {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('contacts')
          .select('*')
          .eq('user_id', user.id)
          .order('name', { ascending: true })

        if (error) {
          console.error('Error fetching contacts:', error)
          toast.error('Failed to fetch contacts. Please try again.')
        } else {
          setContacts(data || [])
        }
      }
    }

    fetchContacts()
  }, [user])

  const generateQRValue = (contactId: string) => {
    // This should be the URL to your contact detail page
    return `${window.location.origin}/contacts/${contactId}`
  }

  const handleDelete = async (contactId: string) => {
    try {
      await deleteContact(contactId)
      setContacts(contacts.filter((contact) => contact.id !== contactId))
      toast.success('Contact deleted successfully!')
    } catch (error) {
      console.error('Error deleting contact:', error)
      toast.error('Failed to delete contact. Please try again.')
    }
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className='bg-white rounded-lg shadow-md overflow-hidden'
        >
          <div className='p-6'>
            <div className='flex items-center mb-4'>
              {contact.avatar_url ? (
                <img
                  src={contact.avatar_url}
                  alt={`${contact.name}'s avatar`}
                  className='w-16 h-16 rounded-full mr-4'
                />
              ) : (
                <div className='w-16 h-16 rounded-full bg-gray-200 mr-4 flex items-center justify-center'>
                  <span className='text-2xl text-gray-600'>
                    {contact.name.charAt(0)}
                  </span>
                </div>
              )}
              <div>
                <h3 className='text-xl font-semibold'>{contact.name}</h3>
                {contact.job_title && (
                  <p className='text-gray-600'>{contact.job_title}</p>
                )}
              </div>
            </div>
            {contact.email && (
              <p className='mb-2'>
                <span className='font-semibold'>Email:</span> {contact.email}
              </p>
            )}
            {contact.phone && (
              <p className='mb-2'>
                <span className='font-semibold'>Phone:</span> {contact.phone}
              </p>
            )}
            {contact.location && (
              <p className='mb-2'>
                <span className='font-semibold'>Location:</span>{' '}
                {contact.location}
              </p>
            )}
            {contact.notes && (
              <p className='mb-2'>
                <span className='font-semibold'>Notes:</span> {contact.notes}
              </p>
            )}
            <p className='mb-2'>
              <span className='font-semibold'>Type:</span>{' '}
              {contact.contact_type}
            </p>
            <div className='mt-4'>
              <p className='font-semibold mb-2'>Contact QR Code:</p>
              <QRCodeSVG value={generateQRValue(contact.id)} size={128} />
            </div>
            <button
              onClick={() => handleDelete(contact.id)}
              className='mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded'
            >
              Delete Contact
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
