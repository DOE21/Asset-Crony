'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Users, 
  TrendingUp, 
  DollarSign, 
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Download
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export default function AdminReports() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const router = useRouter();

  // Mock data for charts
  const transactionData = [
    { month: 'Jan', volume: 2400000, transactions: 45 },
    { month: 'Feb', volume: 2800000, transactions: 52 },
    { month: 'Mar', volume: 3200000, transactions: 61 },
    { month: 'Apr', volume: 2900000, transactions: 48 },
    { month: 'May', volume: 3600000, transactions: 67 },
    { month: 'Jun', volume: 4100000, transactions: 78 },
    { month: 'Jul', volume: 3800000, transactions: 72 },
    { month: 'Aug', volume: 4200000, transactions: 81 },
    { month: 'Sep', volume: 4500000, transactions: 89 },
    { month: 'Oct', volume: 4800000, transactions: 95 },
    { month: 'Nov', volume: 5200000, transactions: 102 },
    { month: 'Dec', volume: 5800000, transactions: 115 }
  ];

  const userGrowthData = [
    { month: 'Jan', users: 1200 },
    { month: 'Feb', users: 1350 },
    { month: 'Mar', users: 1520 },
    { month: 'Apr', users: 1680 },
    { month: 'May', users: 1850 },
    { month: 'Jun', users: 2034 },
    { month: 'Jul', users: 2200 },
    { month: 'Aug', users: 2380 },
    { month: 'Sep', users: 2560 },
    { month: 'Oct', users: 2750 },
    { month: 'Nov', users: 2950 },
    { month: 'Dec', users: 3150 }
  ];

  const propertyPerformanceData = [
    { name: 'Toronto Duplex', yield: 8.2, appreciation: 5.3, volume: 1250000 },
    { name: 'Vancouver Waterfront', yield: 9.1, appreciation: 7.2, volume: 2100000 },
    { name: 'Montreal Office', yield: 6.8, appreciation: 2.7, volume: 1800000 },
    { name: 'Houston Single Family', yield: 7.6, appreciation: 3.1, volume: 950000 },
    { name: 'Calgary Condo', yield: 7.9, appreciation: 4.2, volume: 1100000 }
  ];

  const loanActivityData = [
    { name: 'Approved', value: 45, color: '#10B981' },
    { name: 'Pending', value: 12, color: '#F59E0B' },
    { name: 'Rejected', value: 8, color: '#EF4444' },
    { name: 'Completed', value: 35, color: '#8B5CF6' }
  ];

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    } else {
      router.push('/admin');
    }
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    router.push('/admin');
  };

  const handleExport = () => {
    // Mock export functionality
    console.log('Exporting reports...');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Building2 className="h-12 w-12 text-navy mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const sidebarItems = [
    { name: 'Dashboard', icon: BarChart3, href: '/admin/dashboard', active: false },
    { name: 'Users', icon: Users, href: '/admin/users', active: false },
    { name: 'Properties', icon: Building2, href: '/admin/properties', active: false },
    { name: 'Transactions', icon: TrendingUp, href: '/admin/transactions', active: false },
    { name: 'P2P Loans', icon: DollarSign, href: '/admin/loans', active: false },
    { name: 'Reports', icon: BarChart3, href: '/admin/reports', active: true },
    { name: 'Settings', icon: Settings, href: '/admin/settings', active: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
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

      {/* Main content */}
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
                <h1 className="ml-4 lg:ml-0 text-2xl font-display font-bold text-navy">
                  Reports & Analytics
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent"
                >
                  <option value="3months">Last 3 Months</option>
                  <option value="6months">Last 6 Months</option>
                  <option value="1year">Last Year</option>
                  <option value="all">All Time</option>
                </select>
                <button 
                  onClick={handleExport}
                  className="flex items-center px-4 py-2 bg-navy text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { title: 'Total Volume', value: '$58.2M', change: '+12.5%', icon: DollarSign, color: 'bg-green-500' },
              { title: 'Active Users', value: '3,150', change: '+8.2%', icon: Users, color: 'bg-blue-500' },
              { title: 'Properties Listed', value: '78', change: '+5.1%', icon: Building2, color: 'bg-purple-500' },
              { title: 'Avg. Yield', value: '7.8%', change: '+0.3%', icon: TrendingUp, color: 'bg-gold' },
            ].map((metric, index) => (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                    <p className="text-2xl font-bold text-navy mt-1">{metric.value}</p>
                    <p className="text-sm text-green-600 mt-1">{metric.change}</p>
                  </div>
                  <div className={`${metric.color} p-3 rounded-lg`}>
                    <metric.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Transaction Volume */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-display font-semibold text-navy">Monthly Transaction Volume</h2>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-navy rounded-full"></div>
                  <span className="text-sm text-gray-600">Volume</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={transactionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${(value as number).toLocaleString()}`, 'Volume']} />
                  <Area type="monotone" dataKey="volume" stroke="#1e293b" fill="#1e293b" fillOpacity={0.1} />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            {/* User Growth */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-display font-semibold text-navy">User Growth</h2>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gold rounded-full"></div>
                  <span className="text-sm text-gray-600">Users</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="users" stroke="#f59e0b" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Property Performance & Loan Activity */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Property Performance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-lg font-display font-semibold text-navy mb-6">Top Performing Properties</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={propertyPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="yield" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Loan Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-lg font-display font-semibold text-navy mb-6">Loan Activity Distribution</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={loanActivityData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {loanActivityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Detailed Tables */}
          <div className="grid lg:grid-cols-2 gap-8 mt-8">
            {/* Top Properties Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-lg font-display font-semibold text-navy mb-6">Property Performance Details</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Yield</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appreciation</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volume</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {propertyPerformanceData.map((property, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-navy">{property.name}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-green-600">{property.yield}%</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-green-600">+{property.appreciation}%</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">${property.volume.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-lg font-display font-semibold text-navy mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {[
                  { action: 'New property listed', property: 'Toronto Duplex #AC-104', time: '2 hours ago', type: 'property' },
                  { action: 'Large transaction completed', property: 'Vancouver Waterfront #AC-203', time: '4 hours ago', type: 'transaction' },
                  { action: 'Loan approved', property: 'Montreal Office #AC-156', time: '6 hours ago', type: 'loan' },
                  { action: 'New user registered', property: 'Emily Davis', time: '8 hours ago', type: 'user' },
                  { action: 'Property delisted', property: 'Houston Single Family #AC-089', time: '12 hours ago', type: 'property' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'property' ? 'bg-blue-500' :
                      activity.type === 'transaction' ? 'bg-green-500' :
                      activity.type === 'loan' ? 'bg-purple-500' : 'bg-gray-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-navy">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.property}</p>
                    </div>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
