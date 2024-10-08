export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className='container mx-auto py-10'>{children}</div>
}
