import { Settings, Moon, Sun, Sparkles } from 'lucide-react';
import { UserSettings } from '../types';

interface SettingsPanelProps {
  settings: UserSettings;
  onSettingsChange: (settings: UserSettings) => void;
}

export function SettingsPanel({ settings, onSettingsChange }: SettingsPanelProps) {
  const isAutoFloatingEnabled = settings.autoWeekendFloatingHolidays !== false;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Settings</h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center gap-2">
            {settings.darkMode ? (
              <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            ) : (
              <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            )}
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Dark Mode
            </span>
          </div>
          <button
            onClick={() => onSettingsChange({ ...settings, darkMode: !settings.darkMode })}
            className={`
              relative w-12 h-6 rounded-full transition-colors duration-200
              ${settings.darkMode ? 'bg-blue-600' : 'bg-gray-300'}
            `}
          >
            <div
              className={`
                absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200
                ${settings.darkMode ? 'translate-x-6' : 'translate-x-0'}
              `}
            />
          </button>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0" />
            <div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Weekend Floating Holidays
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Auto-grant 8 hours when holidays fall on Sat or Sun
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onSettingsChange({
              ...settings,
              autoWeekendFloatingHolidays: !isAutoFloatingEnabled,
            })}
            className={`
              relative w-12 h-6 rounded-full transition-colors duration-200 shrink-0 ml-2
              ${isAutoFloatingEnabled ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'}
            `}
          >
            <div
              className={`
                absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200
                ${isAutoFloatingEnabled ? 'translate-x-6' : 'translate-x-0'}
              `}
            />
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Total PTO Hours Available
          </label>
          <input
            type="number"
            min="0"
            step="1"
            value={settings.totalPTOHours}
            onChange={(e) => onSettingsChange({
              ...settings,
              totalPTOHours: Number(e.target.value)
            })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Working Hours Per Day
          </label>
          <input
            type="number"
            min="1"
            max="24"
            step="0.5"
            value={settings.hoursPerDay}
            onChange={(e) => onSettingsChange({
              ...settings,
              hoursPerDay: Number(e.target.value)
            })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>
      </div>
    </div>
  );
}
