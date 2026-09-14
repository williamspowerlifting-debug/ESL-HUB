import React, { useState } from 'react';
import { Plus, Search, RotateCcw, ChevronLeft, ChevronRight, Volume2, Star } from 'lucide-react';
import { vocabulary } from '../data/mockData';

const Vocabulary: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'flashcards'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'General', 'Academic', 'Daily Life', 'Nature', 'Business'];

  const filteredWords = vocabulary.filter((word) => {
    const matchesSearch = word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      word.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || word.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCard((prev) => (prev + 1) % filteredWords.length);
    }, 150);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCard((prev) => (prev - 1 + filteredWords.length) % filteredWords.length);
    }, 150);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vocabulary Builder</h1>
          <p className="text-gray-500 mt-1">Create word lists and interactive flashcards</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'list' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 border border-gray-200'
            }`}
          >
            Word List
          </button>
          <button
            onClick={() => setViewMode('flashcards')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'flashcards' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 border border-gray-200'
            }`}
          >
            Flashcards
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center gap-2">
            <Plus size={16} /> Add Word
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search words..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {viewMode === 'list' ? (
        /* Word List View */
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Word</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Definition</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Part of Speech</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredWords.map((word) => (
                  <tr key={word.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">{word.word}</span>
                        <button className="text-gray-400 hover:text-indigo-600">
                          <Volume2 size={14} />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">{word.definition}</td>
                    <td className="px-6 py-4">
                      <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-md">{word.partOfSpeech}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs px-2 py-1 bg-indigo-50 text-indigo-700 rounded-md">{word.level}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-md">{word.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="text-gray-400 hover:text-yellow-500">
                          <Star size={16} />
                        </button>
                        <button className="text-gray-400 hover:text-indigo-600">
                          <RotateCcw size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Flashcard View */
        <div className="flex flex-col items-center">
          <div className="w-full max-w-lg">
            {/* Card Counter */}
            <div className="text-center mb-4">
              <span className="text-sm text-gray-500">
                Card {currentCard + 1} of {filteredWords.length}
              </span>
            </div>

            {/* Flashcard */}
            <div
              className="relative w-full h-72 cursor-pointer perspective-1000"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <div className={`w-full h-full transition-all duration-500 transform-style-3d relative ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
                {/* Front */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-xl flex flex-col items-center justify-center p-8 backface-hidden">
                  <span className="text-xs text-white/70 mb-2 uppercase tracking-wider">
                    {filteredWords[currentCard]?.partOfSpeech}
                  </span>
                  <h2 className="text-4xl font-bold text-white mb-4">
                    {filteredWords[currentCard]?.word}
                  </h2>
                  <span className="text-sm text-white/80 bg-white/20 px-3 py-1 rounded-full">
                    {filteredWords[currentCard]?.level}
                  </span>
                  <p className="text-xs text-white/60 mt-6">Click to reveal definition</p>
                </div>

                {/* Back */}
                <div className="absolute inset-0 bg-white rounded-2xl shadow-xl flex flex-col items-center justify-center p-8 [transform:rotateY(180deg)] backface-hidden border-2 border-indigo-100">
                  <span className="text-xs text-indigo-600 mb-3 uppercase tracking-wider font-medium">Definition</span>
                  <p className="text-lg text-gray-800 text-center mb-4">
                    {filteredWords[currentCard]?.definition}
                  </p>
                  <div className="w-full bg-indigo-50 rounded-xl p-3">
                    <p className="text-xs text-indigo-600 font-medium mb-1">Example:</p>
                    <p className="text-sm text-gray-700 italic">
                      "{filteredWords[currentCard]?.example}"
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={prevCard}
                className="p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
              >
                <ChevronLeft size={20} className="text-gray-600" />
              </button>
              <button
                onClick={() => setIsFlipped(!isFlipped)}
                className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors text-sm font-medium shadow-sm"
              >
                {isFlipped ? 'Show Word' : 'Show Definition'}
              </button>
              <button
                onClick={nextCard}
                className="p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
              >
                <ChevronRight size={20} className="text-gray-600" />
              </button>
            </div>

            {/* Progress dots */}
            <div className="flex justify-center gap-1.5 mt-6">
              {filteredWords.map((_, index) => (
                <button
                  key={index}
                  onClick={() => { setCurrentCard(index); setIsFlipped(false); }}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    index === currentCard ? 'bg-indigo-600' : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vocabulary;
