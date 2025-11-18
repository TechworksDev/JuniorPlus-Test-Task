import dotenv from 'dotenv';
import app from './app';
import { pool } from './config/database';

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
});

process.on('SIGTERM', async () => {
    await pool.end();
    process.exit(0);
});