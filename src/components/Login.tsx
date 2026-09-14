import React, { useState } from 'react';
import { GraduationCap, Mail, Lock, Eye, EyeOff, ArrowRight, User, BookOpen, Users, Video, Sparkles } from 'lucide-react';

interface LoginProps {
  onLogin: (user: { name: string; role: 'teacher' | 'student'; email: string }) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<'teacher' | 'student'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    // Simulate login
    setTimeout(() => {
      if (mode === 'teacher') {
        onLogin({
          name: 'Sarah Thompson',
          role: 'teacher',
          email: email,
        });
      } else {
        // Find student by email or use a default
        const studentNames: Record<string, string> = {
          'maria@email.com': 'Maria García',
          'liwei@email.com': 'Li Wei',
          'ahmed@email.com': 'Ahmed Hassan',
          'yuki@email.com': 'Yuki Tanaka',
          'pierre@email.com': 'Pierre Dubois',
          'anna@email.com': 'Anna Kowalski',
          'raj@email.com': 'Raj Patel',
          'sofia@email.com': 'Sofia Rossi',
        };
        const name = studentNames[email.toLowerCase()] || email.split('@')[0];
        onLogin({
          name,
          role: 'student',
          email: email,
        });
      }
      setIsLoading(false);
    }, 800);
  };

  const quickLogin = (role: 'teacher' | 'student', demoEmail: string) => {
    setMode(role);
    setEmail(demoEmail);
    setPassword('demo123');
    setTimeout(() => {
      if (role === 'teacher') {
        onLogin({ name: 'Sarah Thompson', role: 'teacher', email: demoEmail });
      } else {
        const studentNames: Record<string, string> = {
          'maria@email.com': 'Maria García',
          'liwei@email.com': 'Li Wei',
          'ahmed@email.com': 'Ahmed Hassan',
          'yuki@email.com': 'Yuki Tanaka',
        };
        onLogin({
          name: studentNames[demoEmail] || 'Student',
          role: 'student',
          email: demoEmail,
        });
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-200 rounded-full opacity-20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-200 rounded-full opacity-20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full opacity-10 blur-3xl" />
      </div>

      <div className="relative w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left - Branding */}
        <div className="hidden lg:block space-y-6 p-8">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <GraduationCap size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">ESL Hub</h1>
              <p className="text-sm text-gray-500">The Complete Teaching Platform</p>
            </div>
          </div>

          <div className="space-y-4 mt-12">
            <h2 className="text-4xl font-bold text-gray-900 leading-tight">
              Learn English<br />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Anywhere, Anytime
              </span>
            </h2>
            <p className="text-lg text-gray-600">
              Join live classes, track your progress, and access learning materials all in one place.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-white/60 backdrop-blur rounded-xl p-4 border border-white">
              <Video size={24} className="text-indigo-600 mb-2" />
              <p className="font-semibold text-gray-900">Live Classes</p>
              <p className="text-xs text-gray-500 mt-1">Join video lessons with your teacher</p>
            </div>
            <div className="bg-white/60 backdrop-blur rounded-xl p-4 border border-white">
              <BookOpen size={24} className="text-purple-600 mb-2" />
              <p className="font-semibold text-gray-900">Interactive Lessons</p>
              <p className="text-xs text-gray-500 mt-1">Engaging activities and exercises</p>
            </div>
            <div className="bg-white/60 backdrop-blur rounded-xl p-4 border border-white">
              <Users size={24} className="text-pink-600 mb-2" />
              <p className="font-semibold text-gray-900">Practice Together</p>
              <p className="text-xs text-gray-500 mt-1">Collaborate with classmates</p>
            </div>
            <div className="bg-white/60 backdrop-blur rounded-xl p-4 border border-white">
              <Sparkles size={24} className="text-yellow-600 mb-2" />
              <p className="font-semibold text-gray-900">Track Progress</p>
              <p className="text-xs text-gray-500 mt-1">See how far you've come</p>
            </div>
          </div>
        </div>

        {/* Right - Login Form */}
        <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-gray-100 p-8 w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-6 justify-center">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center">
              <GraduationCap size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">ESL Hub</h1>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Welcome back 👋</h2>
            <p className="text-gray-500 mt-1">Sign in to continue to your account</p>
          </div>

          {/* Role Toggle */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-xl mb-6">
            <button
              onClick={() => setMode('student')}
              className={`py-2.5 rounded-lg text-sm font-medium transition-all ${
                mode === 'student'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🎓 I'm a Student
            </button>
            <button
              onClick={() => setMode('teacher')}
              className={`py-2.5 rounded-lg text-sm font-medium transition-all ${
                mode === 'teacher'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              👩‍🏫 I'm a Teacher
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="relative mt-1">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={mode === 'teacher' ? 'teacher@school.com' : 'student@email.com'}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative mt-1">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <button type="button" className="text-indigo-600 hover:text-indigo-700 font-medium">
                Forgot password?
              </button>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-indigo-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign in as {mode === 'teacher' ? 'Teacher' : 'Student'}
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Demo Quick Login */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-xs text-center text-gray-500 mb-3">Quick demo access</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => quickLogin('teacher', 'sarah@eslhub.com')}
                className="px-3 py-2 text-xs font-medium bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors"
              >
                👩‍🏫 Teacher Demo
              </button>
              <button
                onClick={() => quickLogin('student', 'maria@email.com')}
                className="px-3 py-2 text-xs font-medium bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
              >
                🎓 Student Demo
              </button>
            </div>
          </div>

          <p className="text-center text-xs text-gray-500 mt-6">
            Don't have an account?{' '}
            <button className="text-indigo-600 font-medium hover:text-indigo-700">
              Contact your teacher
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
