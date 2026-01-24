import { useMemo, useEffect, useRef, useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { UserSettings, SelectedDay } from './types';
import { SettingsPanel } from './components/SettingsPanel';
import { PTOSummary } from './components/PTOSummary';
import { CalendarView } from './components/CalendarView';
import { FederalHolidayList } from './components/FederalHolidayList';
import { getFederalHolidaysForYear } from './utils/federalHolidays';
import { exportToCSV, importFromCSV } from './utils/csvHelpers';
import { Download, Upload, AlertCircle, CheckCircle, Github, Calendar } from 'lucide-react';

function App() {
  const currentYear = new Date().getFullYear();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const [settings, setSettings] = useLocalStorage<UserSettings>('pto-settings', {
    totalPTOHours: 120,
    hoursPerDay: 8,
    darkMode: false,
  });

  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.darkMode]);

  const [selectedDays, setSelectedDays] = useLocalStorage<SelectedDay[]>('pto-selected-days', []);

  const federalHolidays = useMemo(() => {
    return getFederalHolidaysForYear(selectedYear);
  }, [selectedYear]);

  const federalHolidayDates = useMemo(() => {
    return new Set(federalHolidays.map(h => h.date));
  }, [federalHolidays]);

  const handleDayToggle = (dateString: string) => {
    const existingDay = selectedDays.find(d => d.date === dateString);

    if (existingDay) {
      setSelectedDays(selectedDays.filter(d => d.date !== dateString));
    } else {
      const isFederalHoliday = federalHolidayDates.has(dateString);
      setSelectedDays([...selectedDays, { date: dateString, isFederalHoliday }]);
    }
  };

  const handleHolidayToggle = (holiday: typeof federalHolidays[0]) => {
    const existingDay = selectedDays.find(d => d.date === holiday.date);

    if (existingDay) {
      setSelectedDays(selectedDays.filter(d => d.date !== holiday.date));
    } else {
      setSelectedDays([...selectedDays, { date: holiday.date, isFederalHoliday: true }]);
    }
  };

  const handleHalfDayToggle = (dateString: string) => {
    setSelectedDays(selectedDays.map(d =>
      d.date === dateString ? { ...d, isHalfDay: !d.isHalfDay } : d
    ));
  };

  const vacationDaysCount = selectedDays.filter(d => !d.isFederalHoliday).length;
  const usedHours = selectedDays
    .filter(d => !d.isFederalHoliday)
    .reduce((total, day) => {
      const hours = day.isHalfDay ? settings.hoursPerDay / 2 : settings.hoursPerDay;
      return total + hours;
    }, 0);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleExport = () => {
    try {
      if (selectedDays.length === 0) {
        showNotification('error', 'No vacation days to export');
        return;
      }
      exportToCSV(selectedDays, selectedYear);
      showNotification('success', `Exported ${selectedDays.length} vacation days`);
    } catch (error) {
      showNotification('error', 'Failed to export data');
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const importedDays = await importFromCSV(file);
      setSelectedDays(importedDays);
      showNotification('success', `Imported ${importedDays.length} vacation days`);
    } catch (error) {
      showNotification('error', error instanceof Error ? error.message : 'Failed to import data');
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">PTO Vacation Tracker</h1>
              <a
                href="https://github.com/tezhrec/pto-vacation-tracker"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>View on GitHub</span>
              </a>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleImportClick}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
              >
                <Upload className="w-4 h-4" />
                <span className="font-medium">Import CSV</span>
              </button>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span className="font-medium">Export CSV</span>
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition-colors">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Planning Year:</span>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-medium"
              >
                {Array.from({ length: 10 }, (_, i) => 2026 + i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <CalendarView
              year={selectedYear}
              selectedDays={selectedDays}
              onDayToggle={handleDayToggle}
              onHalfDayToggle={handleHalfDayToggle}
              federalHolidayDates={federalHolidayDates}
            />
          </div>

          <div className="space-y-6">
            <SettingsPanel settings={settings} onSettingsChange={setSettings} />
            <PTOSummary
              totalHours={settings.totalPTOHours}
              usedHours={usedHours}
              vacationDays={vacationDaysCount}
            />
            <FederalHolidayList
              holidays={federalHolidays}
              selectedDays={selectedDays}
              onHolidayToggle={handleHolidayToggle}
            />
          </div>
        </div>

        {notification && (
          <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
            <div
              className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg ${
                notification.type === 'success'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-red-500 text-white'
              }`}
            >
              {notification.type === 'success' ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
              <span className="font-medium">{notification.message}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
