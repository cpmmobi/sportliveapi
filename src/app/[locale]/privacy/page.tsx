import React from 'react'
import Link from 'next/link'
import MainLayout from '@/components/layout/main-layout'
import { useTranslations } from 'next-intl'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale
  
  if (locale === 'en') {
    return {
      title: 'Privacy Policy - SportLiveAPI',
      description: 'SportLiveAPI privacy policy, learn how we protect your personal information and data security',
    }
  }
  
  return {
    title: '隐私政策 - SportLiveAPI',
    description: 'SportLiveAPI隐私政策，了解我们如何保护您的个人信息和数据安全',
  }
}

export default function PrivacyPage() {
  const t = useTranslations('privacy')
  
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="space-section bg-gradient-to-br from-brand-secondary to-brand-primary text-white">
        <div className="container-custom text-center">
          <h1 className="text-responsive-h2 font-bold mb-6">Privacy Policy</h1>
          <p className="text-body-lg max-w-2xl mx-auto leading-relaxed">
            We are committed to protecting your privacy and personal information. This privacy policy explains how we collect, use, and protect your information.
          </p>
          <p className="text-body text-white/80 mt-4">Last Updated: August 2025</p>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="space-section bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-12">
          
            {/* Introduction */}
            <section>
              <h2 className="text-h3 font-bold text-brand-gray-800 mb-6">Introduction</h2>
              <p className="text-body text-brand-gray-400 leading-relaxed">
                SportLiveAPI is a company focused on sports streaming technology services. We are committed to protecting your privacy and personal information. This privacy policy explains how we collect, use, store, and protect your personal information when you use our services.
              </p>
            </section>

            {/* Data Collection */}
            <section>
              <h2 className="text-h3 font-bold text-brand-gray-800 mb-6">Information Collection</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-h4 font-semibold text-brand-gray-800 mb-3">Information You Provide</h3>
                  <ul className="list-disc list-inside text-body text-brand-gray-400 space-y-2 ml-4">
                    <li>Contact information (name, email address, phone number)</li>
                    <li>Business information (company name, industry, business requirements)</li>
                    <li>Technical requirements and use cases</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-h4 font-semibold text-brand-gray-800 mb-3">Automatically Collected Information</h3>
                  <ul className="list-disc list-inside text-body text-brand-gray-400 space-y-2 ml-4">
                    <li>Device information (IP address, browser type, operating system)</li>
                    <li>Usage data (page views, access times, feature usage)</li>
                    <li>Technical logs and performance data</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Data Usage */}
            <section>
              <h2 className="text-h3 font-bold text-brand-gray-800 mb-6">Information Usage</h2>
              <p className="text-body text-brand-gray-400 leading-relaxed mb-4">
                We use the collected information for the following purposes:
              </p>
              <ul className="list-disc list-inside text-body text-brand-gray-400 space-y-2 ml-4">
                <li>Provide and maintain our technical services</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Improve our services and develop new features</li>
                <li>Send service-related notifications and updates</li>
                <li>Comply with legal obligations and protect our rights</li>
                <li>Conduct data analysis to optimize service performance</li>
              </ul>
            </section>

            {/* Data Sharing */}
            <section>
              <h2 className="text-h3 font-bold text-brand-gray-800 mb-6">Information Sharing</h2>
              <p className="text-body text-brand-gray-400 leading-relaxed mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may only share your information in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-body text-brand-gray-400 space-y-2 ml-4">
                <li>With your explicit consent</li>
                <li>To comply with legal requirements or court orders</li>
                <li>To protect our rights, property, or safety</li>
                <li>With trusted service providers who assist us in operations (under strict confidentiality agreements)</li>
              </ul>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-h3 font-bold text-brand-gray-800 mb-6">Data Security</h2>
              <p className="text-body text-brand-gray-400 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. This includes encryption, access controls, regular security assessments, and employee data protection training.
              </p>
            </section>

            {/* User Rights */}
            <section>
              <h2 className="text-h3 font-bold text-brand-gray-800 mb-6">User Rights</h2>
              <p className="text-body text-brand-gray-400 leading-relaxed mb-4">
                You have the following rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside text-body text-brand-gray-400 space-y-2 ml-4">
                <li>Access right: Request access to your personal information we hold</li>
                <li>Correction right: Request correction of inaccurate or incomplete information</li>
                <li>Deletion right: Request deletion of your personal information</li>
                <li>Data portability right: Request transfer of your data to other service providers</li>
                <li>Objection right: Object to certain information processing activities</li>
              </ul>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-h3 font-bold text-brand-gray-800 mb-6">Cookies</h2>
              <p className="text-body text-brand-gray-400 leading-relaxed mb-4">
                We use cookies and similar technologies to enhance your experience on our website. Cookies help us:
              </p>
              <ul className="list-disc list-inside text-body text-brand-gray-400 space-y-2 ml-4">
                <li>Remember your preferences and settings</li>
                <li>Analyze website traffic and usage patterns</li>
                <li>Provide personalized content and recommendations</li>
                <li>Ensure website security and prevent fraud</li>
              </ul>
              <p className="text-body text-brand-gray-400 leading-relaxed mt-4">
                You can control cookie settings through your browser preferences. However, disabling certain cookies may affect website functionality.
              </p>
            </section>

            {/* Third Party Services */}
            <section>
              <h2 className="text-h3 font-bold text-brand-gray-800 mb-6">Third Party Services</h2>
              <p className="text-body text-brand-gray-400 leading-relaxed">
                Our website may contain links to third-party websites or services. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any personal information.
              </p>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="text-h3 font-bold text-brand-gray-800 mb-6">Children's Privacy</h2>
              <p className="text-body text-brand-gray-400 leading-relaxed">
                Our services are not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13. If we discover that we have collected such information, we will take immediate steps to delete it.
              </p>
            </section>

            {/* International Transfer */}
            <section>
              <h2 className="text-h3 font-bold text-brand-gray-800 mb-6">International Data Transfer</h2>
              <p className="text-body text-brand-gray-400 leading-relaxed">
                Your information may be transferred to and processed in countries other than your country of residence. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards to protect your information.
              </p>
            </section>

            {/* Policy Updates */}
            <section>
              <h2 className="text-h3 font-bold text-brand-gray-800 mb-6">Policy Updates</h2>
              <p className="text-body text-brand-gray-400 leading-relaxed">
                We may update this privacy policy from time to time. We will notify you of any significant changes by posting the new policy on our website and updating the "Last Updated" date. Your continued use of our services after such changes constitutes acceptance of the updated policy.
              </p>
            </section>

            {/* Contact Us */}
            <section>
              <h2 className="text-h3 font-bold text-brand-gray-800 mb-6">Contact Us</h2>
              <p className="text-body text-brand-gray-400 leading-relaxed mb-4">
                If you have any questions about this privacy policy or our data processing practices, please contact us:
              </p>
              <div className="bg-brand-gray-50 rounded-lg p-6">
                <p className="text-body text-brand-gray-400">
                  <strong className="text-brand-gray-800">SportLiveAPI Team</strong><br />
                  Email: business@sportliveapi.com<br />
                  Website: <Link href="/contact" className="text-brand-primary hover:text-brand-secondary underline">Contact Us Page</Link>
                </p>
              </div>
            </section>

          </div>
        </div>
      </section>
    </MainLayout>
  )
}