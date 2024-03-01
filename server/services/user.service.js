const models = require('../models')
const attributes = require('../attributes/attributes.json');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

const userService = {
    fetchAllStandards: async(req) => {
        try {
            let reqBody = req.body;
            console.log("reqBody", reqBody);
            if(!reqBody.userId) {
                throw new Error("Please provide user id to get all class tutor");
            }
            let where = {
                user_id: reqBody.userId,
            }
            if(reqBody.subject_id) {
                where.subject_id = reqBody.reqBody.userId
            }
            let userData = await models.UserStandardMaps
            .findAll({
                where: {
                    user_id: reqBody.userId
                },
                attributes: ['id', 'subject_id', "academic_year", "is_class_teacher"],
                include: [
                    {
                        model: models.StandardMaster,
                        as: 'StandardMap',
                        attributes: ['id', "stdCode", "std", "remarks"]
                    },
                    {
                        model: models.User,
                        as: 'UserMap',
                        attributes: ['id', "firstName", "lastName", "emailId", "roleId"]
                    }
                ]
            })
            let subjIds = userData.map(x => x['subject_id']);
            let allSubjects = await models.SubjectMaster.findAll({
                where: {
                    id: subjIds
                },
                attributes: ['id', 'subjectName']
            });
            allSubjects = JSON.parse(JSON.stringify(allSubjects))
            let subjObj = {}
            for (let index = 0; index < allSubjects.length; index++) {  
                if(!subjObj[allSubjects[index].id]) {
                    subjObj[allSubjects[index].id] = allSubjects[index].subjectName
                }
            }
            userData = JSON.parse(JSON.stringify(userData));
            for (let index = 0; index < userData.length; index++) {
                userData[index].subject_name = subjObj[userData[index]['subject_id']]
            }
            return {
                status: true,
                result: "All standard fetched for User",
                data: {
                    class: userData,
                    attributes: attributes[25].columnsHeader
                }
            }
        } catch (error) {
            console.log("Error inside the fetchAllStandards function of user.service", error);
            return {
                status: false,
                message: error.message
            }
        }
    }
}

module.exports = userService