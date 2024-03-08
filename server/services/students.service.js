const models = require('../models')
const attributes = require('../attributes/attributes.json');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;
const moment = require('moment');
const {getArray} = require('../services/data.service');
const student = require('../models/student');

const studentService = {
    getStudentById: async(req) => {
        try {
            console.log('Inside getStudentByIdFunction function');
            const studentId = req.params.id;
            let studentDetails = [];
            let object = {};
            // if(student) {
                
                
            let student = await models.Student.findByPk(studentId, {
                attributes: ['id', 'firstName', 'lastName']
            });
            student = JSON.parse(JSON.stringify(student));
            console.log("student", student);
            if (!student) {
                throw new Error("Student with id: ", studentId, " is not not found");
            }
            let studentLastAttendence = await models.StudentAttendence.findOne({
                where: {StudentId: studentId},
                order: [['createdAt', 'DESC']],
                limit: 1
            })
            studentLastAttendence = JSON.parse(JSON.stringify(studentLastAttendence))
            object.fullName = student.firstName + " " + student.lastName;
            object.StudentId = studentLastAttendence.StudentId;
            object.lastAttendenceDate = studentLastAttendence && studentLastAttendence.attendenceDate ? studentLastAttendence.attendenceDate : "-" ;
            object.lastInTime = studentLastAttendence && studentLastAttendence.inTime ? studentLastAttendence.inTime.inTime: "-";
            studentDetails.push(object);
            return {
                status: true,
                message: "Fetched student with last attendence",
                data: {
                    studentDetails,
                    attributes: attributes[23].columnsHeader
                }
            }
        } catch (error) {
            console.log("Error Inside the getStudentById", error);
            return {
                status: false,
                message: error.message
            }
        }
    },

    getAllStudentAttendence: async(req) => {
        try {
            const result = await models.StudentAttendence.findAll({
                attributes: [['id', 'attendenceId'], 'attendenceDate', 'inTime'],
                include: [
                    {
                        model: models.Student,
                        attributes: [['id', 'StudentId'], 'firstName', 'emailId']
                    }
                ]
            })
            if(!result.length) {
                throw new Error("No student attendence found for the date")
            }
            return {
                status: true,
                message: "All student attendence found", 
                data: {
                    attendence: result,
                    attributes: tableAttributes = attributes[20].columnsHeader
                }
            }
        } catch (error) {
            console.log("Error inside the getAllStudentAttendence of student.service", error);
            return {
                status: false,
                message: error.message
            }
        }
    },

    getStudentAllAttendenceById: async(req) => {
        try {
            const reqBody = req.body;
            const reqUser = req.user;
            const studentId = req.params.id;
            let where = {
                StudentId: studentId
            }, query = {};
            query.limit = reqBody.limit;
            query.offset = reqBody.offset
            if(reqBody.fromDate) {
                if(!reqBody.toDate) {
                    where.createdAt = {
                        [Op.gte]: reqBody.fromDate + " 00:00:00"
                    }
                } else {
                    where.createdAt = {
                        [Op.gte]: reqBody.fromDate + " 00:00:00",
                        [Op.lte]: reqBody.toDate + " 00:00:00"
                    }
                }
            }
            query.where = where;
            // query.logging = console.log
            const result = await models.StudentAttendence.findAndCountAll(query)
            if(!result) {
                throw new Error("Error getting student attendece")
            }
            const currentStudentAttendence = result.rows.reduce((allAtendence, currentAttendence) => {
                let i = 0
                if(currentAttendence.attendenceStatus) {
                    allAtendence = allAtendence + 1
                }
                return allAtendence;
            }, 0)
            const totalAbsence = result.rows.reduce((allAtendence, currentAttendence) => {
                let i = 0
                if(!currentAttendence.attendenceStatus) {
                    allAtendence = allAtendence + 1
                }
                return allAtendence;
            }, 0)
            return {
                status: true,
                message: "Fetched student with last attendence",
                data: {
                    rows: result.rows,
                    attributes: attributes[24].columnsHeader,
                    count: result.count,
                    attendenceData: {
                        totalAbsence,
                        currentStudentAttendence
                    }
                }
            }
        } catch (error) {
            console.log("getStudentAllAttendenceById", error);
            return {
                status: false,
                message: error.message
            }
        }
    },

    /**
     * @param req {"firstName": "Viraj", "lastName": "Pandey", "emailId": "viraj.pandeyshukla@gmail.com", "mobile": "9321475789", "address": "88/01, A. D. Street, C. P. Tank, Mumbai-400004", "aadharNo": "231546978099", "gender": "Male", "dob": "1996-11-20T18:30:00.000Z", "stream": "common"}
     * @returns {}
     * */ 
    createStudents: async(req) => {
        try {
            console.log("Inside the addStudentInDatabase functions");
            let reqBody = req.body;
            reqBody.status = "active";
            reqBody.dob = moment(reqBody.dob).format('YYYY-MM-DD')
            let student = await models.Student.create(reqBody);
            if(!student) {
                throw new Error("Error creating student");
            }
            return {
                status: true,
                message: "Created student with id: " + student.id,
                data: {
                    showForm: false,
                    formDetails:  {
                        formName: "",
                        buttonName: "",
                        editFlag: false
                    },
                    severity: "success"
                }
            }
        } catch (error) {
            console.log("Error inside the createStudent service function", error);
            return {
                status: false,
                message: error.message
            }
        }
    },

     /**
     * @param req {"students": [1,2,3], "std": "4th"}
     * @returns {}
     * */ 
     assignClass: async(req) => {
        try {
            console.log("inside the asign class off the studentService", req.user);
            let reqBody = req.body;
            let reqUser = req.user
            if(!reqBody.students.length) {
                throw new Error("Not student list found in request")
            }
            let stdId = await models.StandardMaster.findAll({
                where: {
                    remarks: reqBody.std
                },
                attributes: ["id"]
            })
            if(!stdId.length) {
                throw new Error("No standards found with parameter");
            }
            stdId = JSON.parse(JSON.stringify(stdId))[0];
            let arr = [];
            for (let index = 0; index < reqBody.students.length; index++) {
                let object = {
                    StudentId: reqBody.students[index],
                    StandardId: stdId.id,
                    createdBy: reqUser.id,
                    updatedBy: reqUser.id
                }
                arr.push(object)
            }
            let result = await models.StudentStandardMap.bulkCreate(arr);
            if(!result) {
                throw new Error("Error assigning the class to student")
            }
            return {
                status: true,
                message: "Assigned class to student"
            }
        } catch (error) {
            console.log("Error inside the asignClass", error)
            return {
                status: false,
                message: error.message
            }
        }
    },

    getStudents: async(req) => {
        try {
            console.log("Inside the getStudents");
            let reqBody = req.body;
            let reqUser = req.user;
            let query = {};
            let filter = reqBody.filter
            let stdWhere = {}, sstdWhere = {};
            let studentWhere = {};
            let message = "Fetched all students"
            query.limit = reqBody.limit,
            query.offset = reqBody.offset;
            if(reqBody.status) {
                sstdWhere.status = status
            };
            if(filter.stdId) {
                stdWhere.id = filter.stdId;
            }
            let students = await models.Student.findAll({
                where: studentWhere,
                attributes: ["id", 'firstName', "lastName", "emailId", "dob", "gender"],
                include: [
                  {
                    model: models.StandardMaster,
                    where: stdWhere,
                    as: 'StudentMap',
                    through: { 
                        model: models.StudentStandardMap, 
                        where: sstdWhere,
                        attributes: ['status', 'id']
                    },
                    attributes: ["id", 'std', 'stdCode']
                  },
                  {
                    model: models.Parent,
                    attributes: ["id", "fatherName", "motherName"]
                  }
                ],
                limit: reqBody.limit,
                offset: reqBody.offset
            });
            students = JSON.parse(JSON.stringify(students))
            console.log("students", students);
            if(!students.length) {
                message = "No students found"
            }

            const columnsAttributes = attributes[6].columnsHeader;
            return {
                status: true,
                message: message,
                data: {
                    students: students,
                    attributes: columnsAttributes
                }
            }
        } catch (error) {
            console.error("getStudents error", error);
            return {
                status: false,
                message: error.message
            } 
        }
    }
}

module.exports = studentService;