const Student = require('../models/student');
const models = require('../models');
const student = require('../models/student');

const getStudentById = (id) => {
    console.log("inside getStudentById function", id)
    return new Promise((resolve, reject) => {
        models.Student.findAll({where: {id: id}})
            .then(student => {
                console.log("Result", student)
                return resolve(student)
            })
            .catch(err => {
                console.log('err', err);
                return reject(err);
            })
    })
}

const getStudenByCondition = (condition) => {
    return models.Student.getStudenByCondition(condition)
    .then(student => {
        if(student) {
            return student
        } else {
            return {
                message: "No student found with given id"
            }
        }
    }).catch(error => error)
}

module.exports = {
    getStudentById,
    getStudenByCondition
}