import { pool } from '../../../lib/db';
import { getJobById } from '../../../lib/jobs';
import { verifyAuthHeader } from '../../../lib/auth';
import { initDb } from '../../../lib/initDb';

export async function GET(request) {
  try {
    await initDb();
    const user = verifyAuthHeader(request);
    const result = await pool.query(
      `SELECT id, job_id, job_title, company, status, created_at FROM applications WHERE user_id = $1 ORDER BY created_at DESC`,
      [user.id]
    );
    return Response.json(result.rows);
  } catch (error) {
    return Response.json({ message: error.message || 'Failed to fetch applications' }, { status: 401 });
  }
}

export async function POST(request) {
  try {
    await initDb();
    const user = verifyAuthHeader(request);
    const { jobId } = await request.json();
    if (!jobId) {
      return Response.json({ message: 'jobId is required' }, { status: 400 });
    }

    const job = getJobById(jobId);
    if (!job) {
      return Response.json({ message: 'Job not found' }, { status: 404 });
    }

    const result = await pool.query(
      `INSERT INTO applications (user_id, job_id, job_title, company, status) VALUES ($1, $2, $3, $4, 'Applied') RETURNING *`,
      [user.id, job.id, job.title, job.company]
    );
    return Response.json(result.rows[0], { status: 201 });
  } catch (error) {
    return Response.json({ message: error.message || 'Failed to create application' }, { status: 401 });
  }
}
