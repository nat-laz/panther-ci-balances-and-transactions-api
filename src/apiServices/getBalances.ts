import axios, { AxiosError } from "axios";
import "dotenv/config";
import logger from "../utils/logger";

export const API_KEY = process.env.X_API_KEY;
export const API_URL: string = process.env.URL!;

export async function getBalances() {

    try {
        const response = await axios.get(`${API_URL}/balances`, {
            headers: { "x-api-key": API_KEY },
        });

        return response.data;
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