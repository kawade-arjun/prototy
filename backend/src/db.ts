import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.warn('⚠️  WARNING: DATABASE_URL is not set in server/.env. Please paste your Supabase connection string.');
}

export const pool = new Pool({
  connectionString,
  ssl: connectionString?.includes('localhost')
    ? false
    : { rejectUnauthorized: false }
});

pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL database successfully.');
});

pool.on('error', (err) => {
  console.error('❌ Unexpected PostgreSQL error on idle client:', err.message);
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
