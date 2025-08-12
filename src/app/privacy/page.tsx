'use client'

// This page can be statically generated
export const dynamic = 'auto'

import Link from 'next/link'
import { useLanguage } from '@/lib/hooks/useLanguage'

export default function PrivacyPolicyPage() {
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
        <h1 className="text-3xl font-bold text-foreground mb-8">Privacy Policy</h1>
        
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-foreground-secondary mb-6">
            <strong>Last updated:</strong> {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
            <p className="text-foreground-secondary leading-relaxed">
              Welcome to WorkSync ("we," "our," or "us"). This Privacy Policy explains how we collect, 
              use, disclose, and safeguard your information when you use our job search tracking application.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Information We Collect</h2>
            <div className="text-foreground-secondary leading-relaxed space-y-4">
              <h3 className="text-xl font-medium text-foreground">Account Information</h3>
              <ul className="list-disc ml-6">
                <li>Name and email address (from OAuth providers like Google, LinkedIn)</li>
                <li>Profile picture (if provided by OAuth provider)</li>
                <li>Basic profile information for authentication</li>
              </ul>
              
              <h3 className="text-xl font-medium text-foreground">Application Data</h3>
              <ul className="list-disc ml-6">
                <li>Job application records you create</li>
                <li>Mood tracking entries</li>
                <li>Pomodoro timer sessions</li>
                <li>Learning progress data</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. How We Use Your Information</h2>
            <ul className="list-disc ml-6 text-foreground-secondary leading-relaxed space-y-2">
              <li>To provide and maintain our service</li>
              <li>To authenticate and secure your account</li>
              <li>To store and organize your job search data</li>
              <li>To provide personalized features and analytics</li>
              <li>To improve our application and user experience</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Information Sharing</h2>
            <p className="text-foreground-secondary leading-relaxed">
              We do not sell, trade, or otherwise transfer your personal information to third parties. 
              Your data is stored securely and is only accessible to you through your authenticated account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Data Security</h2>
            <p className="text-foreground-secondary leading-relaxed">
              We implement appropriate security measures to protect your personal information against 
              unauthorized access, alteration, disclosure, or destruction. This includes secure 
              authentication via OAuth providers and encrypted data transmission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. OAuth Providers</h2>
            <p className="text-foreground-secondary leading-relaxed">
              We use OAuth authentication with third-party providers (Google, LinkedIn) to secure your login. 
              We only request the minimum necessary permissions and do not store your provider passwords. 
              Please refer to each provider's privacy policy for information about their data practices:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li><a href="https://policies.google.com/privacy" className="text-blue-600 hover:underline">Google Privacy Policy</a></li>
              <li><a href="https://www.linkedin.com/legal/privacy-policy" className="text-blue-600 hover:underline">LinkedIn Privacy Policy</a></li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Your Rights</h2>
            <ul className="list-disc ml-6 text-foreground-secondary leading-relaxed space-y-2">
              <li>Access your personal data</li>
              <li>Correct inaccurate information</li>
              <li>Delete your account and associated data</li>
              <li>Export your data</li>
              <li>Withdraw consent for data processing</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Data Retention</h2>
            <p className="text-foreground-secondary leading-relaxed">
              We retain your information for as long as your account is active or as needed to provide 
              services. You may delete your account at any time, which will remove all associated data 
              from our systems.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">9. Cookies and Tracking</h2>
            <p className="text-foreground-secondary leading-relaxed">
              We use essential cookies for authentication and session management. We do not use 
              third-party tracking cookies or analytics services that compromise your privacy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">10. Children's Privacy</h2>
            <p className="text-foreground-secondary leading-relaxed">
              WorkSync is not intended for users under 13 years of age. We do not knowingly collect 
              personal information from children under 13.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">11. Changes to Privacy Policy</h2>
            <p className="text-foreground-secondary leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify users of significant 
              changes by updating the "Last updated" date and, where appropriate, through the application.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">12. Contact Information</h2>
            <p className="text-foreground-secondary leading-relaxed">
              If you have questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <div className="mt-2 text-foreground-secondary">
              <p><strong>Email:</strong> privacy@worksync.app</p>
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
            <Link href="/privacy" className="text-blue-600 hover:underline text-sm">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}