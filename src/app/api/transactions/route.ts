import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
  const transactions = [
    { id: 'TXN-001', date: '2024-12-19T10:10:00Z', user: 'John Smith', property: 'Toronto Duplex #AC-104', type: 'Buy', amount: 2500, status: 'Completed', shares: 10 },
    { id: 'TXN-002', date: '2024-12-19T08:33:00Z', user: 'Sarah Johnson', property: 'Vancouver Waterfront #AC-203', type: 'Sell', amount: 5200, status: 'Completed', shares: 5 },
    { id: 'TXN-003', date: '2024-12-18T17:01:00Z', user: 'Mike Chen', property: 'Montreal Office #AC-156', type: 'Buy', amount: 1800, status: 'Pending', shares: 8 },
    { id: 'TXN-004', date: '2024-12-18T15:22:00Z', user: 'Emily Davis', property: 'Houston Single Family #AC-089', type: 'Buy', amount: 3200, status: 'Failed', shares: 12 }
  ];

  return NextResponse.json({ transactions });
}
