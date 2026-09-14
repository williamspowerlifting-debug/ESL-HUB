import React, { useState } from 'react';
import { Search, Download, Star, Filter, Grid, List, FileText, BookOpen, Headphones, Video, Gamepad2, Layout } from 'lucide-react';
import { resources } from '../data/mockData';

const Resources: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredResources = resources.filter((resource) => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.topic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || resource.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'worksheet': return <FileText size={20} className="text-blue-500" />;
      case 'reading': return <BookOpen size={20} className="text-green-500" />;
      case 'audio': return <Headphones size={20} className="text-purple-500" />;
      case 'video': return <Video size={20} className="text-red-500" />;
      case 'game': return <Gamepad2 size={20} className="text-orange-500" />;
      case 'template': return <Layout size={20} className="text-indigo-500" />;
      default: return <FileText size={20} className="text-gray-500" />;
    }
  };

  const getTypeBg = (type: string) => {
    switch (type) {
      case 'worksheet': return 'bg-blue-100';
      case 'reading': return 'bg-green-100';
      case 'audio': return 'bg-purple-100';
      case 'video': return 'bg-red-100';
      case 'game': return 'bg-orange-100';
      case 'template': return 'bg-indigo-100';
      default: return 'bg-gray-100';
    }
  };

  const types = ['all', 'worksheet', 'reading', 'audio', 'video', 'game', 'template'];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={12}
        className={i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Resources Library</h1>
          <p className="text-gray-500 mt-1">Browse and download teaching materials</p>
        </div>
        <button className="mt-4 md:mt-0 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">
          Upload Resource
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2.5 rounded-lg border transition-colors ${viewMode === 'grid' ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'border-gray-200 text-gray-400 hover:bg-gray-50'}`}
          >
            <Grid size={18} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2.5 rounded-lg border transition-colors ${viewMode === 'list' ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'border-gray-200 text-gray-400 hover:bg-gray-50'}`}
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {/* Type Filter */}
      <div className="flex gap-2 flex-wrap">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setTypeFilter(type)}
            className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              typeFilter === type
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Resources Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredResources.map((resource) => (
            <div key={resource.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all group">
              <div className={`w-12 h-12 ${getTypeBg(resource.type)} rounded-xl flex items-center justify-center mb-4`}>
                {getTypeIcon(resource.type)}
              </div>
              <h3 className="font-semibold text-gray-900 text-sm mb-2 group-hover:text-indigo-600 transition-colors">
                {resource.title}
              </h3>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md">{resource.level}</span>
                <span className="text-xs px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-md">{resource.topic}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {renderStars(resource.rating)}
                  <span className="text-xs text-gray-500 ml-1">{resource.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Download size={12} />
                  <span>{resource.downloads}</span>
                </div>
              </div>
              <button className="w-full mt-4 px-3 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-medium hover:bg-indigo-100 transition-colors">
                Download
              </button>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Resource</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Level</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Rating</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Downloads</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredResources.map((resource) => (
                <tr key={resource.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 ${getTypeBg(resource.type)} rounded-lg flex items-center justify-center`}>
                        {getTypeIcon(resource.type)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{resource.title}</p>
                        <p className="text-xs text-gray-500">{resource.topic}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-md capitalize">{resource.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-gray-600">{resource.level}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      {renderStars(resource.rating)}
                      <span className="text-xs text-gray-500 ml-1">{resource.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{resource.downloads}</span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-medium hover:bg-indigo-100 transition-colors">
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Resources;
