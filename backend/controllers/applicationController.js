const pool = require('../config/db');
const { getJobById } = require('../services/jobService');

const ALLOWED_STATUSES = ['Applied', 'Interview', 'Rejected', 'Offer'];

async function createApplication(req, res) {
  try {
    const { jobId } = req.body;
    if (!jobId) {
      return res.status(400).json({ message: 'jobId is required' });
    }

    const job = getJobById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const result = await pool.query(
      `INSERT INTO applications (user_id, job_id, job_title, company, status)
       VALUES ($1, $2, $3, $4, 'Applied')
       RETURNING *`,
      [req.user.id, job.id, job.title, job.company]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Create application error:', error);
    return res.status(500).json({ message: 'Failed to create application' });
  }
}

async function listApplications(req, res) {
  try {
    const result = await pool.query(
      `SELECT id, job_id, job_title, company, status, created_at
       FROM applications
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [req.user.id]
    );

    return res.json(result.rows);
  } catch (error) {
    console.error('List applications error:', error);
    return res.status(500).json({ message: 'Failed to fetch applications' });
  }
}

async function updateApplicationStatus(req, res) {
  try {
    const { status } = req.body;
    if (!ALLOWED_STATUSES.includes(status)) {
      return res.status(400).json({ message: `Status must be one of: ${ALLOWED_STATUSES.join(', ')}` });
    }

    const result = await pool.query(
      `UPDATE applications
       SET status = $1
       WHERE id = $2 AND user_id = $3
       RETURNING id, job_id, job_title, company, status, created_at`,
      [status, req.params.id, req.user.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Application not found' });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error('Update application error:', error);
    return res.status(500).json({ message: 'Failed to update application' });
  }
}

module.exports = {
  createApplication,
  listApplications,
  updateApplicationStatus,
  ALLOWED_STATUSES
};
