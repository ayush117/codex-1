const pool = require('../config/db');

async function initDb() {
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
}

module.exports = initDb;
