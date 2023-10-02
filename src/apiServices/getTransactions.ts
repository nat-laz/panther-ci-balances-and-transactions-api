import fetch from "node-fetch";
import logger from "../utils/logger";
import { API_KEY, API_URL, validateConfig } from '../utils/validateConfig';
import { ValidationError } from "../utils/validationErrors";

export async function getTransactions() {

  validateConfig(API_KEY, API_URL)

  try {
    const response = await fetch(`${API_URL}/transactions`, {
      method: 'GET',
      headers: { "x-api-key": API_KEY },
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new ValidationError(`Error while fetching transactions: ${errorData}`);
    }
    const data = await response.json()
    return data.transactions;
  } catch (error) {
    logger.error(`Error while fetching transactions: ${error}`);
    throw error;
  }
}
