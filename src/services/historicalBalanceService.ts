
import { getBalances, getTransactions } from "../api/apiService";
import { HistoricalBalance } from "../models/historicalBalance";
import { populateMissingBalances, filterBalancesWithinDateRange, formatResult } from "./historicalBalanceHelpers/populate_fillter_format";
import { sortTransactionsByDateDescending } from "./historicalBalanceHelpers/sortTransactionsDesc";
import { buildDailyBalances } from "./historicalBalanceHelpers/buildDailyBalance";

export async function historicalBalanceService(fromDate: string, toDate: string): Promise<HistoricalBalance[]> {
  try {
    const balance = await getBalances();
    const transactions = await getTransactions();
    sortTransactionsByDateDescending(transactions);

    const dailyBalances = buildDailyBalances(balance, transactions);

    populateMissingBalances(dailyBalances, fromDate, toDate);

    const filteredBalances = filterBalancesWithinDateRange(dailyBalances, fromDate, toDate);

    return formatResult(filteredBalances);
  } catch (error) {
    console.error("Error in historicalBalanceService:", error);
    throw error; // propagate the error up to the calling function
  }
}

