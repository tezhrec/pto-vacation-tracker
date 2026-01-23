import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { SelectedDay } from '../types';
import { formatDate, getDaysInMonth, getFirstDayOfMonth, MONTH_NAMES, isWeekend } from '../utils/dateHelpers';

interface CalendarViewProps {
  year: number;
  selectedDays: SelectedDay[];
  onDayToggle: (dateString: string) => void;
  federalHolidayDates: Set<string>;
}

export function CalendarView({ year, selectedDays, onDayToggle, federalHolidayDates }: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  const daysInMonth = getDaysInMonth(year, currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(year, currentMonth);

  const selectedDatesSet = new Set(selectedDays.map(d => d.date));

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="aspect-square" />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, currentMonth, day);
    const dateString = formatDate(date);
    const isSelected = selectedDatesSet.has(dateString);
    const isFederalHoliday = federalHolidayDates.has(dateString);
    const isWeekendDay = isWeekend(date);

    days.push(
      <button
        key={day}
        onClick={() => onDayToggle(dateString)}
        className={`
          aspect-square rounded-lg border-2 transition-all duration-200 hover:scale-105
          ${isSelected && isFederalHoliday ? 'bg-emerald-500 border-emerald-600 text-white font-semibold' : ''}
          ${isSelected && !isFederalHoliday ? 'bg-blue-500 border-blue-600 text-white font-semibold' : ''}
          ${!isSelected && isFederalHoliday ? 'bg-emerald-50 dark:bg-emerald-900 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300' : ''}
          ${!isSelected && !isFederalHoliday && isWeekendDay ? 'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400' : ''}
          ${!isSelected && !isFederalHoliday && !isWeekendDay ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-300 dark:hover:border-blue-500' : ''}
        `}
      >
        {day}
      </button>
    );
  }

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handlePrevMonth}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          {MONTH_NAMES[currentMonth]} {year}
        </h2>

        <button
          onClick={handleNextMonth}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days}
      </div>

      <div className="mt-6 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span className="text-gray-600 dark:text-gray-400">Vacation Day</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-emerald-500 rounded"></div>
          <span className="text-gray-600 dark:text-gray-400">Federal Holiday</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-100 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded"></div>
          <span className="text-gray-600 dark:text-gray-400">Weekend</span>
        </div>
      </div>
    </div>
  );
}
