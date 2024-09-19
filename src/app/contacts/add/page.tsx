import { ContactForm } from '@/components/ContactForm'
import DashboardSidebar from '@/components/DashboardSidebar'

export default function AddContactPage() {
  console.log('Contact creation file loaded')
  return (
    <div className='flex h-screen overflow-hidden'>
      <DashboardSidebar />
      <main className='flex-1 overflow-y-auto p-6'>
        <div className='max-w-4xl mx-auto'>
          <h1 className='text-2xl font-bold mb-6 text-center'>
            Add New Contact
          </h1>
          <ContactForm />
        </div>
      </main>
    </div>
  )
}
