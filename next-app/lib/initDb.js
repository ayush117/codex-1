import { pool } from './db';
import bcrypt from 'bcryptjs';

let initialized = false;

export async function initDb() {
  if (initialized) return;

  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(120) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      skills TEXT[] DEFAULT ARRAY[]::TEXT[],
      experience TEXT DEFAULT ''
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS applications (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      job_id INTEGER NOT NULL,
      job_title VARCHAR(255) NOT NULL,
      company VARCHAR(255) NOT NULL,
      status VARCHAR(40) NOT NULL DEFAULT 'Applied',
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `);

  const demoEmail = 'demo@bloomdesk.dev';
  const demoPassword = 'demo1234';
  const demoName = 'Demo User';

  const existingDemoUser = await pool.query('SELECT id FROM users WHERE email = $1', [demoEmail]);
  if (existingDemoUser.rowCount === 0) {
    const hashedPassword = await bcrypt.hash(demoPassword, 10);
    await pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [demoName, demoEmail, hashedPassword]);
  }

  initialized = true;
}
