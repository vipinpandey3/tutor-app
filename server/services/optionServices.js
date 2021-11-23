const StandardMaster = require('../models/standardMaster');

const getStandardData = async () => {
    console.log('Inside the get standard data as option');
    const standardData = await StandardMaster.findAll(
        {
            where: {
                status: 1
            },
            attributes: ['id', 'remarks']
        })
    
    const data = JSON.stringify(standardData)
    return standardData;
}

const getExamTypeData = () => {
    return new Promise((resolve, reject) => {
        const examType = [
            {
                id: 1,
                type: "Daily"
            },
            {
                id: 2,
                type: "Weekly"
            },
            {
                id: 3,
                type: "Monthly"
            },
            {
                id: 4,
                type: "Half-Sem"
            },
            {
                id: 5,
                type: "Semester"
            }
        ]
        if(examType.length > 0) {
            return resolve(examType);
        } else {
            return reject('ExamType Not Found')
        }
    })
}

module.exports = {
    getStandardData,
    getExamTypeData
}