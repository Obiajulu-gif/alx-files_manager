const express = require('express');
const AppController = require('../controllers/AppController');

const router = express.Router();

// Route for checking the status of Redis and DB
router.get('/status', AppController.getStatus);

// Route for getting statistics (number of users and files)
router.get('/stats', AppController.getStats);

module.exports = router;