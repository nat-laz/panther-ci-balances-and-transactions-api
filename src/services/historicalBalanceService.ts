
import { getBalances, getTransactions } from "../api/apiService";
import { HistoricalBalance } from "../models/historicalBalance";
import { sortTransactionsByDateDescending, buildDailyBalances, populateMissingBalances, filterBalancesWithinDateRange, formatResult } from "./historicalBalanceHelpers";



export async function historicalBalanceService(fromDate: string, toDate: string): Promise<HistoricalBalance[]> {
  const balance = await getBalances();
  const transactions = await getTransactions();
  sortTransactionsByDateDescending(transactions);

  const dailyBalances = buildDailyBalances(balance, transactions);

  populateMissingBalances(dailyBalances, fromDate, toDate);

  const filteredBalances = filterBalancesWithinDateRange(dailyBalances, fromDate, toDate);

  return formatResult(filteredBalances);
}

