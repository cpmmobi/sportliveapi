import React from 'react'
import MainLayout from '@/components/layout/main-layout'
import HeroSection from '@/components/home/hero-section'
import SportsSection from '@/components/home/sports-section'
import TeamSection from '@/components/home/team-section'
import LanguageDetector from '@/components/language-detector'

interface HomePageProps {
  params: {
    locale: string
  }
}

export default function HomePage({ params }: HomePageProps) {
  return (
    <MainLayout>
      {params.locale === 'en' && <LanguageDetector />}
      <HeroSection />
      <SportsSection />
      <TeamSection />
    </MainLayout>
  )
}