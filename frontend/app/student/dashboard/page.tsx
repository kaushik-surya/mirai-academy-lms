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

const myEnrollments = [
  {
    course: 'Japanese N5',
    batch: 'N5 Weekend Batch A',
    instructor: 'Tanaka Sensei',
    progress: 65,
    nextClass: 'Sat, Jun 14 – 10:00 AM',
    status: 'Active',
    color: 'bg-blue-500',
  },
  {
    course: 'Java Programming',
    batch: 'Java Batch B',
    instructor: 'Ravi Kumar',
    progress: 40,
    nextClass: 'Tue, Jun 17 – 7:00 PM',
    status: 'Active',
    color: 'bg-orange-500',
  },
];

const recentActivities = [
  { type: 'assignment', text: 'New assignment posted: Hiragana Writing Practice', time: '2 hours ago', icon: '📝' },
  { type: 'attendance', text: 'Attendance marked for Jun 12 – Japanese N5 class', time: 'Yesterday', icon: '✅' },
  { type: 'material', text: 'New study material uploaded: N5 Vocab List Ch.3', time: '2 days ago', icon: '📁' },
  { type: 'grade', text: 'Assignment graded: Katakana Quiz – Score: 92%', time: '3 days ago', icon: '🏆' },
];

const upcomingAssignments = [
  { title: 'Hiragana Writing Practice', course: 'Japanese N5', due: 'Jun 15, 2026', status: 'Pending' },
  { title: 'Java OOP Exercises', course: 'Java Programming', due: 'Jun 18, 2026', status: 'In Progress' },
];

const announcements = [
  { title: 'JLPT N5 Mock Test – June 20', body: 'A mock test will be held this Saturday. Please prepare chapters 1–8.', date: 'Jun 13' },
  { title: 'Holiday Notice – Jun 21', body: 'The academy will be closed on Jun 21 (Sunday). Classes rescheduled.', date: 'Jun 12' },
];

