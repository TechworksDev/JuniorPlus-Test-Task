import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import notesRouter from "./routes/notes";

const app = express();

app.use(express.json());

// ✅ разрешаем CORS
app.use(cors({
  origin: "http://localhost:5173", // можно "*" для тестов
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
}));

// Swagger
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Роуты
app.use("/api/notes", notesRouter);

app.listen(3000, () => {
  console.log("Notes backend listening on port 3000");
});
