'use client';

import { useState, useEffect, useMemo } from 'react';
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
  Search,
  Filter,
  Eye,
  UserX,
  Trash2,
  Download,
  X as CloseIcon
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  status: 'Active' | 'Suspended' | 'Pending';
  dateJoined: string;
  portfolioValue: number;
  portfolioYield: number;
  holdings: Array<{
    propertyId: string;
    name: string;
    shares: number;
    value: number;
  }>;
}

export default function AdminUsers() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const router = useRouter();

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users', { cache: 'no-store' });
      if (!res.ok) return;
      const data = await res.json();
      setUsers(data.users || []);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    } else {
      router.push('/admin');
    }
    setIsLoading(false);
  }, [router]);

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchUsers();
    const id = setInterval(fetchUsers, 15000);
    return () => clearInterval(id);
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    router.push('/admin');
  };

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [users, searchTerm, statusFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Suspended': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
    { name: 'Users', icon: Users, href: '/admin/users', active: true },
    { name: 'Properties', icon: Building2, href: '/admin/properties', active: false },
    { name: 'Transactions', icon: TrendingUp, href: '/admin/transactions', active: false },
    { name: 'P2P Loans', icon: DollarSign, href: '/admin/loans', active: false },
    { name: 'Reports', icon: BarChart3, href: '/admin/reports', active: false },
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
                  User Management
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <button className="flex items-center px-4 py-2 bg-navy text-white rounded-lg hover:bg-gray-800 transition-colors">
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Suspended">Suspended</option>
                  <option value="Pending">Pending</option>
                </select>
                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </button>
              </div>
            </div>
          </div>

          {/* Users table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date Joined
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Portfolio Value
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Portfolio Yield
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-navy">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(user.dateJoined).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${user.portfolioValue.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.portfolioYield}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button 
                            onClick={() => setSelectedUser(user)}
                            className="text-navy hover:text-gray-800 transition-colors"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-yellow-600 hover:text-yellow-800 transition-colors">
                            <UserX className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-800 transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {filteredUsers.length} of {users.length} users
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Previous
              </button>
              <button className="px-3 py-2 bg-navy text-white rounded-lg hover:bg-gray-800 transition-colors">
                1
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                2
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Next
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* User Profile Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-display font-bold text-navy">User Profile</h2>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <CloseIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-navy mb-4">Personal Information</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-600">Name:</span>
                      <p className="font-medium text-navy">{selectedUser.name}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Email:</span>
                      <p className="font-medium text-navy">{selectedUser.email}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Status:</span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ml-2 ${getStatusColor(selectedUser.status)}`}>
                        {selectedUser.status}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Date Joined:</span>
                      <p className="font-medium text-navy">{new Date(selectedUser.dateJoined).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-navy mb-4">Portfolio Summary</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-600">Total Value:</span>
                      <p className="font-medium text-navy text-lg">${selectedUser.portfolioValue.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Average Yield:</span>
                      <p className="font-medium text-green-600 text-lg">{selectedUser.portfolioYield}%</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Properties Owned:</span>
                      <p className="font-medium text-navy">{selectedUser.holdings.length}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-navy mb-4">Owned Properties</h3>
                {selectedUser.holdings.length > 0 ? (
                  <div className="space-y-3">
                    {selectedUser.holdings.map((holding, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-navy">{holding.name}</h4>
                            <p className="text-sm text-gray-600">Property ID: {holding.propertyId}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-navy">{holding.shares} shares</p>
                            <p className="text-sm text-gray-600">${holding.value.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No properties owned</p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
