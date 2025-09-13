import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 5433),
  user: process.env.DB_USER || "notes_user",
  password: process.env.DB_PASS || "notes_pass",
  database: process.env.DB_NAME || "notes_db",
});

export default pool;
