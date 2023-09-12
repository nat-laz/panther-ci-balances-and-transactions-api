import { Balance } from "../../models/balance";
import { Transaction } from "../../models/transaction";
import { validateAndParseDate } from "../../utils/dateValidator";
import { DATE_FORMAT_ISO } from "../../utils/dateValidator";
import { validateTransactionArray } from "../../utils/transactionValidators";
import { formatDate } from "../../utils/dateUtils";
import { ValidationError } from "../../utils/errorValidator";

const STATUS_CANCELLED = "CANCELLED";

export function buildDailyBalances(
    balance: Balance,
    transactions: Transaction[]
): Record<string, number> {
    // Validate the balance object
    // Validate the balance object
    if (!balance || typeof balance.amount !== 'number' || !balance.date) {
        throw new ValidationError('Invalid balance object');
    }

    // Validate the date in the balance object
    const initialDate = validateAndParseDate(balance.date, DATE_FORMAT_ISO);

    // Validate the transactions array
    validateTransactionArray(transactions);

    // Initialize variables
    let lastBalanceAmount = balance.amount;
    let lastDate = formatDate(initialDate);

    // Initialize the dailyBalances object
    const dailyBalances: Record<string, number> = {
        [lastDate]: lastBalanceAmount,
    };

    for (const transaction of transactions) {
        const transactionDate = validateAndParseDate(transaction.date, DATE_FORMAT_ISO);

        // Update daily balances if the transaction is not cancelled
        if (transaction.status !== STATUS_CANCELLED) {
            lastBalanceAmount += transaction.amount;
            dailyBalances[formatDate(transactionDate)] = lastBalanceAmount;
        }
    }

    return dailyBalances;
}
