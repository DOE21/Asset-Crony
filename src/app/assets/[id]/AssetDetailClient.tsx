'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Building2, 
  ArrowLeft, 
  MapPin, 
  DollarSign, 
  TrendingUp, 
  Users,
  Download,
  Star,
  Shield
} from 'lucide-react';
import Link from 'next/link';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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

interface AssetDetailClientProps {
  asset: Asset;
}

export default function AssetDetailClient({ asset }: AssetDetailClientProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const chartData = asset.performance.monthly.map((value, index) => ({
    month: new Date(2024, index).toLocaleDateString('en-US', { month: 'short' }),
    yield: value
  }));

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
              href="/assets"
              className="flex items-center text-gray-600 hover:text-navy transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Assets
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <section className="relative h-96 bg-gradient-to-br from-gray-200 to-gray-300">
        <div className="absolute inset-0 flex items-center justify-center">
          <Building2 className="h-32 w-32 text-gray-400" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
              {asset.name}
            </h1>
            <div className="flex items-center text-gray-200">
              <MapPin className="h-5 w-5 mr-2" />
              {asset.address}
            </div>
          </div>
        </div>
      </section>

      {/* Summary Overview */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="lg:col-span-2">
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <DollarSign className="h-6 w-6 text-gold mr-3" />
                    <h3 className="text-lg font-display font-semibold text-navy">Current Value</h3>
                  </div>
                  <p className="text-3xl font-bold text-navy mb-2">${asset.currentValue.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Appraised by {asset.valuer.name}</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <TrendingUp className="h-6 w-6 text-green-600 mr-3" />
                    <h3 className="text-lg font-display font-semibold text-navy">Annual Yield</h3>
                  </div>
                  <p className="text-3xl font-bold text-green-600 mb-2">{asset.yield}%</p>
                  <p className="text-sm text-gray-600">Expected ROI: {asset.expectedROI}%</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <Users className="h-6 w-6 text-blue-600 mr-3" />
                    <h3 className="text-lg font-display font-semibold text-navy">Share Availability</h3>
                  </div>
                  <p className="text-3xl font-bold text-blue-600 mb-2">{asset.availability}</p>
                  <p className="text-sm text-gray-600">of {asset.totalShares} total shares</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <Building2 className="h-6 w-6 text-purple-600 mr-3" />
                    <h3 className="text-lg font-display font-semibold text-navy">Asset Type</h3>
                  </div>
                  <p className="text-xl font-bold text-purple-600 mb-2">{asset.assetType}</p>
                  <p className="text-sm text-gray-600">{asset.type} Property</p>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <nav className="flex space-x-8">
                  {[
                    { id: 'overview', label: 'Overview' },
                    { id: 'valuation', label: 'Valuation Report' },
                    { id: 'custodian', label: 'Custodian & Trustee' },
                    { id: 'performance', label: 'Performance & Dividends' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-2 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? 'border-navy text-navy'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="space-y-6">
                {activeTab === 'overview' && (
                  <div>
                    <h3 className="text-xl font-display font-semibold text-navy mb-4">Property Overview</h3>
                    <div className="prose prose-lg max-w-none">
                      <p className="text-gray-700 leading-relaxed mb-4">
                        This premium {asset.assetType.toLowerCase()} represents an exceptional investment opportunity 
                        in the heart of {asset.location}. The property has been professionally managed and maintained, 
                        offering stable rental income and strong appreciation potential.
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        With a current yield of {asset.yield}% and expected ROI of {asset.expectedROI}%, 
                        this asset provides an attractive balance of income generation and capital appreciation 
                        for fractional investors.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'valuation' && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-display font-semibold text-navy">Valuation Report</h3>
                      <button className="flex items-center text-navy hover:text-gray-800 transition-colors">
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </button>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Valuation Company</p>
                          <p className="font-semibold text-navy">{asset.valuer.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Report Date</p>
                          <p className="font-semibold text-navy">
                            {new Date(asset.valuer.reportDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Appraised Value</p>
                          <p className="font-semibold text-navy">${asset.valuer.appraisedValue.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Valuation Method</p>
                          <p className="font-semibold text-navy">Comparative Market Analysis</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'custodian' && (
                  <div>
                    <h3 className="text-xl font-display font-semibold text-navy mb-4">Custodian & Trustee</h3>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <div className="flex items-start">
                        <Shield className="h-8 w-8 text-gold mr-4 mt-1" />
                        <div>
                          <h4 className="font-semibold text-navy mb-2">{asset.custodian.institution}</h4>
                          <p className="text-gray-700 mb-4">
                            As the appointed custodian and trustee, {asset.custodian.institution} is responsible 
                            for holding legal title to the property and ensuring proper management of the asset 
                            on behalf of all fractional owners.
                          </p>
                          <div className="text-sm text-gray-600">
                            <p><strong>Contact:</strong> {asset.custodian.contact}</p>
                            <p><strong>Services:</strong> Title holding, property management oversight, dividend distribution</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'performance' && (
                  <div>
                    <h3 className="text-xl font-display font-semibold text-navy mb-4">Performance & Dividends</h3>
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h4 className="font-semibold text-navy mb-4">Monthly Yield Performance</h4>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip 
                              formatter={(value: number) => [`${value}%`, 'Yield']}
                              labelStyle={{ color: '#1e293b' }}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="yield" 
                              stroke="#f59e0b" 
                              strokeWidth={3}
                              dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-xl p-6 sticky top-8">
                <h3 className="text-lg font-display font-semibold text-navy mb-4">Investment Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price per Share</span>
                    <span className="font-semibold text-navy">
                      ${(asset.currentValue / asset.totalShares).toFixed(0)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Available Shares</span>
                    <span className="font-semibold text-navy">{asset.availability}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Minimum Investment</span>
                    <span className="font-semibold text-navy">$500</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Annual Yield</span>
                    <span className="font-semibold text-green-600">{asset.yield}%</span>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  <Star className="h-5 w-5 text-yellow-500 mr-2" />
                  <span className="text-sm text-gray-600">Rated 4.8/5 by investors</span>
                </div>

                <button className="w-full bg-navy text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors mb-4">
                  Buy Fraction
                </button>

                <button className="w-full border border-navy text-navy py-3 rounded-lg font-semibold hover:bg-navy hover:text-white transition-colors">
                  Add to Watchlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
