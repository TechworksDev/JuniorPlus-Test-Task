import {Pool} from 'pg'

const environment = process.env.ENVIRONMENT // dev or prod
const database_host = environment == "dev" ? "localhost" : "postgres_db"

export const pool = new Pool({
  // connectionString: process.env.DATABASE_URL,
  user: 'user',
  host: 'localhost',
  database: 'appdb',
  password: 'password',
  port: 5432,
})