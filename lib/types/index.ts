export type DayMood = 'great' | 'good' | 'okay' | 'bad' | 'terrible' | null;

export interface DayEntry {
    date: string;
    mood: DayMood;
    note: string;
}

export interface YearData {
    year: number;
    entries: {
        [date: string]: DayEntry;
    };
}

export const MOOD_COLORS: Record<NonNullable<DayMood> | 'null', string> = {
    terrible: 'bg-red-900 dark:bg-red-900 hover:bg-red-800 dark:hover:bg-red-800',
    bad: 'bg-red-700 dark:bg-red-700 hover:bg-red-600 dark:hover:bg-red-600',
    okay: 'bg-yellow-600 dark:bg-yellow-600 hover:bg-yellow-500 dark:hover:bg-yellow-500',
    good: 'bg-green-600 dark:bg-green-600 hover:bg-green-500 dark:hover:bg-green-500',
    great: 'bg-green-400 dark:bg-green-400 hover:bg-green-300 dark:hover:bg-green-300',
    null: 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
};

export const MOOD_LABELS: Record<NonNullable<DayMood>, string> = {
    great: 'Great',
    good: 'Good',
    okay: 'Okay',
    bad: 'Bad',
    terrible: 'Terrible'
};

export const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

export const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];