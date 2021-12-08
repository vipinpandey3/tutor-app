const StandardMaster = require('../models/standardMaster');
const SubjectMaster = require('../models/subjectMatser')

const getStandardData = async () => {
    console.log('Inside the get standard data as option');
    const standardData = await StandardMaster.findAll(
        {
            where: {
                status: 1
            },
            attributes: ['id', ['remarks', 'type']]
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

const getHoursdata = () => {
    return new Promise((resolve, reject) => {
        const hours = [
            {
                id: 1,
                type: 1
            },
            {
                id: 2,
                type: 1.5,
            },
            {
                id: 3,
                type: 2,
            },
            {
                id: 4,
                type: 2.5
            },
            {
                id: 5,
                type: 3
            }
        ]

        if(hours.length > 0) {
            return resolve(hours);
        } else {
            return reject('Hours data Not Found');
        }
    })
}

const getMarksData = () => {
    return new Promise((resolve, reject) => {
        const marks = [
            {
                id: 1,
                type: 20
            },
            {
                id: 2,
                type: 50,
            },
            {
                id: 3,
                type: 80,
            },
            {
                id: 4,
                type: 100
            }
        ]

        if(marks.length > 0) {
            return resolve(marks);
        } else {
            return reject('Hours data Not Found');
        }
    })
}

const getSubjectOptionForStandard = async(id) => {
    const subjectOption = await SubjectMaster.findAll({
        where: {
            stdId: id
        },
        attributes: ['id', ['subjectName', 'type']]
    })

    return subjectOption;
}

module.exports = {
    getStandardData,
    getExamTypeData,
    getHoursdata,
    getMarksData,
    getSubjectOptionForStandard
}