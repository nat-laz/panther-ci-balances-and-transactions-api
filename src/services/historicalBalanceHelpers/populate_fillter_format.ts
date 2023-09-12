import { ValidationError } from "../../utils/errorValidator";
import { validateAndParseDate } from "../../utils/dateValidator";
import { formatDate } from "../../utils/dateUtils";
import { DATE_FORMAT_ISO, DATE_FORMAT_CUSTOM } from "../../utils/dateValidator";
import { validateDailyBalances } from "../../utils/dailyBalanceValidator";
import { HistoricalBalance } from "../../models/historicalBalance";

const CURRENCY_EUR = "EUR";


// Populate missing balances for dates within the specified date range
export function populateMissingBalances(
    dailyBalances: Record<string, number>,
    fromDate: string,
    toDate: string
): void {
    // Validate dailyBalances
    if (typeof dailyBalances !== "object" || dailyBalances === null) {
        throw new ValidationError('Invalid balance object');
    }

    // Validate and parse fromDate and toDate
    const startDate = validateAndParseDate(fromDate, DATE_FORMAT_ISO);
    const endDate = validateAndParseDate(toDate, DATE_FORMAT_ISO);

    // Check if startDate is less than or equal to endDate
    if (startDate > endDate) {
        throw new ValidationError("fromDate should be less than or equal to toDate");
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
        throw new ValidationError("fromDate should be less than or equal to toDate");
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
