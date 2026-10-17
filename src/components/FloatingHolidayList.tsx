import { Sparkles, Calendar, Clock } from 'lucide-react';
import { FloatingHoliday } from '../types';
import { MONTH_NAMES } from '../utils/dateHelpers';

interface FloatingHolidayListProps {
  floatingHolidays: FloatingHoliday[];
  year: number;
  enabled?: boolean;
}

export function FloatingHolidayList({ floatingHolidays, year, enabled = true }: FloatingHolidayListProps) {
  const totalHours = enabled
    ? floatingHolidays.reduce((sum, h) => sum + h.hours, 0)
    : 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Floating Holidays
          </h2>
        </div>
        {enabled && floatingHolidays.length > 0 && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300">
            <Clock className="w-3.5 h-3.5" />
            {totalHours} hrs ({floatingHolidays.length} {floatingHolidays.length === 1 ? 'day' : 'days'})
          </span>
        )}
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        {enabled
          ? 'Awarded 8 hours automatically whenever a federal holiday falls on a Saturday or Sunday.'
          : 'Automatic floating holidays for weekend holidays is currently disabled in Settings.'}
      </p>

      {!enabled ? (
        <div className="text-sm text-gray-500 dark:text-gray-400 italic p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center">
          Enable "Weekend Floating Holidays" in Settings to automatically generate floating holiday hours.
        </div>
      ) : floatingHolidays.length === 0 ? (
        <div className="text-sm text-gray-500 dark:text-gray-400 italic p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center">
          No federal holidays fall on a weekend in {year}.
        </div>
      ) : (
        <div className="space-y-2.5">
          {floatingHolidays.map((holiday) => (
            <div
              key={holiday.date}
              className="flex items-center justify-between p-3 bg-purple-50/60 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40 rounded-lg transition-colors"
            >
              <div className="space-y-1">
                <div className="font-medium text-gray-800 dark:text-gray-200 text-sm">
                  {holiday.name}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <Calendar className="w-3.5 h-3.5 text-purple-500" />
                  <span>
                    {MONTH_NAMES[holiday.month]} {holiday.day}, {year}
                  </span>
                  <span className="inline-block px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 font-medium text-[11px]">
                    {holiday.dayOfWeek}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 px-2.5 py-1 bg-white dark:bg-gray-800 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 font-bold text-sm rounded shadow-sm">
                +{holiday.hours}h
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
