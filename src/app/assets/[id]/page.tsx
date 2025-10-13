import { Building2 } from 'lucide-react';
import Link from 'next/link';
import AssetDetailClient from './AssetDetailClient';

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
    image: '/api/placeholder/800/400',
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
    image: '/api/placeholder/800/400',
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
    image: '/api/placeholder/800/400',
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
  }
];

// Generate static params for all asset IDs
export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' }
  ];
}

export default async function AssetDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const asset = mockAssets.find(a => a.id === resolvedParams.id);

  if (!asset) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-semibold text-gray-600 mb-2">Asset Not Found</h1>
          <Link href="/assets" className="text-navy hover:underline">
            Return to Assets
          </Link>
        </div>
      </div>
    );
  }

  return <AssetDetailClient asset={asset} />;
}
