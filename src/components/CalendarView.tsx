import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { useState, useMemo } from 'react';
import { SelectedDay } from '../types';
import { formatDate, getDaysInMonth, getFirstDayOfMonth, MONTH_NAMES, isWeekend } from '../utils/dateHelpers';

interface CalendarViewProps {
  year: number;
  selectedDays: SelectedDay[];
  onDayToggle: (dateString: string) => void;
  onHalfDayToggle: (dateString: string) => void;
  federalHolidayDates: Set<string>;
}

export function CalendarView({ year, selectedDays, onDayToggle, onHalfDayToggle, federalHolidayDates }: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  const vacationDaysList = useMemo(() => {
    return selectedDays
      .filter(d => !d.isFederalHoliday)
      .map(d => {
        const [yearStr, monthStr, dayStr] = d.date.split('-');
        const date = new Date(parseInt(yearStr), parseInt(monthStr) - 1, parseInt(dayStr));
        return {
          date: d.date,
          dateObj: date,
          month: date.getMonth(),
          day: date.getDate(),
          monthName: MONTH_NAMES[date.getMonth()],
          dayOfWeek: date.toLocaleDateString('en-US', { weekday: 'short' }),
          isHalfDay: d.isHalfDay || false,
        };
      })
      .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime());
  }, [selectedDays]);

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

      {vacationDaysList.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              Selected Vacation Days ({vacationDaysList.length})
            </h3>
          </div>
          <div className="space-y-2">
            {vacationDaysList.map((day) => (
              <div
                key={day.date}
                className="flex items-center gap-2 px-3 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg group"
              >
                <button
                  onClick={() => setCurrentMonth(day.month)}
                  className="flex items-center gap-2 flex-1 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors text-left px-1 -mx-1 py-1"
                >
                  <div className="flex-1">
                    <div className="text-xs font-medium text-blue-600 dark:text-blue-400">
                      {day.dayOfWeek}
                    </div>
                    <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                      {day.monthName} {day.day}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-blue-500 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <div className="flex items-center gap-2 border-l border-blue-200 dark:border-blue-800 pl-2">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={day.isHalfDay}
                      onChange={() => onHalfDayToggle(day.date)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
                    />
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">
                      {day.isHalfDay ? '4h' : '8h'}
                    </span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
