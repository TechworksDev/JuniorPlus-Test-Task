import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import { errorHandler } from "./middleware/errorHandler";
import { logger } from "./middleware/logger";
import notesRouter from "./routes/notes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(logger);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
  });
});

app.use("/api/notes", notesRouter);

app.get("/", (req, res) => {
  res.json({
    message: "Notes Platform API",
    version: "1.0.0",
    documentation: "/api-docs",
    health: "/health",
  });
});

app.use("*", (req, res) => {
  res.status(404).json({
    error: {
      message: "Route not found",
      status: 404,
      path: req.originalUrl,
    },
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});

export default app;
