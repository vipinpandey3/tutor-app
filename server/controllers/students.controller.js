const {res_ok, res_err} = require('../services/data.service')
const {
    getStudentById,
    getAllStudentAttendence,
    getStudentAllAttendenceById,
    createStudents,
    assignClass,
    getStudents
} = require('../services/students.service');

const studentController = {
    getStudentById: async(req, res) => {
        try {
            const result = await getStudentById(req);
            if(!result?.status) {
                const resObj = {
                    resultShort: 'failure',
                    resultLong: result.message,
                }
                return res_err(res, resObj)
            }
            const resObj = {
                resultShort: 'success',
                resultLong: result.message,
                data: result.data 
            }
            return res_ok(res, resObj)
        } catch (error) {
            console.log("Error inside the getStudentById", error)
            const resObj = {
                resultShort: 'failure',
                resultLong: error.errorObj.message,
            }
            return res_err(res, resObj);
        }
    },

    getAllStudentAttendence: async(req, res) => {
        try {
            const result = await getAllStudentAttendence(req);
            if(!result?.status) {
                const resObj = {
                    resultShort: 'failure',
                    resultLong: result.message,
                }
                return res_err(res, resObj)
            }
            const resObj = {
                resultShort: 'success',
                resultLong: result.message,
                data: result.data 
            }
            return res_ok(res, resObj)
        } catch (error) {
            console.log('Error inside the getAllStudentAttendence of studemt.controller')
            const resObj = {
                resultShort: 'failure',
                resultLong: error.errorObj.message,
            }
            return res_err(res, resObj);
        }
    },

    getStudentAllAttendenceById: async(req, res) => {
        try {
            const result = await getStudentAllAttendenceById(req);
            if(!result?.status) {
                const resObj = {
                    resultShort: 'failure',
                    resultLong: result.message,
                }
                return res_err(res, resObj)
            }
            const resObj = {
                resultShort: 'success',
                resultLong: result.message,
                data: result.data 
            }
            return res_ok(res, resObj)
        } catch (error) {
            console.log('Error inside the getStudentAllAttendenceById of studemt.controller')
            const resObj = {
                resultShort: 'failure',
                resultLong: error.errorObj.message,
            }
            return res_err(res, resObj);
        }
    },

    createStudents: async(req, res) => {
        try {
            const result = await createStudents(req);
            if(!result?.status) {
                const resObj = {
                    resultShort: 'failure',
                    resultLong: result.message,
                }
                return res_err(res, resObj)
            }
            const resObj = {
                resultShort: 'success',
                resultLong: result.message,
                data: result.data 
            }
            return res_ok(res, resObj)
        } catch (error) {
            const resObj = {
                resultShort: 'failure',
                resultLong: error.message,
            }
            return res_err(res, resObj);
        }
    },

    assignClass: async(req, res) => {
        try {
            const result = await assignClass(req);
            if(!result?.status) {
                const resObj = {
                    resultShort: 'failure',
                    resultLong: result.message,
                }
                return res_err(res, resObj)
            }
            const resObj = {
                resultShort: 'success',
                resultLong: result.message,
                data: result.data 
            }
            return res_ok(res, resObj)
        } catch (error) {
            const resObj = {
                resultShort: 'failure',
                resultLong: error.message,
            }
            return res_err(res, resObj);
        }
    },

    getStudents: async(req, res) => {
        try {
            const result = await getStudents(req);
            if(!result?.status) {
                const resObj = {
                    resultShort: 'failure',
                    resultLong: result.message,
                }
                return res_err(res, resObj)
            }
            const resObj = {
                resultShort: 'success',
                resultLong: result.message,
                data: result.data 
            }
            return res_ok(res, resObj)
        } catch (error) {
            const resObj = {
                resultShort: 'failure',
                resultLong: error.message,
            }
            return res_err(res, resObj);
        }
    }
}

module.exports = studentController;