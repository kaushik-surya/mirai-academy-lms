'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
  name: string;
  email: string;
  role: string;
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

const myBatches = [
  { name: 'Japanese N5 – Weekend Batch A', course: 'Japanese N5', students: 18, schedule: 'Sat & Sun, 10:00–12:00', status: 'Active', nextClass: 'Sat, Jun 14' },
  { name: 'Japanese N3 – Weekday Batch', course: 'Japanese N3', students: 15, schedule: 'Mon & Wed, 18:00–20:00', status: 'Active', nextClass: 'Mon, Jun 16' },
  { name: 'Java Programming – Batch B', course: 'Java Programming', students: 20, schedule: 'Tue & Thu, 19:00–21:00', status: 'Active', nextClass: 'Tue, Jun 17' },
];

const recentAttendance = [
  { date: '2026-06-12', batch: 'Japanese N5 – Weekend A', present: 16, absent: 2 },
  { date: '2026-06-11', batch: 'Japanese N3 – Weekday', present: 14, absent: 1 },
  { date: '2026-06-10', batch: 'Java Programming – B', present: 19, absent: 1 },
  { date: '2026-06-09', batch: 'Japanese N5 – Weekend A', present: 17, absent: 1 },
];

const pendingAssignments = [
  { title: 'Hiragana Writing Practice', batch: 'Japanese N5', due: '2026-06-15', submissions: 14, total: 18 },
  { title: 'Kanji Quiz – Lesson 5', batch: 'Japanese N3', due: '2026-06-16', submissions: 10, total: 15 },
  { title: 'Java OOP Exercises', batch: 'Java Programming', due: '2026-06-18', submissions: 18, total: 20 },
];

