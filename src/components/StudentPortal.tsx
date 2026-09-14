import React, { useState } from 'react';
import {
  Home,
  Video,
  BookOpen,
  ClipboardCheck,
  TrendingUp,
  MessageSquare,
  LogOut,
  Bell,
  Calendar,
  Clock,
  Users,
  Star,
  Award,
  Target,
  Play,
  CheckCircle,
  AlertCircle,
  FileText,
  Brain,
  PenTool,
  ChevronRight,
  GraduationCap,
} from 'lucide-react';

interface StudentPortalProps {
  user: { name: string; role: 'student'; email: string };
  onLogout: () => void;
  onJoinClass: () => void;
}

const StudentPortal: React.FC<StudentPortalProps> = ({ user, onLogout, onJoinClass }) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock student data
  const studentData = {
    level: 'Intermediate',
    overallProgress: 72,
    lessonsCompleted: 18,
    totalLessons: 25,
    streak: 5,
    totalPoints: 1250,
    nextClass: {
      title: 'Travel & Tourism Vocabulary',
      time: 'Today at 2:00 PM',
      teacher: 'Sarah Thompson',
      duration: 45,
    },
    upcomingClasses: [
      { id: '1', title: 'Travel & Tourism Vocabulary', date: 'Today', time: '2:00 PM', teacher: 'Sarah Thompson', duration: 45, status: 'upcoming' },
      { id: '2', title: 'Grammar: Present Perfect', date: 'Tomorrow', time: '10:00 AM', teacher: 'Sarah Thompson', duration: 60, status: 'scheduled' },
      { id: '3', title: 'Conversation Practice', date: 'Jan 22', time: '3:00 PM', teacher: 'Sarah Thompson', duration: 45, status: 'scheduled' },
    ],
    assignments: [
      { id: '1', title: 'Present Perfect Worksheet', dueDate: 'Jan 21', status: 'pending', type: 'worksheet' },
      { id: '2', title: 'Vocabulary Quiz: Travel', dueDate: 'Jan 20', status: 'submitted', type: 'quiz' },
      { id: '3', title: 'Essay: My Favorite Place', dueDate: 'Jan 25', status: 'pending', type: 'writing' },
      { id: '4', title: 'Grammar Exercise: Past Tenses', dueDate: 'Jan 18', status: 'graded', type: 'exercise', score: 85 },
    ],
    skills: {
      grammar: 75,
      vocabulary: 80,
      speaking: 65,
      listening: 70,
      reading: 85,
      writing: 60,
    },
    recentActivity: [
      { text: 'Completed vocabulary quiz', score: '92%', time: '2 hours ago', type: 'success' },
      { text: 'Joined live class: Grammar', time: '1 day ago', type: 'info' },
      { text: 'Submitted essay assignment', time: '2 days ago', type: 'success' },
      { text: 'Teacher left feedback on your writing', time: '3 days ago', type: 'warning' },
    ],
    messages: [
      { id: '1', from: 'Sarah Thompson', subject: 'Great progress!', message: 'Hi Maria! I noticed your speaking skills have improved a lot. Keep up the good work!', time: '2 hours ago', unread: true },
      { id: '2', from: 'Sarah Thompson', subject: 'Homework reminder', message: 'Don\'t forget to complete the Present Perfect worksheet by tomorrow.', time: '1 day ago', unread: true },
      { id: '3', from: 'Sarah Thompson', subject: 'Essay feedback', message: 'I\'ve reviewed your essay. You did well with the structure, but let\'s work on using more linking words.', time: '3 days ago', unread: false },
    ],
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'classes', label: 'My Classes', icon: Video },
    { id: 'assignments', label: 'Assignments', icon: ClipboardCheck },
    { id: 'progress', label: 'My Progress', icon: TrendingUp },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'submitted': return 'bg-blue-100 text-blue-700';
      case 'graded': return 'bg-green-100 text-green-700';
      case 'upcoming': return 'bg-indigo-100 text-indigo-700';
      case 'scheduled': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-1">Hello, {user.name.split(' ')[0]}! 👋</h2>
            <p className="text-indigo-100">Ready to continue your English journey?</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-1.5">
              <Star size={16} className="text-yellow-300" />
              <span className="font-bold">{studentData.totalPoints} pts</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-2xl font-bold">{studentData.streak}</p>
            <p className="text-xs text-indigo-100">Day Streak 🔥</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-2xl font-bold">{studentData.lessonsCompleted}/{studentData.totalLessons}</p>
            <p className="text-xs text-indigo-100">Lessons Done</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-2xl font-bold">{studentData.overallProgress}%</p>
            <p className="text-xs text-indigo-100">Overall Progress</p>
          </div>
        </div>
      </div>

      {/* Next Class */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Next Class</h3>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock size={14} />
            <span>{studentData.nextClass.time}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xl font-bold text-gray-900 mb-1">{studentData.nextClass.title}</h4>
            <p className="text-sm text-gray-500">with {studentData.nextClass.teacher} • {studentData.nextClass.duration} min</p>
          </div>
          <button
            onClick={onJoinClass}
            className="px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors flex items-center gap-2 shadow-lg shadow-green-200"
          >
            <Play size={18} /> Join Class
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Classes */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Classes</h3>
            <button onClick={() => setActiveTab('classes')} className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {studentData.upcomingClasses.slice(0, 3).map((cls) => (
              <div key={cls.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Video size={18} className="text-indigo-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm truncate">{cls.title}</p>
                  <p className="text-xs text-gray-500">{cls.date} at {cls.time}</p>
                </div>
                <button
                  onClick={onJoinClass}
                  className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-medium hover:bg-indigo-100 transition-colors"
                >
                  Join
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {studentData.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'success' ? 'bg-green-500' :
                  activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-gray-700">{activity.text}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all">
          <Brain size={24} className="text-purple-600" />
          <span className="text-xs font-medium text-gray-700">Review Vocab</span>
        </button>
        <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all">
          <PenTool size={24} className="text-blue-600" />
          <span className="text-xs font-medium text-gray-700">Grammar Practice</span>
        </button>
        <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all">
          <FileText size={24} className="text-green-600" />
          <span className="text-xs font-medium text-gray-700">My Assignments</span>
        </button>
        <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all">
          <Award size={24} className="text-yellow-600" />
          <span className="text-xs font-medium text-gray-700">Achievements</span>
        </button>
      </div>
    </div>
  );

  const renderClasses = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Classes</h1>
        <p className="text-gray-500 mt-1">Join live sessions and view your schedule</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {studentData.upcomingClasses.map((cls) => (
          <div key={cls.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <Video size={22} className="text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{cls.title}</h3>
                  <p className="text-sm text-gray-500">{cls.teacher}</p>
                </div>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${getStatusBadge(cls.status)}`}>
                {cls.status.charAt(0).toUpperCase() + cls.status.slice(1)}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>{cls.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{cls.time}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{cls.duration} min</span>
              </div>
            </div>
            <button
              onClick={onJoinClass}
              className="w-full px-4 py-2.5 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <Play size={16} /> Join Class
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAssignments = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Assignments</h1>
        <p className="text-gray-500 mt-1">View and submit your assignments</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="divide-y divide-gray-100">
          {studentData.assignments.map((assignment) => (
            <div key={assignment.id} className="p-5 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    assignment.type === 'worksheet' ? 'bg-blue-100' :
                    assignment.type === 'quiz' ? 'bg-purple-100' :
                    assignment.type === 'writing' ? 'bg-green-100' : 'bg-orange-100'
                  }`}>
                    <FileText size={18} className={
                      assignment.type === 'worksheet' ? 'text-blue-600' :
                      assignment.type === 'quiz' ? 'text-purple-600' :
                      assignment.type === 'writing' ? 'text-green-600' : 'text-orange-600'
                    } />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{assignment.title}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">Due: {assignment.dueDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {assignment.score && (
                    <span className="text-sm font-bold text-green-600">{assignment.score}%</span>
                  )}
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${getStatusBadge(assignment.status)}`}>
                    {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                  </span>
                  {assignment.status === 'pending' && (
                    <button className="px-4 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                      Submit
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProgress = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Progress</h1>
        <p className="text-gray-500 mt-1">Track your learning journey</p>
      </div>

      {/* Overall Progress */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold">Overall Progress</h3>
            <p className="text-indigo-100 text-sm">{studentData.level} Level</p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold">{studentData.overallProgress}%</p>
            <p className="text-xs text-indigo-100">Complete</p>
          </div>
        </div>
        <div className="w-full bg-white/20 rounded-full h-3">
          <div className="h-3 bg-white rounded-full" style={{ width: `${studentData.overallProgress}%` }} />
        </div>
      </div>

      {/* Skills Breakdown */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills Breakdown</h3>
        <div className="space-y-4">
          {Object.entries(studentData.skills).map(([skill, value]) => (
            <div key={skill}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-medium text-gray-700 capitalize">{skill}</span>
                <span className="text-sm font-bold text-gray-900">{value as number}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full ${
                    (value as number) >= 80 ? 'bg-green-500' : (value as number) >= 60 ? 'bg-blue-500' : 'bg-yellow-500'
                  }`}
                  style={{ width: `${value as number}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: '🔥', title: '5 Day Streak', unlocked: true },
            { icon: '📚', title: '10 Lessons', unlocked: true },
            { icon: '⭐', title: 'Perfect Score', unlocked: true },
            { icon: '🎯', title: 'Grammar Master', unlocked: false },
          ].map((achievement, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl border-2 text-center ${
                achievement.unlocked
                  ? 'border-yellow-200 bg-yellow-50'
                  : 'border-gray-200 bg-gray-50 opacity-50'
              }`}
            >
              <div className="text-3xl mb-2">{achievement.icon}</div>
              <p className="text-xs font-medium text-gray-700">{achievement.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMessages = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
        <p className="text-gray-500 mt-1">Communication with your teacher</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="divide-y divide-gray-100">
          {studentData.messages.map((msg) => (
            <div key={msg.id} className={`p-5 hover:bg-gray-50 transition-colors cursor-pointer ${msg.unread ? 'bg-indigo-50/30' : ''}`}>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-indigo-600">ST</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-900 text-sm">{msg.from}</h3>
                    <span className="text-xs text-gray-400">{msg.time}</span>
                  </div>
                  <p className="font-medium text-gray-800 text-sm mb-1">{msg.subject}</p>
                  <p className="text-sm text-gray-600 line-clamp-2">{msg.message}</p>
                </div>
                {msg.unread && (
                  <div className="w-2 h-2 bg-indigo-600 rounded-full flex-shrink-0 mt-2" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return renderDashboard();
      case 'classes': return renderClasses();
      case 'assignments': return renderAssignments();
      case 'progress': return renderProgress();
      case 'messages': return renderMessages();
      default: return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
              <GraduationCap size={20} className="text-white" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900">ESL Hub</h1>
              <p className="text-xs text-gray-500">Student Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 hover:bg-gray-100 rounded-lg">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-indigo-700">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-700">{user.name}</p>
                <p className="text-xs text-gray-500">{studentData.level}</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="p-2 hover:bg-gray-100 rounded-lg"
              title="Logout"
            >
              <LogOut size={18} className="text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="hidden md:block w-56 flex-shrink-0">
            <nav className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 sticky top-20">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all mb-1 ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="text-sm font-medium">{item.label}</span>
                    {item.id === 'messages' && studentData.messages.filter(m => m.unread).length > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                        {studentData.messages.filter(m => m.unread).length}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Mobile Navigation */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-30">
            <div className="flex justify-around py-2">
              {menuItems.slice(0, 5).map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex flex-col items-center gap-1 px-3 py-1 ${
                      isActive ? 'text-indigo-600' : 'text-gray-400'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="text-xs">{item.label.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <main className="flex-1 pb-20 md:pb-0">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default StudentPortal;
