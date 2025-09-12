import { Pool } from 'pg'

export const pool = new Pool({
  user: 'user',
  host: 'postgres_db',
  database: 'appdb',
  password: 'password',
  port: 5432,
})