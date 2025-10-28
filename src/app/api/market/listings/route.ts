import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
  const listings = [
    {
      id: 'AC-104',
      propertyName: 'Toronto Duplex',
      location: 'Toronto, ON',
      pricePerShare: 57.4,
      yield: 8.2,
      volume24h: 12000,
      status: 'For Sale',
      ownershipDistribution: 0.45
    },
    {
      id: 'AC-089',
      propertyName: 'Houston Single Family',
      location: 'Houston, TX',
      pricePerShare: 43.1,
      yield: 7.6,
      volume24h: 9350,
      status: 'Pending',
      ownershipDistribution: 0.78
    },
    {
      id: 'AC-156',
      propertyName: 'Montreal Office',
      location: 'Montreal, QC',
      pricePerShare: 36.0,
      yield: 6.8,
      volume24h: 8240,
      status: 'Sold',
      ownershipDistribution: 1
    }
  ];

  return NextResponse.json({ listings });
}
