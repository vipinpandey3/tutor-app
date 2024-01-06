const express = require('express');
const router = express();
const {getAllExams, getExamFormFields, getSubjectsByStandard, disableExam} = require('../controllers/exams.controller')


/**
 * POST '/api/exams/get-exams'
 * */ 
router.post('/get-exams', (req, res) => getAllExams(req, res));

/*
 * GET /api/exams/getExamFormFields
*/ 

router.get('/getExamFormFields', (req, res) => getExamFormFields(req, res))

/**
 * GET /api/exams/getSubjects/7th
 * */ 
router.get('/getSubjects/:stdId', (req,res) => getSubjectsByStandard(req, res));

/*
* POST /api/exams/disableExam 
* { examId: 1 }
*/ 
router.post('/disableExam', (req, res) => disableExam(req, res))

module.exports = router;