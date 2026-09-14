import React, { useState } from 'react';
import { Plus, ClipboardCheck, BarChart3, Users, Clock, Filter, Eye, Edit2, Trash2, Copy } from 'lucide-react';
import { quizzes } from '../data/mockData';

const Assessments: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);

  const filteredQuizzes = statusFilter === 'all' ? quizzes : quizzes.filter((q) => q.status === statusFilter);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-700';
      case 'draft': return 'bg-yellow-100 text-yellow-700';
      case 'archived': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Multiple Choice': return '📝';
      case 'Matching': return '🔗';
      case 'Writing': return '✍️';
      case 'Fill in the Blanks': return '📋';
      case 'Mixed': return '🎯';
      default: return '📄';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Assessments</h1>
          <p className="text-gray-500 mt-1">Create quizzes, track scores, and measure progress</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="mt-4 md:mt-0 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium flex items-center gap-2"
        >
          <Plus size={16} /> Create Quiz
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <ClipboardCheck size={18} className="text-blue-600" />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">{quizzes.length}</p>
              <p className="text-xs text-gray-500">Total Quizzes</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <BarChart3 size={18} className="text-green-600" />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">
                {Math.round(quizzes.filter(q => q.averageScore > 0).reduce((acc, q) => acc + q.averageScore, 0) / quizzes.filter(q => q.averageScore > 0).length)}%
              </p>
              <p className="text-xs text-gray-500">Avg. Score</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users size={18} className="text-purple-600" />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">156</p>
              <p className="text-xs text-gray-500">Submissions</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock size={18} className="text-orange-600" />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">45 min</p>
              <p className="text-xs text-gray-500">Avg. Duration</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'published', 'draft', 'archived'].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              statusFilter === status
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Quiz Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredQuizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getTypeIcon(quiz.type)}</span>
                <div>
                  <h3 className="font-semibold text-gray-900">{quiz.title}</h3>
                  <p className="text-sm text-gray-500">{quiz.type}</p>
                </div>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${getStatusBadge(quiz.status)}`}>
                {quiz.status.charAt(0).toUpperCase() + quiz.status.slice(1)}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-gray-50 rounded-lg p-2.5 text-center">
                <p className="text-sm font-bold text-gray-900">{quiz.questions}</p>
                <p className="text-xs text-gray-500">Questions</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2.5 text-center">
                <p className="text-sm font-bold text-gray-900">{quiz.averageScore > 0 ? `${quiz.averageScore}%` : '—'}</p>
                <p className="text-xs text-gray-500">Avg. Score</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2.5 text-center">
                <p className="text-sm font-bold text-gray-900">{quiz.level.substring(0, 3)}.</p>
                <p className="text-xs text-gray-500">Level</p>
              </div>
            </div>

            {quiz.averageScore > 0 && (
              <div className="mb-4">
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      quiz.averageScore >= 80 ? 'bg-green-500' :
                      quiz.averageScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${quiz.averageScore}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <span className="text-xs text-gray-400">Created: {quiz.dateCreated}</span>
              <div className="flex items-center gap-1">
                <button className="p-2 hover:bg-gray-100 rounded-lg" title="View">
                  <Eye size={16} className="text-gray-400" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg" title="Edit">
                  <Edit2 size={16} className="text-gray-400" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg" title="Duplicate">
                  <Copy size={16} className="text-gray-400" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg" title="Delete">
                  <Trash2 size={16} className="text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Quiz Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowCreateModal(false)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Create New Quiz</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Quiz Title</label>
                <input type="text" className="w-full mt-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" placeholder="e.g. Present Perfect Quiz" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">Level</label>
                  <select className="w-full mt-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm">
                    <option>Beginner</option>
                    <option>Elementary</option>
                    <option>Pre-Intermediate</option>
                    <option>Intermediate</option>
                    <option>Upper-Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Question Type</label>
                  <select className="w-full mt-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm">
                    <option>Multiple Choice</option>
                    <option>Fill in the Blanks</option>
                    <option>Matching</option>
                    <option>True/False</option>
                    <option>Writing</option>
                    <option>Mixed</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">Number of Questions</label>
                  <input type="number" className="w-full mt-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" placeholder="20" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Time Limit (minutes)</label>
                  <input type="number" className="w-full mt-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" placeholder="30" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Instructions</label>
                <textarea className="w-full mt-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm h-20 resize-none" placeholder="Add instructions for students..." />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Assign to Students</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {['All Students', 'Beginners', 'Intermediate', 'Advanced'].map((group) => (
                    <button key={group} className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-300 transition-colors">
                      {group}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowCreateModal(false)} className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                Cancel
              </button>
              <button onClick={() => setShowCreateModal(false)} className="flex-1 px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">
                Save as Draft
              </button>
              <button onClick={() => setShowCreateModal(false)} className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                Publish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assessments;
