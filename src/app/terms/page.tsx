import { Building2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center">
              <Building2 className="h-8 w-8 text-navy" />
              <span className="ml-2 text-xl font-display font-bold text-navy">Asset Crony</span>
            </Link>
            
            <Link
              href="/"
              className="flex items-center text-gray-600 hover:text-navy transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Homepage
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-display font-bold text-navy mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <h2 className="text-xl font-display font-semibold text-navy mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-700 mb-6">
            By accessing and using Asset Crony&apos;s early access program, you accept and agree to be bound by the terms and provision of this agreement.
          </p>

          <h2 className="text-xl font-display font-semibold text-navy mb-4">2. Early Access Program</h2>
          <p className="text-gray-700 mb-6">
            The early access program is designed to provide interested users with information about our upcoming fractional real estate investment platform. Participation does not guarantee access to the final platform.
          </p>

          <h2 className="text-xl font-display font-semibold text-navy mb-4">3. User Information</h2>
          <p className="text-gray-700 mb-6">
            We collect personal information to provide updates about our platform launch and to understand our user base. All information is handled in accordance with our Privacy Policy.
          </p>

          <h2 className="text-xl font-display font-semibold text-navy mb-4">4. Investment Disclaimer</h2>
          <p className="text-gray-700 mb-6">
            Asset Crony is not currently a registered investment advisor or broker-dealer. Any information provided is for educational purposes only and should not be considered as investment advice.
          </p>

          <h2 className="text-xl font-display font-semibold text-navy mb-4">5. Limitation of Liability</h2>
          <p className="text-gray-700 mb-6">
            Asset Crony shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our early access program.
          </p>

          <h2 className="text-xl font-display font-semibold text-navy mb-4">6. Changes to Terms</h2>
          <p className="text-gray-700 mb-6">
            We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated revision date.
          </p>

          <h2 className="text-xl font-display font-semibold text-navy mb-4">7. Contact Information</h2>
          <p className="text-gray-700 mb-6">
            If you have any questions about these Terms of Service, please contact us at legal@assetcrony.com.
          </p>
        </div>
      </div>
    </div>
  );
}
