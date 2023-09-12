import { NextFunction, Request, Response } from "express";
import { historicalBalanceService } from "../services/historicalBalanceService";
import { HistoricalBalance } from "../models/historicalBalance";
import { isValidDate } from "../utils/dateValidator";
import { DATE_FORMAT_ISO } from "../utils/dateValidator";
import { compareDates, parseDate } from "../utils/dateUtils";
import logger from "../utils/logger";


export const getHistoricalBalance = async (req: Request, res: Response, next: NextFunction) => {
  logger.info(`Handling getHistoricalBalance request with query params: ${JSON.stringify(req.query)}`);

  const { from, to, sort } = req.query;

  if (typeof from !== "string" || typeof to !== "string" || (sort && typeof sort !== "string")) {
    logger.warn("Invalid query parameters received in getHistoricalBalance request");
    res.status(400).json({ error: "Invalid query parameters" });
    return;
  }

  if (!isValidDate(from, DATE_FORMAT_ISO) || !isValidDate(to, DATE_FORMAT_ISO)) {
    logger.warn("Invalid date format received in getHistoricalBalance request");
    res.status(400).json({ error: "Invalid date format" });
    return;
  }

  try {
    let historicalBalances: HistoricalBalance[] = await historicalBalanceService(from, to);

    historicalBalances.sort((a, b) =>
      sort === "desc"
        ? compareDates(parseDate(b.date), parseDate(a.date))
        : compareDates(parseDate(a.date), parseDate(b.date))
    );

    logger.info(`Successfully fetched and sorted ${historicalBalances.length} historical balances`);
    res.json(historicalBalances);
  } catch (error) {
    logger.error(`Error while fetching historical balances: ${error}`);
    next(error);
  }
};
