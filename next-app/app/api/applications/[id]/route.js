import { pool } from '../../../../lib/db';
import { verifyAuthHeader } from '../../../../lib/auth';
import { initDb } from '../../../../lib/initDb';

const ALLOWED_STATUSES = ['Applied', 'Interview', 'Rejected', 'Offer'];

export async function PUT(request, { params }) {
  try {
    await initDb();
    const user = verifyAuthHeader(request);
    const { status } = await request.json();

    if (!ALLOWED_STATUSES.includes(status)) {
      return Response.json({ message: `Status must be one of: ${ALLOWED_STATUSES.join(', ')}` }, { status: 400 });
    }

    const result = await pool.query(
      `UPDATE applications SET status = $1 WHERE id = $2 AND user_id = $3 RETURNING id, job_id, job_title, company, status, created_at`,
      [status, params.id, user.id]
    );

    if (result.rowCount === 0) {
      return Response.json({ message: 'Application not found' }, { status: 404 });
    }

    return Response.json(result.rows[0]);
  } catch (error) {
    return Response.json({ message: error.message || 'Failed to update application' }, { status: 401 });
  }
}
