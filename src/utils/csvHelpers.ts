import { SelectedDay } from '../types';

export function exportToCSV(selectedDays: SelectedDay[], year: number): void {
  const headers = ['Date', 'Is Federal Holiday', 'Is Half Day'];
  const rows = selectedDays.map(day => [
    day.date,
    day.isFederalHoliday ? 'true' : 'false',
    day.isHalfDay ? 'true' : 'false'
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `vacation-days-${year}.csv`);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

export function importFromCSV(file: File): Promise<SelectedDay[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.split('\n').filter(line => line.trim());

        if (lines.length < 2) {
          reject(new Error('CSV file is empty or invalid'));
          return;
        }

        const dataLines = lines.slice(1);
        const selectedDays: SelectedDay[] = [];

        for (const line of dataLines) {
          const [date, isFederalHolidayStr, isHalfDayStr] = line.split(',').map(s => s.trim());

          if (!date) continue;

          const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
          if (!dateRegex.test(date)) {
            console.warn(`Invalid date format: ${date}`);
            continue;
          }

          selectedDays.push({
            date,
            isFederalHoliday: isFederalHolidayStr?.toLowerCase() === 'true',
            isHalfDay: isHalfDayStr?.toLowerCase() === 'true'
          });
        }

        if (selectedDays.length === 0) {
          reject(new Error('No valid entries found in CSV file'));
          return;
        }

        resolve(selectedDays);
      } catch (error) {
        reject(new Error('Failed to parse CSV file'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsText(file);
  });
}
