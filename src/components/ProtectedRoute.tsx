'use client'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import LoadingSpinner from '@/components/LoadingSpinner'

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login') // Redirect to login page if not authenticated
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className='fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50'>
        <LoadingSpinner />
      </div>
    )
  }

  return user ? <>{children}</> : null
}

export default ProtectedRoute
