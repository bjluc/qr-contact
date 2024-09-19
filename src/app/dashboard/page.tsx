'use client'

import { useAuth } from '@/hooks/useAuth'
import DashboardSidebar from '@/components/DashboardSidebar'
import UserProfile from '@/components/UserProfile'

export default function Dashboard() {
  const { user } = useAuth()

  const firstName =
    user?.user_metadata?.first_name ?? user?.email?.split('@')[0] ?? 'User'

  return (
    <div className='flex h-[calc(100vh-64px)]'>
      <DashboardSidebar />
      <div className='flex-grow p-6 ml-64 overflow-y-auto'>
        <div className='space-y-8'>
          <h1 className='text-2xl font-bold'>Dashboard</h1>
          <p>Welcome, {firstName}!</p>
          <p>
            Use the sidebar to navigate to different sections of your dashboard.
          </p>
          <UserProfile />
        </div>
      </div>
    </div>
  )
}
