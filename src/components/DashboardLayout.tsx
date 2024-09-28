'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Home, UserPlus, Users } from 'lucide-react'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className='flex h-[calc(100vh-64px)] overflow-hidden'>
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 text-white transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className='flex items-center justify-between p-4 lg:hidden'>
          <button onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <nav className='mt-8'>
          <Link
            href='/dashboard'
            className='flex items-center px-4 py-2 hover:bg-gray-700'
          >
            <Home className='mr-3' size={20} /> Dashboard Home
          </Link>
          <Link
            href='/contacts/add'
            className='flex items-center px-4 py-2 hover:bg-gray-700'
          >
            <UserPlus className='mr-3' size={20} /> Add Contact
          </Link>
          <Link
            href='/contacts'
            className='flex items-center px-4 py-2 hover:bg-gray-700'
          >
            <Users className='mr-3' size={20} /> View Contacts
          </Link>
        </nav>
      </div>

      {/* Main content */}
      <div className='flex-1 overflow-x-hidden overflow-y-auto bg-gray-100'>
        <div className='p-6'>
          <button
            onClick={() => setSidebarOpen(true)}
            className='fixed top-20 left-4 z-20 lg:hidden bg-gray-800 text-white p-2 rounded-md'
          >
            <Menu size={24} />
          </button>
          {children}
        </div>
      </div>
    </div>
  )
}
