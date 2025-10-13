'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Building2, 
  ArrowLeft, 
  MapPin, 
  Search,
  Star
} from 'lucide-react';
import Link from 'next/link';

interface Asset {
  id: string;
  name: string;
  location: string;
  type: string;
  currentValue: number;
  yield: number;
  availability: number;
  totalShares: number;
  image: string;
  address: string;
  assetType: string;
  expectedROI: number;
  valuer: {
    name: string;
    reportDate: string;
    appraisedValue: number;
  };
  custodian: {
    institution: string;
    contact: string;
  };
  performance: {
    monthly: number[];
    quarterly: number[];
    yearly: number;
  };
}

const mockAssets: Asset[] = [
  {
    id: '1',
    name: 'Downtown Toronto Condo',
    location: 'Toronto, ON',
    type: 'Residential',
    currentValue: 850000,
    yield: 6.2,
    availability: 247,
    totalShares: 1000,
    image: '/api/placeholder/400/300',
    address: '123 King Street West, Toronto, ON M5H 1A1',
    assetType: 'Luxury Condominium',
    expectedROI: 8.5,
    valuer: {
      name: 'CBRE Valuation Services',
      reportDate: '2024-01-15',
      appraisedValue: 850000
    },
    custodian: {
      institution: 'Royal Trust Corporation',
      contact: 'trust@royaltrust.ca'
    },
    performance: {
      monthly: [5.8, 6.1, 6.0, 6.3, 6.2, 6.4, 6.1, 6.5, 6.2, 6.3, 6.4, 6.2],
      quarterly: [6.0, 6.2, 6.3, 6.2],
      yearly: 6.2
    }
  },
  {
    id: '2',
    name: 'Vancouver Waterfront House',
    location: 'Vancouver, BC',
    type: 'Residential',
    currentValue: 1200000,
    yield: 5.8,
    availability: 156,
    totalShares: 800,
    image: '/api/placeholder/400/300',
    address: '456 Marine Drive, Vancouver, BC V6B 1A1',
    assetType: 'Single Family Home',
    expectedROI: 7.2,
    valuer: {
      name: 'Colliers International',
      reportDate: '2024-02-20',
      appraisedValue: 1200000
    },
    custodian: {
      institution: 'BC Trust Services',
      contact: 'custody@bctrust.ca'
    },
    performance: {
      monthly: [5.5, 5.7, 5.6, 5.9, 5.8, 6.0, 5.7, 6.1, 5.8, 5.9, 6.0, 5.8],
      quarterly: [5.6, 5.9, 5.9, 5.8],
      yearly: 5.8
    }
  },
  {
    id: '3',
    name: 'Montreal Office Complex',
    location: 'Montreal, QC',
    type: 'Commercial',
    currentValue: 650000,
    yield: 7.1,
    availability: 89,
    totalShares: 500,
    image: '/api/placeholder/400/300',
    address: '789 Saint-Catherine Street, Montreal, QC H3B 1A1',
    assetType: 'Office Building',
    expectedROI: 9.1,
    valuer: {
      name: 'Cushman & Wakefield',
      reportDate: '2024-01-30',
      appraisedValue: 650000
    },
    custodian: {
      institution: 'Quebec Trust Ltd.',
      contact: 'services@quebectrust.ca'
    },
    performance: {
      monthly: [6.8, 7.0, 6.9, 7.2, 7.1, 7.3, 7.0, 7.4, 7.1, 7.2, 7.3, 7.1],
      quarterly: [6.9, 7.2, 7.2, 7.1],
      yearly: 7.1
    }
  },
  {
    id: '4',
    name: 'Calgary Retail Plaza',
    location: 'Calgary, AB',
    type: 'Commercial',
    currentValue: 950000,
    yield: 6.8,
    availability: 203,
    totalShares: 750,
    image: '/api/placeholder/400/300',
    address: '321 8th Avenue SW, Calgary, AB T2P 1A1',
    assetType: 'Retail Commercial',
    expectedROI: 8.8,
    valuer: {
      name: 'Avison Young',
      reportDate: '2024-02-10',
      appraisedValue: 950000
    },
    custodian: {
      institution: 'Alberta Trust Corp',
      contact: 'info@albertatrust.ca'
    },
    performance: {
      monthly: [6.5, 6.7, 6.6, 6.9, 6.8, 7.0, 6.7, 7.1, 6.8, 6.9, 7.0, 6.8],
      quarterly: [6.6, 6.9, 6.9, 6.8],
      yearly: 6.8
    }
  },
  {
    id: '5',
    name: 'Ottawa Mixed-Use Building',
    location: 'Ottawa, ON',
    type: 'Mixed-Use',
    currentValue: 750000,
    yield: 6.5,
    availability: 134,
    totalShares: 600,
    image: '/api/placeholder/400/300',
    address: '654 Bank Street, Ottawa, ON K1S 3T4',
    assetType: 'Mixed-Use Development',
    expectedROI: 8.5,
    valuer: {
      name: 'JLL Canada',
      reportDate: '2024-01-25',
      appraisedValue: 750000
    },
    custodian: {
      institution: 'Ontario Trust Services',
      contact: 'custody@ontariotrust.ca'
    },
    performance: {
      monthly: [6.2, 6.4, 6.3, 6.6, 6.5, 6.7, 6.4, 6.8, 6.5, 6.6, 6.7, 6.5],
      quarterly: [6.3, 6.6, 6.6, 6.5],
      yearly: 6.5
    }
  },
  {
    id: '6',
    name: 'Edmonton Industrial Warehouse',
    location: 'Edmonton, AB',
    type: 'Industrial',
    currentValue: 1100000,
    yield: 7.5,
    availability: 78,
    totalShares: 400,
    image: '/api/placeholder/400/300',
    address: '987 Industrial Boulevard, Edmonton, AB T6B 1A1',
    assetType: 'Industrial Warehouse',
    expectedROI: 9.5,
    valuer: {
      name: 'Knight Frank',
      reportDate: '2024-02-05',
      appraisedValue: 1100000
    },
    custodian: {
      institution: 'Prairie Trust Ltd.',
      contact: 'services@prairietrust.ca'
    },
    performance: {
      monthly: [7.2, 7.4, 7.3, 7.6, 7.5, 7.7, 7.4, 7.8, 7.5, 7.6, 7.7, 7.5],
      quarterly: [7.3, 7.6, 7.6, 7.5],
      yearly: 7.5
    }
  }
];

