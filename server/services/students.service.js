const models = require('../models')
const attributes = require('../attributes/attributes.json');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

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
    }
}

module.exports = studentService;