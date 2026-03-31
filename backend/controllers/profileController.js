const pool = require('../config/db');

async function getProfile(req, res) {
  try {
    const result = await pool.query(
      'SELECT id, name, email, skills, experience FROM users WHERE id = $1',
      [req.user.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error('Get profile error:', error);
    return res.status(500).json({ message: 'Failed to fetch profile' });
  }
}

async function updateProfile(req, res) {
  try {
    const { name, skills, experience } = req.body;

    const result = await pool.query(
      `UPDATE users
       SET name = COALESCE($1, name),
           skills = COALESCE($2, skills),
           experience = COALESCE($3, experience)
       WHERE id = $4
       RETURNING id, name, email, skills, experience`,
      [name ?? null, skills ?? null, experience ?? null, req.user.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error('Update profile error:', error);
    return res.status(500).json({ message: 'Failed to update profile' });
  }
}

module.exports = {
  getProfile,
  updateProfile
};
