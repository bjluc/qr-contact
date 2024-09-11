'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import LoginForm from '@/components/LoginForm'
import LoadingSpinner from '@/components/LoadingSpinner'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function LoginPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  const handleSuccessfulLogin = useCallback(() => {
    router.push('/dashboard')
  }, [router])

  if (loading) {
    return <LoadingSpinner />
  }

  if (user) {
    router.push('/dashboard')
    return null
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-100 pt-16'>
      <Card className='w-[350px] max-h-[calc(100vh-5rem)] overflow-y-auto'>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm onSuccessfulLogin={handleSuccessfulLogin} />
        </CardContent>
      </Card>
    </div>
  )
}
