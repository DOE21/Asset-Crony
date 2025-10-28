'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Building2,
  TrendingUp,
  DollarSign,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Settings,
  LogOut,
  Menu,
  X,
  Plus,
  BarChart3,
  Users,
  Bell
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  portfolioValue: number;
  portfolioYield: number;
  holdings: Array<{
    propertyId: string;
    name: string;
    shares: number;
    value: number;
    yield: number;
  }>;
  dateJoined: string;
}

export default function UserDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userAuth = localStorage.getItem('userAuth');
    if (userAuth) {
      const userData = JSON.parse(userAuth);
      setUser(userData);
    } else {
      router.push('/login');
    }
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('userAuth');
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Building2 className="h-12 w-12 text-navy mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Redirect handled by useEffect
  }

  const sidebarItems = [
    { name: 'Dashboard', icon: BarChart3, href: '/dashboard', active: true },
    { name: 'Portfolio', icon: PieChart, href: '/portfolio', active: false },
    { name: 'Invest', icon: Plus, href: '/invest', active: false },
    { name: 'Secondary Market', icon: TrendingUp, href: '/secondary-market', active: false },
    { name: 'P2P Lending', icon: Users, href: '/p2p-lending', active: false },
    { name: 'Education', icon: Eye, href: '/education', active: false },
    { name: 'Settings', icon: Settings, href: '/settings', active: false },
  ];

  const mockStats = [
    {
      title: 'Total Portfolio Value',
      value: `$${user.portfolioValue.toLocaleString()}`,
      change: '+12.5%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      title: 'Average Yield',
      value: `${user.portfolioYield}%`,
      change: '+0.8%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'bg-blue-500'
    },
    {
      title: 'Properties Owned',
      value: user.holdings.length.toString(),
      change: '+2',
      changeType: 'positive',
      icon: Building2,
      color: 'bg-purple-500'
    },
    {
      title: 'Active Investments',
      value: '3',
      change: 'Stable',
      changeType: 'neutral',
      icon: PieChart,
      color: 'bg-yellow-500'
    }
  ];

  const recentTransactions = [
    { id: 'TXN-001', property: 'Toronto Duplex', type: 'Buy', amount: 2500, date: '2024-12-19', shares: 10 },
    { id: 'TXN-002', property: 'Vancouver Waterfront', type: 'Sell', amount: 5200, date: '2024-12-18', shares: 5 },
    { id: 'TXN-003', property: 'Montreal Office', type: 'Buy', amount: 1800, date: '2024-12-17', shares: 8 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center">
            <Building2 className="h-8 w-8 text-navy" />
            <span className="ml-2 text-xl font-display font-bold text-navy">Asset Crony</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  item.active
                    ? 'bg-navy text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </a>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Log Out
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden text-gray-500 hover:text-gray-600"
                >
                  <Menu className="h-6 w-6" />
                </button>
                <div className="ml-4 lg:ml-0">
                  <h1 className="text-2xl font-display font-bold text-navy">
                    Welcome back, {user.name.split(' ')[0]}! 👋
                  </h1>
                  <p className="text-sm text-gray-600">Here&apos;s your portfolio overview</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="relative p-2 text-gray-400 hover:text-gray-600">
                  <Bell className="h-6 w-6" />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <div className="h-8 w-8 bg-navy rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {mockStats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className={`flex items-center text-sm ${
                    stat.changeType === 'positive' ? 'text-green-600' : 
                    stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {stat.changeType === 'positive' && <ArrowUpRight className="h-4 w-4 mr-1" />}
                    {stat.changeType === 'negative' && <ArrowDownRight className="h-4 w-4 mr-1" />}
                    {stat.change}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-navy mt-1">{stat.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Portfolio Holdings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-bold text-navy">Your Holdings</h2>
                <Link href="/portfolio" className="text-navy hover:text-gray-800 text-sm font-medium">
                  View All
                </Link>
              </div>
              
              {user.holdings.length > 0 ? (
                <div className="space-y-4">
                  {user.holdings.map((holding, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-navy rounded-lg flex items-center justify-center mr-3">
                          <Building2 className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium text-navy">{holding.name}</h3>
                          <p className="text-sm text-gray-600">{holding.shares} shares</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-navy">${holding.value.toLocaleString()}</p>
                        <p className="text-sm text-green-600">{holding.yield}% yield</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No investments yet</h3>
                  <p className="text-gray-600 mb-4">Start building your portfolio by investing in properties</p>
                  <Link href="/invest" className="inline-flex items-center bg-navy text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                    <Plus className="h-4 w-4 mr-2" />
                    Start Investing
                  </Link>
                </div>
              )}
            </motion.div>

            {/* Recent Transactions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-bold text-navy">Recent Transactions</h2>
                <Link href="/transactions" className="text-navy hover:text-gray-800 text-sm font-medium">
                  View All
                </Link>
              </div>
              
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
                        transaction.type === 'Buy' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {transaction.type === 'Buy' ? (
                          <ArrowUpRight className="h-4 w-4 text-green-600" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-navy">{transaction.property}</h3>
                        <p className="text-sm text-gray-600">{transaction.shares} shares</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${
                        transaction.type === 'Buy' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'Buy' ? '+' : '-'}${transaction.amount.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">{new Date(transaction.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-xl font-display font-bold text-navy mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/invest" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <Plus className="h-6 w-6 text-navy mr-3" />
                <div>
                  <h3 className="font-medium text-navy">Invest in Properties</h3>
                  <p className="text-sm text-gray-600">Browse available properties</p>
                </div>
              </Link>
              <Link href="/secondary-market" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <TrendingUp className="h-6 w-6 text-navy mr-3" />
                <div>
                  <h3 className="font-medium text-navy">Trade Shares</h3>
                  <p className="text-sm text-gray-600">Buy or sell property shares</p>
                </div>
              </Link>
              <Link href="/p2p-lending" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <Users className="h-6 w-6 text-navy mr-3" />
                <div>
                  <h3 className="font-medium text-navy">P2P Lending</h3>
                  <p className="text-sm text-gray-600">Borrow or lend against assets</p>
                </div>
              </Link>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
