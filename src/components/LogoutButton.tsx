'use client'
import { useAuth } from '@/context/AuthContext'

const LogoutButton: React.FC = () => {
  const { logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
      // Handle successful logout (e.g., redirect to login page)
    } catch (error) {
      console.error('Logout failed:', error)
      // Handle logout error
    }
  }

  return <button onClick={handleLogout}>Log Out</button>
}

export default LogoutButton
