'use client'

import { useAuth } from '@/context/AuthContext'
import AuthWrapper from '@/components/AuthWrapper'

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <AuthWrapper>
      <div className='space-y-4'>
        <h1 className='text-2xl font-bold'>Dashboard</h1>
        <p>Welcome, {user?.email}</p>
        {/* Your dashboard content */}
      </div>
    </AuthWrapper>
  )
}
