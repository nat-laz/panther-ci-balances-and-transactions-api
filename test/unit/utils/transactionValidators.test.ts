import { expect } from 'vitest';
import { isValidStatus, validateTransactionArray } from "../../../src/utils/transactionValidators"
import { ValidationError } from '../../../src/utils/validationErrors'

describe('transactionValidators', () => {

  // Test suite for the isValidStatus function
  describe('isValidStatus', () => {

    test('does not throw an error for valid statuses', () => {
      const validStatuses = ["CANCELLED", "PROCESSED", "BOOKED"];
      validStatuses.forEach(status => {
        expect(() => isValidStatus(status)).not.toThrow();
      });
    });

    test('throws a ValidationError for an invalid status', () => {
      const invalidStatus = "INVALID_STATUS";
      expect(() => isValidStatus(invalidStatus)).toThrow(ValidationError);
    });

    test('throws a ValidationError with a correct message', () => {
      const invalidStatus = "INVALID_STATUS";
      expect(() => isValidStatus(invalidStatus)).toThrow(`Invalid transaction status: ${invalidStatus}`);
    });
  });


  // Test suite for the validateTransactionArray function
  describe('validateTransactionArray', () => {

    test('does not throw an error for valid transactions', () => {
      const validTransactions: { amount: number; date: string; status: string }[] = [
        { amount: 100, date: '2021-09-13T00:00:00Z', status: 'BOOKED' },
        { amount: 200, date: '2021-09-14T00:00:00Z', status: 'PROCESSED' },
      ];
      expect(() => validateTransactionArray(validTransactions)).not.toThrow();
    });

    test('throws a ValidationError if input is not an array', () => {
      const invalidInput: any = 'Not an array';
      expect(() => validateTransactionArray(invalidInput)).toThrow(ValidationError);
    });

    test('throws a ValidationError for invalid transaction objects', () => {
      const invalidTransactions: any[] = [{}, { amount: 'invalid', date: null, status: '' }];
      expect(() => validateTransactionArray(invalidTransactions)).toThrow(ValidationError);
    });

    test('throws a ValidationError for an empty array', () => {
      const emptyArray: any[] = [];
      expect(() => validateTransactionArray(emptyArray)).toThrow(ValidationError);
    });

    test('throws a ValidationError with the correct message for invalid inputs', () => {
      const notArray: any = 'Not an array';
      expect(() => validateTransactionArray(notArray)).toThrow('Input must be an array of transactions');
    });
  });

});