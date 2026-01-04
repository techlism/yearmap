import { useState, useCallback, useRef, useEffect } from 'react';
import { YearData, DayMood } from '@/lib/types';
import { loadYearData, saveYearData, exportYearData, importYearData } from '@/lib/storage';

export function useYearData(year: number) {
    const [yearData, setYearData] = useState<YearData>(() => loadYearData(year));
    const noteTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        return () => {
            if (noteTimeoutRef.current) {
                clearTimeout(noteTimeoutRef.current);
            }
        };
    }, []);

    const updateDayMood = (date: string, mood: DayMood) => {
        const newData: YearData = {
            ...yearData,
            entries: {
                ...yearData.entries,
                [date]: {
                    date,
                    mood,
                    note: yearData.entries[date]?.note || ''
                }
            }
        };
        setYearData(newData);
        saveYearData(newData);
    };

    const updateDayNote = useCallback((date: string, note: string) => {
        const newData: YearData = {
            ...yearData,
            entries: {
                ...yearData.entries,
                [date]: {
                    date,
                    mood: yearData.entries[date]?.mood || null,
                    note
                }
            }
        };
        setYearData(newData);

        if (noteTimeoutRef.current) {
            clearTimeout(noteTimeoutRef.current);
        }

        noteTimeoutRef.current = setTimeout(() => {
            saveYearData(newData);
        }, 150);
    }, [yearData]);

    const handleExport = () => {
        exportYearData(yearData);
    };

    const handleImport = async (file: File) => {
        try {
            const data = await importYearData(file, year);
            setYearData(data);
            saveYearData(data);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to import data'
            };
        }
    };

    const changeYear = (newYear: number) => {
        const newData = loadYearData(newYear);
        setYearData(newData);
    };

    return {
        yearData,
        updateDayMood,
        updateDayNote,
        handleExport,
        handleImport,
        changeYear
    };
}