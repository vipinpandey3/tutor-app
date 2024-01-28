const express = require('express');
const router = express();
const {getStudentById} = require('../controllers/students.controller')


/**
 * GET /api/students/getStudentById/:1
 * */ 
router.get('/getStudentById/:id', (req, res) => getStudentById(req, res));

module.exports = router