import { DateTime } from "luxon";

// Formats a given date into a "dd/MM/yyyy" string.
export function formatDate(date: DateTime | string): string {
  if (typeof date === "string") {
    date = DateTime.fromISO(date).toUTC();
  }
  return date.toFormat("dd/MM/yyyy");
}

// Compares two Luxon DateTime objects.
export function compareDates(date1: DateTime, date2: DateTime): number {
  if (date1 < date2) return -1;
  if (date1 > date2) return 1;
  return 0;
}
