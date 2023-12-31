import { getTransactions } from "../apiServices/getTransactions";
import { getBalances } from "../apiServices/getBalances";
import { HistoricalBalance } from "../models/historicalBalance";
import { populateMissingBalances, filterBalancesWithinDateRange, formatResult } from "./historicalBalanceServiceHelpers/populateFillterBalancesAndFormateResult";
import { sortTransactionsByDateDescending } from "./historicalBalanceServiceHelpers/sortTransactionsDesc";
import { buildDailyBalances } from "./historicalBalanceServiceHelpers/buildDailyBalance";
import logger from "../utils/logger";

export async function historicalBalanceService(fromDate: string, toDate: string): Promise<HistoricalBalance[]> {
  try {
    logger.info("Fetching balances and transactions...");

    const balance = await getBalances();
    const transactions = await getTransactions();

    logger.info("Sorting transactions by date in descending oder...");

    sortTransactionsByDateDescending(transactions);

    logger.info("Building daily balances...");

    const dailyBalances = buildDailyBalances(balance, transactions);

    logger.info(`Populating missing balances and filtering balances within ${fromDate} - ${toDate} date range...`);

    populateMissingBalances(dailyBalances, fromDate, toDate);
    const filteredBalances = filterBalancesWithinDateRange(dailyBalances, fromDate, toDate);

    logger.info("Formatting the results...");

    return formatResult(filteredBalances);
  } catch (error) {
    logger.error("Error in historicalBalanceService:", error);
    throw error;
  }
}
