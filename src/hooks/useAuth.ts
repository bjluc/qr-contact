import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
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
    lastName: string
  ) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    })
    if (error) throw error
    if (data.user) {
      await createProfile(data.user)
    }
    router.push('/dashboard')
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
    user,
    loading,
    login,
    signup,
    logout,
    resetPassword,
    createProfile, // Add this line
  }
}
