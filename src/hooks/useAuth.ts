import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { generateQRCode } from '@/utils/qrCode'

interface AuthUser extends User {
  user_metadata: {
    first_name?: string
    // Add any other metadata fields you expect
  }
}

// Keep this as a named export
export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    getUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
    router.push('/dashboard')
  }

  const signup = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phone: string
  ) => {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password })
      if (error) throw error

      if (data.user) {
        const qrCode = await generateQRCode(data.user.id)
        const { error: profileError } = await supabase.from('profiles').insert([
          {
            id: data.user.id,
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone: phone,
            qr_code: qrCode,
          },
        ])

        if (profileError) throw profileError
      }

      return data
    } catch (error) {
      console.error('Signup error:', error)
      throw error
    }
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    router.push('/login')
  }

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email)
    if (error) throw error
  }

  const createProfile = async (user: User) => {
    try {
      const { error } = await supabase.from('profiles').upsert(
        {
          user_id: user.id,
          first_name: user.user_metadata.first_name,
          last_name: user.user_metadata.last_name,
          email: user.email,
        },
        { onConflict: 'user_id' }
      )
      if (error) throw error
    } catch (error) {
      console.error('Error creating profile:', error)
      throw error
    }
  }

  return {
    user: user as AuthUser | null,
    loading,
    login,
    signup,
    logout,
    resetPassword,
    createProfile,
  }
}
