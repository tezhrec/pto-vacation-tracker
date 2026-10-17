import { Calendar, Clock, Sparkles } from 'lucide-react';

interface PTOSummaryProps {
  totalHours: number;
  usedHours: number;
  vacationDays: number;
  floatingHours?: number;
}

export function PTOSummary({ totalHours, usedHours, vacationDays, floatingHours }: PTOSummaryProps) {
  const remainingHours = totalHours - usedHours;
  const percentageUsed = totalHours > 0 ? (usedHours / totalHours) * 100 : 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">PTO Summary</h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="font-medium text-gray-700 dark:text-gray-300">Vacation Days Selected</span>
          </div>
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{vacationDays}</span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Progress</span>
            <span className="text-gray-600 dark:text-gray-400">{percentageUsed.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(percentageUsed, 100)}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-2">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">{totalHours}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Total Hours</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Clock className="w-4 h-4 text-orange-500 dark:text-orange-400" />
            </div>
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{usedHours}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Used Hours</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Clock className="w-4 h-4 text-green-500 dark:text-green-400" />
            </div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{remainingHours}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Remaining Hours</div>
          </div>
        </div>

        {floatingHours !== undefined && floatingHours > 0 && (
          <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-900/40 rounded-lg text-sm">
            <span className="font-medium text-purple-800 dark:text-purple-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              Floating Holiday Bank
            </span>
            <span className="font-bold text-purple-700 dark:text-purple-300">
              +{floatingHours} hrs
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
