import dotenv from 'dotenv';
import { Pool, PoolClient } from 'pg';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

let _db: PoolClient;

const connectToDB = async () => {
  try {
    _db = await pool.connect();
    console.log('Connected to DB');
  } catch (err) {
    console.log('Error connecting to DB', err);
  }
};

const initDb = async () => {
  if (_db) {
    console.log('Database is already initialized');
    return;
  }

  await connectToDB();
};

const getDb = () => {
  if (!_db) {
    throw 'No database found';
  }
  return _db;
};

export { initDb, getDb };
