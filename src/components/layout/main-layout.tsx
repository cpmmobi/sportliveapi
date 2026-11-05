'use client'

import React from 'react'
import Header from '@/components/site/header'
import Footer from '@/components/site/footer'
import { useUTMTracking } from '@/lib/utm-persistence'

interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  useUTMTracking()

  return (
    <div className="flex min-h-screen flex-col bg-brand-paper text-brand-ink">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
