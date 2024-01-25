const express = require('express');
const fs = require('fs');
const Faculty = require('../controllers/faculty');
const FeesService = require('../services/feesServices');

const router = express.Router();

router.get('/searchFees/:searchParams', (req, res, next) => {
    console.log('Inside the searchfees route');
    const searchParams = req.params.searchParams;
    Faculty.getFeesDetailsBySearchParam(searchParams)
        .then(feesArray => {
            console.log('Feesarray with student Data', feesArray)
            const response = {
                resultShort: "success",
                resultLong: 'Successfully retrieved fees data for: ' + searchParams,
                feesArray: feesArray,
            }
            return res.status(200).json(response)
        })
        .catch(err => {
            const response = {
                resultShort: 'failure',
                resultLong: 'Failed to retrived any data'
            }
            return res.json(response);
        })
});

router.get('/downloadFeesReciept/:feesUUID', (req, res, next) => {
    console.log('inside downloadFeesReciept');
    const feesUUId = req.params.feesUUID;
    console.log('FeesUUId', feesUUId);
    FeesService.downloadFeesReciept(feesUUId)
        .then(result => {
            console.log("Result *******", result)
            var file = fs.createReadStream(result);
            var stat = fs.statSync(result);

            res.setHeader('Content-Length', stat.size);
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
            file.pipe(res);
        })
        .catch(err => {
            res.status(200).json(err)
        })
})

router.post('/uploadFile', Faculty.fileUpload)

router.post('/create-exam', Faculty.createExam);

router.post('/get-exams', Faculty.getExams);

router.post('/disableExam', Faculty.disableExam);

router.get('/get_Exam_Details/:examId', Faculty.getExamDetailsById)

router.get('/getTutorById/:tutorId', Faculty.getTutorById);

router.post('/markTutorAttedence', Faculty.markTutorAttedence);

router.get('/get_All_Tutor_Attendence', Faculty.getAllTutorAttendence);

router.post('/martkTutorTimeOut', Faculty.markTutorOutTime);

router.post('/martkTutorAbsence', Faculty.markTutorAbsence);

router.get('/getStudentById/:studentId', Faculty.getStudentById);

router.post('/markStudentAttendence', Faculty.markStudentAttendence);

router.get('/getAllStudentAttendence', Faculty.getAllStudentAttendence);

router.post('/mark_student_absence', Faculty.markStudentAbsence)

router.post('/getStudentAttendenceById', Faculty.getAllStudentAttendenceById)

router.post('/getTutorAttendenceById', Faculty.getAllTutorAttendenceById)

router.get('/get-student-attendenceById/:studentId', Faculty.getAllStudentAttendenceByStudentId )

module.exports = router