import { DateTime } from "luxon";

// Define constants for date formats
export const DATE_FORMAT_ISO = 'ISO';
export const DATE_FORMAT_CUSTOM = 'custom';  // You could give this a more descriptive name
const CUSTOM_DATE_FORMAT_STRING = "dd/MM/yyyy";

// Enumerate the supported date formats for better type safety and autocompletion
type DateFormat = 'ISO' | 'custom';

/**
 * Validate and parse a date string into a DateTime object.
 *
 * Supports the following date formats:
 * - 'ISO': An ISO-8601 formatted string (e.g., "2023-09-11T00:00:00.000Z")
 * - 'custom': A custom format represented as "dd/MM/yyyy"
 *
 * @param date - The date string to validate and parse
 * @param format - The expected format of the date string ('ISO' or 'custom')
 * @returns The parsed DateTime object in UTC
 * @throws Will throw an error if the date is invalid or the format is unsupported
 */
export function validateAndParseDate(date: string, format: DateFormat): DateTime {
  let parsedDate: DateTime;

  if (format === DATE_FORMAT_ISO) {
    parsedDate = DateTime.fromISO(date).toUTC();
  } else if (format === DATE_FORMAT_CUSTOM) {
    parsedDate = DateTime.fromFormat(date, CUSTOM_DATE_FORMAT_STRING);
  } else {
    throw new Error(`Invalid date format type specified. Supported formats are '${DATE_FORMAT_ISO}' and '${DATE_FORMAT_CUSTOM}'`);
  }

  if (!parsedDate.isValid) {
    throw new Error(`Invalid date format for '${date}' using format '${format}'`);
  }

  return parsedDate;
}
