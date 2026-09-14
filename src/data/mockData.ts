export interface Student {
  id: string;
  name: string;
  level: 'Beginner' | 'Elementary' | 'Pre-Intermediate' | 'Intermediate' | 'Upper-Intermediate' | 'Advanced';
  nativeLanguage: string;
  avatar: string;
  progress: number;
  lessonsCompleted: number;
  totalLessons: number;
  lastActive: string;
  email: string;
  notes: string;
}

export interface Lesson {
  id: string;
  title: string;
  level: string;
  topic: string;
  duration: number;
  objectives: string[];
  materials: string[];
  status: 'draft' | 'scheduled' | 'completed';
  date: string;
  students: string[];
}

export interface VocabularyWord {
  id: string;
  word: string;
  definition: string;
  example: string;
  partOfSpeech: string;
  level: string;
  category: string;
}

export interface Quiz {
  id: string;
  title: string;
  level: string;
  questions: number;
  type: string;
  status: 'draft' | 'published' | 'archived';
  averageScore: number;
  dateCreated: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'class' | 'meeting' | 'assessment' | 'deadline';
  students: string[];
  color: string;
}

export interface Resource {
  id: string;
  title: string;
  type: 'worksheet' | 'reading' | 'audio' | 'video' | 'game' | 'template';
  level: string;
  topic: string;
  downloads: number;
  rating: number;
}

export const students: Student[] = [
  { id: '1', name: 'Maria García', level: 'Intermediate', nativeLanguage: 'Spanish', avatar: '👩‍🎓', progress: 72, lessonsCompleted: 18, totalLessons: 25, lastActive: '2 hours ago', email: 'maria@email.com', notes: 'Strong in reading, needs more speaking practice' },
  { id: '2', name: 'Li Wei', level: 'Upper-Intermediate', nativeLanguage: 'Chinese', avatar: '👨‍🎓', progress: 85, lessonsCompleted: 21, totalLessons: 25, lastActive: '1 day ago', email: 'liwei@email.com', notes: 'Excellent pronunciation, working on academic writing' },
  { id: '3', name: 'Ahmed Hassan', level: 'Beginner', nativeLanguage: 'Arabic', avatar: '👨‍💼', progress: 35, lessonsCompleted: 7, totalLessons: 20, lastActive: '3 hours ago', email: 'ahmed@email.com', notes: 'Very motivated, struggling with verb tenses' },
  { id: '4', name: 'Yuki Tanaka', level: 'Pre-Intermediate', nativeLanguage: 'Japanese', avatar: '👩‍💻', progress: 58, lessonsCompleted: 14, totalLessons: 24, lastActive: '5 hours ago', email: 'yuki@email.com', notes: 'Good grammar foundation, needs vocabulary expansion' },
  { id: '5', name: 'Pierre Dubois', level: 'Advanced', nativeLanguage: 'French', avatar: '👨‍🏫', progress: 92, lessonsCompleted: 23, totalLessons: 25, lastActive: '1 hour ago', email: 'pierre@email.com', notes: 'Near-native fluency, focusing on idiomatic expressions' },
  { id: '6', name: 'Anna Kowalski', level: 'Elementary', nativeLanguage: 'Polish', avatar: '👩‍🔬', progress: 45, lessonsCompleted: 9, totalLessons: 20, lastActive: '1 day ago', email: 'anna@email.com', notes: 'Shy speaker, building confidence in conversation' },
  { id: '7', name: 'Raj Patel', level: 'Intermediate', nativeLanguage: 'Hindi', avatar: '👨‍💻', progress: 68, lessonsCompleted: 17, totalLessons: 25, lastActive: '4 hours ago', email: 'raj@email.com', notes: 'Strong business English skills, needs informal English' },
  { id: '8', name: 'Sofia Rossi', level: 'Pre-Intermediate', nativeLanguage: 'Italian', avatar: '👩‍🎨', progress: 52, lessonsCompleted: 13, totalLessons: 25, lastActive: '6 hours ago', email: 'sofia@email.com', notes: 'Creative learner, responds well to visual materials' },
];

