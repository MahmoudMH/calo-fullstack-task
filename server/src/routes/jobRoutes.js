const express = require('express');
const jobController = require('../controllers/jobController');

const router = express.Router();

router.post('/jobs', jobController.createJob);
router.get('/jobs', jobController.getJobs);
router.get('/jobs/:id', jobController.getJobById);

module.exports = router;
