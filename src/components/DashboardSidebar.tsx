'use client' // Add this line at the top of the file

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const DashboardSidebar = () => {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
      ? 'bg-gray-200 text-gray-900'
      : 'text-gray-600 hover:bg-gray-100'
  }

  return (
    <nav className='w-64 bg-white shadow-md fixed left-0 top-16 bottom-0 overflow-y-auto'>
      <ul className='space-y-2 py-4'>
        <li>
          <Link
            href='/dashboard'
            className={`block px-4 py-2 ${isActive('/dashboard')}`}
          >
            Dashboard Home
          </Link>
        </li>
        <li>
          <Link
            href='/contacts/add'
            className={`block px-4 py-2 ${isActive('/contacts/add')}`}
          >
            Add Contact
          </Link>
        </li>
        <li>
          <Link
            href='/contacts'
            className={`block px-4 py-2 ${isActive('/contacts')}`}
          >
            View Contacts
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default DashboardSidebar
