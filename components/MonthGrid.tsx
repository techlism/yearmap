import { YearData, MOOD_COLORS, DayMood, MONTH_NAMES } from '@/lib/types';
import { isPastOrToday, getDatesInMonth, formatDateShort } from '@/lib/utils';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card';

interface MonthGridProps {
    monthIndex: number;
    year: number;
    yearData: YearData;
    selectedDate: string | null;
    onDateClick: (date: string) => void;
    isHovered: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

export function MonthGrid({
    monthIndex,
    year,
    yearData,
    selectedDate,
    onDateClick,
    isHovered,
    onMouseEnter,
    onMouseLeave
}: MonthGridProps) {
    const today = new Date();
    const isFutureMonth = new Date(year, monthIndex + 1, 0) > today;

    const dates = getDatesInMonth(year, monthIndex);

    return (
        <div
            onMouseEnter={!isFutureMonth ? onMouseEnter : undefined}
            onMouseLeave={!isFutureMonth ? onMouseLeave : undefined}
            className="transition-all duration-400 ease-out"
        >
            <div className="mb-3">
                <h3 className="text-base font-medium text-gray-500 dark:text-gray-200 text-pretty ">
                    {MONTH_NAMES[monthIndex]}
                </h3>
            </div>
            <div
                className="grid gap-2"
                style={{
                    gridTemplateColumns: `repeat(7, minmax(0, 1fr))`,
                    gridTemplateRows: `repeat(5, minmax(0, 1fr))`
                }}
            >


                {dates.map((date, index) => {
                    if (!date) {
                        return <div key={`empty-${index}`} className="w-5 h-5" />;
                    }

                    const entry = yearData.entries[date];
                    const mood: DayMood = entry?.mood || null;
                    const isSelected = selectedDate === date;
                    const isClickable = isPastOrToday(date);
                    const dayNumber = parseInt(date.split('-')[2], 10);

                    return (
                        <HoverCard key={date} openDelay={100}>
                            <HoverCardTrigger asChild>
                                <button
                                    onClick={() => isClickable && onDateClick(date)}
                                    disabled={!isClickable}
                                    className={`
                                        rounded-sm transition-all relative
                                        flex items-center justify-center
                                        ${MOOD_COLORS[mood || 'null']}
                                        ${isSelected ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''}
                                        ${!isClickable ? 'opacity-30' : 'cursor-pointer'}
                                    `}
                                    aria-label={date}
                                >
                                    <span className="text-base font-medium drop-shadow-sm">
                                        {dayNumber}
                                    </span>
                                </button>
                            </HoverCardTrigger>
                            <HoverCardContent
                                side="top"
                                className="w-auto px-3 py-2 text-xs"
                            >
                                <div className="font-medium">{formatDateShort(date)}</div>
                                {entry?.mood && (
                                    <div className="text-primary capitalize mt-0.5">
                                        {entry.mood}
                                    </div>
                                )}
                            </HoverCardContent>
                        </HoverCard>
                    );
                })}
            </div>
        </div>
    );
}