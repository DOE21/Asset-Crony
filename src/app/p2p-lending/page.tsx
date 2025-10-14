'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Building2, 
  ArrowLeft, 
  Shield, 
  X
} from 'lucide-react';
import Link from 'next/link';

interface Loan {
  id: string;
  borrowerName: string;
  propertyRef: string;
  loanAmount: number;
  interestRate: number;
  term: number;
  status: 'Active' | 'Fully Funded' | 'Closed';
  fundingProgress: number;
  fundedAmount: number;
  collateral: {
    name: string;
    valuation: number;
    location: string;
    type: string;
  };
  purpose: string;
  securityDescription: string;
  trusteeName: string;
  expectedReturns: number;
  repaymentSchedule: string;
}

const mockLoans: Loan[] = [
  {
    id: '1',
    borrowerName: 'Sarah Chen',
    propertyRef: 'TOR-CONDO-001',
    loanAmount: 15000,
    interestRate: 8.5,
    term: 12,
    status: 'Active',
    fundingProgress: 75,
    fundedAmount: 11250,
    collateral: {
      name: 'Downtown Toronto Condo',
      valuation: 850000,
      location: 'Toronto, ON',
      type: 'Residential Condo'
    },
    purpose: 'Property renovation and upgrade',
    securityDescription: 'Secured by 2.5% fractional ownership in premium downtown Toronto condominium',
    trusteeName: 'Royal Trust Corporation',
    expectedReturns: 8.5,
    repaymentSchedule: 'Monthly payments of $1,320'
  },
  {
    id: '2',
    borrowerName: 'Michael Rodriguez',
    propertyRef: 'VAN-HOUSE-002',
    loanAmount: 25000,
    interestRate: 7.8,
    term: 18,
    status: 'Active',
    fundingProgress: 45,
    fundedAmount: 11250,
    collateral: {
      name: 'Vancouver Waterfront House',
      valuation: 1200000,
      location: 'Vancouver, BC',
      type: 'Single Family Home'
    },
    purpose: 'Business expansion capital',
    securityDescription: 'Secured by 3.2% fractional ownership in luxury waterfront property',
    trusteeName: 'BC Trust Services',
    expectedReturns: 7.8,
    repaymentSchedule: 'Monthly payments of $1,850'
  },
  {
    id: '3',
    borrowerName: 'Jennifer Kim',
    propertyRef: 'MTL-OFFICE-003',
    loanAmount: 12000,
    interestRate: 9.2,
    term: 6,
    status: 'Fully Funded',
    fundingProgress: 100,
    fundedAmount: 12000,
    collateral: {
      name: 'Montreal Office Complex',
      valuation: 650000,
      location: 'Montreal, QC',
      type: 'Commercial Office'
    },
    purpose: 'Short-term working capital',
    securityDescription: 'Secured by 2.1% fractional ownership in commercial office building',
    trusteeName: 'Quebec Trust Ltd.',
    expectedReturns: 9.2,
    repaymentSchedule: 'Monthly payments of $2,100'
  },
  {
    id: '4',
    borrowerName: 'David Thompson',
    propertyRef: 'CAL-RETAIL-004',
    loanAmount: 20000,
    interestRate: 8.0,
    term: 24,
    status: 'Active',
    fundingProgress: 30,
    fundedAmount: 6000,
    collateral: {
      name: 'Calgary Retail Plaza',
      valuation: 950000,
      location: 'Calgary, AB',
      type: 'Retail Commercial'
    },
    purpose: 'Equipment purchase and inventory',
    securityDescription: 'Secured by 2.8% fractional ownership in retail commercial property',
    trusteeName: 'Alberta Trust Corp',
    expectedReturns: 8.0,
    repaymentSchedule: 'Monthly payments of $1,200'
  },
  {
    id: '5',
    borrowerName: 'Lisa Wang',
    propertyRef: 'OTT-MIXED-005',
    loanAmount: 18000,
    interestRate: 7.5,
    term: 15,
    status: 'Active',
    fundingProgress: 60,
    fundedAmount: 10800,
    collateral: {
      name: 'Ottawa Mixed-Use Building',
      valuation: 750000,
      location: 'Ottawa, ON',
      type: 'Mixed-Use Development'
    },
    purpose: 'Property maintenance and improvements',
    securityDescription: 'Secured by 2.4% fractional ownership in mixed-use development',
    trusteeName: 'Ontario Trust Services',
    expectedReturns: 7.5,
    repaymentSchedule: 'Monthly payments of $1,450'
  },
  {
    id: '6',
    borrowerName: 'Robert Singh',
    propertyRef: 'EDM-INDUSTRIAL-006',
    loanAmount: 30000,
    interestRate: 6.8,
    term: 36,
    status: 'Closed',
    fundingProgress: 100,
    fundedAmount: 30000,
    collateral: {
      name: 'Edmonton Industrial Warehouse',
      valuation: 1100000,
      location: 'Edmonton, AB',
      type: 'Industrial Warehouse'
    },
    purpose: 'Business acquisition financing',
    securityDescription: 'Secured by 3.5% fractional ownership in industrial warehouse facility',
    trusteeName: 'Prairie Trust Ltd.',
    expectedReturns: 6.8,
    repaymentSchedule: 'Monthly payments of $1,950'
  }
];

