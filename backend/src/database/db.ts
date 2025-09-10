import {Pool} from 'pg'

const pool = new Pool({
  user: 'user',
  host: 'localhost',
  database: 'techworks_notes_db',
  password: 'password',
  port: 5432,
})

module.exports = pool