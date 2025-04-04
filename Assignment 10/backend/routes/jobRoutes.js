const express = require('express');
const router = express.Router();
const { createJob, getAllJobs } = require('../controllers/jobController');
const { protect, authorize } = require('../middleware/auth');

// Create a new job (admin only)
router.post('/create/job', protect, authorize('admin'), createJob);

// Get all jobs (employees only)
router.get('/jobs', protect, authorize('employee'), getAllJobs);

module.exports = router; 