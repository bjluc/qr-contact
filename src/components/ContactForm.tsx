'use client'
import React from 'react'
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'react-toastify'
import { createContact, ContactData } from '@/lib/contacts'
import { useRouter } from 'next/navigation'
import { Contact } from '@/types'
// Update the ContactForm component definition
interface ContactFormProps {
  initialData?: Contact
  onSubmit?: (contact: Contact) => void
}

const ContactForm: React.FC<ContactFormProps> = ({ initialData, onSubmit }) => {
  const router = useRouter()
  const { user } = useAuth()
  const [name, setName] = useState(initialData?.name || '')
  const [jobTitle, setJobTitle] = useState(initialData?.job_title || '')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [location, setLocation] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [notes, setNotes] = useState('')
  const [contactType, setContactType] = useState<'personal' | 'business'>(
    'personal'
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast.error('You must be logged in to create a contact.')
      return
    }

    const contactData: Omit<ContactData, 'user_id'> = {
      name,
      job_title: jobTitle,
      phone,
      email,
      location,
      avatar_url: avatarUrl,
      notes,
      contact_type: contactType,
    }

    try {
      await createContact(contactData)
      toast.success('Contact added successfully!')
      // Reset form fields
      setName('')
      setJobTitle('')
      setPhone('')
      setEmail('')
      setLocation('')
      setAvatarUrl('')
      setNotes('')
      setContactType('personal')

      // Redirect to the contacts list page
      router.push('/contacts')
    } catch (error) {
      console.error('Error adding contact:', error)
      toast.error('Failed to add contact. Please try again.')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='w-full max-w-4xl mx-auto space-y-6'
    >
      <div className='space-y-4'>
        <div>
          <Label htmlFor='name'>Name</Label>
          <Input
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className='w-full mt-1'
          />
        </div>
        <div>
          <Label htmlFor='jobTitle'>Job Title</Label>
          <Input
            id='jobTitle'
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className='w-full mt-1'
          />
        </div>
        <div>
          <Label htmlFor='phone'>Phone</Label>
          <Input
            id='phone'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className='w-full mt-1'
          />
        </div>
        <div>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full mt-1'
          />
        </div>
        <div>
          <Label htmlFor='location'>Location</Label>
          <Input
            id='location'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className='w-full mt-1'
          />
        </div>
        <div>
          <Label htmlFor='avatarUrl'>Avatar URL</Label>
          <Input
            id='avatarUrl'
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            className='w-full mt-1'
          />
        </div>
        <div>
          <Label htmlFor='notes'>Notes</Label>
          <Textarea
            id='notes'
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className='w-full mt-1'
          />
        </div>
        <div>
          <Label htmlFor='contactType'>Contact Type</Label>
          <select
            id='contactType'
            value={contactType}
            onChange={(e) =>
              setContactType(e.target.value as 'personal' | 'business')
            }
            className='w-full p-2 border border-gray-300 rounded-md'
          >
            <option value='personal'>Personal</option>
            <option value='business'>Business</option>
          </select>
        </div>
        <button
          type='submit'
          className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
        >
          Add Contact
        </button>
      </div>
    </form>
  )
}

export default ContactForm
