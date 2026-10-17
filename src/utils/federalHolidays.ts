import { FederalHoliday, FloatingHoliday } from '../types';

function getNthWeekdayOfMonth(year: number, month: number, weekday: number, n: number): number {
  let count = 0;
  let day = 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  while (day <= daysInMonth) {
    const date = new Date(year, month, day);
    if (date.getDay() === weekday) {
      count++;
      if (count === n) {
        return day;
      }
    }
    day++;
  }
  return day;
}

function getLastWeekdayOfMonth(year: number, month: number, weekday: number): number {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  let day = daysInMonth;

  while (day >= 1) {
    const date = new Date(year, month, day);
    if (date.getDay() === weekday) {
      return day;
    }
    day--;
  }
  return day;
}

function formatDate(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function generateFederalHolidaysForYear(year: number): FederalHoliday[] {
  const mlkDay = getNthWeekdayOfMonth(year, 0, 1, 3);
  const presidentsDay = getNthWeekdayOfMonth(year, 1, 1, 3);
  const memorialDay = getLastWeekdayOfMonth(year, 4, 1);
  const laborDay = getNthWeekdayOfMonth(year, 8, 1, 1);
  const columbusDay = getNthWeekdayOfMonth(year, 9, 1, 2);
  const thanksgivingDay = getNthWeekdayOfMonth(year, 10, 4, 4);

  return [
    { name: "New Year's Day", date: formatDate(year, 0, 1), month: 0, day: 1 },
    { name: "Martin Luther King Jr. Day", date: formatDate(year, 0, mlkDay), month: 0, day: mlkDay },
    { name: "Presidents' Day", date: formatDate(year, 1, presidentsDay), month: 1, day: presidentsDay },
    { name: "Memorial Day", date: formatDate(year, 4, memorialDay), month: 4, day: memorialDay },
    { name: "Juneteenth", date: formatDate(year, 5, 19), month: 5, day: 19 },
    { name: "Independence Day", date: formatDate(year, 6, 4), month: 6, day: 4 },
    { name: "Labor Day", date: formatDate(year, 8, laborDay), month: 8, day: laborDay },
    { name: "Columbus Day", date: formatDate(year, 9, columbusDay), month: 9, day: columbusDay },
    { name: "Veterans Day", date: formatDate(year, 10, 11), month: 10, day: 11 },
    { name: "Thanksgiving", date: formatDate(year, 10, thanksgivingDay), month: 10, day: thanksgivingDay },
    { name: "Christmas Day", date: formatDate(year, 11, 25), month: 11, day: 25 },
  ];
}

const FEDERAL_HOLIDAYS_CACHE: Map<number, FederalHoliday[]> = new Map();

export function getFederalHolidaysForYear(year: number): FederalHoliday[] {
  if (year < 2026 || year > 2035) {
    return [];
  }

  if (!FEDERAL_HOLIDAYS_CACHE.has(year)) {
    FEDERAL_HOLIDAYS_CACHE.set(year, generateFederalHolidaysForYear(year));
  }

  return FEDERAL_HOLIDAYS_CACHE.get(year)!;
}

export function getWeekendFederalHolidays(year: number, hoursPerHoliday: number = 8): FloatingHoliday[] {
  const holidays = getFederalHolidaysForYear(year);
  const weekendHolidays: FloatingHoliday[] = [];

  for (const holiday of holidays) {
    const date = new Date(year, holiday.month, holiday.day);
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      weekendHolidays.push({
        name: holiday.name,
        date: holiday.date,
        month: holiday.month,
        day: holiday.day,
        dayOfWeek: dayOfWeek === 0 ? 'Sunday' : 'Saturday',
        hours: hoursPerHoliday,
      });
    }
  }

  return weekendHolidays;
}

