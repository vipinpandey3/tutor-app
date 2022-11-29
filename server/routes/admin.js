const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");
const UserService = require("../services/userServices")
const cacheMiddleware = require('../services/cache/cache')


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

router.get('/getAllFees', cacheMiddleware, (req, res, next) => {
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

router.get('/get-student-formFields', (req, res) => {
    return adminController.getStudentFormFields(req, res)
        .then(studentFormFields => {
            const response = {
                resultShort: "success",
                resultLong: "Retrieved all forms fields for students",
                formFields: studentFormFields
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
})

router.post('/get-parent-formFields', (req, res) => {
    console.log('In /get-parent-formFields route')
    return adminController.getParentFormFields(req, res)
        .then(formFields => {
            const result = {
                resultShort: 'success',
                resultLong: 'Retrieved all forms fields for',
                formFields: formFields
            }

            return res.status(200).json(result);
        })
        .catch(err => {
            const response = {
                resultShort: 'failure',
                resultLong: "Failed to retrieve formfields"
            }
            return res.status(500).json(response);
        })
})

router.post('/update-parents-details', (req, res) => {
    console.log('In /update-parents-details')
    return adminController.updateParentDetails(req, res)
        .then(updatedObj => {
            const result = {
                resultShort: 'success',
                resultLong: 'Parents details updated.',
            }

            return res.status(200).json(result);
        })
        .catch(error => {
            const response = {
                resultShort: 'failure',
                resultLong: "Failed to rparents details"
            }
            return res.status(500).json(response);
        })
})

router.get('/get-education-formFields', (req, res) => {
    console.log('In /get-education-formFields route')
    return adminController.fetchEducationFormFields(req, res)
        .then(formFields => {
            const result = {
                resultShort: 'success',
                resultLong: 'Retrieved all forms fields for educationdetails',
                formFields: formFields
            }

            return res.status(200).json(result);
        })
        .catch(err => {
            const response = {
                resultShort: 'failure',
                resultLong: "Failed to retrieve formfields"
            }
            return res.status(500).json(response);
        })
})

router.post("/update-education-details", (req, res) => {
    console.log('Inside /update-education-details route')
    return adminController.updateStudentEducationDetails(req, res)
    .then(updatedObj => {
        const result = {
            resultShort: 'success',
            resultLong: 'Student education details updated.',
        }

        return res.status(200).json(result);
    })
    .catch(error => {
        const response = {
            resultShort: 'failure',
            resultLong: "Failed to update education details"
        }
        return res.status(500).json(response);
    })
});

router.get('/getTutorFormFields', (req, res) => {
    console.log('Inside the /get-tutor-formFields route')
    adminController.getTutorEducationFormFields()
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
    });
})

router.post('/addTutorEducation', (req, res) => {
    console.log('in /addTutorEducation route');
    return adminController.addTutorEducation(req)
        .then(data => {
            const result = {
                resultShort: "success",
                resultLong: "Successfullt added tutors education"
            }

            return res.status(200).json(result)
        })
        .catch(error => {
            console.log("Error while adding tutor education", error);
            const result = {
                resultShort: "success",
                resultLong: "Error while adding tutor education"
            }

            return res.status(500).json(result)
        })
})

router.post('/updateTutorEducation', (req, res) => {
    console.log("Inside /updateTutorEducation route")
    return adminController.updateTutorEducationById(req)
    .then(data => {
        const result = {
            resultShort: "success",
            resultLong: "Successfullt added tutors education"
        }

        return res.status(200).json(result)
    })
    .catch(error => {
        console.log("Error while adding tutor education", error);
        const result = {
            resultShort: "success",
            resultLong: "Error while adding tutor education"
        }

        return res.status(500).json(result)
    })    
})

router.get('/get-tutor-formFields', (req, res) => {
    console.log('Inside /get-tutor-formFields route');
    return adminController.getTutorFormFields()
    .then((data) => {
        const result = {
            resultShort: 'success',
            resultLong: 'successfully retrived tutor form inputs',
            formFields: data
        }
        return res.status(200).json(result)
    })
    .catch(error => {
        console.log('Error Final', error)
        const result = {
            resultShort: "failure",
            resultLong: "Failed to retriev tutor form inputs",
        }
        return res.status(400).json(result);
    });
})

router.post('/add-User', (req, res) => {
    console.log('Inside the add-User route');
    return UserService.addUser(req).then(userObj => {
        console.log("userObj", userObj)
        const result = {
            resultShort: 'success',
            resultLong: 'Successfully added the user'
        }
        res.status(200).json(result)
    })
    .catch(error => {
        console.log('Error', error)
        const result = {
            resultShort: 'failure',
            resultLong: 'Failed to added the user'
        }
        res.status(200).json(result)
    })

});

router.get('/get-user-formFields', (req, res) => {
    console.log('Inside /get-tutor-formFields route');
    return UserService.getUserFormFields()
    .then((data) => {
        const result = {
            resultShort: 'success',
            resultLong: 'successfully retrived user form inputs',
            formFields: data
        }
        return res.status(200).json(result)
    })
    .catch(error => {
        console.log('Error Final', error)
        const result = {
            resultShort: "failure",
            resultLong: "Failed to retriev user form inputs",
        }
        return res.status(400).json(result);
    });
});

router.get('/get-users', UserService.getAllUser)

module.exports = router;
