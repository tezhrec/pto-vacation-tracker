import { Flag } from 'lucide-react';
import { FederalHoliday, SelectedDay } from '../types';
import { MONTH_NAMES } from '../utils/dateHelpers';

interface FederalHolidayListProps {
  holidays: FederalHoliday[];
  selectedDays: SelectedDay[];
  onHolidayToggle: (holiday: FederalHoliday) => void;
}

export function FederalHolidayList({ holidays, selectedDays, onHolidayToggle }: FederalHolidayListProps) {
  const selectedDatesSet = new Set(selectedDays.map(d => d.date));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
      <div className="flex items-center gap-2 mb-4">
        <Flag className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Federal Holidays</h2>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Select holidays you observe. These days won't count against your PTO.
      </p>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {holidays.map((holiday) => {
          const isSelected = selectedDatesSet.has(holiday.date);

          return (
            <label
              key={holiday.date}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onHolidayToggle(holiday)}
                className="mt-1 w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 dark:border-gray-600 rounded"
              />
              <div className="flex-1">
                <div className="font-medium text-gray-800 dark:text-gray-200">{holiday.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {MONTH_NAMES[holiday.month]} {holiday.day}
                </div>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}
