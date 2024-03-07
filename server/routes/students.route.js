const express = require('express');
const router = express();
const {getStudentById, getAllStudentAttendence, getStudentAllAttendenceById, createStudents, assignClass} = require('../controllers/students.controller')


/**
 * GET /api/students/getStudentById/:1
 * */ 
router.get('/getStudentById/:id', (req, res) => getStudentById(req, res));

router.get('/getAllStudentAttendence', (req, res) => getAllStudentAttendence(req, res))

router.post('/getStudentAllAttendenceById/:id', (req, res) => getStudentAllAttendenceById(req, res))

/**
 * POST /api/students/student
*/
router.post('/create-student', (req, res) => createStudents(req, res))

/**
 * POST /api/students/assign-class
 * */ 
router.post('/assign-class', (req, res) => assignClass(req, res));

module.exports = router