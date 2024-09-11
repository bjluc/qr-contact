import './globals.css'
import { AuthProvider } from '@/context/AuthContext'
import AuthWrapper from '@/components/AuthWrapper'
import Navbar from '@/components/Navbar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className='min-h-screen flex flex-col'>
        <AuthProvider>
          <Navbar />
          <main className='flex-grow container mx-auto px-4 py-8 mt-16'>
            <AuthWrapper>{children}</AuthWrapper>
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
