import React from 'react';
import {
  Users,
  BookOpen,
  TrendingUp,
  Clock,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Target,
} from 'lucide-react';
import { students, lessons, calendarEvents } from '../data/mockData';

const Dashboard: React.FC = () => {
  const totalStudents = students.length;
  const completedLessons = lessons.filter((l) => l.status === 'completed').length;
  const avgProgress = Math.round(students.reduce((acc, s) => acc + s.progress, 0) / totalStudents);
  const upcomingClasses = calendarEvents.filter((e) => e.type === 'class').length;

  const recentActivity = [
    { text: 'Maria completed Present Perfect worksheet', time: '2 hours ago', type: 'success' },
    { text: 'New quiz created: Phrasal Verbs Challenge', time: '4 hours ago', type: 'info' },
    { text: 'Ahmed scored 85% on vocabulary test', time: '6 hours ago', type: 'success' },
    { text: 'Lesson plan updated: Travel Vocabulary', time: '1 day ago', type: 'warning' },
    { text: 'Pierre submitted essay for review', time: '1 day ago', type: 'info' },
  ];

  const upcomingEvents = calendarEvents.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, Sarah! 👋</h1>
          <p className="text-gray-500 mt-1">Here's what's happening with your students today.</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">
            + New Lesson
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
            + Add Student
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users size={22} className="text-blue-600" />
            </div>
            <span className="flex items-center text-green-600 text-sm font-medium">
              <ArrowUpRight size={16} /> +2
            </span>
          </div>
          <p className="mt-4 text-2xl font-bold text-gray-900">{totalStudents}</p>
          <p className="text-sm text-gray-500">Total Students</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <BookOpen size={22} className="text-green-600" />
            </div>
            <span className="flex items-center text-green-600 text-sm font-medium">
              <ArrowUpRight size={16} /> +3
            </span>
          </div>
          <p className="mt-4 text-2xl font-bold text-gray-900">{completedLessons}</p>
          <p className="text-sm text-gray-500">Lessons Completed</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <TrendingUp size={22} className="text-purple-600" />
            </div>
            <span className="flex items-center text-green-600 text-sm font-medium">
              <ArrowUpRight size={16} /> +5%
            </span>
          </div>
          <p className="mt-4 text-2xl font-bold text-gray-900">{avgProgress}%</p>
          <p className="text-sm text-gray-500">Avg. Progress</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Calendar size={22} className="text-orange-600" />
            </div>
            <span className="flex items-center text-red-500 text-sm font-medium">
              <ArrowDownRight size={16} /> -1
            </span>
          </div>
          <p className="mt-4 text-2xl font-bold text-gray-900">{upcomingClasses}</p>
          <p className="text-sm text-gray-500">Upcoming Classes</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student Progress Overview */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Student Progress</h2>
            <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {students.slice(0, 5).map((student) => (
              <div key={student.id} className="flex items-center gap-4">
                <div className="text-2xl">{student.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-gray-900 truncate">{student.name}</p>
                    <span className="text-sm text-gray-500">{student.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        student.progress >= 80
                          ? 'bg-green-500'
                          : student.progress >= 50
                          ? 'bg-blue-500'
                          : 'bg-yellow-500'
                      }`}
                      style={{ width: `${student.progress}%` }}
                    />
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-full">
                      {student.level}
                    </span>
                    <span className="text-xs text-gray-400">{student.nativeLanguage}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Schedule */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming</h2>
            <Clock size={18} className="text-gray-400" />
          </div>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className={`w-2 h-2 rounded-full mt-2 ${event.color}`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{event.title}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {event.date} at {event.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'success'
                      ? 'bg-green-500'
                      : activity.type === 'warning'
                      ? 'bg-yellow-500'
                      : 'bg-blue-500'
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm text-gray-700">{activity.text}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all">
              <Target size={24} className="text-indigo-600" />
              <span className="text-xs font-medium text-gray-700">Create Quiz</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all">
              <BookOpen size={24} className="text-green-600" />
              <span className="text-xs font-medium text-gray-700">New Lesson</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all">
              <Star size={24} className="text-purple-600" />
              <span className="text-xs font-medium text-gray-700">Add Vocab</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-all">
              <Users size={24} className="text-orange-600" />
              <span className="text-xs font-medium text-gray-700">Add Student</span>
            </button>
          </div>

          {/* Level Distribution */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Level Distribution</h3>
            <div className="space-y-2">
              {[
                { level: 'Beginner', count: 1, color: 'bg-red-400' },
                { level: 'Elementary', count: 1, color: 'bg-orange-400' },
                { level: 'Pre-Intermediate', count: 2, color: 'bg-yellow-400' },
                { level: 'Intermediate', count: 2, color: 'bg-green-400' },
                { level: 'Upper-Intermediate', count: 1, color: 'bg-blue-400' },
                { level: 'Advanced', count: 1, color: 'bg-purple-400' },
              ].map((item) => (
                <div key={item.level} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <span className="text-xs text-gray-600 flex-1">{item.level}</span>
                  <span className="text-xs font-medium text-gray-900">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