export default function P2PLendingPage() {
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [filters, setFilters] = useState({
    loanType: '',
    interestRate: '',
    duration: '',
    status: ''
  });

  const filteredLoans = mockLoans.filter(loan => {
    if (filters.status && loan.status !== filters.status) return false;
    if (filters.interestRate) {
      const [min, max] = filters.interestRate.split('-').map(Number);
      if (loan.interestRate < min || loan.interestRate > max) return false;
    }
    if (filters.duration) {
      const [min, max] = filters.duration.split('-').map(Number);
      if (loan.term < min || loan.term > max) return false;
    }
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-green-600 bg-green-100';
      case 'Fully Funded': return 'text-blue-600 bg-blue-100';
      case 'Closed': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
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
            
            <div className="flex items-center space-x-6">
              <Link
                href="/"
                className="flex items-center text-gray-600 hover:text-navy transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Homepage
              </Link>
              <Link
                href="/secondary-market"
                className="text-gray-600 hover:text-navy transition-colors"
              >
                Secondary Market
              </Link>
            </div>
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
              Earn Passive Income Through{' '}
              <span className="text-gold">Secured P2P Lending</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Invest in peer-to-peer loans secured by fractional real estate assets. 
              Earn competitive returns while supporting fellow investors with transparent, 
              blockchain-secured lending opportunities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Status:</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent"
              >
                <option value="">All Status</option>
                <option value="Active">Active</option>
                <option value="Fully Funded">Fully Funded</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Interest Rate:</label>
              <select
                value={filters.interestRate}
                onChange={(e) => setFilters(prev => ({ ...prev, interestRate: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent"
              >
                <option value="">All Rates</option>
                <option value="6-7">6% - 7%</option>
                <option value="7-8">7% - 8%</option>
                <option value="8-9">8% - 9%</option>
                <option value="9-10">9%+</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Duration:</label>
              <select
                value={filters.duration}
                onChange={(e) => setFilters(prev => ({ ...prev, duration: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent"
              >
                <option value="">All Terms</option>
                <option value="1-6">1-6 months</option>
                <option value="6-12">6-12 months</option>
                <option value="12-24">12-24 months</option>
                <option value="24-36">24+ months</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Loan Listings */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLoans.map((loan, index) => (
              <motion.div
                key={loan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-display font-semibold text-navy mb-1">{loan.borrowerName}</h3>
                    <p className="text-sm text-gray-600">{loan.propertyRef}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(loan.status)}`}>
                    {loan.status}
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Loan Amount</span>
                    <span className="font-semibold text-navy">${loan.loanAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Interest Rate</span>
                    <span className="font-semibold text-green-600">{loan.interestRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Term</span>
                    <span className="font-semibold text-navy">{loan.term} months</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Funding Progress</span>
                    <span>{loan.fundingProgress}% funded</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gold h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${loan.fundingProgress}%` }}
                    ></div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedLoan(loan)}
                  className="w-full bg-navy text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                >
                  View Details
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Loan Details Modal */}
      {selectedLoan && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-display font-bold text-navy mb-2">Loan Details</h2>
                  <p className="text-gray-600">Borrower: {selectedLoan.borrowerName}</p>
                </div>
                <button
                  onClick={() => setSelectedLoan(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Collateral Information */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-display font-semibold text-navy mb-3 flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-gold" />
                  Collateral Asset
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Property Name</p>
                    <p className="font-medium text-navy">{selectedLoan.collateral.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Valuation</p>
                    <p className="font-medium text-navy">${selectedLoan.collateral.valuation.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Location</p>
                    <p className="font-medium text-navy">{selectedLoan.collateral.location}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Type</p>
                    <p className="font-medium text-navy">{selectedLoan.collateral.type}</p>
                  </div>
                </div>
              </div>

              {/* Loan Terms */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-display font-semibold text-navy mb-3">Loan Terms</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount</span>
                      <span className="font-medium">${selectedLoan.loanAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Interest Rate</span>
                      <span className="font-medium text-green-600">{selectedLoan.interestRate}% APR</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Term</span>
                      <span className="font-medium">{selectedLoan.term} months</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Expected Returns</span>
                      <span className="font-medium text-green-600">{selectedLoan.expectedReturns}%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-display font-semibold text-navy mb-3">Security Details</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="text-gray-600">Purpose</p>
                      <p className="font-medium">{selectedLoan.purpose}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Trustee</p>
                      <p className="font-medium">{selectedLoan.trusteeName}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Repayment</p>
                      <p className="font-medium">{selectedLoan.repaymentSchedule}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Description */}
              <div className="mb-6">
                <h3 className="font-display font-semibold text-navy mb-2">Security Description</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{selectedLoan.securityDescription}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button className="flex-1 bg-navy text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                  Invest Now
                </button>
                <button
                  onClick={() => setSelectedLoan(null)}
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
