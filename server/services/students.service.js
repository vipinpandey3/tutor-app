const models = require('../models')
const attributes = require('../attributes/attributes.json');

const studentService = {
    getStudentById: async(req) => {
        try {
            console.log('Inside getStudentByIdFunction function');
            const studentId = req.params.id;
            let student = await models.Student.findByPk(studentId, {
                attributes: ['id', 'firstName', 'lastName']
            });
            student = JSON.parse(JSON.stringify(student));
            let studentDetails = [];
            let object = {}, studentAttendenceAll;
            if(student) {
                studentAttendenceAll = await models.StudentAttendence.findAll({where: {StudentId: studentId}})
                object.fullName = student.firstName + " " + student.lastName;
                object.id = student.id;
                object.lastAttendenceDate = studentAttendenceAll.length > 0 ? studentAttendenceAll[studentAttendenceAll.length - 1].attendenceDate : "-";
                object.lastInTime = studentAttendenceAll.length > 0 ? studentAttendenceAll[studentAttendenceAll.length - 1].inTime : "-";
                studentDetails.push(object);
                return {
                    status: true,
                    message: "Fetched student with last attendence",
                    data: {
                        studentDetails,
                        attributes: attributes[23].columnsHeader
                    }
                }
            } else {
                throw new Error("No student found with Id: ", studentId)
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
    }
}

module.exports = studentService;