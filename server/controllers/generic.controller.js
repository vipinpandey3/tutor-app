const {res_ok, res_err} = require('../services/data.service')
const {getStanndards} = require('../services/generic.service')

const genericController = {
    getStanndards: async(req, res) => {
        try {
            const result = await getStanndards(req);
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
                resultLong: error.errorObj.message,
            }
            return res_err(res, resObj);
        }
    }
};

module.exports = genericController