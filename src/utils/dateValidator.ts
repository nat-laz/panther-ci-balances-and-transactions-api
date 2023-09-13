import { DateTime } from "luxon";
import { ValidationError } from "./validationErrors";
import logger from "./logger";

// Define enum for date formats
export enum DateFormat {
  DATE_FORMAT_ISO = 'ISO',
  DATE_FORMAT_CUSTOM = 'CUSTOM'
}

/**
 * Parses a date string into a DateTime object based on the specified format.
 * @param date - The date string to parse.
 * @param format - The format of the date string.
 * @throws {ValidationError} - Throws an error if an invalid format is specified.
 * @returns {DateTime} - Returns a DateTime object.
 */
export function parseDate(date: string, format: DateFormat): DateTime {
  if (format === DateFormat.DATE_FORMAT_ISO) {
    return DateTime.fromISO(date).toUTC();
  } else if (format === DateFormat.DATE_FORMAT_CUSTOM) {
    return DateTime.fromFormat(date, "dd/MM/yyyy"); // Custom format string
  } else {
    throw new ValidationError(`Invalid date format type specified. Supported formats are '${DateFormat.DATE_FORMAT_ISO}' and '${DateFormat.DATE_FORMAT_CUSTOM}'`);
  }
}

/**
 * Validates a parsed DateTime object.
 * @param parsedDate - The DateTime object to validate.
 * @param date - The original date string.
 * @param format - The format of the date string.
 * @throws {ValidationError} - Throws an error if the DateTime object is invalid.
 */
export function validateDate(parsedDate: DateTime, date: string, format: DateFormat): void {
  if (!parsedDate.isValid) {
    throw new ValidationError(`Invalid date format for '${date}' using format '${format}'`);
  }
}

/**
 * Validates and parses a date string into a DateTime object.
 * @param date - The date string to validate and parse.
 * @param format - The format of the date string.
 * @throws {Error} - Throws an error if validation or parsing fails.
 * @returns {DateTime} - Returns a valid DateTime object.
 */
export function validateAndParseDate(date: string, format: DateFormat): DateTime {
  try {
    const parsedDate = parseDate(date, format);
    validateDate(parsedDate, date, format);
    return parsedDate;
  } catch (error) {
    logger.error(`Error in validateAndParseDate: ${error}`);
    throw error;
  }
}

