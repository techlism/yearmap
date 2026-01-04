'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { YearGrid } from '@/components/YearGrid';
import { DayModal } from '@/components/DayModal';
import { useYearData } from '@/hooks/useYearData';

export default function Home() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const {
    yearData,
    updateDayMood,
    updateDayNote,
    handleExport,
    handleImport,
    changeYear
  } = useYearData(currentYear);

  const handleYearChange = (newYear: number) => {
    setCurrentYear(newYear);
    changeYear(newYear);
    setSelectedDate(null);
  };

  const handleImportWithFeedback = async (file: File) => {
    const result = await handleImport(file);
    if (result.success) {
      alert('Data imported successfully!');
    } else {
      alert(`Failed to import: ${result.error}`);
    }
  };

  const selectedEntry = selectedDate ? yearData.entries[selectedDate] : null;

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <Header
        year={currentYear}
        onYearChange={handleYearChange}
        onExport={handleExport}
        onImport={handleImportWithFeedback}
      />

      <YearGrid
        year={currentYear}
        yearData={yearData}
        selectedDate={selectedDate}
        onDateClick={setSelectedDate}
      />

      {selectedDate && (
        <DayModal
          date={selectedDate}
          entry={selectedEntry || null}
          onClose={() => setSelectedDate(null)}
          onMoodUpdate={(mood) => updateDayMood(selectedDate, mood)}
          onNoteUpdate={(note) => updateDayNote(selectedDate, note)}
        />
      )}
    </main>
  );
}