import type { YearData } from '@/lib/types';
import { parseYearData, validateYearData } from '@/lib/schemas';

const STORAGE_KEY_PREFIX = 'yearTracker_';

function getStorageKey(year: number): string {
    return `${STORAGE_KEY_PREFIX}${year}`;
}

export function loadYearData(year: number): YearData {
    if (typeof window === 'undefined') {
        return { year, entries: {} };
    }

    try {
        const stored = localStorage.getItem(getStorageKey(year));
        if (!stored) {
            return { year, entries: {} };
        }

        const parsed = JSON.parse(stored);

        // Validate the data structure
        if (!validateYearData(parsed)) {
            console.error('Invalid data in localStorage, resetting...');
            return { year, entries: {} };
        }

        return parseYearData(parsed, year);
    } catch (error) {
        console.error('Failed to load year data:', error);
        return { year, entries: {} };
    }
}

export function saveYearData(data: YearData): void {
    if (typeof window === 'undefined') return;

    try {
        localStorage.setItem(getStorageKey(data.year), JSON.stringify(data));
    } catch (error) {
        console.error('Failed to save year data:', error);
    }
}

export function exportYearData(data: YearData): void {
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `year-tracker-${data.year}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

export function importYearData(file: File, defaultYear: number): Promise<YearData> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target?.result as string);

                // Validate imported data
                if (!validateYearData(data)) {
                    reject(new Error('Invalid data format'));
                    return;
                }

                resolve(parseYearData(data, defaultYear));
            } catch (error) {
                reject(new Error('Failed to parse file'));
            }
        };

        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsText(file);
    });
}

// Get all available years from localStorage
export function getAvailableYears(): number[] {
    if (typeof window === 'undefined') return [];

    const years: number[] = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith(STORAGE_KEY_PREFIX)) {
            const year = parseInt(key.replace(STORAGE_KEY_PREFIX, ''));
            if (!isNaN(year)) {
                years.push(year);
            }
        }
    }

    return years.sort((a, b) => b - a);
}