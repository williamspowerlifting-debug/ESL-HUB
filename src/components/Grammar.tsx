import React, { useState } from 'react';
import { CheckCircle, XCircle, ArrowRight, RotateCcw, BookOpen, Lightbulb } from 'lucide-react';

interface GrammarExercise {
  id: number;
  type: 'fill-blank' | 'multiple-choice' | 'error-correction';
  question: string;
  options?: string[];
  answer: string;
  explanation: string;
  topic: string;
  level: string;
}

const exercises: GrammarExercise[] = [
  {
    id: 1,
    type: 'fill-blank',
    question: 'She ___ to the store yesterday.',
    options: ['go', 'went', 'gone', 'going'],
    answer: 'went',
    explanation: 'We use the past simple "went" for completed actions in the past. "Yesterday" indicates a specific past time.',
    topic: 'Past Simple',
    level: 'Elementary'
  },
  {
    id: 2,
    type: 'multiple-choice',
    question: 'Which sentence is correct?',
    options: [
      'I have been living here since 5 years.',
      'I have been living here for 5 years.',
      'I have been living here since 5 years ago.',
      'I am living here for 5 years.'
    ],
    answer: 'I have been living here for 5 years.',
    explanation: 'We use "for" with a duration of time (5 years) and "since" with a specific point in time. Present perfect continuous is used for actions that started in the past and continue to the present.',
    topic: 'Present Perfect Continuous',
    level: 'Intermediate'
  },
  {
    id: 3,
    type: 'fill-blank',
    question: 'If I ___ rich, I would travel the world.',
    options: ['am', 'was', 'were', 'would be'],
    answer: 'were',
    explanation: 'In second conditional sentences (unreal present), we use "were" for all subjects (I, he, she, etc.). This is the subjunctive mood.',
    topic: 'Conditionals',
    level: 'Intermediate'
  },
  {
    id: 4,
    type: 'error-correction',
    question: 'Find the error: "She don\'t like coffee."',
    options: ['She doesn\'t like coffee.', 'She don\'t likes coffee.', 'She not like coffee.', 'She doesn\'t likes coffee.'],
    answer: 'She doesn\'t like coffee.',
    explanation: 'With third person singular (he/she/it), we use "doesn\'t" + base form of the verb. "Don\'t" is used with I, you, we, they.',
    topic: 'Subject-Verb Agreement',
    level: 'Elementary'
  },
  {
    id: 5,
    type: 'fill-blank',
    question: 'The book ___ by millions of people worldwide.',
    options: ['has read', 'has been read', 'has been reading', 'is reading'],
    answer: 'has been read',
    explanation: 'We use the present perfect passive (has been + past participle) when the focus is on the action and the receiver, not the doer. The book receives the action of reading.',
    topic: 'Passive Voice',
    level: 'Upper-Intermediate'
  },
  {
    id: 6,
    type: 'multiple-choice',
    question: 'Choose the correct reported speech: "I am tired," she said.',
    options: [
      'She said that she is tired.',
      'She said that she was tired.',
      'She said that she has been tired.',
      'She says that she was tired.'
    ],
    answer: 'She said that she was tired.',
    explanation: 'In reported speech, when the reporting verb is in the past tense, we backshift the tense: present simple → past simple. "I am" becomes "she was".',
    topic: 'Reported Speech',
    level: 'Intermediate'
  },
  {
    id: 7,
    type: 'fill-blank',
    question: 'I wish I ___ speak French fluently.',
    options: ['can', 'could', 'will', 'would'],
    answer: 'could',
    explanation: 'After "I wish" for present unreal situations, we use the past simple or "could" for ability. This expresses a desire for something that is not currently true.',
    topic: 'Wishes & Regrets',
    level: 'Upper-Intermediate'
  },
  {
    id: 8,
    type: 'fill-blank',
    question: 'By next year, they ___ the project.',
    options: ['will finish', 'will have finished', 'will be finishing', 'are finishing'],
    answer: 'will have finished',
    explanation: 'We use the future perfect (will have + past participle) for actions that will be completed before a specific time in the future. "By next year" indicates completion before that time.',
    topic: 'Future Perfect',
    level: 'Advanced'
  },
];

