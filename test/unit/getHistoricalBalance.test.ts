import { getHistoricalBalance } from "../../src/services/historicalBalanceService";

describe("getHistoricalBalance", () => {
  it("should return the boilerplate object", () => {
    const res = getHistoricalBalance();
    expect(res).toEqual({ hello: "world" });
  });
});
