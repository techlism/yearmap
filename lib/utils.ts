import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function generateYearDates(year: number): string[] {
  const dates: string[] = [];
  const start = new Date(year, 0, 1);
  const end = new Date(year, 11, 31);
  const today = new Date();
  const maxDate = today.getFullYear() === year ? today : end;

  for (let d = new Date(start); d <= maxDate; d.setDate(d.getDate() + 1)) {
    dates.push(new Date(d).toISOString().split('T')[0]);
  }

  return dates;
}

export function getWeeksInYear(year: number): number {
  const firstDay = new Date(year, 0, 1);
  const lastDay = new Date(year, 11, 31);
  const dayOfWeek = firstDay.getDay();
  const totalDays = Math.ceil((lastDay.getTime() - firstDay.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  return Math.ceil((totalDays + dayOfWeek) / 7);
}

export function groupDatesByWeek(dates: string[]): string[][] {
  const weeks: string[][] = [];
  let currentWeek: string[] = [];

  dates.forEach((date, index) => {
    const dayOfWeek = new Date(date).getDay();

    // Start a new week on Sunday (day 0)
    if (dayOfWeek === 0 && currentWeek.length > 0) {
      weeks.push(currentWeek);
      currentWeek = [];
    }

    currentWeek.push(date);

    // Push the last week
    if (index === dates.length - 1) {
      weeks.push(currentWeek);
    }
  });

  return weeks;
}

export function getMonthsInYear(): number[] {
  return Array.from({ length: 12 }, (_, i) => i);
}

export function formatDateLong(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function formatDateShort(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
}


export function isPastOrToday(dateStr: string): boolean {
  const date = new Date(dateStr + 'T00:00:00');
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  return date <= today;
}

export function getDatesInMonth(year: number, month: number): (string | null)[] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDayOfWeek = firstDay.getDay();

  const dates: (string | null)[] = [];

  // Add empty cells for days before the month starts
  for (let i = 0; i < startDayOfWeek; i++) {
    dates.push(null);
  }

  // Add all days in the month - ensure proper date formatting
  const totalDays = lastDay.getDate();
  for (let day = 1; day <= totalDays; day++) {
    // Format date as YYYY-MM-DD to avoid timezone issues
    const paddedMonth = String(month + 1).padStart(2, '0');
    const paddedDay = String(day).padStart(2, '0');
    dates.push(`${year}-${paddedMonth}-${paddedDay}`);
  }

  return dates;
}