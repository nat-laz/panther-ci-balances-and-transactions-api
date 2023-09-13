import axios from 'axios';
import { describe, expect, vi } from 'vitest';
import { getBalances } from '../../../src/apiServices/getBalances';


// Mock axios globally to prevent actual HTTP requests during testing.
vi.mock("axios");

describe('API Service', () => {
  describe('getBalances', () => {

    it('makes a GET request to fetch balances', async () => {
      const balancesMock = {
        "amount": 10000,
        "currency": "EUR",
        "date": "2022-06-30T23:59:59.577Z"
      };

      vi.mocked(axios, true).get.mockResolvedValueOnce({
        data: balancesMock,
      });

      const balances = await getBalances();

      expect(axios.get).toHaveBeenCalledWith(`${process.env.URL}/balances`, {
        headers: { "x-api-key": process.env.X_API_KEY }
      });
      expect(balances).toStrictEqual(balancesMock);
    });


    it('rethrows on failed request', async () => {
      const mockError = new Error('Request failed');

      vi.mocked(axios, true).get.mockRejectedValueOnce(mockError);

      await expect(getBalances()).rejects.toThrow(mockError);
    });

  });
});