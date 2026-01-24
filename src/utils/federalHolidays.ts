import { FederalHoliday } from '../types';

export const FEDERAL_HOLIDAYS: FederalHoliday[] = [
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

export function getFederalHolidays(): FederalHoliday[] {
  return FEDERAL_HOLIDAYS;
}
