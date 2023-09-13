import { Balance } from "../../models/balance";
import { Transaction } from "../../models/transaction";
import { validateAndParseDate } from "../../utils/dateValidator";
import { validateTransactionArray } from "../../utils/transactionValidators";
import { formatDate } from "../../utils/dateUtils";
import { ValidationError } from "../../utils/validationErrors";
import logger from "../../utils/logger";
import { DateFormat } from "../../utils/dateValidator";

const STATUS_CANCELLED = "CANCELLED";

export function buildDailyBalances(
    balance: Balance,
    transactions: Transaction[]
): Record<string, number> {
    try {
        // Validate the balance object
        if (!balance || typeof balance.amount !== 'number' || !balance.date) {
            throw new ValidationError('Invalid balance object');
        }

        const initialDate = validateAndParseDate(balance.date, DateFormat.DATE_FORMAT_ISO);

        // Validate the transactions array
        validateTransactionArray(transactions);

        let lastBalanceAmount = balance.amount;
        let lastDate = formatDate(initialDate);

        const dailyBalances: Record<string, number> = {
            [lastDate]: lastBalanceAmount,
        };

        for (const transaction of transactions) {
            const transactionDate = validateAndParseDate(transaction.date, DateFormat.DATE_FORMAT_ISO);

            if (transaction.status !== STATUS_CANCELLED) {
                lastBalanceAmount += transaction.amount;
                dailyBalances[formatDate(transactionDate)] = lastBalanceAmount;
            }
        }

        logger.info('Successfully built daily balances.');
        return dailyBalances;

    } catch (error) {
        logger.error(`Error in buildDailyBalances: ${error}`);
        throw error;
    }
}