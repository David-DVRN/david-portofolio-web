import { Pool } from 'pg';

export const pool = new Pool({
  user: 'postgres', // ganti sesuai user PostgreSQL kamu
  host: 'localhost',
  database: 'music_db',
  password: 'dvrn123', // ganti dengan password PostgreSQL kamu
  port: 5432,
});
