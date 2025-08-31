'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { trackButtonClick } from '@/lib/analytics'
import { addUTMToLink } from '@/lib/utm-persistence'
import LanguageSwitcher from '@/components/language-switcher'
import { useTranslations } from 'next-intl'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  // 获取当前语言代码
  const currentLocale = pathname.split('/')[1] || 'zh'
  const t_nav = useTranslations('navigation')
  const t_common = useTranslations('common')
  
  // 构建导航项
  const navigation = [
    { name: t_nav('home'), href: '/' },
    { name: t_nav('services'), href: '/services' },
    { name: t_nav('faq'), href: '/faq' },
    { name: t_nav('about'), href: '/about' },
  ]
  
  // 构建带语言前缀的导航链接
  const localizedNavigation = navigation.map(item => ({
    ...item,
    href: `/${currentLocale}${item.href === '/' ? '' : item.href}`
  }))

  // 监听路由变化，关闭移动端菜单
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className={cn(
        'fixed top-4 left-4 right-4 z-50 transition-all duration-300 rounded-2xl',
        isScrolled 
          ? 'bg-white/90 backdrop-blur-xl shadow-xl border border-brand-gray-100/50' 
          : 'bg-white/10 backdrop-blur-md border border-white/20'
      )}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20 lg:h-24 px-2">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary via-brand-secondary to-brand-light flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-2xl font-bold text-brand-gray-800 group-hover:text-brand-primary transition-colors duration-300">
              Sport<span className="text-brand-primary">LiveAPI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {localizedNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'relative px-4 py-2 text-body font-medium transition-all duration-300 rounded-lg group',
                  pathname === item.href
                    ? 'text-brand-primary bg-brand-primary/10'
                    : 'text-brand-gray-600 hover:text-brand-primary hover:bg-brand-gray-50'
                )}
              >
                <span className="relative z-10">{item.name}</span>
                <div className={cn(
                  'absolute inset-0 rounded-lg transition-all duration-300',
                  pathname === item.href
                    ? 'bg-gradient-to-r from-brand-primary/10 to-brand-light/10 scale-100'
                    : 'bg-gradient-to-r from-brand-primary/5 to-brand-light/5 scale-0 group-hover:scale-100'
                )}></div>
              </Link>
            ))}
          </nav>

          {/* CTA Button & Language Switcher */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="accent" className="h-12 px-6" asChild>
              <Link 
                href={addUTMToLink(`/${currentLocale}/contact`)}
                onClick={() => trackButtonClick(t_common('get_quote'), 'header')}
              >
                {t_common('get_quote')}
              </Link>
            </Button>
            <LanguageSwitcher />
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-3 rounded-xl text-brand-gray-500 hover:text-brand-primary hover:bg-brand-gray-50 transition-all duration-300 hover:scale-105 active:scale-95"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="切换菜单"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-3 pt-3 pb-4 space-y-2 bg-white/90 backdrop-blur-xl rounded-2xl mt-3 shadow-2xl border border-brand-gray-100/50">
              {localizedNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'block px-4 py-3 rounded-xl text-body font-medium transition-all duration-300 relative group',
                    pathname === item.href
                      ? 'text-brand-primary bg-gradient-to-r from-brand-primary/10 to-brand-light/10'
                      : 'text-brand-gray-600 hover:text-brand-primary hover:bg-brand-gray-50'
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="relative z-10">{item.name}</span>
                  {pathname !== item.href && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-primary/5 to-brand-light/5 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                  )}
                </Link>
              ))}
              <div className="px-1 py-2">
                <Button variant="accent" className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300" asChild>
                  <Link 
                    href={addUTMToLink(`/${currentLocale}/contact`)} 
                    onClick={() => {
                      setIsMenuOpen(false)
                      trackButtonClick(t_common('get_quote'), 'mobile_menu')
                    }}
                  >
                    {t_common('get_quote')}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}