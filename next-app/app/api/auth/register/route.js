import bcrypt from 'bcryptjs';
import { pool } from '../../../../lib/db';
import { signToken } from '../../../../lib/auth';
import { initDb } from '../../../../lib/initDb';

export async function POST(request) {
  try {
    await initDb();
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return Response.json({ message: 'Name, email, and password are required' }, { status: 400 });
    }

    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email.toLowerCase()]);
    if (existing.rowCount > 0) {
      return Response.json({ message: 'Email already in use' }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email.toLowerCase(), hashed]
    );

    const user = result.rows[0];
    const token = signToken(user);
    return Response.json({ token, user }, { status: 201 });
  } catch (error) {
    return Response.json({ message: 'Failed to register user' }, { status: 500 });
  }
}
