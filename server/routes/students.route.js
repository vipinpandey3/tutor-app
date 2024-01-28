const express = require('express');
const router = express();
const {getStudentById, getAllStudentAttendence} = require('../controllers/students.controller')


/**
 * GET /api/students/getStudentById/:1
 * */ 
router.get('/getStudentById/:id', (req, res) => getStudentById(req, res));

router.get('/getAllStudentAttendence', (req, res) => getAllStudentAttendence(req, res))

module.exports = router