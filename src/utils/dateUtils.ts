import { DateTime } from "luxon";

export function formatDate(date: DateTime | string): string {
  if (typeof date === "string") {
    date = DateTime.fromISO(date).toUTC();
  }
  return date.toFormat("dd/MM/yyyy");
}

// Helper function to parse dates
export function parseDate(dateStr: string): Date {
  const [day, month, year] = dateStr.split("/").map(Number);
  return new Date(year, month - 1, day); // Month is zero-based in JavaScript Date
}

// Comparator function for sorting
export function compareDates(a: Date, b: Date): number {
  return a.getTime() - b.getTime();
}

