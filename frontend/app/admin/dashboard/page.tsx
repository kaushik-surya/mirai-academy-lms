'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
  id?: number;
  name: string;
  email: string;
  role: string;
  active?: boolean;
  studentId?: string | null;
  staffId?: string | null;
}

interface Stats {
  totalUsers: number;
  totalByRole: {
    admin: number;
    staff: number;
    student: number;
  };
  onlineByRole: {
    admin: number;
    staff: number;
    student: number;
  };
  activeSince: string;
}

const stats = [
  { label: 'Total Students', value: '248', icon: '🎓', color: 'bg-blue-50 border-blue-200', textColor: 'text-blue-700' },
  { label: 'Total Staff', value: '12', icon: '👨‍🏫', color: 'bg-green-50 border-green-200', textColor: 'text-green-700' },
  { label: 'Active Courses', value: '11', icon: '📚', color: 'bg-purple-50 border-purple-200', textColor: 'text-purple-700' },
  { label: 'Active Batches', value: '18', icon: '🗓️', color: 'bg-orange-50 border-orange-200', textColor: 'text-orange-700' },
];

const recentStudents = [
  { name: 'John Doe', course: 'Japanese N5', enrolled: '2026-06-01', status: 'Active' },
  { name: 'Aiko Yamamoto', course: 'Java Programming', enrolled: '2026-06-03', status: 'Active' },
  { name: 'Carlos Rivera', course: 'Japanese N3', enrolled: '2026-06-05', status: 'Active' },
  { name: 'Priya Singh', course: 'Spring Boot', enrolled: '2026-06-08', status: 'Pending' },
  { name: 'Tom Wilson', course: 'Vue.js', enrolled: '2026-06-10', status: 'Active' },
];

