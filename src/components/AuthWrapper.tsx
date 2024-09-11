'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!loading) {
      const publicPaths = ['/login', '/register', '/check-email', '/']
      const isPublicPath = publicPaths.some((path) => pathname.startsWith(path))

      if (!user && !isPublicPath) {
        router.push('/login')
      } else if (user && (pathname === '/login' || pathname === '/register')) {
        router.push('/dashboard')
      }
    }
  }, [user, loading, router, pathname])

  if (loading) {
    return (
      <div className='flex justify-center items-center h-[calc(100vh-64px)]'>
        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900'></div>
      </div>
    )
  }

  return <>{children}</>
}
