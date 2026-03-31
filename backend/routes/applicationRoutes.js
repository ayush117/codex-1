const express = require('express');
const {
  createApplication,
  listApplications,
  updateApplicationStatus
} = require('../controllers/applicationController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createApplication);
router.get('/', authMiddleware, listApplications);
router.put('/:id', authMiddleware, updateApplicationStatus);

module.exports = router;
