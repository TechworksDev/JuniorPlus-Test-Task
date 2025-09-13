import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import notesRouter from "./routes/notes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import { errorHandler } from "./middlewares/errorHandler";


const app = express();

app.use(helmet());
app.use(cors());

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/notes", notesRouter);

app.get("/", (_req, res) => res.send("Notes API"));

app.use(errorHandler);

export default app;
