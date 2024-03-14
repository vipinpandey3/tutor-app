const models = require('./../models/index');

const classService = {
    createRemarks: async(req) => {
        try {
            console.log("Inside the classService.getClassDetails method");
            let reqBody = req.body;
            let reqUser = req.user;
            if(!reqBody.remarks) {
                throw new Error("Error as remarks not found")
            }
            if(!reqBody.studentIds.length) {
                throw new Error("Error as student not selected")
            }
            if(!reqBody.teacherId) {
                throw new Error("Error as teacher is not provided")
            }
            let finalArray = []
            for (let index = 0; index < reqBody.studentIds.length; index++) {
                let remarks = {
                    studentId: reqBody.studentIds[index],
                    teacherId: reqBody.teacherId,
                    remarkText: reqBody.remarkText,
                    subjectId: reqBody.subjectId ? reqBody.subjectId : null
                }
                finalArray.push(remarks)    
            }
            
            remarks = await models.StudentRemark.bulkCreate(finalArray);
            console.log("remarks", remarks)
            return {
                status: true,
                message: "Added remarks for student",
            }
        } catch (error) {
            return {
                status: false,
                message: error.message
            }
        }
    }
}

module.exports = classService;