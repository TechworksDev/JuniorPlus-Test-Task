import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Note } from './entities/Note.entity';

export const db = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'root',
  database: 'notes',
  synchronize: true,
  logging: false,
  entities: [Note],
});

