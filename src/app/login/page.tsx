'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Building2, ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Mock authentication logic
      // In a real application, this would be an API call to your backend
      if (email === 'user@example.com' && password === 'password123') {
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
        
        // Check if localStorage is available (client-side)
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem('userAuth', JSON.stringify({
            id: 'u1',
            name: 'John Smith',
            email: 'user@example.com',
            portfolioValue: 25000,
            portfolioYield: 7.8,
            holdings: [
              {
                propertyId: 'AC-104',
                name: 'Toronto Duplex',
                shares: 10,
                value: 2500,
                yield: 8.2
              },
              {
                propertyId: 'AC-203',
                name: 'Vancouver Waterfront',
                shares: 5,
                value: 5200,
                yield: 5.8
              }
            ],
            dateJoined: '2024-01-15'
          }));
        }
        router.push('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full"
      >
        <div className="text-center mb-8">
          <Building2 className="h-10 w-10 text-navy mx-auto mb-2" />
          <h2 className="text-3xl font-display font-bold text-navy">Welcome Back</h2>
          <p className="text-gray-600 mt-2">Sign in to your Asset Crony account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-navy focus:border-navy"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1 relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full border border-gray-300 rounded-md shadow-sm p-3 pr-10 focus:ring-navy focus:border-navy"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-navy focus:ring-navy border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <Link href="/forgot-password" className="text-sm text-navy hover:text-gray-800">
              Forgot password?
            </Link>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className={`w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white ${
              isLoading ? 'bg-gray-400' : 'bg-navy hover:bg-gray-800'
            } transition-colors`}
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
            {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-navy hover:text-gray-800 font-medium">
              Sign up here
            </Link>
          </p>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500 text-center">
            <strong>Demo Credentials:</strong><br />
            Email: user@example.com<br />
            Password: password123
          </p>
        </div>
      </motion.div>
    </div>
  );
}
