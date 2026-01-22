const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: ''
});

client.connect()
  .then(() => {
    console.log('✅ Connected to PostgreSQL!');
    return client.query('SELECT version()');
  })
  .then(result => {
    console.log('PostgreSQL version:', result.rows[0].version);
    return client.query('SELECT datname FROM pg_database WHERE datistemplate = false;');
  })
  .then(result => {
    console.log('Available databases:', result.rows.map(r => r.datname));
    client.end();
  })
  .catch(err => {
    console.error('❌ Connection failed:', err.message);
    client.end();
  });