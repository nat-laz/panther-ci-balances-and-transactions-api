import { formatDate } from "../utils/dateUtils";
import { Balance } from "../models/balance";
import { Transaction } from "../models/transaction";
import { HistoricalBalance } from "../models/historicalBalance";
import { validateAndParseDate } from "../utils/dateValidator";
import { validateTransactionArray } from "../utils/transactionValidators";
import { validateDailyBalances } from "../utils/dailyBalanceValidator";
import { DATE_FORMAT_CUSTOM, DATE_FORMAT_ISO } from "../utils/dateValidator";

const CURRENCY_EUR = "EUR";
const STATUS_CANCELLED = "CANCELLED";


// Sort transactions by date in descending order
export function sortTransactionsByDateDescending(
    transactions: Transaction[]
): void {
    validateTransactionArray(transactions);

    transactions.sort((a, b) => {
        const dateA = validateAndParseDate(a.date, DATE_FORMAT_ISO).toMillis();
        const dateB = validateAndParseDate(b.date, DATE_FORMAT_ISO).toMillis();

        return dateB - dateA;
    });
}

// Build daily balances from the given transactions and starting balance
export function buildDailyBalances(
    balance: Balance,
    transactions: Transaction[]
): Record<string, number> {
    // Validate the balance object
    if (!balance || typeof balance.amount !== "number" || !balance.date) {
        throw new Error("Invalid balance object");
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

// Populate missing balances for dates within the specified date range
export function populateMissingBalances(
    dailyBalances: Record<string, number>,
    fromDate: string,
    toDate: string
): void {
    // Validate dailyBalances
    if (typeof dailyBalances !== "object" || dailyBalances === null) {
        throw new Error("Invalid dailyBalances object");
    }

    // Validate and parse fromDate and toDate
    const startDate = validateAndParseDate(fromDate, DATE_FORMAT_ISO);
    const endDate = validateAndParseDate(toDate, DATE_FORMAT_ISO);

    // Check if startDate is less than or equal to endDate
    if (startDate > endDate) {
        throw new Error("fromDate should be less than or equal to toDate");
    }

    // Initialize current balance
    let currentBalance =
        dailyBalances[formatDate(startDate)] || dailyBalances[formatDate(endDate)];

    // Loop to populate missing balances
    for (let d = startDate; d <= endDate; d = d.plus({ days: 1 })) {
        const formattedDate = formatDate(d);
        dailyBalances[formattedDate] =
            dailyBalances[formattedDate] ?? currentBalance;
    }
}

// Filter balances that fall within the specified date range
export function filterBalancesWithinDateRange(
    dailyBalances: Record<string, number>,
    fromDate: string,
    toDate: string
): Record<string, number> {

    // Validate dailyBalances
    validateDailyBalances(dailyBalances)

    // Validate and parse fromDate and toDate using the utility function
    const startDateMillis = validateAndParseDate(fromDate, DATE_FORMAT_ISO).toUTC().toMillis();
    const endDateMillis = validateAndParseDate(toDate, DATE_FORMAT_ISO).toUTC().toMillis();

    // Check if startDate is less than or equal to endDate
    if (startDateMillis > endDateMillis) {
        throw new Error("fromDate should be less than or equal to toDate");
    }

    // Initialize filteredBalances
    const filteredBalances: Record<string, number> = {};

    // Validate each date in dailyBalances and filter them
    for (const [date, balance] of Object.entries(dailyBalances)) {
        const currentBalanceDateMillis = validateAndParseDate(date, DATE_FORMAT_CUSTOM).toUTC().toMillis();  // Validate each date
        if (currentBalanceDateMillis >= startDateMillis && currentBalanceDateMillis <= endDateMillis) {
            filteredBalances[date] = balance;
        }
    }

    return filteredBalances;
}

// Format the filtered balances into the final result array
export function formatResult(
    filteredBalances: Record<string, number>
): HistoricalBalance[] {


    // Validate dailyBalances
    validateDailyBalances(filteredBalances)

    // Create the result
    return Object.keys(filteredBalances).map((date) => ({
        date,
        amount: filteredBalances[date],
        currency: CURRENCY_EUR,
    }));
}
