'use client'

import { useAuth } from '@/hooks/useAuth'
import DashboardLayout from '@/components/DashboardLayout'
import UserProfile from '@/components/UserProfile'

export default function Dashboard() {
  const { user } = useAuth()

  const firstName =
    user?.user_metadata?.first_name ?? user?.email?.split('@')[0] ?? 'User'

  return (
    <DashboardLayout>
      <div className='space-y-8'>
        <h1 className='text-2xl font-bold'>Dashboard</h1>
        <p>Welcome, {firstName}!</p>
        <p>
          Use the sidebar to navigate to different sections of your dashboard.
        </p>
        <UserProfile />
      </div>
    </DashboardLayout>
  )
}
