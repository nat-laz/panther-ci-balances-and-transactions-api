import { validateDailyBalances } from '../../../src/utils/dailyBalanceValidator';
import { ValidationError } from '../../../src/utils/validationErrors';

describe('validateDailyBalances', () => {
    test('throws ValidationError when dailyBalances is null', () => {
        expect(() => validateDailyBalances(null as any)).toThrow(ValidationError);
    });

    test('throws ValidationError when dailyBalances is not an object', () => {
        expect(() => validateDailyBalances('not an object' as any)).toThrow(ValidationError);
    });

    test('throws ValidationError when balance is not a number', () => {
        const invalidDailyBalances = { '2022-09-13': 'not a number' };
        expect(() => validateDailyBalances(invalidDailyBalances as any)).toThrow(ValidationError);
    });

    test('does not throw for valid dailyBalances', () => {
        const validDailyBalances = { '2022-09-13': 100, '2022-09-14': 200 };
        expect(() => validateDailyBalances(validDailyBalances)).not.toThrow();
    });
});
