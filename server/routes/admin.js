const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin')


router.get('/get-students', (req, res, next) => {
    console.log('Test')
})

router.post('/add-student', adminController.addStudentInDatabase)

router.get('/get-Teacher', adminController.getTeacher);

router.post('/add-teacher', adminController.addTeacher)


module.exports = router