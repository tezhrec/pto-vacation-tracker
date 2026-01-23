import { useMemo, useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { UserSettings, SelectedDay } from './types';
import { SettingsPanel } from './components/SettingsPanel';
import { PTOSummary } from './components/PTOSummary';
import { CalendarView } from './components/CalendarView';
import { FederalHolidayList } from './components/FederalHolidayList';
import { getFederalHolidaysForYear } from './utils/federalHolidays';

function App() {
  const currentYear = new Date().getFullYear();

  const [settings, setSettings] = useLocalStorage<UserSettings>('pto-settings', {
    totalPTOHours: 120,
    hoursPerDay: 8,
    currentYear: currentYear,
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
    return getFederalHolidaysForYear(settings.currentYear);
  }, [settings.currentYear]);

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

  const vacationDaysCount = selectedDays.filter(d => !d.isFederalHoliday).length;
  const usedHours = vacationDaysCount * settings.hoursPerDay;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">PTO Vacation Tracker</h1>
          <p className="text-gray-600 dark:text-gray-400">Plan your time off and track your remaining PTO hours</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <CalendarView
              year={settings.currentYear}
              selectedDays={selectedDays}
              onDayToggle={handleDayToggle}
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
      </div>
    </div>
  );
}

export default App;
