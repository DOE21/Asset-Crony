'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Building2, 
  Search, 
  TrendingUp, 
  Users, 
  DollarSign,
  MapPin,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  Clock,
  RefreshCw
} from 'lucide-react';
import Link from 'next/link';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PropertyListing {
  id: string;
  propertyName: string;
  location: string;
  pricePerShare: string;
  yield: string;
  volume: string;
  status: 'For Sale' | 'Pending' | 'Sold';
  image: string;
  appreciation: string;
  totalShares: number;
  availableShares: number;
  marketCap: string;
  performance: { month: string; value: number }[];
}

const mockListings: PropertyListing[] = [
  {
    id: "AC-104",
    propertyName: "Toronto Duplex",
    location: "Toronto, ON",
    pricePerShare: "$57.40",
    yield: "8.2%",
    volume: "$12,000",
    status: "For Sale",
    image: "/images/toronto-duplex.jpg",
    appreciation: "+5.3%",
    totalShares: 1000,
    availableShares: 150,
    marketCap: "$57,400",
    performance: [
      { month: "Jan", value: 54.2 },
      { month: "Feb", value: 55.1 },
      { month: "Mar", value: 56.8 },
      { month: "Apr", value: 57.4 }
    ]
  },
  {
    id: "AC-089",
    propertyName: "Houston Single Family",
    location: "Houston, TX",
    pricePerShare: "$43.10",
    yield: "7.6%",
    volume: "$9,350",
    status: "Pending",
    image: "/images/houston-home.jpg",
    appreciation: "+3.8%",
    totalShares: 800,
    availableShares: 0,
    marketCap: "$34,480",
    performance: [
      { month: "Jan", value: 41.5 },
      { month: "Feb", value: 42.1 },
      { month: "Mar", value: 42.8 },
      { month: "Apr", value: 43.1 }
    ]
  },
  {
    id: "AC-156",
    propertyName: "Miami Condo Complex",
    location: "Miami, FL",
    pricePerShare: "$78.90",
    yield: "9.1%",
    volume: "$18,500",
    status: "For Sale",
    image: "/images/miami-condo.jpg",
    appreciation: "+7.2%",
    totalShares: 1200,
    availableShares: 200,
    marketCap: "$94,680",
    performance: [
      { month: "Jan", value: 73.6 },
      { month: "Feb", value: 75.2 },
      { month: "Mar", value: 77.1 },
      { month: "Apr", value: 78.9 }
    ]
  },
  {
    id: "AC-203",
    propertyName: "Vancouver Townhouse",
    location: "Vancouver, BC",
    pricePerShare: "$92.30",
    yield: "6.8%",
    volume: "$15,200",
    status: "Sold",
    image: "/images/vancouver-townhouse.jpg",
    appreciation: "+4.1%",
    totalShares: 900,
    availableShares: 0,
    marketCap: "$83,070",
    performance: [
      { month: "Jan", value: 88.7 },
      { month: "Feb", value: 89.8 },
      { month: "Mar", value: 91.2 },
      { month: "Apr", value: 92.3 }
    ]
  },
  {
    id: "AC-067",
    propertyName: "Austin Multi-Unit",
    location: "Austin, TX",
    pricePerShare: "$65.20",
    yield: "8.7%",
    volume: "$11,800",
    status: "For Sale",
    image: "/images/austin-multi.jpg",
    appreciation: "+6.5%",
    totalShares: 1100,
    availableShares: 180,
    marketCap: "$71,720",
    performance: [
      { month: "Jan", value: 61.2 },
      { month: "Feb", value: 62.8 },
      { month: "Mar", value: 64.1 },
      { month: "Apr", value: 65.2 }
    ]
  },
  {
    id: "AC-134",
    propertyName: "Calgary Office Building",
    location: "Calgary, AB",
    pricePerShare: "$45.60",
    yield: "7.9%",
    volume: "$8,900",
    status: "For Sale",
    image: "/images/calgary-office.jpg",
    appreciation: "+2.9%",
    totalShares: 750,
    availableShares: 120,
    marketCap: "$34,200",
    performance: [
      { month: "Jan", value: 44.3 },
      { month: "Feb", value: 44.8 },
      { month: "Mar", value: 45.2 },
      { month: "Apr", value: 45.6 }
    ]
  }
];

