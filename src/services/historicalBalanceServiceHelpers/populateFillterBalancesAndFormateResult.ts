import { ValidationError } from "../../utils/validationErrors";
import { validateAndParseDate } from "../../utils/dateValidator";
import { formatDate } from "../../utils/dateUtils";
import { validateDailyBalances } from "../../utils/dailyBalanceValidator";
import { HistoricalBalance } from "../../models/historicalBalance";
import logger from "../../utils/logger";
import { DateFormat } from "../../utils/dateValidator";

const CURRENCY_EUR = "EUR";


// Populate missing balances for dates within the specified date range
export function populateMissingBalances(
    dailyBalances: Record<string, number>,
    fromDate: string,
    toDate: string
): void {

    try {
        // Validate dailyBalances
        if (typeof dailyBalances !== "object" || dailyBalances === null) {
            throw new ValidationError('Invalid balance object');
        }

        // Validate and parse fromDate and toDate
        const startDate = validateAndParseDate(fromDate, DateFormat.DATE_FORMAT_ISO);
        const endDate = validateAndParseDate(toDate, DateFormat.DATE_FORMAT_ISO);


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
        //  console.log("dailyBalance VAR from populateMissingBalances", dailyBalances)
        logger.info('Successfully populate missing balances.');

    } catch (error) {
        logger.error(`Error in populateMissingBalances: ${error}`);
        throw error;
    }
}

// Filter balances that fall within the specified date range
export function filterBalancesWithinDateRange(
    dailyBalances: Record<string, number>,
    fromDate: string,
    toDate: string
): Record<string, number> {

    try {

        // Validate dailyBalances
        validateDailyBalances(dailyBalances)

        // Validate and parse fromDate and toDate using the utility function
        const startDateMillis = validateAndParseDate(fromDate, DateFormat.DATE_FORMAT_ISO).toUTC().toMillis();
        const endDateMillis = validateAndParseDate(toDate, DateFormat.DATE_FORMAT_ISO).toUTC().toMillis();


        if (startDateMillis > endDateMillis) {
            throw new ValidationError("fromDate should be less than or equal to toDate");
        }

        // Initialize filteredBalances
        const filteredBalances: Record<string, number> = {};

        // Validate each date in dailyBalances and filter them
        for (const [date, balance] of Object.entries(dailyBalances)) {

            const currentBalanceDateMillis = validateAndParseDate(date, DateFormat.DATE_FORMAT_CUSTOM).toUTC().toMillis();  // Validate each date
            if (currentBalanceDateMillis >= startDateMillis && currentBalanceDateMillis <= endDateMillis) {
                filteredBalances[date] = balance;
            }
        }

        logger.info(`Successfully filtered balances within ${fromDate} - ${toDate} date range.`);
        return filteredBalances;

    } catch (error) {
        logger.error(`Error in filterBalancesWithinDateRange: ${error}`);
        throw error;
    }
}

// Format the filtered balances into the final result array
export function formatResult(
    filteredBalances: Record<string, number>
): HistoricalBalance[] {


    try {
        // Validate dailyBalances
        validateDailyBalances(filteredBalances)

        // Create the result
        return Object.keys(filteredBalances).map((date) => ({
            date,
            amount: filteredBalances[date],
            currency: CURRENCY_EUR,
        }));

    } catch (error) {
        logger.error(`Error in formatResult: ${error}`);
        throw error;
    }
}
