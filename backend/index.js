const express = require('express')
const {Pool} = require('pg')

const app = express()
const port = 3000

const pool = new Pool({
  user: 'user',
  host: 'localhost',
  database: 'techworks_notes_db',
  password: 'password',
  port: 5432,
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})