'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Demo credentials for auto role detection
const DEMO_USERS = [
  { email: 'admin@miraiacademy.com', password: 'admin123', role: 'admin', name: 'Admin User' },
  { email: 'teacher@miraiacademy.com', password: 'teacher123', role: 'staff', name: 'Tanaka Sensei' },
  { email: 'student@miraiacademy.com', password: 'student123', role: 'student', name: 'John Doe' },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Try backend API first
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        redirectByRole(data.user.role.toLowerCase());
        return;
      } else {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.message || 'Invalid credentials. Please try again.');
        setLoading(false);
        return;
      }
    } catch {
      // Backend not available - use demo credentials
      const demoUser = DEMO_USERS.find(
        (u) => u.email === email && u.password === password
      );

      if (demoUser) {
        localStorage.setItem('token', 'demo-token');
        localStorage.setItem('user', JSON.stringify({ email: demoUser.email, role: demoUser.role, name: demoUser.name }));
        redirectByRole(demoUser.role);
      } else {
        setError('Invalid credentials. Please check your email and password.');
        setLoading(false);
      }
    }
  };

  const redirectByRole = (role: string) => {
    switch (role) {
      case 'admin':
        router.push('/admin/dashboard');
        break;
      case 'staff':
        router.push('/staff/dashboard');
        break;
      default:
        router.push('/student/dashboard');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary-700 mb-2">
              MIRAI Tech Academy
            </h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link href="/forgot-password" className="font-medium text-primary-600 hover:text-primary-500">
                  Forgot password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="font-medium text-primary-600 hover:text-primary-500">
                Register now
              </Link>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center font-medium mb-2">Demo Credentials</p>
            <div className="space-y-1 text-xs text-gray-400 text-center">
              <p>🔑 Admin: admin@miraiacademy.com / admin123</p>
              <p>👨‍🏫 Staff: teacher@miraiacademy.com / teacher123</p>
              <p>🎓 Student: student@miraiacademy.com / student123</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