export default function StaffDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [statsData, setStatsData] = useState<Stats | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [statsError, setStatsError] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
      return;
    }
    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.role?.toUpperCase() !== 'STAFF') {
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
          <p className="text-gray-400 text-xs mt-1">Staff Portal</p>
        </div>
        <nav className="mt-6">
          <div className="px-3 space-y-1">
            <div className="bg-primary-700 text-white rounded-md px-3 py-2 text-sm font-medium flex items-center gap-2">
              <span>📊</span> Dashboard
            </div>
            <Link href="#" className="text-gray-300 hover:bg-gray-700 rounded-md px-3 py-2 text-sm flex items-center gap-2">
              <span>🗓️</span> My Batches
            </Link>
            <Link href="#" className="text-gray-300 hover:bg-gray-700 rounded-md px-3 py-2 text-sm flex items-center gap-2">
              <span>🎓</span> My Students
            </Link>
            <Link href="#" className="text-gray-300 hover:bg-gray-700 rounded-md px-3 py-2 text-sm flex items-center gap-2">
              <span>✅</span> Attendance
            </Link>
            <Link href="#" className="text-gray-300 hover:bg-gray-700 rounded-md px-3 py-2 text-sm flex items-center gap-2">
              <span>📝</span> Assignments
            </Link>
            <Link href="#" className="text-gray-300 hover:bg-gray-700 rounded-md px-3 py-2 text-sm flex items-center gap-2">
              <span>🎥</span> Meetings
            </Link>
            <Link href="#" className="text-gray-300 hover:bg-gray-700 rounded-md px-3 py-2 text-sm flex items-center gap-2">
              <span>📁</span> Materials
            </Link>
          </div>
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-sm font-bold">
              {user.name?.charAt(0) || 'S'}
            </div>
            <div>
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-gray-400">Instructor</p>
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
            <h2 className="text-xl font-bold text-gray-900">Staff Dashboard</h2>
            <p className="text-sm text-gray-500">Welcome back, {user.name}!</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-primary-600 text-white text-sm px-4 py-2 rounded-md hover:bg-primary-700 transition">
              📅 Schedule Meeting
            </button>
          </div>
        </header>

        <div className="p-8">
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
            {[
              { label: 'My Batches', value: '3', icon: '🗓️', color: 'text-blue-600' },
              { label: 'Total Students', value: '53', icon: '🎓', color: 'text-green-600' },
              { label: 'Pending Assignments', value: '3', icon: '📝', color: 'text-orange-600' },
              { label: "Today's Classes", value: '1', icon: '📚', color: 'text-purple-600' },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                <div className="text-2xl mb-2">{s.icon}</div>
                <div className={`text-3xl font-black ${s.color} mb-1`}>{s.value}</div>
                <p className="text-sm text-gray-600">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Current Login Status</h3>
              {loadingStats ? (
                <p className="text-sm text-gray-500">Loading...</p>
              ) : statsData ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Admins online</span>
                    <span className="text-xl font-bold text-primary-700">{statsData.onlineByRole.admin}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Staff online</span>
                    <span className="text-xl font-bold text-primary-700">{statsData.onlineByRole.staff}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Students online</span>
                    <span className="text-xl font-bold text-primary-700">{statsData.onlineByRole.student}</span>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-red-600">{statsError || 'Unable to load stats.'}</p>
              )}
              {statsData && (
                <p className="mt-4 text-xs text-gray-400">Active within last 15 minutes</p>
              )}
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Current Role</h3>
              <p className="text-sm text-gray-600">{user.name} ({user.role})</p>
              <p className="text-sm text-gray-600 mt-3">You can view active user counts and help manage student progress.</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Total Users</h3>
              {statsData ? (
                <div className="text-3xl font-black text-primary-700">{statsData.totalUsers}</div>
              ) : (
                <p className="text-sm text-gray-500">Loading...</p>
              )}
            </div>
          </div>

          {/* My Batches */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-900">My Active Batches</h3>
              <Link href="#" className="text-sm text-primary-600 font-medium hover:text-primary-700">View all →</Link>
            </div>
            <div className="space-y-4">
              {myBatches.map((batch, i) => (
                <div key={i} className="border border-gray-100 rounded-lg p-4 hover:border-primary-200 transition">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">{batch.name}</h4>
                      <p className="text-sm text-gray-500 mt-0.5">{batch.schedule}</p>
                      <p className="text-xs text-gray-400 mt-1">Next class: <span className="text-primary-600 font-medium">{batch.nextClass}</span></p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">{batch.status}</span>
                      <p className="text-sm text-gray-500 mt-2">{batch.students} students</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button className="text-xs bg-primary-50 text-primary-700 border border-primary-200 px-3 py-1 rounded hover:bg-primary-100 transition">
                      ✅ Mark Attendance
                    </button>
                    <button className="text-xs bg-gray-50 text-gray-700 border border-gray-200 px-3 py-1 rounded hover:bg-gray-100 transition">
                      📝 Add Assignment
                    </button>
                    <button className="text-xs bg-gray-50 text-gray-700 border border-gray-200 px-3 py-1 rounded hover:bg-gray-100 transition">
                      🎥 Start Meeting
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Attendance */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-5">Recent Attendance</h3>
              <div className="space-y-3">
                {recentAttendance.map((record, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{record.batch}</p>
                      <p className="text-xs text-gray-400">{record.date}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-green-600 font-medium">{record.present} present</span>
                      {record.absent > 0 && <span className="text-xs text-red-500 ml-2">{record.absent} absent</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pending Assignments */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-5">Assignment Submissions</h3>
              <div className="space-y-4">
                {pendingAssignments.map((assignment, i) => (
                  <div key={i} className="border border-gray-100 rounded-lg p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{assignment.title}</p>
                        <p className="text-xs text-gray-400">{assignment.batch} · Due: {assignment.due}</p>
                      </div>
                      <span className="text-xs font-bold text-primary-700">{assignment.submissions}/{assignment.total}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div
                        className="bg-primary-500 h-1.5 rounded-full"
                        style={{ width: `${(assignment.submissions / assignment.total) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
