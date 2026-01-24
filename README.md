# PTO Vacation Tracker

A modern, intuitive web application for planning and tracking your paid time off (PTO) and vacation days. Easily visualize your time off schedule, manage federal holidays, and monitor your remaining PTO balance throughout the year.

## Overview

PTO Vacation Tracker helps you plan your vacation days effectively for any year from 2026 to 2035. It provides a visual calendar interface to select dates, automatically calculates federal holidays for each year, supports half-day PTO tracking, and calculates your remaining PTO hours in real-time. All data is stored locally in your browser, ensuring your vacation plans remain private.

## Features

### Core Functionality
- **Interactive Calendar View**: Click to select vacation days with an intuitive month-by-month calendar
- **Multi-Year Planning**: Plan your vacation for any year from 2026 to 2035 with automatic federal holiday calculation
- **Half-Day Support**: Mark vacation days as half-days (4 hours) to optimize your PTO usage
- **Federal Holiday Management**: Automatically calculated federal holidays that can be selected or deselected
- **PTO Summary Dashboard**: Real-time tracking of total PTO, used hours, and remaining balance
- **Visual Date List**: See all selected vacation days organized chronologically with quick navigation

### Customization
- **Configurable Settings**:
  - Set your total annual PTO hours
  - Configure daily work hours (typically 8 hours)
  - Toggle dark mode for comfortable viewing
- **Year Selection**: Switch between years 2026-2035 using the planning year selector
- **Weekend Indicators**: Weekends are automatically highlighted to help with planning
- **Smart Holiday Tracking**: Federal holidays don't count against your PTO balance
- **Flexible PTO Usage**: Mark days as full-day (8 hours) or half-day (4 hours)

### Data Management
- **CSV Export**: Download your vacation schedule as a CSV file for backup or sharing
- **CSV Import**: Restore previously exported vacation plans
- **Local Storage**: All data persists in your browser between sessions

## Technology Stack

### Frontend Framework
- **React 18.3**: Modern UI library with hooks for state management
- **TypeScript 5.5**: Type-safe development for fewer bugs and better developer experience
- **Vite 5.4**: Lightning-fast build tool and development server

### Styling
- **Tailwind CSS 3.4**: Utility-first CSS framework for rapid UI development
- **PostCSS & Autoprefixer**: Automated CSS processing and browser compatibility

### UI Components
- **Lucide React**: Beautiful, consistent icon library
- **Custom Components**: Purpose-built components for calendar, settings, and summaries

### Development Tools
- **ESLint 9.9**: Code quality and consistency enforcement
- **TypeScript ESLint**: TypeScript-specific linting rules

### State & Data
- **Custom Hooks**: useLocalStorage for persistent state management
- **Browser LocalStorage**: Client-side data persistence (no server required)

## Installation

### Prerequisites
- Node.js (version 16 or higher)
- npm (comes with Node.js)

### Setup

1. Clone or download the project

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to the URL shown in the terminal (typically `http://localhost:5173`)

## Usage Guide

### Getting Started

1. **Select Your Planning Year**:
   - Use the year selector at the top of the page
   - Choose any year from 2026 to 2035
   - Federal holidays are automatically calculated for the selected year

2. **Configure Your Settings** (right sidebar):
   - Enter your total annual PTO hours
   - Set your daily work hours
   - Toggle dark mode if preferred

3. **Select Federal Holidays**:
   - Review the list of federal holidays for your selected year
   - Check the holidays you observe at your workplace
   - Selected holidays appear on the calendar in green and don't count against your PTO

4. **Plan Your Vacation Days**:
   - Navigate through months using the arrow buttons
   - Click any date to mark it as a vacation day (appears in blue)
   - Click again to deselect a day
   - View your selected days in the list below the calendar
   - Click a date in the list to jump to that month

5. **Optimize with Half-Days**:
   - In the vacation days list below the calendar, each day shows a checkbox
   - Check the box to mark a day as a half-day (4 hours instead of 8 hours)
   - The hour indicator next to the checkbox shows "4h" or "8h"
   - Use half-days to stretch your PTO further

6. **Monitor Your PTO Balance**:
   - The PTO Summary card shows your total hours, used hours, and remaining balance
   - Watch the progress bar to visualize your PTO usage
   - The summary updates instantly as you select or deselect days, including half-day calculations

### Exporting Your Schedule

1. Click the **Export CSV** button in the top-right corner
2. A CSV file named `vacation-days-YYYY.csv` will download
3. This file contains all your selected dates and can be opened in Excel or Google Sheets

### Importing a Schedule

1. Click the **Import CSV** button in the top-right corner
2. Select a previously exported CSV file
3. Your vacation days will be restored
4. Any existing selections will be replaced with the imported data

### Visual Indicators

- **Blue**: Selected vacation days (count against PTO)
- **Green**: Selected federal holidays (don't count against PTO)
- **Light Green Border**: Unselected federal holidays
- **Gray Background**: Weekends
- **Checkbox with 4h/8h**: Toggle between half-day and full-day for vacation days

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Check TypeScript types

## Data Storage

All data is stored locally in your browser's LocalStorage under the following keys:
- `pto-settings`: User preferences and configuration
- `pto-selected-days`: Selected vacation days and holidays

Your data is never sent to any server and remains completely private on your device.

## Browser Compatibility

Works in all modern browsers that support:
- ES6+ JavaScript
- CSS Grid and Flexbox
- LocalStorage API
- Modern React features

## License

This project is provided as-is for personal use.
