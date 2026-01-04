import { ChevronLeft, ChevronRight, Download, MapIcon, Upload } from 'lucide-react';
import { getAvailableYears } from '@/lib/storage';
import { useState } from 'react';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import ThemeSwitch from './ThemeSwitch';

interface HeaderProps {
    year: number;
    onYearChange: (year: number) => void;
    onExport: () => void;
    onImport: (file: File) => void;
}

export function Header({ year, onYearChange, onExport, onImport }: HeaderProps) {
    const currentYear = new Date().getFullYear();
    const availableYears = getAvailableYears();
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onImport(file);
            e.target.value = '';
        }
    };

    const canGoNext = year < currentYear;
    const canGoBack = year > currentYear - 10;

    return (
        <div className="border-b border-gray-200 dark: border-gray-800">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                    <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
                        <div className="flex items-center gap-1 sm:gap-2">
                            <button
                                type="button"
                                onClick={() => onYearChange(year - 1)}
                                disabled={!canGoBack}
                                className="p-1 sm:p-1.5 text-gray-600 cursor-pointer dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                            >
                                <ChevronLeft size={18} className="sm:w-5 sm:h-5" />
                            </button>
                            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white min-w-[60px] sm:min-w-25 text-center">
                                {year}
                            </h1>
                            <button
                                type="button"
                                onClick={() => onYearChange(year + 1)}
                                disabled={!canGoNext}
                                className="p-1 sm:p-1.5 text-gray-600 cursor-pointer dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                            >
                                <ChevronRight size={18} className="sm:w-5 sm:h-5" />
                            </button>
                        </div>

                        {availableYears.length > 0 && (
                            <Select
                                value={year.toString()}
                                onValueChange={(value) => onYearChange(Number.parseInt(value))}
                            >
                                <SelectTrigger className="w-[120px] sm:w-auto text-xs sm:text-sm">
                                    <SelectValue placeholder="Select year" />
                                </SelectTrigger>
                                <SelectContent>
                                    {availableYears.map(y => (
                                        <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    </div>

                    <div className="flex gap-1. 5 sm:gap-2 w-full sm:w-auto justify-end">
                        <button
                            type="button"
                            onClick={onExport}
                            className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 cursor-pointer hover:bg-accent text-xs sm:text-sm rounded-lg transition-colors"
                        >
                            <Download size={16} className="sm:w-[18px] sm:h-[18px]" />
                            <span className="hidden sm:inline">Export</span>
                        </button>
                        <label className="flex items-center gap-1.5 sm:gap-2 px-2 sm: px-4 py-1.5 sm:py-2 text-xs sm:text-sm hover:bg-accent rounded-lg transition-colors cursor-pointer">
                            <Upload size={16} className="sm:w-[18px] sm:h-[18px]" />
                            <span className="hidden sm:inline">Import</span>
                            <input
                                type="file"
                                accept=".json"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </label>
                        <ThemeSwitch />
                    </div>
                </div>

                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 mt-3 sm:mt-4'>
                    <h1 className='text-xl sm:text-2xl md:text-3xl font-bold'>
                        YearMap
                    </h1>
                    <p className='font-medium text-sm sm:text-base md:text-lg flex gap-1. 5 sm:gap-2 items-center'>
                        <span className="flex-shrink-0">
                            <MapIcon size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
                        </span>
                        <span className="line-clamp-2 sm:line-clamp-1">
                            {(currentYear === year) ? `How is ${year} going so far?` : `How was ${year} for you?`}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}