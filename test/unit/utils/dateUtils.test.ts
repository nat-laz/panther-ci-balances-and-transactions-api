import { formatDate, compareDates } from "../../../src/utils/dateUtils";
import { DateTime } from "luxon";

describe('dateUtils', () => {

  // Test suite for formatDate
  describe('formatDate', () => {

    test('formats a DateTime object correctly', () => {
      const dateTime = DateTime.utc(2023, 9, 13);
      const formatted = formatDate(dateTime);
      expect(formatted).toBe("13/09/2023");
    });

    test('formats a date string correctly', () => {
      const dateStr = "2023-09-13T00:00:00Z";
      const formatted = formatDate(dateStr);
      expect(formatted).toBe("13/09/2023");
    });
  });

  // Test suite for compareDates
  describe('compareDates', () => {

    test('compares two equal DateTime objects correctly', () => {
      const dateTime1 = DateTime.utc(2023, 9, 13);
      const dateTime2 = DateTime.utc(2023, 9, 13);
      expect(compareDates(dateTime1, dateTime2)).toBe(0);
    });

    test('compares a smaller to a larger DateTime object correctly', () => {
      const dateTime1 = DateTime.utc(2023, 9, 12);
      const dateTime2 = DateTime.utc(2023, 9, 13);
      expect(compareDates(dateTime1, dateTime2)).toBe(-1);
    });

    test('compares a larger to a smaller DateTime object correctly', () => {
      const dateTime1 = DateTime.utc(2023, 9, 14);
      const dateTime2 = DateTime.utc(2023, 9, 13);
      expect(compareDates(dateTime1, dateTime2)).toBe(1);
    });
  });
});
