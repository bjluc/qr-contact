'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabaseClient'
import { useAuth } from '@/hooks/useAuth'
import { QRCodeSVG } from 'qrcode.react'
import Link from 'next/link'
import { Contact } from '@/types'

export function ContactList() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  useEffect(() => {
    const fetchContacts = async () => {
      if (!user) return
      const supabase = createClient()
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('user_id', user.id)

      if (error) {
        setError('Failed to fetch contacts')
        setIsLoading(false)
      } else {
        setContacts(data || [])
        setIsLoading(false)
      }
    }

    fetchContacts()
  }, [user])

  if (isLoading) return <p>Loading contacts...</p>
  if (error) return <p className='text-red-500'>{error}</p>

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
      {contacts.map((contact) => (
        <Link href={`/contacts/${contact.id}`} key={contact.id}>
          <div className='bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow'>
            <h2 className='text-xl font-semibold mb-4 text-center'>
              {contact.name}
            </h2>
            <div className='flex justify-center'>
              <QRCodeSVG
                value={`https://yourapp.com/contacts/${contact.id}`}
                size={128}
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
