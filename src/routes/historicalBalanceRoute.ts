import express from "express";
import { getHistoricalBalance } from "../controllers/gethistoricalBalanceController";

const router = express.Router();

router.route("/historical-balances").get(getHistoricalBalance);

export default router;
