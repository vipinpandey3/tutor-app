const models = require('./../models/index');

const genericeObj = {
    getStanndards: async() => {
        try {
            console.log("Inside the genericeObj.getStanndards method");
            let std = await models.StandardMaster.findAll({
                attributes: ['id', ['remarks', 'type']]
            });
            std = JSON.parse(JSON.stringify(std));
            if(!std.length) {
                throw new Error("Not standard found");
            }
            return {
                status: true,
                message: "Fetched the standards",
                data: std
            }
        } catch (error) {
            return {
                status: false,
                message: error.message
            }
        }
    }
}

module.exports = genericeObj;