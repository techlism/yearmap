import { X } from 'lucide-react';
import { DayEntry, DayMood, MOOD_COLORS, MOOD_LABELS } from '@/lib/types';
import { formatDateLong } from '@/lib/utils';

interface DayModalProps {
    date: string;
    entry: DayEntry | null;
    onClose: () => void;
    onMoodUpdate: (mood: DayMood) => void;
    onNoteUpdate: (note: string) => void;
}

export function DayModal({ date, entry, onClose, onMoodUpdate, onNoteUpdate }: DayModalProps) {
    const handleMoodClick = (mood: DayMood) => {
        // If clicking the same mood, unselect it
        if (entry?.mood === mood) {
            onMoodUpdate(null);
        } else {
            onMoodUpdate(mood);
        }
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center p-4 z-50"
            onClick={onClose}
        >
            <div
                className="bg-card rounded-2xl p-8 max-w-2xl w-full shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-secondary-foreground">
                        {formatDateLong(date)}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 bg-accent/50 hover:bg-accent rounded-lg transition-colors"
                    >
                        <X size={20} className="text-secondary-foreground" />
                    </button>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-base font-medium text-primary mb-3">
                            How was your day?
                        </label>
                        <div className="flex gap-2">
                            {Object.entries(MOOD_LABELS).map(([mood, label]) => (
                                <button
                                    key={mood}
                                    onClick={() => handleMoodClick(mood as DayMood)}
                                    className={`
                                        flex-1 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer
                                        ${entry?.mood === mood
                                            ? `${MOOD_COLORS[mood as keyof typeof MOOD_LABELS]} shadow-md`
                                            : 'bg-accent/50 text-primary hover:bg-accent hover:shadow-md shadow-sm'
                                        }
                                    `}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                        <p className="text-sm text-secondary-foreground mt-3">
                            Click again to unselect
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-secondary-foreground mb-3">
                            Notes
                        </label>
                        <textarea
                            value={entry?.note || ''}
                            onChange={(e) => onNoteUpdate(e.target.value)}
                            placeholder="What happened today? Any thoughts or memories..."
                            className="w-full h-40 px-4 py-3 rounded-lg border placeholder-secondary-foreground focus:ring-1 focus:ring-offset-1 focus:border-transparent focus:ring-blue-500 fresize-none text-sm"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}