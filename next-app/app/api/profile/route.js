import { pool } from '../../../lib/db';
import { verifyAuthHeader } from '../../../lib/auth';
import { initDb } from '../../../lib/initDb';

export async function GET(request) {
  try {
    await initDb();
    const user = verifyAuthHeader(request);
    const result = await pool.query('SELECT id, name, email, skills, experience FROM users WHERE id = $1', [user.id]);

    if (result.rowCount === 0) {
      return Response.json({ message: 'User not found' }, { status: 404 });
    }

    return Response.json(result.rows[0]);
  } catch (error) {
    return Response.json({ message: error.message || 'Failed to fetch profile' }, { status: 401 });
  }
}

export async function PUT(request) {
  try {
    await initDb();
    const user = verifyAuthHeader(request);
    const { name, skills, experience } = await request.json();

    const result = await pool.query(
      `UPDATE users SET name = COALESCE($1, name), skills = COALESCE($2, skills), experience = COALESCE($3, experience) WHERE id = $4 RETURNING id, name, email, skills, experience`,
      [name ?? null, skills ?? null, experience ?? null, user.id]
    );

    if (result.rowCount === 0) {
      return Response.json({ message: 'User not found' }, { status: 404 });
    }

    return Response.json(result.rows[0]);
  } catch (error) {
    return Response.json({ message: error.message || 'Failed to update profile' }, { status: 401 });
  }
}
