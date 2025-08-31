'use client'

import React, { useEffect } from 'react'
import Header from './header'
import Footer from './footer'
import { useUTMTracking } from '@/lib/utm-persistence'

interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  // 初始化UTM参数追踪
  useUTMTracking()
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 lg:pt-28">
        {children}
      </main>
      <Footer />
    </div>
  )
}