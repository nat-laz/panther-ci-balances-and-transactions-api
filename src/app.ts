import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import historicalBalanceRoute from "./routes/historicalBalanceRoute";
import { ValidationError } from "./utils/errorValidator";  // Import your custom error class

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api", historicalBalanceRoute);

// General error-handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);  // Log the error details

  if (err instanceof ValidationError) {
    return res.status(400).json({ error: err.message }); // 400 Bad Request for validation errors
  }

  return res.status(500).json({ error: "An unexpected error occurred." });
});

export default app;
