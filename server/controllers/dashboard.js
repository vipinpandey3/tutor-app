const moment = require('moment');
const models = require('../models');

const dashboardController = {
    getAttendenceChartData: (req, res) => {
        console.log("Inside the getAttendenceChartData function")
        return models.Student.getAllStudentAndTheirAttendence()
        .then(result => {
            console.log("Result  ==============>", JSON.stringify(result))
        })
        .catch(error => {
            console.log('error ==========>', error)
        })
    }
}

module.exports = dashboardController