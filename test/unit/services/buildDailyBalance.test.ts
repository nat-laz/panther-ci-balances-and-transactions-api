import { Balance } from '../../../src/models/balance';
import { Transaction } from '../../../src/models/transaction';
import { buildDailyBalances } from '../../../src/services/historicalBalanceServiceHelpers/buildDailyBalance';
import { describe, expect, it, vi } from 'vitest';


describe('buildDailyBalances', () => {


    it('should build daily balances correctly', () => {
        const balance: Balance = {
            "amount": 10000,
            "currency": "EUR",
            "date": "2022-06-30T23:59:59.577Z"
        };

        const transactions: Transaction[] = [
            {
                "amount": -765,
                "currency": "EUR",
                "date": "2022-06-29T09:57:27.235Z",
                "status": "BOOKED"
            },
            {
                "amount": -911,
                "currency": "EUR",
                "date": "2022-06-28T22:00:09.002Z",
                "status": "PROCESSED"
            }
        ];

        const result = buildDailyBalances(balance, transactions);

        expect(result["30/06/2022"]).toBe(10000);
        expect(result["29/06/2022"]).toBe(9235);
        expect(result["28/06/2022"]).toBe(8324);


    });

    it('should skip transactions with status CANCELLED', () => {
        const balance: Balance = {
            "amount": 10000,
            "currency": "EUR",
            "date": "2022-06-30T23:59:59.577Z"
        };

        const transactions: Transaction[] = [
            {
                "amount": -765,
                "currency": "EUR",
                "date": "2022-06-29T09:57:27.235Z",
                "status": "CANCELLED"
            }
        ];

        const result = buildDailyBalances(balance, transactions);

        expect(result["30/06/2022"]).toBe(10000);
        expect(result["29/06/2022"]).toBeUndefined();

    });

    it('should throw an error for invalid balance object', () => {
        const invalidBalance: any = {
            "currency": "EUR",
            "date": "2022-06-30T23:59:59.577Z"
        };

        const transactions: any = [];

        expect(() => buildDailyBalances(invalidBalance, transactions)).toThrow();

    });

    it('should throw an error for invalid transaction arrays', () => {
        const balance = {
            "amount": 10000,
            "currency": "EUR",
            "date": "2022-06-30T23:59:59.577Z"
        };

        const invalidTransactions: any = "invalid";

        expect(() => buildDailyBalances(balance, invalidTransactions)).toThrow();

    });


});
