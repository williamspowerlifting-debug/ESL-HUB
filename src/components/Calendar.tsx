import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Clock, Users, MapPin } from 'lucide-react';
import { calendarEvents, students } from '../data/mockData';

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 20)); // January 2026
  const [selectedDate, setSelectedDate] = useState<string | null>('2026-01-20');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getEventsForDate = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return calendarEvents.filter((e) => e.date === dateStr);
  };

  const selectedDateEvents = selectedDate
    ? calendarEvents.filter((e) => e.date === selectedDate)
    : [];

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const getStudentName = (id: string) => {
    return students.find((s) => s.id === id)?.name || 'Unknown';
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'class': return '📚 Class';
      case 'meeting': return '🤝 Meeting';
      case 'assessment': return '📝 Assessment';
      case 'deadline': return '⏰ Deadline';
      default: return type;
    }
  };

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
          <p className="text-gray-500 mt-1">Schedule and manage your classes</p>
        </div>
        <button className="mt-4 md:mt-0 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium flex items-center gap-2">
          <Plus size={16} /> Schedule Class
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6">
            <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
            <h2 className="text-lg font-semibold text-gray-900">
              {monthNames[month]} {year}
            </h2>
            <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ChevronRight size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day) => (
              <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => {
              if (day === null) {
                return <div key={`empty-${index}`} className="h-20" />;
              }

              const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const dayEvents = getEventsForDate(day);
              const isSelected = selectedDate === dateStr;
              const isToday = dateStr === '2026-01-20';

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`h-20 p-1.5 rounded-xl text-left transition-all ${
                    isSelected
                      ? 'bg-indigo-50 border-2 border-indigo-300'
                      : isToday
                      ? 'bg-indigo-100 border-2 border-indigo-400'
                      : 'hover:bg-gray-50 border-2 border-transparent'
                  }`}
                >
                  <span className={`text-sm font-medium ${
                    isToday ? 'text-indigo-700' : 'text-gray-700'
                  }`}>
                    {day}
                  </span>
                  <div className="mt-1 space-y-0.5">
                    {dayEvents.slice(0, 2).map((event) => (
                      <div
                        key={event.id}
                        className={`text-[10px] px-1 py-0.5 rounded truncate text-white ${event.color}`}
                      >
                        {event.title.split(' - ')[0].substring(0, 12)}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-[10px] text-gray-500 pl-1">
                        +{dayEvents.length - 2} more
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-4 flex flex-wrap gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-xs text-gray-500">Class</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-xs text-gray-500">Meeting</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-pink-500" />
              <span className="text-xs text-gray-500">Assessment</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="text-xs text-gray-500">Deadline</span>
            </div>
          </div>
        </div>

        {/* Events Sidebar */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {selectedDate
              ? `Events for ${new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
              : 'Select a date'}
          </h3>

          {selectedDateEvents.length > 0 ? (
            <div className="space-y-3">
              {selectedDateEvents.map((event) => (
                <div key={event.id} className="p-4 rounded-xl border border-gray-100 hover:shadow-sm transition-all">
                  <div className="flex items-start gap-3">
                    <div className={`w-3 h-3 rounded-full mt-1.5 ${event.color}`} />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">{event.title}</h4>
                      <div className="mt-2 space-y-1.5">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock size={12} />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>{getTypeLabel(event.type)}</span>
                        </div>
                        {event.students.length > 0 && (
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Users size={12} />
                            <span>{event.students.length} students</span>
                          </div>
                        )}
                      </div>
                      {event.students.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1">
                          {event.students.map((studentId) => (
                            <span key={studentId} className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                              {getStudentName(studentId).split(' ')[0]}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-3">📅</div>
              <p className="text-sm text-gray-500">No events scheduled</p>
              <button className="mt-3 text-sm text-indigo-600 font-medium hover:text-indigo-700">
                + Add event
              </button>
            </div>
          )}

          {/* Weekly Overview */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <h4 className="text-sm font-medium text-gray-700 mb-3">This Week</h4>
            <div className="space-y-2">
              {calendarEvents.slice(0, 5).map((event) => (
                <div key={event.id} className="flex items-center gap-2 text-xs">
                  <div className={`w-2 h-2 rounded-full ${event.color}`} />
                  <span className="text-gray-500 w-12">{event.date.split('-')[2]}</span>
                  <span className="text-gray-700 truncate flex-1">{event.title.split(' - ')[0]}</span>
                  <span className="text-gray-400">{event.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
