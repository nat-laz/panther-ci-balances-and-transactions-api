import fetch from 'node-fetch';
import logger from "../utils/logger";
import { ValidationError } from '../utils/validationErrors';
import { Balance } from '../models/balance';
import { API_KEY, API_URL, validateConfig } from '../utils/validateConfig';


export async function getBalances() {

    validateConfig(API_KEY, API_URL)

    try {
        const response = await fetch(`${API_URL}/balances`, {
            method: 'GET',
            headers: { "x-api-key": API_KEY },
        });

        if (!response.ok) {
            const errorData = await response.text(); 
            throw new ValidationError(`Error while fetching balances: ${errorData}`);
        }

        return await response.json() as Balance;
    } catch (error) {
        logger.error(`Error while fetching balances: ${error}`);
        throw error;
    }
}
