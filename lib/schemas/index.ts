import { z } from 'zod';

export const DayMoodSchema = z.enum(['great', 'good', 'okay', 'bad', 'terrible']).nullable();

export const DayEntrySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD format
  mood: DayMoodSchema,
  note: z.string()
});

// New schema that includes year
export const YearDataSchema = z.object({
  year: z.number().int().min(2000).max(2100),
  entries: z.record(z.string(), DayEntrySchema)
});

// Legacy schema for backward compatibility (old format without year)
export const LegacyYearDataSchema = z.record(z.string(), DayEntrySchema);

export function validateYearData(data: unknown): boolean {
  const newFormat = YearDataSchema.safeParse(data);
  if (newFormat.success) return true;

  const legacyFormat = LegacyYearDataSchema.safeParse(data);
  return legacyFormat.success;
}

export function parseYearData(data: unknown, defaultYear: number) {
  // Try new format first
  const newFormat = YearDataSchema.safeParse(data);
  if (newFormat.success) {
    return newFormat.data;
  }

  // Try legacy format
  const legacyFormat = LegacyYearDataSchema.safeParse(data);
  if (legacyFormat.success) {
    // Convert legacy format to new format
    return {
      year: defaultYear,
      entries: legacyFormat.data
    };
  }

  throw new Error('Invalid data format');
}