const Grammar: React.FC = () => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [topicFilter, setTopicFilter] = useState('All');

  const exercise = exercises[currentExercise];
  const topics = ['All', ...new Set(exercises.map((e) => e.topic))];

  const filteredExercises = topicFilter === 'All' ? exercises : exercises.filter((e) => e.topic === topicFilter);

  const checkAnswer = () => {
    if (!selectedAnswer) return;
    setShowResult(true);
    setAnswered((prev) => prev + 1);
    if (selectedAnswer === exercise.answer) {
      setScore((prev) => prev + 1);
    }
  };

  const nextExercise = () => {
    setCurrentExercise((prev) => (prev + 1) % filteredExercises.length);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const resetQuiz = () => {
    setCurrentExercise(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswered(0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Grammar Practice</h1>
          <p className="text-gray-500 mt-1">Interactive grammar exercises for your students</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-3">
          <div className="bg-white px-4 py-2 rounded-xl border border-gray-200 flex items-center gap-2">
            <BookOpen size={18} className="text-indigo-600" />
            <span className="text-sm font-medium text-gray-700">Score: {score}/{answered}</span>
          </div>
          <button
            onClick={resetQuiz}
            className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-2"
          >
            <RotateCcw size={16} /> Reset
          </button>
        </div>
      </div>

      {/* Topic Filter */}
      <div className="flex gap-2 flex-wrap">
        {topics.map((topic) => (
          <button
            key={topic}
            onClick={() => { setTopicFilter(topic); setCurrentExercise(0); setSelectedAnswer(null); setShowResult(false); }}
            className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              topicFilter === topic
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {topic}
          </button>
        ))}
      </div>

      {/* Exercise Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Progress Bar */}
        <div className="h-1.5 bg-gray-100">
          <div
            className="h-full bg-indigo-500 transition-all duration-300"
            style={{ width: `${((currentExercise + 1) / filteredExercises.length) * 100}%` }}
          />
        </div>

        <div className="p-6 md:p-8">
          {/* Exercise Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="text-xs px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full font-medium">
                {exercise.topic}
              </span>
              <span className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full font-medium">
                {exercise.level}
              </span>
              <span className="text-xs text-gray-400">
                {exercise.type === 'fill-blank' ? 'Fill in the Blank' : exercise.type === 'multiple-choice' ? 'Multiple Choice' : 'Error Correction'}
              </span>
            </div>
            <span className="text-sm text-gray-400">
              {currentExercise + 1} / {filteredExercises.length}
            </span>
          </div>

          {/* Question */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-6">
            <p className="text-xl font-medium text-gray-900">{exercise.question}</p>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {exercise.options?.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === exercise.answer;
              let optionStyle = 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50';

              if (showResult) {
                if (isCorrect) {
                  optionStyle = 'border-green-300 bg-green-50';
                } else if (isSelected && !isCorrect) {
                  optionStyle = 'border-red-300 bg-red-50';
                } else {
                  optionStyle = 'border-gray-200 opacity-50';
                }
              } else if (isSelected) {
                optionStyle = 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200';
              }

              return (
                <button
                  key={index}
                  onClick={() => !showResult && setSelectedAnswer(option)}
                  disabled={showResult}
                  className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all ${optionStyle}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-800">{option}</span>
                    {showResult && isCorrect && <CheckCircle size={18} className="text-green-500" />}
                    {showResult && isSelected && !isCorrect && <XCircle size={18} className="text-red-500" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showResult && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <Lightbulb size={20} className="text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-yellow-800 mb-1">Explanation</p>
                  <p className="text-sm text-yellow-700">{exercise.explanation}</p>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between">
            {!showResult ? (
              <button
                onClick={checkAnswer}
                disabled={!selectedAnswer}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                  selectedAnswer
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Check Answer <ArrowRight size={16} />
              </button>
            ) : (
              <button
                onClick={nextExercise}
                className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors text-sm font-medium flex items-center gap-2"
              >
                Next Exercise <ArrowRight size={16} />
              </button>
            )}

            {/* Score indicator */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-green-700">{score}</span>
              </div>
              <span className="text-xs text-gray-500">correct</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grammar Topics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-3">📚 Tenses</h3>
          <div className="space-y-2">
            {['Present Simple', 'Past Simple', 'Present Perfect', 'Future Tenses'].map((t) => (
              <div key={t} className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{t}</span>
                <span className="text-xs text-indigo-600 font-medium">Practice →</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-3">🔧 Structures</h3>
          <div className="space-y-2">
            {['Conditionals', 'Passive Voice', 'Reported Speech', 'Relative Clauses'].map((t) => (
              <div key={t} className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{t}</span>
                <span className="text-xs text-indigo-600 font-medium">Practice →</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-3">✨ Advanced</h3>
          <div className="space-y-2">
            {['Inversion', 'Cleft Sentences', 'Subjunctive', 'Ellipsis'].map((t) => (
              <div key={t} className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{t}</span>
                <span className="text-xs text-indigo-600 font-medium">Practice →</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grammar;
