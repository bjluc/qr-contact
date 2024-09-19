'use client'
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { createClient } from '@/lib/supabaseClient'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'react-toastify'

export function ContactForm() {
  const { user } = useAuth()
  const [name, setName] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [location, setLocation] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [notes, setNotes] = useState('')
  const [contactType, setContactType] = useState('personal')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()

    try {
      const { data, error } = await supabase.from('contacts').insert({
        user_id: user?.id,
        name,
        job_title: jobTitle,
        phone,
        email,
        location,
        avatar_url: avatarUrl,
        notes,
        contact_type: contactType,
      })

      if (error) throw error

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
            onChange={(e) => setContactType(e.target.value)}
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
