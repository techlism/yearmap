import { useState, useMemo } from 'react';
import { YearData, MOOD_COLORS, MOOD_LABELS } from '@/lib/types';
import { MonthGrid } from './MonthGrid';
import { getMonthsInYear } from '@/lib/utils';

interface YearGridProps {
    year: number;
    yearData: YearData;
    selectedDate: string | null;
    onDateClick: (date: string) => void;
}

export function YearGrid({ year, yearData, selectedDate, onDateClick }: YearGridProps) {
    const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);
    const months = useMemo(() => getMonthsInYear(), []);

    return (
        <div className="min-h-[calc(100vh-180px)] flex items-center justify-center px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
            <div className="w-full max-w-7xl">
                <div className="space-y-4 sm:space-y-6 md:space-y-8">
                    {/* For extra large screens: 6 months per row */}
                    <div className="hidden 2xl:grid 2xl: grid-cols-6 gap-3 md:gap-4">
                        {months.map((month) => (
                            <MonthGrid
                                key={month}
                                monthIndex={month}
                                year={year}
                                yearData={yearData}
                                selectedDate={selectedDate}
                                onDateClick={onDateClick}
                                isHovered={hoveredMonth === month}
                                onMouseEnter={() => setHoveredMonth(month)}
                                onMouseLeave={() => setHoveredMonth(null)}
                            />
                        ))}
                    </div>

                    {/* For large screens: 4 months per row */}
                    <div className="hidden lg:grid 2xl:hidden lg:grid-cols-4 gap-3 md:gap-4">
                        {months.map((month) => (
                            <MonthGrid
                                key={month}
                                monthIndex={month}
                                year={year}
                                yearData={yearData}
                                selectedDate={selectedDate}
                                onDateClick={onDateClick}
                                isHovered={hoveredMonth === month}
                                onMouseEnter={() => setHoveredMonth(month)}
                                onMouseLeave={() => setHoveredMonth(null)}
                            />
                        ))}
                    </div>

                    {/* For medium screens: 3 months per row */}
                    <div className="hidden md:grid lg:hidden md:grid-cols-3 gap-3">
                        {months.map((month) => (
                            <MonthGrid
                                key={month}
                                monthIndex={month}
                                year={year}
                                yearData={yearData}
                                selectedDate={selectedDate}
                                onDateClick={onDateClick}
                                isHovered={hoveredMonth === month}
                                onMouseEnter={() => setHoveredMonth(month)}
                                onMouseLeave={() => setHoveredMonth(null)}
                            />
                        ))}
                    </div>

                    {/* For small screens: 2 months per row */}
                    <div className="grid md:hidden grid-cols-2 gap-2 sm:gap-3">
                        {months.map((month) => (
                            <MonthGrid
                                key={month}
                                monthIndex={month}
                                year={year}
                                yearData={yearData}
                                selectedDate={selectedDate}
                                onDateClick={onDateClick}
                                isHovered={hoveredMonth === month}
                                onMouseEnter={() => setHoveredMonth(month)}
                                onMouseLeave={() => setHoveredMonth(null)}
                            />
                        ))}
                    </div>
                </div>

                {/* Legend */}
                <div className="mt-8 sm:mt-10 md:mt-12 pt-4 sm:pt-5 md:pt-6 border-t border-gray-200 dark:border-gray-800 flex justify-center">
                    <div className="flex gap-2 sm:gap-3 md:gap-4 items-center flex-wrap justify-center px-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400">Less</span>
                        {Object.entries(MOOD_LABELS).reverse().map(([mood, label]) => (
                            <div key={mood} className="flex items-center gap-1. 5 sm:gap-2">
                                <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-sm ${MOOD_COLORS[mood as keyof typeof MOOD_LABELS]}`} />
                                <span className="text-xs text-gray-600 dark:text-gray-400">{label}</span>
                            </div>
                        ))}
                        <span className="text-xs text-gray-500 dark:text-gray-400">More</span>
                    </div>
                </div>
            </div>
        </div>
    );
}