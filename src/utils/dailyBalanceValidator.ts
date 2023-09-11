const INVALID_DAILY_BALANCES_ERROR = "Invalid dailyBalances object";

export function validateDailyBalances(dailyBalances: Record<string, number>): void {
  if (typeof dailyBalances !== "object" || dailyBalances === null) {
    throw new Error(INVALID_DAILY_BALANCES_ERROR);
  }

  for (const [date, balance] of Object.entries(dailyBalances)) {
    if (typeof balance !== 'number') {
      throw new Error(`Invalid balance for date ${date}`);
    }
  }
}
