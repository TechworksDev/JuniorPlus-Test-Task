const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

async function runMigrations() {
  const pool = new Pool({
    connectionString:
      process.env.DATABASE_URL ||
      "postgresql://notes_user:notes_password@localhost:5432/notes_db",
  });

  try {
    const migrationsDir = path.join(__dirname, "../migrations");
    const migrationFiles = fs
      .readdirSync(migrationsDir)
      .filter((file) => file.endsWith(".sql"))
      .sort();

    for (const file of migrationFiles) {
      console.log(`📄 Running migration: ${file}`);
      const migrationSQL = fs.readFileSync(
        path.join(migrationsDir, file),
        "utf8"
      );

      await pool.query(migrationSQL);
    }

    console.log("migrations completed successfully!");
  } catch (error) {
    console.error("migration failed:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runMigrations();
