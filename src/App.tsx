import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import StudentPortal from './components/StudentPortal';
import Dashboard from './components/Dashboard';
import Students from './components/Students';
import Lessons from './components/Lessons';
import VideoConference from './components/VideoConference';
import MiroBoard from './components/MiroBoard';
import Vocabulary from './components/Vocabulary';
import Grammar from './components/Grammar';
import Assessments from './components/Assessments';
import Resources from './components/Resources';
import Calendar from './components/Calendar';
import { Bell, Search, Menu, LogOut } from 'lucide-react';
import { supabase } from './lib/supabase';

interface User {
  name: string;
  role: 'teacher' | 'student';
  email: string;
}

function App() {
    const [supabaseStatus, setSupabaseStatus] = useState('Testing...');

  React.useEffect(() => {
    const testSupabase = async () => {
      try {
        const { error } = await supabase.auth.getSession();

        if (error) {
          setSupabaseStatus(`❌ Supabase error: ${error.message}`);
        } else {
          setSupabaseStatus('✅ Supabase connection successful');
        }
      } catch (error) {
        setSupabaseStatus(
          `❌ Connection failed: ${
            error instanceof Error ? error.message : 'Unknown error'
          }`
        );
      }
    };

    testSupabase();
  }, []);
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showVideoClass, setShowVideoClass] = useState(false);

  const handleLogin = (userData: User) => {
    setUser(userData);
    if (userData.role === 'teacher') {
      setActiveTab('dashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('dashboard');
    setShowVideoClass(false);
  };

  const handleJoinClass = () => {
    setShowVideoClass(true);
  };

  // Show login if no user
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  // Show student portal if student
  if (user.role === 'student') {
    if (showVideoClass) {
      return (
        <div className="relative">
          <button
            onClick={() => setShowVideoClass(false)}
            className="fixed top-4 right-4 z-50 px-4 py-2 bg-white shadow-lg rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            ← Back to Student Portal
          </button>
          <div className="pt-12">
            <VideoConference />
          </div>
        </div>
      );
    }
    return <StudentPortal user={user as User & { role: 'student' }} onLogout={handleLogout} onJoinClass={handleJoinClass} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'students': return <Students />;
      case 'lessons': return <Lessons />;
      case 'video': return <VideoConference />;
      case 'board': return <MiroBoard />;
      case 'vocabulary': return <Vocabulary />;
      case 'grammar': return <Grammar />;
      case 'assessments': return <Assessments />;
      case 'resources': return <Resources />;
      case 'calendar': return <Calendar />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - hidden on mobile unless menu is open */}
      <div className={`hidden lg:block`}>
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />
      </div>

      {/* Mobile Sidebar */}
      <div className={`lg:hidden fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <Sidebar
          activeTab={activeTab}
          setActiveTab={(tab) => { setActiveTab(tab); setMobileMenuOpen(false); }}
          collapsed={false}
          setCollapsed={setSidebarCollapsed}
        />
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100">
          <div className="flex items-center justify-between px-4 md:px-6 py-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu size={20} className="text-gray-600" />
              </button>
              <div className="hidden sm:flex relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search anything..."
                  className="pl-9 pr-4 py-2 w-64 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
              </button>
              <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-gray-200">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-indigo-700">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-700">{user.name.split(' ')[0]}</span>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-gray-100 rounded-lg"
                title="Logout"
              >
                <LogOut size={18} className="text-gray-600" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6 lg:p-8">
  <div className="mb-4 p-3 bg-white border border-gray-200 rounded-lg text-sm">
    <strong>Supabase test:</strong> {supabaseStatus}
  </div>

  {renderContent()}
</main>
      </div>
    </div>
  );
}

export default App;