export default function StudentDashboard() {
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
    if (parsedUser.role?.toUpperCase() !== 'STUDENT') {
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
          <p className="text-gray-400 text-xs mt-1">Student Portal</p>
        </div>
        <nav className="mt-6">
          <div className="px-3 space-y-1">
            <div className="bg-primary-700 text-white rounded-md px-3 py-2 text-sm font-medium flex items-center gap-2">
              <span>🏠</span> Dashboard
            </div>
            <Link href="#" className="text-gray-300 hover:bg-gray-700 rounded-md px-3 py-2 text-sm flex items-center gap-2">
              <span>📚</span> My Courses
            </Link>
            <Link href="#" className="text-gray-300 hover:bg-gray-700 rounded-md px-3 py-2 text-sm flex items-center gap-2">
              <span>🗓️</span> Schedule
            </Link>
            <Link href="#" className="text-gray-300 hover:bg-gray-700 rounded-md px-3 py-2 text-sm flex items-center gap-2">
              <span>📝</span> Assignments
            </Link>
            <Link href="#" className="text-gray-300 hover:bg-gray-700 rounded-md px-3 py-2 text-sm flex items-center gap-2">
              <span>✅</span> Attendance
            </Link>
            <Link href="#" className="text-gray-300 hover:bg-gray-700 rounded-md px-3 py-2 text-sm flex items-center gap-2">
              <span>🎥</span> Live Classes
            </Link>
            <Link href="#" className="text-gray-300 hover:bg-gray-700 rounded-md px-3 py-2 text-sm flex items-center gap-2">
              <span>📁</span> Study Materials
            </Link>
            <Link href="#" className="text-gray-300 hover:bg-gray-700 rounded-md px-3 py-2 text-sm flex items-center gap-2">
              <span>🏆</span> My Grades
            </Link>
            <Link href="#" className="text-gray-300 hover:bg-gray-700 rounded-md px-3 py-2 text-sm flex items-center gap-2">
              <span>💳</span> Fees
            </Link>
          </div>
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
              {user.name?.charAt(0) || 'S'}
            </div>
            <div>
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-gray-400">Student</p>
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
            <h2 className="text-xl font-bold text-gray-900">My Dashboard</h2>
            <p className="text-sm text-gray-500">Welcome back, {user.name}! 🎌</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        </header>

        <div className="p-8">
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
            {[
              { label: 'Enrolled Courses', value: '2', icon: '📚', color: 'text-blue-600' },
              { label: 'Attendance Rate', value: '88%', icon: '✅', color: 'text-green-600' },
              { label: 'Assignments Due', value: '2', icon: '📝', color: 'text-orange-600' },
              { label: 'Avg. Score', value: '87%', icon: '🏆', color: 'text-purple-600' },
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
              <h3 className="text-lg font-bold text-gray-900 mb-4">Online Users</h3>
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
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Total Users</h3>
              {loadingStats ? (
                <p className="text-sm text-gray-500">Loading...</p>
              ) : statsData ? (
                <div className="text-3xl font-black text-primary-700">{statsData.totalUsers}</div>
              ) : (
                <p className="text-sm text-red-600">{statsError || 'Unable to load stats.'}</p>
              )}
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Your Role</h3>
              <p className="text-sm text-gray-600">{user.name} ({user.role})</p>
              <p className="text-sm text-gray-500 mt-3">Your dashboard shows how many active users are currently connected.</p>
            </div>
          </div>

          {/* My Courses */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-900">My Enrolled Courses</h3>
              <Link href="#" className="text-sm text-primary-600 font-medium hover:text-primary-700">Browse more courses →</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {myEnrollments.map((enrollment, i) => (
                <div key={i} className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition">
                  <div className={`${enrollment.color} text-white px-4 py-3`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-base">{enrollment.course}</h4>
                        <p className="text-xs opacity-80">{enrollment.batch}</p>
                      </div>
                      <span className="bg-white bg-opacity-20 text-xs px-2 py-1 rounded-full">{enrollment.status}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-gray-500 mb-3">👨‍🏫 {enrollment.instructor}</p>
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-500">Course Progress</span>
                        <span className="text-xs font-bold text-primary-700">{enrollment.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className={`${enrollment.color} h-2 rounded-full`}
                          style={{ width: `${enrollment.progress}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500">📅 Next: <span className="text-gray-700 font-medium">{enrollment.nextClass}</span></p>
                      <button className="text-xs bg-primary-600 text-white px-3 py-1 rounded-md hover:bg-primary-700 transition">
                        Join Class
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Upcoming Assignments */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-bold text-gray-900">Upcoming Assignments</h3>
                <Link href="#" className="text-sm text-primary-600 font-medium hover:text-primary-700">View all →</Link>
              </div>
              <div className="space-y-4">
                {upcomingAssignments.map((assignment, i) => (
                  <div key={i} className="flex items-center justify-between border border-gray-100 rounded-lg p-4 hover:border-primary-200 transition">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center text-lg">
                        📝
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{assignment.title}</p>
                        <p className="text-xs text-gray-500">{assignment.course} · Due: {assignment.due}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        assignment.status === 'Pending'
                          ? 'bg-red-100 text-red-600'
                          : 'bg-yellow-100 text-yellow-600'
                      }`}>
                        {assignment.status}
                      </span>
                      <button className="text-xs bg-primary-600 text-white px-3 py-1.5 rounded-md hover:bg-primary-700 transition">
                        Submit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Announcements */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-5">📢 Announcements</h3>
              <div className="space-y-4">
                {announcements.map((ann, i) => (
                  <div key={i} className="border-l-4 border-primary-400 pl-4 py-1">
                    <div className="flex items-start justify-between">
                      <p className="text-sm font-semibold text-gray-900">{ann.title}</p>
                      <span className="text-xs text-gray-400 ml-2 shrink-0">{ann.date}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{ann.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-5">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivities.map((activity, i) => (
                <div key={i} className="flex items-center gap-4 py-2 border-b border-gray-50 last:border-0">
                  <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-lg shrink-0">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">{activity.text}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
