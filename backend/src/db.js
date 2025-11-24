import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

console.log('DATABASE_URL configured:', process.env.DATABASE_URL ? 'YES' : 'NO');
console.log('NODE_ENV:', process.env.NODE_ENV);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

pool.on('error', (err) => {
  console.error('Nieoczekiwany błąd na kliencie puli', err);
});

pool.on('connect', () => {
  console.log('✅ Połączenie z bazą danych ustanowione');
});

export default pool;
