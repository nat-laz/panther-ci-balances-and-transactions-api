import express from "express";
import { getHistoricalBalance } from "../controllers/historicalBalanceController";

const router = express.Router();

router.route("/historical-balances").get(getHistoricalBalance);

export default router;
