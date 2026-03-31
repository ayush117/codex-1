const express = require('express');
const { getJobs, createCoverLetter } = require('../controllers/jobController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getJobs);
router.post('/cover-letter', authMiddleware, createCoverLetter);

module.exports = router;
