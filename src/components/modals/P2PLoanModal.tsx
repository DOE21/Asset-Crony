'use client';

import { motion } from 'framer-motion';
import { X, DollarSign, Calendar, Shield, TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface P2PLoanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function P2PLoanModal({ isOpen, onClose }: P2PLoanModalProps) {
  const [loanType, setLoanType] = useState<'borrow' | 'lend'>('borrow');
  const [amount, setAmount] = useState('');
  const [term, setTerm] = useState('12');
  const [interestRate, setInterestRate] = useState('8.5');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-display font-bold text-navy mb-1">P2P Lending</h2>
              <p className="text-gray-600">
                {loanType === 'borrow' ? 'Apply for a loan against your holdings' : 'Lend to other investors'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Loan Type Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
            <button
              onClick={() => setLoanType('borrow')}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                loanType === 'borrow'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <DollarSign className="h-4 w-4 inline mr-2" />
              Borrow
            </button>
            <button
              onClick={() => setLoanType('lend')}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                loanType === 'lend'
                  ? 'bg-green-600 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <TrendingUp className="h-4 w-4 inline mr-2" />
              Lend
            </button>
          </div>

          {loanType === 'borrow' ? (
            <>
              {/* Collateral Summary */}
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-navy mb-2">Your Collateral</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Holdings Value</span>
                    <span className="font-medium">$25,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Available for Loan</span>
                    <span className="font-medium">$15,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Loan-to-Value Ratio</span>
                    <span className="font-medium">60%</span>
                  </div>
                </div>
              </div>

              {/* Loan Application Form */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Amount
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter loan amount"
                    max="15000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">Maximum: $15,000</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Term (months)
                  </label>
                  <select
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent"
                  >
                    <option value="6">6 months</option>
                    <option value="12">12 months</option>
                    <option value="18">18 months</option>
                    <option value="24">24 months</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interest Rate (APR)
                  </label>
                  <input
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    placeholder="Enter desired interest rate"
                    step="0.1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Lending Opportunities */}
              <div className="space-y-4 mb-6">
                <h3 className="font-semibold text-navy">Available Lending Opportunities</h3>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-navy">Toronto Condo Loan</p>
                      <p className="text-sm text-gray-600">Collateral: $25,000</p>
                    </div>
                    <span className="text-green-600 font-semibold">8.5% APR</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Amount</p>
                      <p className="font-medium">$15,000</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Term</p>
                      <p className="font-medium">12 months</p>
                    </div>
                    <div>
                      <p className="text-gray-600">LTV</p>
                      <p className="font-medium">60%</p>
                    </div>
                  </div>
                  <button className="w-full mt-3 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
                    Lend Now
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Loan Summary */}
          {loanType === 'borrow' && amount && term && interestRate && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-navy mb-2">Loan Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Loan Amount</span>
                  <span className="font-medium">${amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Interest Rate</span>
                  <span className="font-medium">{interestRate}% APR</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Term</span>
                  <span className="font-medium">{term} months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Payment</span>
                  <span className="font-medium">
                    ${(parseFloat(amount) * (parseFloat(interestRate) / 100 / 12) * Math.pow(1 + parseFloat(interestRate) / 100 / 12, parseInt(term)) / (Math.pow(1 + parseFloat(interestRate) / 100 / 12, parseInt(term)) - 1)).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Interest</span>
                  <span className="font-medium">
                    ${(parseFloat(amount) * (parseFloat(interestRate) / 100 / 12) * Math.pow(1 + parseFloat(interestRate) / 100 / 12, parseInt(term)) / (Math.pow(1 + parseFloat(interestRate) / 100 / 12, parseInt(term)) - 1) * parseInt(term) - parseFloat(amount)).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Security Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <Shield className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-yellow-800 mb-1">Security Notice</p>
                <p className="text-yellow-700">
                  {loanType === 'borrow' 
                    ? 'Your property shares will be used as collateral. Default may result in liquidation.'
                    : 'Lending involves risk. Please review borrower profiles and collateral before investing.'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              disabled={loanType === 'borrow' && (!amount || !term || !interestRate)}
              className="flex-1 bg-navy text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {loanType === 'borrow' ? 'Apply for Loan' : 'Browse Opportunities'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

