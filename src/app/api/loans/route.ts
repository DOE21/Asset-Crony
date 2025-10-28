import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
  const loans = [
    { id: 'LOAN-001', borrower: 'John Smith', collateral: 'Toronto Duplex #AC-104', amount: 15000, rate: 8.5, termMonths: 12, status: 'Pending', progress: 75, funded: 11250, remaining: 3750 },
    { id: 'LOAN-002', borrower: 'Sarah Johnson', collateral: 'Vancouver Waterfront #AC-203', amount: 25000, rate: 7.2, termMonths: 18, status: 'Approved', progress: 100, funded: 25000, remaining: 0 },
    { id: 'LOAN-003', borrower: 'Mike Chen', collateral: 'Montreal Office #AC-156', amount: 12000, rate: 9.1, termMonths: 6, status: 'Active', progress: 100, funded: 12000, remaining: 0 },
    { id: 'LOAN-004', borrower: 'Emily Davis', collateral: 'Houston Single Family #AC-089', amount: 8500, rate: 6.8, termMonths: 24, status: 'Rejected', progress: 0, funded: 0, remaining: 8500 },
    { id: 'LOAN-005', borrower: 'Robert Wilson', collateral: 'Toronto Duplex #AC-104', amount: 20000, rate: 7.8, termMonths: 15, status: 'Completed', progress: 100, funded: 20000, remaining: 0 }
  ];

  return NextResponse.json({ loans });
}
