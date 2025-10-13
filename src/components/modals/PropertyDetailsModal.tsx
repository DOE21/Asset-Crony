'use client';

import { motion } from 'framer-motion';
import { X, Building2, MapPin, TrendingUp, DollarSign, Calendar, Users } from 'lucide-react';

interface PropertyDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: {
    name: string;
    location: string;
    price: string;
    yield: string;
    volume: string;
    lastTraded: string;
    trend: string;
  };
}

export default function PropertyDetailsModal({ isOpen, onClose, property }: PropertyDetailsModalProps) {
  if (!isOpen) return null;

  return (
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
              <h2 className="text-2xl font-display font-bold text-navy mb-2">{property.name}</h2>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                {property.location}
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Property Image Placeholder */}
          <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-6 flex items-center justify-center">
            <Building2 className="h-16 w-16 text-gray-400" />
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <DollarSign className="h-6 w-6 text-gold mx-auto mb-2" />
              <p className="text-sm text-gray-600">Price per Share</p>
              <p className="font-semibold text-navy">{property.price}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <TrendingUp className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Annual Yield</p>
              <p className="font-semibold text-green-600">{property.yield}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <Calendar className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">24h Volume</p>
              <p className="font-semibold text-navy">{property.volume}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <Users className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Last Traded</p>
              <p className="font-semibold text-navy">{property.lastTraded}</p>
            </div>
          </div>

          {/* Property Details */}
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-display font-semibold text-navy">Property Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Property Type</p>
                <p className="font-medium text-navy">Residential Condo</p>
              </div>
              <div>
                <p className="text-gray-600">Total Shares</p>
                <p className="font-medium text-navy">1,000</p>
              </div>
              <div>
                <p className="text-gray-600">Available Shares</p>
                <p className="font-medium text-navy">247</p>
              </div>
              <div>
                <p className="text-gray-600">Market Cap</p>
                <p className="font-medium text-navy">$2.5M</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 bg-navy text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
              Buy Shares
            </button>
            <button className="flex-1 border border-navy text-navy py-3 rounded-lg font-semibold hover:bg-navy hover:text-white transition-colors">
              Add to Watchlist
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

