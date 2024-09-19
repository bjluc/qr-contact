'use client'

import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'

export default function Navbar() {
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
  }

  return (
    <nav className='fixed top-0 left-0 right-0 bg-gray-800 text-white p-4 z-10'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link href='/' className='text-xl font-bold'>
          Your Logo
        </Link>
        <div className='space-x-4'>
          <Link href='/' className='hover:text-gray-300'>
            Home
          </Link>
          {user ? (
            <>
              <Link href='/dashboard' className='hover:text-gray-300'>
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className='bg-red-500 hover:bg-red-600 px-3 py-1 rounded'
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href='/login' className='hover:text-gray-300'>
                Login
              </Link>
              <Link
                href='/register'
                className='bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded'
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