export default function SecondaryMarketPage() {
  const [selectedProperty, setSelectedProperty] = useState<PropertyListing | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredListings = mockListings.filter(listing => {
    const matchesSearch = listing.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter === 'All' || listing.location.includes(locationFilter);
    const matchesStatus = statusFilter === 'All' || listing.status === statusFilter;
    
    return matchesSearch && matchesLocation && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'For Sale':
        return <RefreshCw className="h-4 w-4 text-green-600" />;
      case 'Pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'Sold':
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'For Sale':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Sold':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Building2 className="h-8 w-8 text-navy" />
            <span className="ml-2 text-xl font-display font-bold text-navy">Asset Crony</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-navy transition-colors">Home</Link>
            <Link href="/assets" className="text-gray-600 hover:text-navy transition-colors">Assets</Link>
            <Link href="/p2p-lending" className="text-gray-600 hover:text-navy transition-colors">P2P Lending</Link>
            <Link href="/secondary-market" className="text-navy font-semibold">Secondary Market</Link>
            <Link href="/signup" className="bg-navy text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
              Get Early Access
            </Link>
          </div>
        </div>
      </nav>

      {/* Header Section */}
      <section className="pt-24 pb-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:text-navy transition-colors">Home</Link>
            <span>/</span>
            <span className="text-navy">Secondary Market</span>
          </nav>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-navy mb-4">
                Secondary Market
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl">
                Trade your fractional real estate shares seamlessly within the Asset Crony ecosystem.
              </p>
            </div>
            <button className="mt-6 md:mt-0 bg-navy text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center">
              List Your Shares
              <ArrowUpRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Market Overview */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-50 rounded-xl p-6"
            >
              <div className="flex items-center mb-3">
                <Building2 className="h-6 w-6 text-gold mr-3" />
                <h3 className="text-sm font-medium text-gray-600">Total Listings</h3>
              </div>
              <p className="text-2xl font-bold text-navy">142</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-50 rounded-xl p-6"
            >
              <div className="flex items-center mb-3">
                <DollarSign className="h-6 w-6 text-green-600 mr-3" />
                <h3 className="text-sm font-medium text-gray-600">Market Volume (24h)</h3>
              </div>
              <p className="text-2xl font-bold text-navy">$1.2M</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-50 rounded-xl p-6"
            >
              <div className="flex items-center mb-3">
                <TrendingUp className="h-6 w-6 text-blue-600 mr-3" />
                <h3 className="text-sm font-medium text-gray-600">Average Yield</h3>
              </div>
              <p className="text-2xl font-bold text-navy">8.5%</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-50 rounded-xl p-6"
            >
              <div className="flex items-center mb-3">
                <Users className="h-6 w-6 text-purple-600 mr-3" />
                <h3 className="text-sm font-medium text-gray-600">Active Investors</h3>
              </div>
              <p className="text-2xl font-bold text-navy">412</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search property or token ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-4">
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent"
              >
                <option value="All">All Locations</option>
                <option value="Toronto">Toronto</option>
                <option value="Houston">Houston</option>
                <option value="Miami">Miami</option>
                <option value="Vancouver">Vancouver</option>
                <option value="Austin">Austin</option>
                <option value="Calgary">Calgary</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent"
              >
                <option value="All">All Status</option>
                <option value="For Sale">For Sale</option>
                <option value="Pending">Pending</option>
                <option value="Sold">Sold</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Property Listings */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing, index) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedProperty(listing)}
              >
                <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <Building2 className="h-16 w-16 text-gray-400" />
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-display font-semibold text-navy mb-1">
                        {listing.propertyName}
                      </h3>
                      <p className="text-sm text-gray-600 flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {listing.location}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(listing.status)}`}>
                      {getStatusIcon(listing.status)}
                      <span className="ml-1">{listing.status}</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Price/Share</p>
                      <p className="font-semibold text-navy">{listing.pricePerShare}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Annual Yield</p>
                      <p className="font-semibold text-green-600">{listing.yield}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Volume (24h)</p>
                      <p className="font-semibold text-navy">{listing.volume}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Appreciation</p>
                      <p className="font-semibold text-green-600 flex items-center">
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                        {listing.appreciation}
                      </p>
                    </div>
                  </div>

                  <button className="w-full bg-navy text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Banner */}
      <section className="py-16 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Ready to trade your shares?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of investors who are already trading fractional real estate shares on Asset Crony.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="bg-gold text-navy px-8 py-3 rounded-lg font-semibold hover:bg-light-gold transition-colors">
              Join the Marketplace
            </Link>
            <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-navy transition-colors">
              Learn How It Works
            </button>
          </div>
        </div>
      </section>

      {/* Property Details Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-display font-bold text-navy mb-2">
                    {selectedProperty.propertyName}
                  </h2>
                  <p className="text-gray-600 flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {selectedProperty.location}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedProperty(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Property Info */}
                <div>
                  <div className="h-64 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center mb-6">
                    <Building2 className="h-20 w-20 text-gray-400" />
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price per Share</span>
                      <span className="font-semibold text-navy">{selectedProperty.pricePerShare}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Annual Yield</span>
                      <span className="font-semibold text-green-600">{selectedProperty.yield}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Market Cap</span>
                      <span className="font-semibold text-navy">{selectedProperty.marketCap}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Available Shares</span>
                      <span className="font-semibold text-navy">{selectedProperty.availableShares}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">12-Month Appreciation</span>
                      <span className="font-semibold text-green-600 flex items-center">
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                        {selectedProperty.appreciation}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Performance Chart */}
                <div>
                  <h3 className="text-lg font-display font-semibold text-navy mb-4">Performance History</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={selectedProperty.performance}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value: number) => [`$${value}`, 'Price']}
                          labelStyle={{ color: '#1e293b' }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#f59e0b" 
                          strokeWidth={3}
                          dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-8">
                <button className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center">
                  <ArrowUpRight className="h-5 w-5 mr-2" />
                  Buy Shares
                </button>
                <button className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center">
                  <ArrowDownRight className="h-5 w-5 mr-2" />
                  Sell Shares
                </button>
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
