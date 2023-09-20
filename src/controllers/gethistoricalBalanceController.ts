import { NextFunction, Request, Response } from "express";
import { historicalBalanceService } from "../services/historicalBalanceService";
import { HistoricalBalance } from "../models/historicalBalance";
import { validateAndParseDate } from "../utils/dateValidator";
import { compareDates } from "../utils/dateUtils";
import logger from "../utils/logger";
import { DateFormat } from "../utils/dateValidator";
import { ValidationError } from "../utils/validationErrors";


export const getHistoricalBalance = async (req: Request, res: Response, next: NextFunction) => {
  logger.info(`Handling getHistoricalBalance request with query params: ${JSON.stringify(req.query)}`);

  const { from, to, sort } = req.query;

  if (typeof from !== "string" || typeof to !== "string" || (sort && typeof sort !== "string")) {
    logger.warn("Invalid query parameters received in getHistoricalBalance request");
    return next(new ValidationError("Invalid query parameters"));
  }


  try {
    let historicalBalances: HistoricalBalance[] = await historicalBalanceService(from, to);

    historicalBalances = sortHistoricalBalances(historicalBalances, sort);

    logger.info(`Successfully fetched and sorted ${historicalBalances.length} historical balances`);
    res.json(historicalBalances);
  } catch (error) {
    logger.error(`Error while fetching historical balances: ${error}`);
    next(error);
  }
};

const sortHistoricalBalances = (balances: HistoricalBalance[], sort?: string) => {
  return balances.sort((a, b) =>
    sort === "desc"
      ? compareDates(validateAndParseDate(b.date, DateFormat.DATE_FORMAT_CUSTOM), validateAndParseDate(a.date, DateFormat.DATE_FORMAT_CUSTOM))
      : compareDates(validateAndParseDate(a.date, DateFormat.DATE_FORMAT_CUSTOM), validateAndParseDate(b.date, DateFormat.DATE_FORMAT_CUSTOM))
  );
};
