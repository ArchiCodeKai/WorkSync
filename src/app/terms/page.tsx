'use client'

// This page can be statically generated
export const dynamic = 'auto'

import Link from 'next/link'
import { useLanguage } from '@/lib/hooks/useLanguage'

export default function TermsOfServicePage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-surface">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700">
            ← Back to WorkSync
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-foreground mb-8">Terms of Service</h1>
        
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-foreground-secondary mb-6">
            <strong>Last updated:</strong> {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
            <p className="text-foreground-secondary leading-relaxed">
              By accessing and using WorkSync ("Service"), you accept and agree to be bound by the 
              terms and provision of this agreement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Description of Service</h2>
            <p className="text-foreground-secondary leading-relaxed">
              WorkSync is a personal productivity application designed to help users track job applications, 
              manage mood entries, monitor pomodoro sessions, and organize learning progress.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. User Accounts</h2>
            <ul className="list-disc ml-6 text-foreground-secondary leading-relaxed space-y-2">
              <li>You are responsible for maintaining the security of your account</li>
              <li>You must provide accurate and complete information when creating an account</li>
              <li>You are responsible for all activities under your account</li>
              <li>You must notify us immediately of any unauthorized use</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Acceptable Use</h2>
            <p className="text-foreground-secondary leading-relaxed mb-4">
              You agree not to use the Service to:
            </p>
            <ul className="list-disc ml-6 text-foreground-secondary leading-relaxed space-y-2">
              <li>Violate any applicable laws or regulations</li>
              <li>Impersonate any person or entity</li>
              <li>Upload malicious code or attempt to compromise system security</li>
              <li>Interfere with other users' use of the Service</li>
              <li>Use the Service for commercial purposes without permission</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Data Ownership</h2>
            <p className="text-foreground-secondary leading-relaxed">
              You retain ownership of all data you input into WorkSync. We do not claim ownership 
              of your personal job tracking information, mood entries, or other user-generated content.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Privacy</h2>
            <p className="text-foreground-secondary leading-relaxed">
              Your privacy is important to us. Please review our{' '}
              <Link href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>{' '}
              to understand how we collect, use, and protect your information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Service Availability</h2>
            <p className="text-foreground-secondary leading-relaxed">
              We strive to maintain high availability but do not guarantee uninterrupted service. 
              We may temporarily suspend the Service for maintenance or updates with reasonable notice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Limitation of Liability</h2>
            <p className="text-foreground-secondary leading-relaxed">
              WorkSync is provided "as is" without warranties. We shall not be liable for any 
              indirect, incidental, special, or consequential damages arising from your use of the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">9. Termination</h2>
            <p className="text-foreground-secondary leading-relaxed">
              You may terminate your account at any time. We reserve the right to terminate accounts 
              that violate these terms. Upon termination, your data will be deleted according to our 
              data retention policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">10. Changes to Terms</h2>
            <p className="text-foreground-secondary leading-relaxed">
              We may modify these terms at any time. We will notify users of significant changes. 
              Continued use of the Service constitutes acceptance of modified terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">11. Contact Information</h2>
            <p className="text-foreground-secondary leading-relaxed">
              For questions about these Terms of Service, please contact us at:
            </p>
            <div className="mt-2 text-foreground-secondary">
              <p><strong>Email:</strong> support@worksync.app</p>
              <p><strong>Application:</strong> WorkSync Job Tracker</p>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-surface mt-12">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-foreground-secondary text-sm">
            © {new Date().getFullYear()} WorkSync. All rights reserved.
          </p>
          <div className="mt-2 space-x-4">
            <Link href="/" className="text-blue-600 hover:underline text-sm">
              Home
            </Link>
            <Link href="/terms" className="text-blue-600 hover:underline text-sm">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-blue-600 hover:underline text-sm">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}