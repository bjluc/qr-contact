import './globals.css'
import { AuthProvider } from '@/context/AuthContext'
import Navbar from '@/components/Navbar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
          <main className='flex-grow pt-16 overflow-x-hidden'>
            {' '}
            {/* Added overflow-x-hidden */}
            {children}
          </main>
          <ToastContainer
            position='bottom-right'
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='light'
          />
        </AuthProvider>
      </body>
    </html>
  )
}
