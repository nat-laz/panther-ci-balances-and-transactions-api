import axios from "axios";
import { expect, it, vi } from "vitest";
import { getTransactions } from '../../../src/apiServices/getTransactions';


// Mock axios globally to prevent actual HTTP requests during testing.
vi.mock("axios");

describe('API Service', () => {
    describe('getTransactions', () => {

        it('makes a GET request to fetch transactions', async () => {
            const transactionsMock = {
                "transactions": [
                    {
                        "amount": -765,
                        "currency": "EUR",
                        "date": "2022-02-07T09:57:27.235Z",
                        "status": "BOOKED"
                    },
                    {
                        "amount": -911,
                        "currency": "EUR",
                        "date": "2022-01-03T22:00:09.002Z",
                        "status": "PROCESSED"
                    }
                    // ... (other transactions)
                ]
            };

            vi.mocked(axios, true).get.mockResolvedValueOnce({
                data: transactionsMock,
            });

            const transactions = await getTransactions();

            expect(axios.get).toHaveBeenCalledWith(`${process.env.URL}/transactions`, {
                headers: { "x-api-key": process.env.X_API_KEY }
            });
            expect(transactions).toStrictEqual(transactionsMock.transactions);
        });

        it('rethrows on failed request', async () => {
            const mockError = new Error('Request failed');

            vi.mocked(axios, true).get.mockRejectedValueOnce(mockError);

            await expect(getTransactions()).rejects.toThrow(mockError);
        });
    });
});
