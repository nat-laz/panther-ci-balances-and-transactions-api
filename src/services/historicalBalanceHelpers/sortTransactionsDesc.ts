import { Transaction } from "../../models/transaction";
import { validateTransactionArray } from "../../utils/transactionValidators";
import { validateAndParseDate } from "../../utils/dateValidator";
import { DATE_FORMAT_ISO } from "../../utils/dateValidator";
import logger from "../../utils/logger";


export function sortTransactionsByDateDescending(
    transactions: Transaction[]
): void {
    try {
        validateTransactionArray(transactions);

        transactions.sort((a, b) => {
            const dateA = validateAndParseDate(a.date, DATE_FORMAT_ISO).toMillis();
            const dateB = validateAndParseDate(b.date, DATE_FORMAT_ISO).toMillis();

            return dateB - dateA;
        });
    } catch (error) {
        logger.error(`Error in sortTransactionsByDateDescending: ${error}`);
        throw error;
    }
}
