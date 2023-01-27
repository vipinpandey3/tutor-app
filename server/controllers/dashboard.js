const moment = require('moment');
const models = require('../models');
const dashboardService = require('../services/dashboardService')

const dashboardController = {
    getAttendenceChartData: (req, res) => {
        console.log("Inside the getAttendenceChartData function")
        // return models.Student.getAllStudentAndTheirAttendence()
        return models.StudentAttendence.getAllAttendencewithStandard()
        .then(result => {
            return dashboardService.formatChartData(result)
            .then(result => {
                const resultObj = {
                    resultShort: "success",
                    resultLong: "Successully retrieved Attendence Data",
                    result: result
                }
                res.status(200).json(resultObj)
            })
        })
        .catch(error => {
            console.log('error ==========>', error)
        })
    }
}

module.exports = dashboardController