# 🎓 ESL Teacher Hub

A comprehensive teaching platform designed for ESL (English as a Second Language) teachers to manage students, plan lessons, and conduct virtual classes.

![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-blue)
![Vite](https://img.shields.io/badge/Vite-6-purple)

## ✨ Features

### 📊 Dashboard
- Overview of student statistics and progress
- Upcoming classes and recent activity feed
- Quick actions for common tasks
- Level distribution visualization

### 👥 Student Management
- Student profiles with progress tracking
- Search and filter by level
- Teacher notes per student
- Add/edit student information

### 📚 Lesson Plans
- Create and organize lesson plans
- Track lesson status (draft, scheduled, completed)
- Define learning objectives and materials
- Assign lessons to specific students

### 🎥 Video Conferencing
- Live video classroom with participant grid
- Screen sharing and interactive whiteboard
- Real-time chat with private messaging
- Hand raising and emoji reactions
- Recording capabilities
- Breakout room support
- Participant management controls

### 🧠 Vocabulary Builder
- Interactive flashcards with flip animation
- Searchable word lists
- Filter by category and level
- Audio pronunciation support

### ✍️ Grammar Practice
- Interactive grammar exercises
- Multiple question types (fill-in-blank, multiple choice, error correction)
- Instant feedback with explanations
- Topic-based filtering
- Score tracking

### 📝 Assessments
- Create and manage quizzes
- Track average scores
- Multiple question types
- Assign to student groups
- Publish/archive workflow

### 📁 Resources Library
- Browse teaching materials
- Grid and list views
- Filter by type (worksheets, reading, audio, video, games, templates)
- Ratings and download tracking

### 📅 Calendar
- Monthly calendar view
- Color-coded events (classes, meetings, assessments, deadlines)
- Event details sidebar
- Schedule new classes

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/esl-teacher-hub.git
cd esl-teacher-hub
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Styling
- **Lucide React** - Icons

## 📁 Project Structure

```
src/
├── components/
│   ├── Sidebar.tsx          # Navigation sidebar
│   ├── Dashboard.tsx        # Main dashboard
│   ├── Students.tsx         # Student management
│   ├── Lessons.tsx          # Lesson plans
│   ├── VideoConference.tsx  # Video conferencing
│   ├── Vocabulary.tsx       # Vocabulary builder
│   ├── Grammar.tsx          # Grammar exercises
│   ├── Assessments.tsx      # Quiz management
│   ├── Resources.tsx        # Resource library
│   └── Calendar.tsx         # Calendar view
├── data/
│   └── mockData.ts          # Mock data and types
├── App.tsx                  # Main app component
├── main.tsx                 # Entry point
└── index.css                # Global styles
```

## 🎯 Future Enhancements

- [ ] Backend API integration
- [ ] Real-time video with WebRTC
- [ ] Student authentication
- [ ] Progress analytics dashboard
- [ ] Mobile app version
- [ ] AI-powered lesson suggestions
- [ ] Parent portal
- [ ] Multi-language interface

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 👩‍🏫 About

Built for ESL teachers who want an all-in-one platform to manage their teaching workflow, from lesson planning to virtual classroom delivery.
