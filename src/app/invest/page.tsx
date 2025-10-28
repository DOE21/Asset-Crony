'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Building2,
  TrendingUp,
  PieChart,
  Plus,
  Settings,
  LogOut,
  Menu,
  X,
  Search,
  MapPin,
  Users,
  Eye,
  Star
} from 'lucide-react';

interface Property {
  id: string;
  propertyName: string;
  location: string;
  pricePerShare: number;
  yield: number;
  volume24h: number;
  status: 'For Sale' | 'Sold' | 'Pending';
  ownershipDistribution: number;
  description: string;
  totalShares: number;
  availableShares: number;
  imageUrl: string;
}

export default function InvestPage() {
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
    portfolioValue: number;
    portfolioYield: number;
    holdings: Array<{
      propertyId: string;
      name: string;
      shares: number;
      value: number;
      yield: number;
    }>;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('All');
  const [yieldFilter, setYieldFilter] = useState('All');
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [showInvestmentModal, setShowInvestmentModal] = useState(false);
  const router = useRouter();

  const fetchProperties = async () => {
    try {
      const res = await fetch('/api/market/listings', { cache: 'no-store' });
      if (!res.ok) return;
      const data = await res.json();
      // Add additional mock data for investment page
      const enhancedProperties = data.listings.map((prop: {
        id: string;
        propertyName: string;
        location: string;
        pricePerShare: number;
        yield: number;
        volume24h: number;
        status: string;
        ownershipDistribution: number;
      }) => ({
        ...prop,
        description: `Premium ${prop.propertyName.toLowerCase()} located in ${prop.location}. This property offers excellent rental income potential and strong appreciation prospects.`,
        totalShares: 1000,
        availableShares: Math.floor(Math.random() * 500) + 100,
        imageUrl: `/images/${prop.id.toLowerCase()}.jpg`
      }));
      setProperties(enhancedProperties);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    const userAuth = localStorage.getItem('userAuth');
    if (userAuth) {
      const userData = JSON.parse(userAuth);
      setUser(userData);
    } else {
      router.push('/login');
    }
    setIsLoading(false);
  }, [router]);

  useEffect(() => {
    if (!isLoading) {
      fetchProperties();
    }
  }, [isLoading]);

  const handleLogout = () => {
    localStorage.removeItem('userAuth');
    router.push('/');
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter === 'All' || property.location.includes(locationFilter);
    const matchesYield = yieldFilter === 'All' || 
      (yieldFilter === 'High' && property.yield >= 8) ||
      (yieldFilter === 'Medium' && property.yield >= 6 && property.yield < 8) ||
      (yieldFilter === 'Low' && property.yield < 6);
    return matchesSearch && matchesLocation && matchesYield;
  });

  const handleInvest = (property: Property) => {
    setSelectedProperty(property);
    setInvestmentAmount('');
    setShowInvestmentModal(true);
  };

  const handleInvestmentSubmit = () => {
    if (!selectedProperty || !investmentAmount || !user) return;
    
    const shares = Math.floor(parseInt(investmentAmount) / selectedProperty.pricePerShare);
    const totalCost = shares * selectedProperty.pricePerShare;
    
    // Update user portfolio
    const updatedUser = {
      ...user,
      portfolioValue: user.portfolioValue + totalCost,
      holdings: [
        ...user.holdings,
        {
          propertyId: selectedProperty.id,
          name: selectedProperty.propertyName,
          shares: shares,
          value: totalCost,
          yield: selectedProperty.yield
        }
      ]
    };
    
    localStorage.setItem('userAuth', JSON.stringify(updatedUser));
    setShowInvestmentModal(false);
    
    // Show success message
    alert(`Successfully invested $${totalCost.toLocaleString()} in ${selectedProperty.propertyName} (${shares} shares)`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Building2 className="h-12 w-12 text-navy mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">Loading properties...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Redirect handled by useEffect
  }

  const sidebarItems = [
    { name: 'Dashboard', icon: PieChart, href: '/dashboard', active: false },
    { name: 'Portfolio', icon: PieChart, href: '/portfolio', active: false },
    { name: 'Invest', icon: Plus, href: '/invest', active: true },
    { name: 'Secondary Market', icon: TrendingUp, href: '/secondary-market', active: false },
    { name: 'P2P Lending', icon: Users, href: '/p2p-lending', active: false },
    { name: 'Education', icon: Eye, href: '/education', active: false },
    { name: 'Settings', icon: Settings, href: '/settings', active: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center">
            <Building2 className="h-8 w-8 text-navy" />
            <span className="ml-2 text-xl font-display font-bold text-navy">Asset Crony</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  item.active
                    ? 'bg-navy text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </a>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Log Out
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden text-gray-500 hover:text-gray-600"
                >
                  <Menu className="h-6 w-6" />
                </button>
                <h1 className="ml-4 lg:ml-0 text-2xl font-display font-bold text-navy">
                  Invest in Properties
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">Portfolio: ${user.portfolioValue.toLocaleString()}</p>
                </div>
                <div className="h-8 w-8 bg-navy rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search properties by name or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent"
                >
                  <option value="All">All Locations</option>
                  <option value="Toronto">Toronto</option>
                  <option value="Vancouver">Vancouver</option>
                  <option value="Montreal">Montreal</option>
                  <option value="Houston">Houston</option>
                </select>
                <select
                  value={yieldFilter}
                  onChange={(e) => setYieldFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent"
                >
                  <option value="All">All Yields</option>
                  <option value="High">High (8%+)</option>
                  <option value="Medium">Medium (6-8%)</option>
                  <option value="Low">Low (&lt;6%)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="h-48 bg-gray-200 flex items-center justify-center relative">
                  <Building2 className="h-16 w-16 text-gray-400" />
                  <div className="absolute top-4 right-4">
                    <button className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50">
                      <Star className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-display font-semibold text-navy">{property.propertyName}</h3>
                      <p className="text-sm text-gray-600 flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {property.location}
                      </p>
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      property.status === 'For Sale' ? 'bg-green-100 text-green-800' :
                      property.status === 'Sold' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {property.status}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Price per Share:</span>
                      <span className="font-medium text-navy">${property.pricePerShare}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Yield:</span>
                      <span className="font-medium text-green-600">{property.yield}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Available Shares:</span>
                      <span className="font-medium text-navy">{property.availableShares}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Ownership:</span>
                      <span className="font-medium text-navy">{Math.round(property.ownershipDistribution * 100)}% sold</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{property.description}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <button className="text-navy hover:text-gray-800 transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                    <button 
                      onClick={() => handleInvest(property)}
                      className="bg-navy text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                    >
                      Invest Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProperties.length === 0 && (
            <div className="text-center py-12">
              <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria.</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setLocationFilter('All');
                  setYieldFilter('All');
                }}
                className="bg-navy text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Investment Modal */}
      {showInvestmentModal && selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-md w-full p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-display font-bold text-navy">Invest in {selectedProperty.propertyName}</h2>
              <button
                onClick={() => setShowInvestmentModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Price per Share:</span>
                  <span className="font-medium text-navy">${selectedProperty.pricePerShare}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Expected Yield:</span>
                  <span className="font-medium text-green-600">{selectedProperty.yield}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Available Shares:</span>
                  <span className="font-medium text-navy">{selectedProperty.availableShares}</span>
                </div>
              </div>

              <div>
                <label htmlFor="investmentAmount" className="block text-sm font-medium text-gray-700 mb-2">
                  Investment Amount ($)
                </label>
                <input
                  type="number"
                  id="investmentAmount"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent"
                  placeholder="Enter amount to invest"
                />
                {investmentAmount && (
                  <p className="text-sm text-gray-600 mt-2">
                    You&apos;ll receive {Math.floor(parseInt(investmentAmount) / selectedProperty.pricePerShare)} shares
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowInvestmentModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleInvestmentSubmit}
                disabled={!investmentAmount || parseInt(investmentAmount) < selectedProperty.pricePerShare}
                className="bg-navy text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Confirm Investment
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
