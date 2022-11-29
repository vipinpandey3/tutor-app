const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard');

router.get('/get-student-attendence-chart-data', dashboardController.getAttendenceChartData)

module.exports = router;