import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import historicalBalanceRoute from "./routes/historicalBalanceRoute";
import { ValidationError } from "./utils/validationErrors";
import logger from './utils/logger'

const app = express();

// Logging middleware
app.use((req, res, next) => {
    logger.info(`Incoming request: ${req.method} ${req.path}`);
    next();
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api", historicalBalanceRoute);

// Log that the server is starting
logger.info('Starting server...');

// General error-handling middleware
app.use((err: Error, req: Request, res: Response) => {
    logger.error(err.message);  // Log the error details using Winston

    if (err instanceof ValidationError) {
        return res.status(400).json({ error: err.message }); // 400 Bad Request for validation errors
    }

    return res.status(500).json({ error: "An unexpected error occurred." });
});

export default app;
