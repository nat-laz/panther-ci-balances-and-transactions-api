import { sortTransactionsByDateDescending } from '../../../src/services/historicalBalanceServiceHelpers/sortTransactionsDesc';
import { describe, expect, it } from 'vitest';
import { Transaction } from '../../../src/models/transaction';

describe('sortTransactionsByDateDescending', () => {
    it('should sort transactions in descending order based on date', () => {
        const transactions: Transaction[] = [
            {
                "amount": -765,
                "currency": "EUR",
                "date": "2022-02-07T09:57:27.235Z",
                "status": "BOOKED"
            },
            {
                "amount": -911,
                "currency": "EUR",
                "date": "2022-01-03T22:00:09.002Z",
                "status": "PROCESSED"
            }
            // ... (other transactions)
        ];

        sortTransactionsByDateDescending(transactions);

        expect(transactions[0].date).toBe("2022-02-07T09:57:27.235Z");
        expect(transactions[1].date).toBe("2022-01-03T22:00:09.002Z");
    });

    it('should throw an error for invalid transaction array', () => {
        const invalidTransactions: any = "invalid";

        expect(() => sortTransactionsByDateDescending(invalidTransactions)).toThrowError();
    });

    it('should throw an error for invalid date format in transactions', () => {
        const transactionsWithInvalidDate: Transaction[] = [
            {
                "amount": -765,
                "currency": "EUR",
                "date": "invalid-date-format",
                "status": "BOOKED"
            }
        ];

        expect(() => sortTransactionsByDateDescending(transactionsWithInvalidDate)).toThrowError();
    });
});
