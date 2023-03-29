const moment = require('moment');
const models = require('../models');
const dashboardService = require('../services/dashboardService')

const dashboardController = {
    getAttendenceChartData: async (req, res) => {
        console.log("Inside the getAttendenceChartData function")
        const studentCount = await models.Student.count()
        const tutorsCount = await models.Tutor.count()
        const allStudentAttendence = await models.StudentAttendence.getAllAttendencewithStandard()
        const studentAttendenceChartData = await dashboardService.formatStudentChartData(allStudentAttendence, studentCount);
        const allTeachersAttendence = await models.TutorAttendence.getAllAttendenceWithTuttos();
        const tutorsAttendenceData = await dashboardService.formatTutorsChartData(allTeachersAttendence, tutorsCount)
        const formatedData = await dashboardService.formateData(studentAttendenceChartData, tutorsAttendenceData, "date")
        const resultObj = {
            resultShort: "success",
            resultLong: "Successully retrieved Attendence Data",
            result: formatedData
        }
        return res.status(200).json(resultObj)
    }
}

module.exports = dashboardController