const courseStats = [
  { name: 'Japanese N5', enrolled: 42, capacity: 50, color: 'bg-blue-500' },
  { name: 'Japanese N4', enrolled: 35, capacity: 50, color: 'bg-blue-600' },
  { name: 'Japanese N3', enrolled: 28, capacity: 40, color: 'bg-indigo-500' },
  { name: 'Japanese N2', enrolled: 20, capacity: 30, color: 'bg-purple-500' },
  { name: 'Japanese N1', enrolled: 15, capacity: 25, color: 'bg-red-500' },
  { name: 'Java Programming', enrolled: 38, capacity: 50, color: 'bg-orange-500' },
  { name: 'Spring Boot', enrolled: 30, capacity: 40, color: 'bg-green-500' },
  { name: 'JavaScript', enrolled: 25, capacity: 40, color: 'bg-yellow-500' },
  { name: 'Vue.js', enrolled: 15, capacity: 30, color: 'bg-emerald-500' },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [statsData, setStatsData] = useState<Stats | null>(null);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);
  const [userError, setUserError] = useState('');
  const [statsError, setStatsError] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
      return;
    }
    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.role !== 'admin') {
      router.push('/login');
      return;
    }
    setUser(parsedUser);

    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
    fetch(`${apiUrl}/admin/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            router.push('/login');
            throw new Error('Unauthorized');
          }
          const errorBody = await response.json().catch(() => ({}));
          throw new Error(errorBody.error || 'Unable to load users');
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        setUserError(error.message || 'Unable to load users');
      })
      .finally(() => setLoadingUsers(false));

    fetch(`${apiUrl}/stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            router.push('/login');
            throw new Error('Unauthorized');
          }
          const errorBody = await response.json().catch(() => ({}));
          throw new Error(errorBody.error || 'Unable to load stats');
        }
        return response.json();
      })
      .then((data) => {
        setStatsData(data);
      })
      .catch((error) => {
        setStatsError(error.message || 'Unable to load stats');
      })
      .finally(() => setLoadingStats(false));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-gray-900 text-white z-40">
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-lg font-bold">MIRAI Tech Academy</h1>
          <p className="text-gray-400 text-xs mt-1">Admin Panel</p>
        </div>
        <nav className="mt-6">
          <div className="px-3 space-y-1">
            <div className="bg-primary-700 text-white rounded-md px-3 py-2 text-sm font-medium flex items-center gap-2">
              <span>📊</span> Dashboard
            </div>
            <Link href="#" className="text-gray-300 hover:bg-gray-700 rounded-md px-3 py-2 text-sm flex items-center gap-2">
              <span>🎓</span> Students
            </Link>
            <Link href="#" className="text-gray-300 hover:bg-gray-700 rounded-md px-3 py-2 text-sm flex items-center gap-2">
              <span>👨‍🏫</span> Staff
            </Link>
            <Link href="#" className="text-gray-300 hover:bg-gray-700 rounded-md px-3 py-2 text-sm flex items-center gap-2">
              <span>📚</span> Courses
            </Link>
            <Link href="#" className="text-gray-300 hover:bg-gray-700 rounded-md px-3 py-2 text-sm flex items-center gap-2">
              <span>🗓️</span> Batches
            </Link>
            <Link href="#" className="text-gray-300 hover:bg-gray-700 rounded-md px-3 py-2 text-sm flex items-center gap-2">
              <span>📝</span> Assignments
            </Link>
            <Link href="#" className="text-gray-300 hover:bg-gray-700 rounded-md px-3 py-2 text-sm flex items-center gap-2">
              <span>✅</span> Attendance
            </Link>
            <Link href="#" className="text-gray-300 hover:bg-gray-700 rounded-md px-3 py-2 text-sm flex items-center gap-2">
              <span>💰</span> Fees
            </Link>
            <Link href="#" className="text-gray-300 hover:bg-gray-700 rounded-md px-3 py-2 text-sm flex items-center gap-2">
              <span>📈</span> Reports
            </Link>
          </div>
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-sm font-bold">
              {user.name?.charAt(0) || 'A'}
            </div>
            <div>
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-gray-400">Administrator</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white text-sm py-1.5 rounded-md transition"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Top Bar */}
        <header className="bg-white shadow-sm px-8 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Admin Dashboard</h2>
            <p className="text-sm text-gray-500">Welcome back, {user.name}!</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">🕐 {new Date().toLocaleDateString('en-JP', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </header>

        <div className="p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <div key={stat.label} className={`bg-white rounded-xl shadow-sm border p-6 ${stat.color}`}>
                <div className="text-3xl mb-3">{stat.icon}</div>
                <div className={`text-3xl font-black ${stat.textColor} mb-1`}>{stat.value}</div>
                <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Total Users</h3>
              {loadingStats ? (
                <p className="text-sm text-gray-500">Loading...</p>
              ) : statsData ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Admin</span>
                    <span className="text-xl font-bold text-primary-700">{statsData.totalByRole.admin}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Staff</span>
                    <span className="text-xl font-bold text-primary-700">{statsData.totalByRole.staff}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Students</span>
                    <span className="text-xl font-bold text-primary-700">{statsData.totalByRole.student}</span>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-red-600">{statsError || 'Unable to load total users.'}</p>
              )}
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Online Now</h3>
              {loadingStats ? (
                <p className="text-sm text-gray-500">Loading...</p>
              ) : statsData ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Admin</span>
                    <span className="text-xl font-bold text-primary-700">{statsData.onlineByRole.admin}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Staff</span>
                    <span className="text-xl font-bold text-primary-700">{statsData.onlineByRole.staff}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Students</span>
                    <span className="text-xl font-bold text-primary-700">{statsData.onlineByRole.student}</span>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-red-600">{statsError || 'Unable to load online users.'}</p>
              )}
              {statsData && (
                <p className="mt-4 text-xs text-gray-400">Active within the last 15 minutes ({new Date(statsData.activeSince).toLocaleTimeString()})</p>
              )}
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Current Session</h3>
              <p className="text-sm text-gray-600">Logged in as <span className="font-medium">{user.name}</span> ({user.role})</p>
              <p className="text-sm text-gray-600 mt-3">Use the sidebar links to manage users, courses, and reports.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Course Enrollment Stats */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-5">Course Enrollment Status</h3>
              <div className="space-y-3">
                {courseStats.map((course) => (
                  <div key={course.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-700">{course.name}</span>
                      <span className="text-xs text-gray-500">{course.enrolled}/{course.capacity}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className={`${course.color} h-2 rounded-full`}
                        style={{ width: `${(course.enrolled / course.capacity) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Students */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-bold text-gray-900">Recent Enrollments</h3>
                <Link href="#" className="text-sm text-primary-600 hover:text-primary-700 font-medium">View all →</Link>
              </div>
              <div className="space-y-3">
                {recentStudents.map((student, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-sm font-bold">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{student.name}</p>
                        <p className="text-xs text-gray-500">{student.course}</p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      student.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {student.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-5">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Add Student', icon: '➕🎓', color: 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200' },
                { label: 'Add Staff', icon: '➕👨‍🏫', color: 'bg-green-50 hover:bg-green-100 text-green-700 border-green-200' },
                { label: 'Create Batch', icon: '🗓️', color: 'bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200' },
                { label: 'Generate Report', icon: '📈', color: 'bg-orange-50 hover:bg-orange-100 text-orange-700 border-orange-200' },
              ].map((action) => (
                <button key={action.label} className={`border rounded-xl p-4 text-center transition ${action.color}`}>
                  <div className="text-2xl mb-2">{action.icon}</div>
                  <p className="text-sm font-medium">{action.label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* User Accounts */}
          <div className="bg-white rounded-xl shadow-sm p-6 mt-8">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg font-bold text-gray-900">User Accounts</h3>
                <p className="text-sm text-gray-500">Secure admin view of registered users.</p>
              </div>
              <span className="text-sm text-gray-500">{loadingUsers ? 'Loading users...' : `${users.length} users`}</span>
            </div>

            {userError ? (
              <div className="rounded-md bg-red-50 p-4 text-sm text-red-700 border border-red-200">
                {userError}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium text-gray-600">Name</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-600">Email</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-600">Role</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-600">Status</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-600">ID</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {users.map((userItem) => (
                      <tr key={userItem.email}>
                        <td className="px-4 py-3 whitespace-nowrap text-gray-900">{userItem.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-gray-500">{userItem.email}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-gray-700 uppercase">{userItem.role}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${userItem.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                            {userItem.active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-gray-500">{userItem.studentId || userItem.staffId || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
