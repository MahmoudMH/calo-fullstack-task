const express = require('express');
const sseController = require('../controllers/sseController');

const router = express.Router();

router.get('/sse/jobs-updates', sseController.sseHandler);

module.exports = router;
