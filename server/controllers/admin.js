const Students = require('../models/student');
const Parents = require('../models/Parents')
const Teachers = require('../models/teacher');
const Student = require('../models/student');
const Teacher = require('../models/teacher');

const addStudentInDatabase = (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const emailId = req.body.emailId;
    const address = req.body.address;
    const dob = req.body.dob;
    const religion = req.body.religion;
    const gender = req.body.gender;
    const aadharNo = req.body.aadharNo;
    const userId = req.user.id
    Student.create({firstName, lastName, emailId, address, dob, religion, gender, aadharNo, userId})
    .then(student => {
        const response = {
            resultShort: 'success',
            resultLong: "Student created with id: " + student.id
        }
        return res.status(200).json(response)
    })
    .catch(err => {
        const resposne = {
            resultShort: "failure",
            resultLong: err.errors[0].message
        }
        res.json(resposne)
    })
    // req.user.addStudent({firstName, lastName, emailId, address, dob, religion, gender, addharNo})
        // .then(student => {
        //     console.log('student', student);
        // })
        // .catch(err => {
        //     console.log('err', err)
        // })
}

const getTeacher = (req, res, next) => {

}

const addTeacher = (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const fullName = firstName + lastName
    const emailId = req.body.emailId;
    const address = req.body.address;
    const dob = req.body.dob;
    const religion = req.body.religion;
    const gender = req.body.gender;
    const aadharNo = req.body.aadharNo;
    const userId = req.user.id;
    const panNo = req.body.panNo
    Teacher.create({fullName, emailId, address, dob, religion, gender, aadharNo, userId, panNo})
        .then((teacher) => {
            const response = {
                resultShort: "Success",
                resultLong: "User created with use id: " + teacher.id
            }
            res.status(200).json(response);
        })
        .catch((err) => {
            const resposne = {
                resultShort: "failure",
                resultLong: err.errors[0].message
            }
            res.json(resposne)
        })
}

module.exports = {
    addStudentInDatabase,
    getTeacher,
    addTeacher
}