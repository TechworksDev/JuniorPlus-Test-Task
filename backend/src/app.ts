import express from "express";
import cors from "cors";
import notesRouter from "./routes/notes";
import { errorHandler } from "./middlewares/errorHandlers";
import logger from "./utils/logger";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  logger.info(`[${req.method}] ${req.url}`);
  next();
});

app.use("/api/notes", notesRouter);

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Notes API",
      version: "1.0.0",
      description: "API для работы с заметками",
    },
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);

export default app;
