import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
  const users = [
    {
      id: 'u1',
      name: 'John Smith',
      email: 'john.smith@email.com',
      status: 'Active',
      dateJoined: '2024-01-15',
      portfolioValue: 25000,
      portfolioYield: 7.8,
      holdings: [
        { propertyId: 'AC-104', name: 'Toronto Duplex', shares: 10, value: 2500 },
        { propertyId: 'AC-203', name: 'Vancouver Waterfront', shares: 5, value: 5200 }
      ]
    },
    {
      id: 'u2',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      status: 'Active',
      dateJoined: '2024-02-03',
      portfolioValue: 18500,
      portfolioYield: 6.9,
      holdings: [
        { propertyId: 'AC-156', name: 'Montreal Office', shares: 8, value: 1800 }
      ]
    },
    {
      id: 'u3',
      name: 'Mike Chen',
      email: 'mike.chen@email.com',
      status: 'Suspended',
      dateJoined: '2024-01-28',
      portfolioValue: 12000,
      portfolioYield: 6.1,
      holdings: []
    }
  ];

  return NextResponse.json({ users });
}
