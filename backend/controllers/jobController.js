const { listJobs, getJobById } = require('../services/jobService');
const { generateCoverLetter } = require('../services/coverLetterService');

async function getJobs(req, res) {
  return res.json(listJobs());
}

async function createCoverLetter(req, res) {
  try {
    const { user, job } = req.body;

    if (!user || !job) {
      return res.status(400).json({ message: 'user and job are required' });
    }

    const targetJob = job.id ? getJobById(job.id) || job : job;
    const letter = await generateCoverLetter({ user, job: targetJob });

    return res.json({ letter });
  } catch (error) {
    console.error('Cover letter generation error:', error);
    return res.status(500).json({ message: 'Failed to generate cover letter' });
  }
}

module.exports = {
  getJobs,
  createCoverLetter
};
