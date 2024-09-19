import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabaseClient'

interface UserProfile {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  qr_code: string
}

export default function UserProfile() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    async function fetchProfile() {
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (error) {
          console.error('Error fetching profile:', error)
        } else {
          setProfile(data)
        }
      }
    }

    fetchProfile()
  }, [user])

  if (!profile) {
    return <div>Loading...</div>
  }

  return (
    <div className='bg-white shadow rounded-lg p-6'>
      <h2 className='text-2xl font-bold mb-4'>Your Profile</h2>
      <div className='grid grid-cols-2 gap-4'>
        <div>
          <p>
            <strong>Name:</strong> {profile.first_name} {profile.last_name}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <strong>Phone:</strong> {profile.phone}
          </p>
        </div>
        <div className='flex justify-center items-center'>
          {profile.qr_code && (
            <Image
              src={profile.qr_code}
              alt='QR Code'
              width={200}
              height={200}
            />
          )}
        </div>
      </div>
    </div>
  )
}
