import { FederalHoliday } from '../types';

export const FEDERAL_HOLIDAYS_2024: FederalHoliday[] = [
  { name: "New Year's Day", date: '2024-01-01', month: 0, day: 1 },
  { name: "Martin Luther King Jr. Day", date: '2024-01-15', month: 0, day: 15 },
  { name: "Presidents' Day", date: '2024-02-19', month: 1, day: 19 },
  { name: "Memorial Day", date: '2024-05-27', month: 4, day: 27 },
  { name: "Juneteenth", date: '2024-06-19', month: 5, day: 19 },
  { name: "Independence Day", date: '2024-07-04', month: 6, day: 4 },
  { name: "Labor Day", date: '2024-09-02', month: 8, day: 2 },
  { name: "Columbus Day", date: '2024-10-14', month: 9, day: 14 },
  { name: "Veterans Day", date: '2024-11-11', month: 10, day: 11 },
  { name: "Thanksgiving", date: '2024-11-28', month: 10, day: 28 },
  { name: "Christmas Day", date: '2024-12-25', month: 11, day: 25 },
];

export const FEDERAL_HOLIDAYS_2025: FederalHoliday[] = [
  { name: "New Year's Day", date: '2025-01-01', month: 0, day: 1 },
  { name: "Martin Luther King Jr. Day", date: '2025-01-20', month: 0, day: 20 },
  { name: "Presidents' Day", date: '2025-02-17', month: 1, day: 17 },
  { name: "Memorial Day", date: '2025-05-26', month: 4, day: 26 },
  { name: "Juneteenth", date: '2025-06-19', month: 5, day: 19 },
  { name: "Independence Day", date: '2025-07-04', month: 6, day: 4 },
  { name: "Labor Day", date: '2025-09-01', month: 8, day: 1 },
  { name: "Columbus Day", date: '2025-10-13', month: 9, day: 13 },
  { name: "Veterans Day", date: '2025-11-11', month: 10, day: 11 },
  { name: "Thanksgiving", date: '2025-11-27', month: 10, day: 27 },
  { name: "Christmas Day", date: '2025-12-25', month: 11, day: 25 },
];

export const FEDERAL_HOLIDAYS_2026: FederalHoliday[] = [
  { name: "New Year's Day", date: '2026-01-01', month: 0, day: 1 },
  { name: "Martin Luther King Jr. Day", date: '2026-01-19', month: 0, day: 19 },
  { name: "Presidents' Day", date: '2026-02-16', month: 1, day: 16 },
  { name: "Memorial Day", date: '2026-05-25', month: 4, day: 25 },
  { name: "Juneteenth", date: '2026-06-19', month: 5, day: 19 },
  { name: "Independence Day", date: '2026-07-04', month: 6, day: 4 },
  { name: "Labor Day", date: '2026-09-07', month: 8, day: 7 },
  { name: "Columbus Day", date: '2026-10-12', month: 9, day: 12 },
  { name: "Veterans Day", date: '2026-11-11', month: 10, day: 11 },
  { name: "Thanksgiving", date: '2026-11-26', month: 10, day: 26 },
  { name: "Christmas Day", date: '2026-12-25', month: 11, day: 25 },
];

export function getFederalHolidaysForYear(year: number): FederalHoliday[] {
  switch (year) {
    case 2024:
      return FEDERAL_HOLIDAYS_2024;
    case 2025:
      return FEDERAL_HOLIDAYS_2025;
    case 2026:
      return FEDERAL_HOLIDAYS_2026;
    default:
      return [];
  }
}
