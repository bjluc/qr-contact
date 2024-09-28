import DashboardLayout from '@/components/DashboardLayout'
import { ContactList } from '@/components/ContactList'

export default function ContactListPage() {
  return (
    <DashboardLayout>
      <h1 className='text-2xl font-bold mb-4'>My Contacts</h1>
      <ContactList />
    </DashboardLayout>
  )
}
