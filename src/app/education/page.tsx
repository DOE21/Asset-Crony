'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BookOpen, Shield, Building2, Users, TrendingUp, Coins, FileText, PlayCircle, ArrowRight } from 'lucide-react';

interface Topic {
  title: string;
  slug: string;
  summary: string;
  icon: React.ReactNode;
}

const topics: Topic[] = [
  {
    title: 'What is Fractional Real Estate Investing?',
    slug: 'fractional-investing',
    summary: 'Understand co-ownership, how shares work, and why it lowers entry barriers for investors.',
    icon: <Building2 className="h-6 w-6 text-gold" />
  },
  {
    title: 'How Asset Crony Works',
    slug: 'how-asset-crony-works',
    summary: 'Step-by-step guide to investing, trading on the secondary market, and P2P lending.',
    icon: <TrendingUp className="h-6 w-6 text-gold" />
  },
  {
    title: 'Understanding the Secondary Market',
    slug: 'secondary-market',
    summary: 'Learn how liquidity is enabled through buying and selling fractional shares.',
    icon: <Coins className="h-6 w-6 text-gold" />
  },
  {
    title: 'Peer-to-Peer Lending Explained',
    slug: 'p2p-lending-explained',
    summary: 'Use your fractional real estate shares as collateral for loans between investors.',
    icon: <Users className="h-6 w-6 text-gold" />
  },
  {
    title: 'Blockchain and Real Estate Transparency',
    slug: 'blockchain-transparency',
    summary: 'See how blockchain secures ownership records, audit trails, and platform integrity.',
    icon: <Shield className="h-6 w-6 text-gold" />
  },
  {
    title: 'Investor Safety and Compliance',
    slug: 'investor-safety',
    summary: 'Security practices, KYC/AML standards, and compliance considerations for investors.',
    icon: <Shield className="h-6 w-6 text-gold" />
  },
  {
    title: 'Tax Implications for Fractional Ownership',
    slug: 'tax-implications',
    summary: 'General guidance on taxation for dividends and capital gains. Not financial advice.',
    icon: <FileText className="h-6 w-6 text-gold" />
  },
  {
    title: 'Getting Started with Asset Crony',
    slug: 'getting-started',
    summary: 'Tips for first-time investors to explore assets, learn, and build a portfolio.',
    icon: <BookOpen className="h-6 w-6 text-gold" />
  }
];

export default function EducationPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header (simple) */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Building2 className="h-8 w-8 text-navy" />
            <span className="ml-2 text-xl font-display font-bold text-navy">Asset Crony</span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/assets" className="text-gray-600 hover:text-navy transition-colors">Assets</Link>
            <Link href="/secondary-market" className="text-gray-600 hover:text-navy transition-colors">Secondary Market</Link>
            <Link href="/p2p-lending" className="text-gray-600 hover:text-navy transition-colors">P2P Lending</Link>
            <Link href="/education" className="text-navy font-semibold">Education</Link>
            <Link href="/signup" className="bg-navy text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">Get Early Access</Link>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-navy mb-6">Learn Before You Invest</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Understand the fundamentals of fractional ownership, blockchain security, and peer-to-peer real estate lending.
            </p>
            <Link href="#topics" className="inline-flex items-center mt-8 bg-navy text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
              Start Learning
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Topics */}
      <section id="topics" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topics.map((t, idx) => (
              <motion.div
                key={t.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-3">
                  {t.icon}
                  <h3 className="ml-3 font-display font-semibold text-navy">{t.title}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">{t.summary}</p>
                <Link href={`/education/${t.slug}`} className="text-navy font-medium hover:underline inline-flex items-center">
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video & Resources */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-2xl font-display font-semibold text-navy mb-4">Watch & Learn</h2>
              <div className="aspect-video rounded-xl overflow-hidden bg-gray-200 flex items-center justify-center">
                <PlayCircle className="h-16 w-16 text-gray-500" />
              </div>
              <p className="text-gray-600 mt-4">
                A quick introduction to fractional real estate investing and how Asset Crony empowers investor access, liquidity, and transparency.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-display font-semibold text-navy mb-4">Guides & Downloads</h2>
              <div className="space-y-4">
                <Link href="/docs/prospectus-sample.pdf" target="_blank" className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
                  <span className="flex items-center text-navy font-medium">
                    <FileText className="h-5 w-5 mr-2 text-gold" /> Beginner’s Handbook to Real Estate Tokens (PDF)
                  </span>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </Link>
                <Link href="/assets" className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
                  <span className="flex items-center text-navy font-medium">
                    <Building2 className="h-5 w-5 mr-2 text-gold" /> Explore Live Properties
                  </span>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Ready to start your investment journey?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">Join the marketplace or browse tokenized properties to begin.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="bg-gold text-navy px-8 py-3 rounded-lg font-semibold hover:bg-light-gold transition-colors">Join the Marketplace</Link>
            <Link href="/assets" className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-navy transition-colors">View Properties</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
