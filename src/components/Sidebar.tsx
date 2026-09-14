import React from 'react';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Brain,
  PenTool,
  ClipboardCheck,
  FolderOpen,
  Calendar,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  Video,
  StickyNote,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'students', label: 'Students', icon: Users },
  { id: 'lessons', label: 'Lesson Plans', icon: BookOpen },
  { id: 'video', label: 'Video Class', icon: Video },
  { id: 'board', label: 'Lesson Board', icon: StickyNote },
  { id: 'vocabulary', label: 'Vocabulary', icon: Brain },
  { id: 'grammar', label: 'Grammar', icon: PenTool },
  { id: 'assessments', label: 'Assessments', icon: ClipboardCheck },
  { id: 'resources', label: 'Resources', icon: FolderOpen },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
];

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, collapsed, setCollapsed }) => {
  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-gradient-to-b from-indigo-900 to-purple-900 text-white transition-all duration-300 z-50 flex flex-col ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <GraduationCap size={24} className="text-yellow-300" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">ESL Hub</h1>
              <p className="text-xs text-indigo-200">Teacher Platform</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mx-auto">
            <GraduationCap size={24} className="text-yellow-300" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-white/20 text-white shadow-lg shadow-indigo-500/20'
                  : 'text-indigo-200 hover:bg-white/10 hover:text-white'
              } ${collapsed ? 'justify-center' : ''}`}
              title={collapsed ? item.label : undefined}
            >
              <Icon size={20} className={isActive ? 'text-yellow-300' : ''} />
              {!collapsed && <span className="font-medium text-sm">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Collapse Button */}
      <div className="p-3 border-t border-white/10">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-indigo-200 hover:bg-white/10 hover:text-white transition-all"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          {!collapsed && <span className="text-sm">Collapse</span>}
        </button>
      </div>

      {/* User Profile */}
      {!collapsed && (
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-indigo-500 rounded-full flex items-center justify-center text-sm font-bold">
              ST
            </div>
            <div>
              <p className="text-sm font-medium">Sarah Thompson</p>
              <p className="text-xs text-indigo-300">ESL Teacher</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
