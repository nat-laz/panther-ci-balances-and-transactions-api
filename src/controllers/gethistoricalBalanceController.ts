import { NextFunction, Request, Response } from "express";
import { historicalBalanceService } from "../services/historicalBalanceService";
import { HistoricalBalance } from "../models/historicalBalance";
import { isValidDate } from "../utils/dateValidator";
import { DATE_FORMAT_ISO } from "../utils/dateValidator";
import { compareDates, parseDate } from "../utils/dateUtils";


export const getHistoricalBalance = async (req: Request, res: Response, next: NextFunction) => {
  const { from, to, sort } = req.query;

  // Input validation for query parameters
  if (
    typeof from !== "string" ||
    typeof to !== "string" ||
    (sort && typeof sort !== "string")
  ) {
    res.status(400).json({ error: "Invalid query parameters" });
    return;
  }

  if (!isValidDate(from, DATE_FORMAT_ISO) || !isValidDate(to, DATE_FORMAT_ISO)) {
    res.status(400).json({ error: "Invalid date format" });
    return;
  }


  try {
    // Retrieve historical balances for the specified date range
    let historicalBalances: HistoricalBalance[] =
      await historicalBalanceService(from, to);

    // Sort the historical balances
    historicalBalances.sort((a, b) =>
      sort === "desc"
        ? compareDates(parseDate(b.date), parseDate(a.date))
        : compareDates(parseDate(a.date), parseDate(b.date))
    );


    res.json(historicalBalances);
  } catch (error) {
    console.error("Error while fetching historical balances:", error);
    next(error); // Pass the error to your error-handling middleware
  }
};
