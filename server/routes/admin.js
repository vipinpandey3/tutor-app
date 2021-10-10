const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");
const UserService = require("../services/userServices")


router.get("/get-students", adminController.getStudent);

router.post("/add-student", adminController.addStudentInDatabase);

router.get("/studentDetails/:studentId", adminController.getStudentById);

router.get("/get-teachers", adminController.getTeacher);

router.post("/add-teacher", adminController.addTeacher);

router.get("/teachersDetails/:teacherId", adminController.getTeacherById);

router.post("/add-parent", adminController.addParent);

// router.get("/parentsDetails/:studentId", adminController.getParentsDetails);

router.post('/add-studentEducation-details', adminController.addStudentEducationDetails);

router.post('/add-feesDetails', adminController.addFeesDetails);

router.get('/getFeesDetailsById/:studentId', adminController.getFeesDetailsByStudentId);

router.get('/getAllFees', (req, res, next) => {
    console.log('req', req)
    adminController.getAllFeesData()
        .then(result => {
            const response = {
                resultShort: "success",
                resultLong: "Successfully retrieved all fees data",
                feesDetails: result.feesDetails,
                feeAttributes: result.feesAttributes
            }

            return res.status(200).json(response)
        })
        .catch(err => {
            return res.json({resultShort: 'failure', resultLong: "Failed to get fees details"});
        })
})

router.get('/getFeesFormFields', (req, res, next) => {
    console.log('/getformFields api');    
    adminController.getFeesFormFields()
        .then((formFieldsList) => {
            const response = {
                resultShort: "success",
                resultLong: "Retrieved all fees fields",
                formFields: formFieldsList
            };

            return res.status(200).json(response)
        })
        .catch(err => {
            const response = {
                resultShort: 'failure',
                resultLong: "Failed to retrieve formfields"
            }
            return res.json(response);
        })
});

router.get('/get-userFormFields', (req, res, next) => {
    UserService.getUserFormsFields()
        .then(attributes => {
            const response = {
                resultShort: "success",
                resultLong: "Successfully retrieved User formFields",
                formAttributes: attributes,
            }
            return res.status(200).json(response);
        })
        .catch((error) => {
            const response = {
                resultShort: "Failure",
                resultLong: "Failed to retrieve FormFields"
            }
            return res.status(400).json(response);
        })
})

router.post('/add-user', UserService.addUser);

router.post('/update-user', (req, res, next) => {
    UserService.updateUser(req.body)
        .then(user => {
            if(user.password) {
                delete user['password'];
            }
            const response = {
                resultShort: 'success',
                resultLong: 'Updated user with emaild: ' + req.body.emailId,
                user: user
            }

            return res.status(200).json(response);
        })
        .catch(err => {
            console.log('err', err)
            const response = {
                resultShort: "failure",
                resultLong: 'Failed to update User'
            }
            return res.status(400).json(response);
        })
})

router.get('/get-users', UserService.getAllUser)

router.get('/searchUser/:userParams', (req, res, next) => {
    console.log('Inside the /searchUser/:userParams');
    const searchparams = req.params.userParams;
    console.log('User Params', searchparams)
    return UserService.getUserBySearchParams(searchparams)
        .then(userArry => {
            console.log('Userarray', userArry)
            const response = {
                resultShort: "success",
                resultLong: 'Successfully retrieved User data for: ' + searchparams,
                users: userArry
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
})

module.exports = router;
