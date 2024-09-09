import React from 'react'

type LayoutProps = {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className='min-h-screen bg-background'>
      <main className='container mx-auto py-6 px-4'>{children}</main>
    </div>
  )
}
