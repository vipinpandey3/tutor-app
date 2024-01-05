const {getAllExam, getExamFormFields} = require('../services/exam.service')
const {res_ok, res_err} = require('../services/data.service')

const examController = {
    getAllExams: async(req, res) => {
        try {
            const result = await getAllExam(req.body, res.user);
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
            console.log("Error inside the getAllExams", error)
            const resObj = {
                resultShort: 'failure',
                resultLong: error.errorObj.message,
            }
            return res_err(res, resObj);
        }
    },

    getExamFormFields: async(req, res) => {
        try {
            const result = await getExamFormFields(req.body, req.user);
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
            console.log("Error inside the getExamFormFields", error)
            const resObj = {
                resultShort: 'failure',
                resultLong: error.errorObj.message,
            }
            return res_err(res, resObj);
        }
    }
}

module.exports = examController