export default function AssetsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    category: '',
    yieldRange: ''
  });

  const filteredAssets = mockAssets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    
    if (filters.location && asset.location !== filters.location) return false;
    if (filters.category && asset.type !== filters.category) return false;
    if (filters.yieldRange) {
      const [min, max] = filters.yieldRange.split('-').map(Number);
      if (asset.yield < min || asset.yield > max) return false;
    }
    
    return true;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Residential': return 'bg-blue-100 text-blue-800';
      case 'Commercial': return 'bg-green-100 text-green-800';
      case 'Industrial': return 'bg-purple-100 text-purple-800';
      case 'Mixed-Use': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-navy mb-6">
              Explore Tokenized{' '}
              <span className="text-gold">Real Estate Assets</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover premium real estate investment opportunities across Canada. 
              Each asset is professionally valued, legally secured, and ready for fractional ownership.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search properties by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <select
                value={filters.location}
                onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent"
              >
                <option value="">All Locations</option>
                <option value="Toronto, ON">Toronto, ON</option>
                <option value="Vancouver, BC">Vancouver, BC</option>
                <option value="Montreal, QC">Montreal, QC</option>
                <option value="Calgary, AB">Calgary, AB</option>
                <option value="Ottawa, ON">Ottawa, ON</option>
                <option value="Edmonton, AB">Edmonton, AB</option>
              </select>

              <select
                value={filters.category}
                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent"
              >
                <option value="">All Categories</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Industrial">Industrial</option>
                <option value="Mixed-Use">Mixed-Use</option>
              </select>

              <select
                value={filters.yieldRange}
                onChange={(e) => setFilters(prev => ({ ...prev, yieldRange: e.target.value }))}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent"
              >
                <option value="">All Yields</option>
                <option value="5-6">5% - 6%</option>
                <option value="6-7">6% - 7%</option>
                <option value="7-8">7%+</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Asset Listings */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssets.map((asset, index) => (
              <motion.div
                key={asset.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                {/* Property Image */}
                <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <Building2 className="h-16 w-16 text-gray-400" />
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-display font-semibold text-navy mb-1">{asset.name}</h3>
                      <div className="flex items-center text-gray-600 text-sm">
                        <MapPin className="h-4 w-4 mr-1" />
                        {asset.location}
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(asset.type)}`}>
                      {asset.type}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Current Value</p>
                      <p className="font-semibold text-navy">${(asset.currentValue / 1000).toFixed(0)}K</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Annual Yield</p>
                      <p className="font-semibold text-green-600">{asset.yield}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Available Shares</p>
                      <p className="font-semibold text-navy">{asset.availability}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Expected ROI</p>
                      <p className="font-semibold text-gold">{asset.expectedROI}%</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <span>Total Shares: {asset.totalShares}</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span>4.8</span>
                    </div>
                  </div>

                  <Link
                    href={`/assets/${asset.id}`}
                    className="w-full bg-navy text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors text-center block"
                  >
                    View Asset
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredAssets.length === 0 && (
            <div className="text-center py-12">
              <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No assets found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
