export interface UserSettings {
  totalPTOHours: number;
  hoursPerDay: number;
  currentYear: number;
  darkMode: boolean;
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
