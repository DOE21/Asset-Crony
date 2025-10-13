'use client';

import { motion } from 'framer-motion';
import { X, TrendingUp, TrendingDown } from 'lucide-react';
import { useState } from 'react';

interface TradingModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: {
    name: string;
    price: string;
    trend: string;
  };
}

export default function TradingModal({ isOpen, onClose, property }: TradingModalProps) {
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy');
  const [shares, setShares] = useState('');
  const [orderPrice, setOrderPrice] = useState(property.price);

  if (!isOpen) return null;

  return (
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
              <h2 className="text-xl font-display font-bold text-navy mb-1">Trade Tokens</h2>
              <p className="text-gray-600">{property.name}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Order Type Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
            <button
              onClick={() => setOrderType('buy')}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                orderType === 'buy'
                  ? 'bg-green-600 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <TrendingUp className="h-4 w-4 inline mr-2" />
              Buy
            </button>
            <button
              onClick={() => setOrderType('sell')}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                orderType === 'sell'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <TrendingDown className="h-4 w-4 inline mr-2" />
              Sell
            </button>
          </div>

          {/* Current Price */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Current Price</span>
              <div className="flex items-center">
                <span className="font-semibold text-navy">{property.price}</span>
                <span className={`ml-2 text-sm ${
                  property.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {property.trend === 'up' ? '+' : '-'}2.3%
                </span>
              </div>
            </div>
          </div>

          {/* Order Form */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Shares
              </label>
              <input
                type="number"
                value={shares}
                onChange={(e) => setShares(e.target.value)}
                placeholder="Enter number of shares"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Order Price (per share)
              </label>
              <input
                type="number"
                value={orderPrice}
                onChange={(e) => setOrderPrice(e.target.value)}
                placeholder="Enter price per share"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent"
              />
            </div>
          </div>

          {/* Order Summary */}
          {shares && orderPrice && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-navy mb-2">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Shares</span>
                  <span className="font-medium">{shares}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price per Share</span>
                  <span className="font-medium">${orderPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount</span>
                  <span className="font-medium">${(parseFloat(shares) * parseFloat(orderPrice)).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Trading Fee (0.5%)</span>
                  <span className="font-medium">${(parseFloat(shares) * parseFloat(orderPrice) * 0.005).toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Total Cost</span>
                  <span>${(parseFloat(shares) * parseFloat(orderPrice) * 1.005).toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              disabled={!shares || !orderPrice}
              className="flex-1 bg-navy text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {orderType === 'buy' ? 'Place Buy Order' : 'Place Sell Order'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

