import axios from "axios";
import "dotenv/config";

const API_KEY = process.env.X_API_KEY;
const API_URL: string = process.env.URL!;

export async function getBalances() {
  try {
    const response = await axios.get(`${API_URL}/balances`, {
      headers: { "x-api-key": API_KEY },
    });

    return response.data;
  } catch (error) {
    console.error("Error while fetching balances:", error);
    throw error; // Rethrow the error for handling at a higher level
  }
}

export async function getTransactions() {
  try {
    const response = await axios.get(`${API_URL}/transactions`, {
      headers: { "x-api-key": API_KEY },
    });

    return response.data.transactions;
  } catch (error) {
    console.error("Error while fetching transactions:", error);
    throw error; // Rethrow the error for handling at a higher level
  }
}
