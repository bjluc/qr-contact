'use client'

import React from 'react'
import ContactForm from '@/components/ContactForm'
import DashboardLayout from '@/components/DashboardLayout'
import { useRouter } from 'next/navigation'
import { createContact } from '@/lib/contacts'
import { toast } from 'react-toastify'

const AddContactPage: React.FC = () => {
  const router = useRouter()

  const handleSubmit = async (contactData: any) => {
    try {
      await createContact(contactData)
      toast.success('Contact added successfully!')
      router.push('/contacts')
    } catch (error) {
      console.error('Error adding contact:', error)
      toast.error('Failed to add contact. Please try again.')
    }
  }

  return (
    <DashboardLayout>
      <div className='flex-grow p-6 overflow-y-auto'>
        <h1 className='text-2xl font-bold mb-6'>Add New Contact</h1>
        <ContactForm onSubmit={handleSubmit} />
      </div>
    </DashboardLayout>
  )
}

export default AddContactPage
