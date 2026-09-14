import React, { useState } from 'react';
import { Plus, Clock, Users, FileText, CheckCircle, Calendar, Edit2, Trash2 } from 'lucide-react';
import { lessons } from '../data/mockData';

const Lessons: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredLessons = statusFilter === 'all' ? lessons : lessons.filter((l) => l.status === statusFilter);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'scheduled': return 'bg-blue-100 text-blue-700';
      case 'draft': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle size={14} />;
      case 'scheduled': return <Calendar size={14} />;
      case 'draft': return <FileText size={14} />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Lesson Plans</h1>
          <p className="text-gray-500 mt-1">Create, organize, and manage your lesson plans</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="mt-4 md:mt-0 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium flex items-center gap-2"
        >
          <Plus size={16} /> Create Lesson
        </button>
      </div>

      {/* Status Filter */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'draft', 'scheduled', 'completed'].map((status) => (
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
            <span className="ml-2 text-xs opacity-75">
              {status === 'all' ? lessons.length : lessons.filter((l) => l.status === status).length}
            </span>
          </button>
        ))}
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredLessons.map((lesson) => (
          <div key={lesson.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium ${getStatusBadge(lesson.status)}`}>
                    {getStatusIcon(lesson.status)}
                    {lesson.status.charAt(0).toUpperCase() + lesson.status.slice(1)}
                  </span>
                  <span className="text-xs px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full font-medium">
                    {lesson.topic}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{lesson.title}</h3>
              </div>
              <div className="flex gap-1">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Edit2 size={16} className="text-gray-400" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Trash2 size={16} className="text-gray-400" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{lesson.duration} min</span>
              </div>
              <div className="flex items-center gap-1">
                <Users size={14} />
                <span>{lesson.students.length} students</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>{lesson.date}</span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-xs font-medium text-gray-500 mb-2">LEVEL: {lesson.level}</p>
              <div className="flex flex-wrap gap-1">
                {lesson.objectives.slice(0, 2).map((obj, i) => (
                  <span key={i} className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded-md border border-gray-100">
                    {obj.length > 35 ? obj.substring(0, 35) + '...' : obj}
                  </span>
                ))}
                {lesson.objectives.length > 2 && (
                  <span className="text-xs bg-gray-50 text-gray-500 px-2 py-1 rounded-md border border-gray-100">
                    +{lesson.objectives.length - 2} more
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                {lesson.materials.map((material, i) => (
                  <span key={i} className="text-xs bg-purple-50 text-purple-600 px-2 py-1 rounded-md">
                    {material}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Lesson Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowCreateModal(false)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Create New Lesson Plan</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Lesson Title</label>
                <input type="text" className="w-full mt-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" placeholder="e.g. Present Perfect Tense" />
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
                  <label className="text-sm font-medium text-gray-700">Topic</label>
                  <select className="w-full mt-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm">
                    <option>Grammar</option>
                    <option>Vocabulary</option>
                    <option>Reading</option>
                    <option>Writing</option>
                    <option>Speaking</option>
                    <option>Listening</option>
                    <option>Pronunciation</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">Duration (minutes)</label>
                  <input type="number" className="w-full mt-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" placeholder="60" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Date</label>
                  <input type="date" className="w-full mt-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Learning Objectives</label>
                <textarea className="w-full mt-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm h-24 resize-none" placeholder="Enter objectives, one per line..." />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Materials Needed</label>
                <textarea className="w-full mt-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm h-20 resize-none" placeholder="List materials needed..." />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Lesson Notes / Procedure</label>
                <textarea className="w-full mt-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm h-32 resize-none" placeholder="Describe the lesson procedure..." />
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
                Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lessons;
