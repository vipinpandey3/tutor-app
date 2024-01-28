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
    }
}

module.exports = studentService;