import { ContactForm } from '@/components/ContactForm'
import DashboardSidebar from '@/components/DashboardSidebar'

export default function AddContact() {
  return (
    <div className='flex h-[calc(100vh-64px)]'>
      <DashboardSidebar />
      <div className='flex-grow p-6 ml-64 overflow-y-auto'>
        <h1 className='text-2xl font-bold mb-6'>Add New Contact</h1>
        <ContactForm />
      </div>
    </div>
  )
}
