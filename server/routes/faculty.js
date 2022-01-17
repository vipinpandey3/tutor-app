const express = require('express');
const fs = require('fs');
const Faculty = require('../controllers/faculty');
const FeexService = require('../services/feesServices');

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
    FeexService.downloadFeesReciept(feesUUId)
        .then(result => {
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

router.get('/get-exams', Faculty.getExams);

router.get('/getExamFormFields', (req, res, next) => {
    Faculty.getExamFormFields()
        .then((data) => {
            const result = {
                resultShort: 'success',
                resultLong: 'successfully retrived form inputs',
                formFields: data
            }
            return res.status(200).json(result)
        })
        .catch(error => {
            console.log('Error Final', error)
            const result = {
                resultShort: "failure",
                resultLong: "Failed to retriev form inputs",
            }
            return res.status(400).json(result);
        })
})

router.get('/getSubjects/:stdId', Faculty.getSubjectsByStandard);

router.post('/disableExam', Faculty.disableExam);

router.get('/get_Exam_Details/:examId', Faculty.getExamDetailsById)

module.exports = router