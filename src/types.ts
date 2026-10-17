export interface UserSettings {
  totalPTOHours: number;
  hoursPerDay: number;
  darkMode: boolean;
  autoWeekendFloatingHolidays?: boolean;
}

export interface SelectedDay {
  date: string;
  isFederalHoliday: boolean;
  isHalfDay?: boolean;
}

export interface FederalHoliday {
  name: string;
  date: string;
  month: number;
  day: number;
}

export interface FloatingHoliday {
  name: string;
  date: string;
  month: number;
  day: number;
  dayOfWeek: 'Saturday' | 'Sunday';
  hours: number;
}
