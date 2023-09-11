import { Request, Response } from "express";
import { historicalBalanceService } from "../services/historicalBalanceService";
import { HistoricalBalance } from "../models/historicalBalance";
import { compareDates, parseDate } from "../utils/dateUtils";

export const getHistoricalBalance = async (req: Request, res: Response) => {
  const { from, to, sort } = req.query;

  // Ensure that the query parameters are of the correct type
  if (
    typeof from !== "string" ||
    typeof to !== "string" ||
    (sort && typeof sort !== "string")
  ) {
    res.status(400).send("Invalid query parameters");
    return;
  }

  try {
    // Calculate historical balances for the specified date range
    let historicalBalances: HistoricalBalance[] =
      await historicalBalanceService(from, to);

    // Sort the results based on the 'sort' query parameter
    if (sort === "desc") {
      historicalBalances.sort((a, b) =>
        compareDates(parseDate(b.date), parseDate(a.date))
      );
    } else {
      historicalBalances.sort((a, b) =>
        compareDates(parseDate(a.date), parseDate(b.date))
      );
    }

    res.json(historicalBalances);
  } catch (error) {
    console.error("Error while fetching historical balances:", error);
    res.status(500).send("Internal Server Error");
  }
};
