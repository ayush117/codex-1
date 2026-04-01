import bcrypt from 'bcryptjs';
import { pool } from '../../../../lib/db';
import { signToken } from '../../../../lib/auth';
import { initDb } from '../../../../lib/initDb';

export async function POST(request) {
  try {
    await initDb();
    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email.toLowerCase()]);
    if (result.rowCount === 0) {
      return Response.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const user = result.rows[0];
    const hashedPassword = user.password ?? user.password_hash;
    if (!hashedPassword) {
      return Response.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, hashedPassword);
    if (!isValid) {
      return Response.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const token = signToken(user);
    return Response.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, skills: user.skills, experience: user.experience }
    });
  } catch (error) {
    return Response.json({ message: 'Failed to login' }, { status: 500 });
  }
}