export const lessons: Lesson[] = [
  { id: '1', title: 'Present Perfect vs Past Simple', level: 'Intermediate', topic: 'Grammar', duration: 60, objectives: ['Distinguish between present perfect and past simple', 'Use both tenses correctly in context', 'Complete gap-fill exercises'], materials: ['Worksheet PDF', 'Audio clips', 'Flashcards'], status: 'completed', date: '2026-01-15', students: ['1', '4', '7'] },
  { id: '2', title: 'Travel & Tourism Vocabulary', level: 'Pre-Intermediate', topic: 'Vocabulary', duration: 45, objectives: ['Learn 30 travel-related words', 'Practice booking conversations', 'Role-play airport scenarios'], materials: ['Picture cards', 'Dialogue scripts', 'Video'], status: 'scheduled', date: '2026-01-20', students: ['3', '4', '8'] },
  { id: '3', title: 'Academic Writing: Essay Structure', level: 'Upper-Intermediate', topic: 'Writing', duration: 90, objectives: ['Understand essay structure', 'Write thesis statements', 'Use linking words effectively'], materials: ['Sample essays', 'Writing template', 'Peer review guide'], status: 'scheduled', date: '2026-01-21', students: ['2', '5'] },
  { id: '4', title: 'Phrasal Verbs in Daily Life', level: 'Intermediate', topic: 'Vocabulary', duration: 60, objectives: ['Learn 20 common phrasal verbs', 'Use phrasal verbs in sentences', 'Understand register differences'], materials: ['Flashcards', 'Context sentences', 'Matching game'], status: 'draft', date: '2026-01-22', students: ['1', '7', '8'] },
  { id: '5', title: 'Pronunciation: Word Stress', level: 'Beginner', topic: 'Pronunciation', duration: 45, objectives: ['Understand stress patterns', 'Practice multisyllabic words', 'Record and compare pronunciation'], materials: ['Audio recordings', 'Stress pattern charts', 'Minimal pairs'], status: 'scheduled', date: '2026-01-23', students: ['3', '6'] },
  { id: '6', title: 'Business Email Writing', level: 'Advanced', topic: 'Writing', duration: 60, objectives: ['Write professional emails', 'Use appropriate tone', 'Master common business phrases'], materials: ['Email templates', 'Sample correspondence', 'Checklist'], status: 'completed', date: '2026-01-14', students: ['2', '5', '7'] },
];

export const vocabulary: VocabularyWord[] = [
  { id: '1', word: 'Accomplish', definition: 'To achieve or complete successfully', example: 'She accomplished all her goals this year.', partOfSpeech: 'verb', level: 'Intermediate', category: 'General' },
  { id: '2', word: 'Breakthrough', definition: 'A sudden important discovery or development', example: 'The scientists made a breakthrough in cancer research.', partOfSpeech: 'noun', level: 'Upper-Intermediate', category: 'Academic' },
  { id: '3', word: 'Convenient', definition: 'Fitting in well with someone\'s needs or plans', example: 'Is 3 PM a convenient time for our meeting?', partOfSpeech: 'adjective', level: 'Elementary', category: 'Daily Life' },
  { id: '4', word: 'Determine', definition: 'To discover the facts about something; to decide', example: 'We need to determine the cause of the problem.', partOfSpeech: 'verb', level: 'Intermediate', category: 'Academic' },
  { id: '5', word: 'Environment', definition: 'The natural world; the conditions we live in', example: 'We should protect the environment.', partOfSpeech: 'noun', level: 'Elementary', category: 'Nature' },
  { id: '6', word: 'Fluctuate', definition: 'To change frequently in size or amount', example: 'Prices fluctuate depending on demand.', partOfSpeech: 'verb', level: 'Advanced', category: 'Business' },
  { id: '7', word: 'Genuine', definition: 'Real; exactly what it appears to be; sincere', example: 'She showed genuine concern for his wellbeing.', partOfSpeech: 'adjective', level: 'Intermediate', category: 'General' },
  { id: '8', word: 'Hypothesis', definition: 'An idea or explanation that has not yet been proved', example: 'The scientist tested her hypothesis with an experiment.', partOfSpeech: 'noun', level: 'Advanced', category: 'Academic' },
];

