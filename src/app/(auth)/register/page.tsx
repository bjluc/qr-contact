'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import RegisterForm from '@/components/RegisterForm'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function RegisterPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard')
    }
  }, [user, loading, router])

  if (loading) {
    return <LoadingSpinner />
  }

  if (user) {
    return null
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-100 pt-16'>
      {' '}
      {/* pt-16 accounts for navbar height */}
      <Card className='w-[350px] max-h-[calc(100vh-5rem)] overflow-y-auto'>
        {' '}
        {/* Adjust max height to account for navbar */}
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  )
}
