// const StandardMaster = require('../models/standardMaster');
// const SubjectMaster = require('../models/subjectMatser');
const models = require('../../models')

const getStandardData = async () => {
    const standardData = await models.StandardMaster.findAll(
        {
            where: {
                status: 1
            },
            attributes: ['id', ['remarks', 'type']]
        })
    
    const data = JSON.stringify(standardData)
    return standardData;
}

const getExamTypeData = async() => {
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
        return Promise.resolve(examType);
    } else {
        return Promise.reject('ExamType Not Found')
    }
}

const getHoursdata = async() => {
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
        return Promise.resolve(hours);
    } else {
        return Promise.reject('Hours data Not Found');
    }
}

const getMarksData = async() => {
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
        return Promise.resolve(hours);
    } else {
        return Promise.reject('Hours data Not Found');
    }
}

const getSubjects = async() => {
    const subjectItem = [
        {
            "id": 1,
            "type": "Hindi"
        },
        {
            "id": 2,
            "type": "English"
        }
    ]
    return Promise.resolve(subjectItem)
}

const getSubjectOptionForStandard = async(id) => {
    const subjectOption = await models.SubjectMaster.findAll({
        where: {
            StandardMasterId: id
        },
        attributes: ['id', ['subjectName', 'type']]
    })

    return subjectOption;
}

const getGenderData = async() => {
    const genderItems = [
        {
            id: 1,
            type: "Male"
        },
        {
            id: 2,
            type: "Female"
        },
        {
            id: 3,
            type: "Others"
        }
    ]
    
    if(genderItems.length > 0) {
        return Promise.resolve(genderItems);
    } else {
        return Promise.reject([]);
    }
}

const getStudentStreamData = async() => {
    const streams = [
        {
            id: 1,
            type: "Science"
        },
        {
            id: 2,
            type: "Commerce"
        },
        {
            id: 3,
            type: "Arts",
        },
        {
            id: 4,
            type: "common"
        }
    ]

    if(streams.length > 0) {
        return Promise.resolve(streams);
    }else {
        return Promise.reject([]);
    }
}

const getBranchData = async() => {
    const branchList = [
        {
            id: 1,
            type: "Mumbai"
        },
        {
            id: 1,
            type: "Bangluru"
        },
        {
            id: 1,
            type: "Delhi"
        },
        {
            id: 1,
            type: "Varanasi"
        }
    ];

    if(branchList.length > 0) {
        return Promise.resolve(branchList);
    } else {
        return Promise.reject([]);
    }
}

const getReligiondata = async() => {
    const religionList = [
        {
            id: 1,
            type: "Hindu"
        },
        {
            id: 1,
            type: "Budhhist`"
        },
        {
            id: 1,
            type: "Jain"
        },
        {
            id: 1,
            type: "Sikh"
        }
    ];

    if(religionList.length > 0) {
        return Promise.resolve(religionList);
    } else {
        return Promise.reject([]);
    }
}

const methodMapper = {
    getExamTypeData,
    getStandardData,
    getHoursdata,
    getMarksData,
    getSubjectOptionForStandard,
    getGenderData,
    getStudentStreamData,
    getBranchData,
    getReligiondata,
    getSubjects
};

const getOptions = async(optionObject, reqUser) => {
    try {
        console.log('Inside the GetInputOption for optionObject with method', optionObject.method);
        let methodName = optionObject.method
        let method = methodMapper[methodName];

        if (!method) {
            throw new Error(`Method ${methodName} is not defined`);
        }
        let data = await method()
        return Promise.resolve(data)
    } catch (error) {
        console.log("Error in getOptions", error);
        return Promise.resolve(error)
    }
}

const getInputOptions = (formFields, reqUser) => {
    console.log("Inside the getInputOptions function");
    return new Promise(async(resolve, reject) => {
        let optionObjPromise = []
        for (let i = 0; i < formFields.length; i++) {
            if(formFields[i]['method']) {
                const methodPromise = await getOptions(formFields[i], reqUser);
                formFields[i].options = methodPromise
                optionObjPromise.push(methodPromise)
            }
        }
        Promise.all(optionObjPromise)
            .then(data => {
                return resolve(formFields);
            })
            .catch((error) => {
                return reject(error);
            })
    })
}

module.exports = {
    getInputOptions,
    getSubjectOptionForStandard
}