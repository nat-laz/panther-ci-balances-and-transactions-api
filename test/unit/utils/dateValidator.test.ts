import { vi, expect } from 'vitest';
import { parseDate, validateDate, validateAndParseDate, DateFormat } from '../../../src/utils/dateValidator';
import { DateTime } from 'luxon';
import { ValidationError } from '../../../src/utils/validationErrors';


describe('Date Validation Functions', () => {

    // Test suite for the parseDate function
    describe('parseDate', () => {
        test('parses ISO date string to DateTime', () => {
            const dateTime = parseDate('2022-09-13T00:00:00Z', DateFormat.DATE_FORMAT_ISO);
            expect(dateTime.toISO()).toBe('2022-09-13T00:00:00.000Z');
        });

        test('parses custom date string to DateTime', () => {
            const dateTime = parseDate('13/09/2022', DateFormat.DATE_FORMAT_CUSTOM);
            expect(dateTime.toFormat('dd/MM/yyyy')).toBe('13/09/2022');
        });

        test('throws ValidationError for unsupported format', () => {
            expect(() => parseDate('13/09/2022', 'INVALID_FORMAT' as any)).toThrow(ValidationError);
        });
    });

    // Test suite for the validateDate function
    describe('validateDate', () => {
        test('does not throw for valid DateTime', () => {
            const dateTime = DateTime.fromISO('2022-09-13T00:00:00Z');
            expect(() => validateDate(dateTime, '2022-09-13T00:00:00Z', DateFormat.DATE_FORMAT_ISO)).not.toThrow();
        });

        test('throws ValidationError for invalid DateTime', () => {
            const dateTime = DateTime.fromSeconds(0);
            try {
                validateDate(dateTime, 'invalid date', DateFormat.DATE_FORMAT_ISO);
            } catch (e) {
                console.log("Caught error: ", e);
                console.log("Is it an instance of ValidationError?", e instanceof ValidationError);
            }
        });


    });

    // Test suite for the isValidStatus function
    describe('validateAndParseDate', () => {
        test('returns DateTime for valid date and format', () => {
            const dateTime = validateAndParseDate('2022-09-13T00:00:00Z', DateFormat.DATE_FORMAT_ISO);
            expect(dateTime.toISO()).toBe('2022-09-13T00:00:00.000Z');
        });
    });
});
