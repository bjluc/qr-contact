'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { useAuth } from '@/context/AuthContext' // Add this import
import { User } from '@supabase/supabase-js'

export default function AuthCallback() {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const { createProfile } = useAuth() // Use createProfile from useAuth

  useEffect(() => {
    const handleAuthCallback = async () => {
      if (isProcessing) return
      setIsProcessing(true)

      const token = new URLSearchParams(window.location.search).get('token')

      if (token) {
        try {
          const { data, error } = await supabase.auth.verifyOtp({
            token_hash: token,
            type: 'signup',
          })

          if (error) throw error

          // Create profile after successful verification
          if (data.user) {
            await createProfile(data.user)
          }

          router.push('/dashboard')
        } catch (error) {
          console.error('Error during auth callback:', error)
          router.push('/login?error=Unable to verify your account')
        }
      } else {
        router.push('/login?error=Invalid verification link')
      }
    }

    handleAuthCallback()
  }, [router, createProfile])

  return <div>Verifying your account...</div>
}
