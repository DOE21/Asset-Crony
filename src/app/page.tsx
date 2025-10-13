'use client';

import { motion } from 'framer-motion';
import { 
  Building2, 
  TrendingUp, 
  Users, 
  Shield, 
  Globe, 
  ArrowRight, 
  CheckCircle,
  BarChart3,
  DollarSign,
  ChevronRight,
  Linkedin,
  Twitter,
  Instagram,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

interface Property {
  name: string;
  location: string;
  price: string;
  yield: string;
  volume: string;
  lastTraded: string;
  trend: string;
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-navy" />
              <span className="ml-2 text-xl font-display font-bold text-navy">Asset Crony</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#how-it-works" className="text-gray-600 hover:text-navy transition-colors">How It Works</a>
              <a href="#why-asset-crony" className="text-gray-600 hover:text-navy transition-colors">Why Asset Crony</a>
              <Link href="/assets" className="text-gray-600 hover:text-navy transition-colors">Assets</Link>
              <Link href="/p2p-lending" className="text-gray-600 hover:text-navy transition-colors">P2P Lending</Link>
              <a href="#education" className="text-gray-600 hover:text-navy transition-colors">Education</a>
              <Link href="/signup" className="bg-navy text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors inline-block">
                Get Early Access
              </Link>
            </div>

            {/* Mobile menu button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-2 space-y-2">
              <a href="#how-it-works" className="block py-2 text-gray-600 hover:text-navy">How It Works</a>
              <a href="#why-asset-crony" className="block py-2 text-gray-600 hover:text-navy">Why Asset Crony</a>
              <Link href="/assets" className="block py-2 text-gray-600 hover:text-navy">Assets</Link>
              <Link href="/p2p-lending" className="block py-2 text-gray-600 hover:text-navy">P2P Lending</Link>
              <a href="#education" className="block py-2 text-gray-600 hover:text-navy">Education</a>
              <Link href="/signup" className="w-full bg-navy text-white px-6 py-2 rounded-lg mt-4 inline-block text-center">
                Get Early Access
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-display font-bold text-navy leading-tight">
                Own Real Estate.{' '}
                <span className="text-gold">Fraction by Fraction.</span>
              </h1>
              <p className="text-xl text-gray-600 mt-6 leading-relaxed">
                Invest, trade, or borrow — all on one transparent blockchain-powered platform. 
                Start from $500 and co-own premium real estate across Canada.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link href="/signup" className="bg-navy text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center">
                  Get Early Access
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <button className="border border-navy text-navy px-8 py-4 rounded-lg font-semibold hover:bg-navy hover:text-white transition-colors">
                  How It Works
                </button>
              </div>

              {/* Quick Access Cards */}
              <div className="grid md:grid-cols-2 gap-4 mt-12">
                <Link href="/assets" className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow group">
                  <div className="flex items-center mb-3">
                    <Building2 className="h-6 w-6 text-gold mr-3" />
                    <h3 className="font-display font-semibold text-navy group-hover:text-gold transition-colors">Explore Assets</h3>
                  </div>
                  <p className="text-gray-600 text-sm">Browse tokenized real estate properties available for fractional investment</p>
                </Link>
                
                <Link href="/p2p-lending" className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow group">
                  <div className="flex items-center mb-3">
                    <Users className="h-6 w-6 text-gold mr-3" />
                    <h3 className="font-display font-semibold text-navy group-hover:text-gold transition-colors">P2P Lending</h3>
                  </div>
                  <p className="text-gray-600 text-sm">Earn passive income through secured peer-to-peer lending opportunities</p>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              {/* Animated Property Tokens */}
              <div className="relative w-full h-96 bg-gradient-to-br from-navy to-gray-800 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent"></div>
                
                {/* Floating Property Tokens */}
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 2, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-8 left-8 bg-white rounded-lg p-4 shadow-lg"
                >
                  <Building2 className="h-6 w-6 text-gold" />
                  <div className="text-xs font-semibold text-navy mt-1">Toronto Condo</div>
                  <div className="text-xs text-gray-500">$2,500/share</div>
                </motion.div>

                <motion.div
                  animate={{ 
                    y: [0, 10, 0],
                    rotate: [0, -2, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                  className="absolute top-16 right-12 bg-white rounded-lg p-4 shadow-lg"
                >
                  <Building2 className="h-6 w-6 text-gold" />
                  <div className="text-xs font-semibold text-navy mt-1">Vancouver House</div>
                  <div className="text-xs text-gray-500">$5,200/share</div>
                </motion.div>

                <motion.div
                  animate={{ 
                    y: [0, -8, 0],
                    rotate: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }}
                  className="absolute bottom-20 left-16 bg-white rounded-lg p-4 shadow-lg"
                >
                  <Building2 className="h-6 w-6 text-gold" />
                  <div className="text-xs font-semibold text-navy mt-1">Montreal Office</div>
                  <div className="text-xs text-gray-500">$1,800/share</div>
                </motion.div>

                {/* Network Lines */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
                  <motion.line
                    x1="80" y1="80" x2="280" y2="100"
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 0.5 }}
                  />
                  <motion.line
                    x1="320" y1="120" x2="200" y2="200"
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 1 }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#fbbf24" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-navy mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three simple steps to start your fractional real estate investment journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Invest Fractionally",
                description: "Start from $500 and co-own real estate across Canada. Choose from carefully vetted properties with transparent valuations.",
                icon: DollarSign,
                color: "bg-gold"
              },
              {
                step: "02", 
                title: "Trade Instantly",
                description: "Access liquidity anytime through Asset Crony's secondary marketplace. Buy and sell shares 24/7 with real-time pricing.",
                icon: TrendingUp,
                color: "bg-navy"
              },
              {
                step: "03",
                title: "Borrow or Lend",
                description: "Use your shares as collateral for P2P loans instead of selling early. Earn interest by lending to other investors.",
                icon: Users,
                color: "bg-gold"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className={`${item.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-sm font-semibold text-gold mb-2">{item.step}</div>
                <h3 className="text-xl font-display font-semibold text-navy mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Asset Crony Section */}
      <section id="why-asset-crony" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-navy mb-4">
              Why Asset Crony
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built for the future of real estate investing with transparency, accessibility, and community at its core
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: DollarSign,
                title: "Lower Entry Barriers",
                description: "Start investing in premium real estate with as little as $500, making property ownership accessible to everyone."
              },
              {
                icon: TrendingUp,
                title: "Secondary Market Liquidity",
                description: "Trade your shares instantly on our 24/7 marketplace. No more waiting months to exit your investments."
              },
              {
                icon: Users,
                title: "Peer-to-Peer Lending",
                description: "Borrow against your holdings or earn interest by lending to other investors in our secure P2P network."
              },
              {
                icon: Shield,
                title: "Blockchain Security",
                description: "Every transaction is recorded on the blockchain, ensuring complete transparency and security for all investors."
              },
              {
                icon: Globe,
                title: "Community-Driven",
                description: "Join a community of like-minded investors sharing knowledge, opportunities, and success stories."
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-4">
                  <benefit.icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="text-lg font-display font-semibold text-navy mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Secondary Market Preview */}
      <section id="market" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-navy mb-4">
              Live Secondary Market
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See real-time trading activity and property performance across our marketplace
            </p>
          </motion.div>

          {/* Market Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {['All Properties', 'For Sale', 'For Lending'].map((filter) => (
              <button
                key={filter}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'All Properties' 
                    ? 'bg-navy text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Property Listings */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Downtown Toronto Condo",
                location: "Toronto, ON",
                price: "$2,500",
                yield: "6.2%",
                volume: "$45.2K",
                lastTraded: "2 min ago",
                trend: "up"
              },
              {
                name: "Vancouver Waterfront",
                location: "Vancouver, BC", 
                price: "$5,200",
                yield: "5.8%",
                volume: "$78.1K",
                lastTraded: "5 min ago",
                trend: "up"
              },
              {
                name: "Montreal Office Complex",
                location: "Montreal, QC",
                price: "$1,800",
                yield: "7.1%",
                volume: "$32.4K",
                lastTraded: "12 min ago",
                trend: "down"
              }
            ].map((property, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-display font-semibold text-navy mb-1">{property.name}</h3>
                    <p className="text-sm text-gray-500">{property.location}</p>
                  </div>
                  <div className={`flex items-center text-sm ${
                    property.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendingUp className={`h-4 w-4 mr-1 ${
                      property.trend === 'down' ? 'rotate-180' : ''
                    }`} />
                    {property.trend === 'up' ? '+' : '-'}2.3%
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Price per Share</p>
                    <p className="font-semibold text-navy">{property.price}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Annual Yield</p>
                    <p className="font-semibold text-green-600">{property.yield}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">24h Volume</p>
                    <p className="font-semibold text-navy">{property.volume}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last Traded</p>
                    <p className="font-semibold text-navy">{property.lastTraded}</p>
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedProperty(property)}
                  className="w-full bg-navy text-white py-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  View Details
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* P2P Lending Section */}
      <section id="p2p-lending" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-navy mb-6">
                Need liquidity without selling your shares?
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Borrow instantly against your holdings from verified investors. 
                Keep your real estate exposure while accessing cash for opportunities or emergencies.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">No credit checks required</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Competitive interest rates</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Instant approval process</span>
                </div>
              </div>
              <Link href="/signup" className="mt-8 bg-navy text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors inline-block">
                Apply for P2P Loan
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h3 className="text-xl font-display font-semibold text-navy mb-6">Sample Loan Listing</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Collateral Value</span>
                  <span className="font-semibold text-navy">$25,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Loan Amount</span>
                  <span className="font-semibold text-navy">$15,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Interest Rate</span>
                  <span className="font-semibold text-green-600">8.5% APR</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Term</span>
                  <span className="font-semibold text-navy">12 months</span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Funding Progress</span>
                  <span>75% funded</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gold h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-navy">$11,250</p>
                  <p className="text-sm text-gray-600">Funded</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-navy">$3,750</p>
                  <p className="text-sm text-gray-600">Remaining</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Investor Education Section */}
      <section id="education" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-navy mb-4">
              Learn Before You Invest
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Education is the foundation of smart investing. Access our comprehensive learning hub 
              to understand fractional ownership, blockchain security, and exit strategies.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: "Fractional Ownership Basics",
                description: "Learn how fractional real estate investing works and why it's revolutionizing property ownership.",
                duration: "5 min read"
              },
              {
                title: "Blockchain Security",
                description: "Understand how blockchain technology ensures transparency and security in every transaction.",
                duration: "7 min read"
              },
              {
                title: "Exit Strategies",
                description: "Explore your options for exiting investments through trading, lending, or traditional sales.",
                duration: "6 min read"
              }
            ].map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-gold" />
                </div>
                <h3 className="text-lg font-display font-semibold text-navy mb-3">{article.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{article.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{article.duration}</span>
                  <ChevronRight className="h-4 w-4 text-gold" />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <button className="bg-gold text-white px-8 py-4 rounded-lg font-semibold hover:bg-light-gold transition-colors">
              Explore Learning Hub
            </button>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-20 bg-gradient-to-br from-navy to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
              Join the Future of Real Estate Investing
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Be among the first to experience fractional real estate ownership with complete transparency, 
              instant liquidity, and community-driven investing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup" className="bg-gold text-white px-8 py-4 rounded-lg font-semibold hover:bg-light-gold transition-colors flex items-center justify-center">
                Join the Waitlist
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <button className="border border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-navy transition-colors">
                Schedule Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <Building2 className="h-8 w-8 text-gold" />
                <span className="ml-2 text-xl font-display font-bold">Asset Crony</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                The future of real estate investing is here. Own property fractionally, 
                trade instantly, and borrow against your holdings on our blockchain-powered platform.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                  <Linkedin className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                  <Instagram className="h-6 w-6" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-display font-semibold mb-4">Platform</h3>
              <ul className="space-y-2">
                <li><Link href="/assets" className="text-gray-400 hover:text-white transition-colors">Asset Listings</Link></li>
                <li><Link href="/p2p-lending" className="text-gray-400 hover:text-white transition-colors">P2P Lending</Link></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Secondary Market</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Portfolio Dashboard</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-display font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Education</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2024 Asset Crony. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</Link>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Regulatory Compliance</a>
              </div>
            </div>
            <p className="text-gray-500 text-xs mt-4">
              This platform is for informational purposes only. Real estate investments carry risks. 
              Please consult with financial advisors before making investment decisions.
            </p>
          </div>
        </div>
      </footer>

      {/* Property Details Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl max-w-md w-full"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-display font-bold text-navy mb-1">{selectedProperty.name}</h2>
                  <p className="text-gray-600">{selectedProperty.location}</p>
                </div>
                <button
                  onClick={() => setSelectedProperty(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Price per Share</span>
                  <span className="font-semibold text-navy">{selectedProperty.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Annual Yield</span>
                  <span className="font-semibold text-green-600">{selectedProperty.yield}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">24h Volume</span>
                  <span className="font-semibold text-navy">{selectedProperty.volume}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Traded</span>
                  <span className="font-semibold text-navy">{selectedProperty.lastTraded}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Link
                  href="/signup"
                  className="flex-1 bg-navy text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors text-center"
                >
                  Get Early Access
                </Link>
                <button
                  onClick={() => setSelectedProperty(null)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}