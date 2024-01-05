const express = require('express');
const router = express();
const {getAllExams, getExamFormFields} = require('../controllers/exams.controller')


/**
 * POST '/api/exams/get-exams'
 * */ 
router.post('/get-exams', (req, res) => getAllExams(req, res));

/*
 * GET /api/exams/getExamFormFields
*/ 

router.get('/getExamFormFields', (req, res) => getExamFormFields(req, res))

module.exports = router;