import { Building2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPage() {
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
        <h1 className="text-3xl font-display font-bold text-navy mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <h2 className="text-xl font-display font-semibold text-navy mb-4">1. Information We Collect</h2>
          <p className="text-gray-700 mb-4">
            We collect information you provide directly to us, such as when you:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
            <li>Sign up for our early access program</li>
            <li>Contact us for support</li>
            <li>Participate in surveys or feedback forms</li>
          </ul>

          <h2 className="text-xl font-display font-semibold text-navy mb-4">2. How We Use Your Information</h2>
          <p className="text-gray-700 mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
            <li>Provide updates about our platform launch</li>
            <li>Improve our services and user experience</li>
            <li>Send you relevant information about real estate investing</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2 className="text-xl font-display font-semibold text-navy mb-4">3. Information Sharing</h2>
          <p className="text-gray-700 mb-6">
            We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy or as required by law.
          </p>

          <h2 className="text-xl font-display font-semibold text-navy mb-4">4. Data Security</h2>
          <p className="text-gray-700 mb-6">
            We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </p>

          <h2 className="text-xl font-display font-semibold text-navy mb-4">5. Your Rights</h2>
          <p className="text-gray-700 mb-4">
            You have the right to:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of marketing communications</li>
          </ul>

          <h2 className="text-xl font-display font-semibold text-navy mb-4">6. Cookies and Tracking</h2>
          <p className="text-gray-700 mb-6">
            We use cookies and similar technologies to enhance your experience on our website and to analyze how our site is used.
          </p>

          <h2 className="text-xl font-display font-semibold text-navy mb-4">7. Changes to This Policy</h2>
          <p className="text-gray-700 mb-6">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
          </p>

          <h2 className="text-xl font-display font-semibold text-navy mb-4">8. Contact Us</h2>
          <p className="text-gray-700 mb-6">
            If you have any questions about this Privacy Policy, please contact us at privacy@assetcrony.com.
          </p>
        </div>
      </div>
    </div>
  );
}

