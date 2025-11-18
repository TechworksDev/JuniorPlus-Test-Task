import { Pool } from 'pg';

// Pool - это пул соединений с БД (эффективнее чем каждый раз создавать новое)
export const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME || 'notes_db',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    max: 20, // максимум 20 соединений
    idleTimeoutMillis: 30000, // закрываем неактивные через 30 сек
});

pool.on('connect', () => {
});

pool.on('error', (err) => {
    process.exit(-1);
});