export const quizzes: Quiz[] = [
  { id: '1', title: 'Present Perfect Tense Quiz', level: 'Intermediate', questions: 20, type: 'Multiple Choice', status: 'published', averageScore: 78, dateCreated: '2026-01-10' },
  { id: '2', title: 'Travel Vocabulary Test', level: 'Pre-Intermediate', questions: 15, type: 'Matching', status: 'published', averageScore: 82, dateCreated: '2026-01-12' },
  { id: '3', title: 'Academic Writing Assessment', level: 'Upper-Intermediate', questions: 10, type: 'Writing', status: 'draft', averageScore: 0, dateCreated: '2026-01-18' },
  { id: '4', title: 'Phrasal Verbs Challenge', level: 'Intermediate', questions: 25, type: 'Fill in the Blanks', status: 'published', averageScore: 65, dateCreated: '2026-01-08' },
  { id: '5', title: 'Business English Final', level: 'Advanced', questions: 30, type: 'Mixed', status: 'archived', averageScore: 88, dateCreated: '2025-12-20' },
];

export const calendarEvents: CalendarEvent[] = [
  { id: '1', title: 'Grammar Class - Maria, Yuki, Raj', date: '2026-01-20', time: '09:00', type: 'class', students: ['1', '4', '7'], color: 'bg-blue-500' },
  { id: '2', title: 'Vocabulary Session - Ahmed, Yuki, Sofia', date: '2026-01-20', time: '14:00', type: 'class', students: ['3', '4', '8'], color: 'bg-green-500' },
  { id: '3', title: 'Writing Workshop - Li Wei, Pierre', date: '2026-01-21', time: '10:00', type: 'class', students: ['2', '5'], color: 'bg-purple-500' },
  { id: '4', title: 'Pronunciation Practice - Ahmed, Anna', date: '2026-01-23', time: '11:00', type: 'class', students: ['3', '6'], color: 'bg-orange-500' },
  { id: '5', title: 'Monthly Progress Review', date: '2026-01-25', time: '15:00', type: 'meeting', students: [], color: 'bg-red-500' },
  { id: '6', title: 'Quiz Deadline - Phrasal Verbs', date: '2026-01-22', time: '23:59', type: 'deadline', students: [], color: 'bg-yellow-500' },
  { id: '7', title: 'Assessment Day - All Students', date: '2026-01-27', time: '09:00', type: 'assessment', students: ['1', '2', '3', '4', '5', '6', '7', '8'], color: 'bg-pink-500' },
];

export const resources: Resource[] = [
  { id: '1', title: 'Present Perfect Worksheet Pack', type: 'worksheet', level: 'Intermediate', topic: 'Grammar', downloads: 234, rating: 4.5 },
  { id: '2', title: 'Short Stories for ESL Learners', type: 'reading', level: 'Pre-Intermediate', topic: 'Reading', downloads: 189, rating: 4.8 },
  { id: '3', title: 'Pronunciation Guide - TH Sounds', type: 'audio', level: 'Beginner', topic: 'Pronunciation', downloads: 312, rating: 4.3 },
  { id: '4', title: 'Daily Conversation Videos', type: 'video', level: 'Elementary', topic: 'Speaking', downloads: 456, rating: 4.7 },
  { id: '5', title: 'Vocabulary Bingo Game', type: 'game', level: 'Beginner', topic: 'Vocabulary', downloads: 178, rating: 4.6 },
  { id: '6', title: 'Lesson Plan Template - PPP', type: 'template', level: 'All Levels', topic: 'Planning', downloads: 567, rating: 4.9 },
  { id: '7', title: 'Business Email Templates', type: 'worksheet', level: 'Advanced', topic: 'Business English', downloads: 298, rating: 4.4 },
  { id: '8', title: 'Idioms Flashcards Set', type: 'game', level: 'Upper-Intermediate', topic: 'Vocabulary', downloads: 145, rating: 4.2 },
  { id: '9', title: 'Reading Comprehension - News Articles', type: 'reading', level: 'Intermediate', topic: 'Reading', downloads: 223, rating: 4.6 },
  { id: '10', title: 'Grammar Reference Charts', type: 'template', level: 'All Levels', topic: 'Grammar', downloads: 678, rating: 4.8 },
];
