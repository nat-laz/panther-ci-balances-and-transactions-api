import axios, { AxiosError } from "axios";
import "dotenv/config";
import logger from "../utils/logger";
import { API_KEY, API_URL } from "./getBalances";

export async function getTransactions() {

    try {
        const response = await axios.get(`${API_URL}/transactions`, {
          headers: { "x-api-key": API_KEY },
        });

        return response.data.transactions;

    } catch (error) {
        const axiosError = error as AxiosError;
        logger.error(`Error while fetching balances: ${axiosError}`);

        if (axiosError.response && axiosError.response.data) {
          throw axiosError.response.data;
        } else {
          throw axiosError;
        }
    }
}