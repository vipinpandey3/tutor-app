const attributes = require('../attributes/attributes.json');
const OptionServices = require('../services/optionServices')
const moment = require('moment');
const models = require('../models')

const getStudent = (req, res, next) => {
  console.log("Inside the get all students funcion");
  const columnsAttributes = attributes[6].columnsHeader
  models.Student.findAll()
    .then((students) => {
      const respose = {
        resultShort: "success",
        resultLong: "Successfully retrived all Students",
        students: students,
        attributes: columnsAttributes
      };

      res.status(200).json(respose);
    })
    .catch((err) => {
      const respose = {
        resultShort: "failure",
        resultLong: "Failed to retreived Students",
      };
      res.json(respose);
    });
};

const getStudentById = (req, res, next) => {
  console.log('Inside getStudentById function');
  const studentDetailAttributes = attributes[11].studentDetailsAttributes;
  const parentDetailsAttributes = attributes[11].parentDetailsAttributes
  const educationDetailsAttributes = attributes[11].studentEducationDetailsAttributes
  const educationDBAttributes = attributes[11].educationDetailsDBAttributes;
  const studentDBAttributes = attributes[11].studentsDBAttributes;
  const parentDBAttributes = attributes[11].parentDBAttributes;
  const studentId = req.params.studentId;
  return models.Student.findByPk(studentId, {
    include: [
      {
        model: models.Parent
      },
      {
        model: models.StudentEducationDetails
      }
    ]
  })
  .then((studentDetails) => {
    console.log('Student ======>', JSON.stringify(studentDetails))
    const response = {
      resultShort: "success",
      resultLong: "Student details Found",
      studentDetails: studentDetails,
      studentDetailAttributes: studentDetailAttributes,
      parentDetailsAttributes: parentDetailsAttributes,
      educationDetailsAttributes: educationDetailsAttributes
    };
    return res.status(200).json(response);
    })
  .catch((err) => {
    const response = {
      resultShort: "failure",
      resultLong: "Failed to retrieve student data with Id: " + studentId,
    };
    res.json(response);
  });
};

const addStudentInDatabase = (req, res, next) => {
  console.log("Inside the addStudentInDatabase functions");
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const emailId = req.body.emailId;
  const address = req.body.address;
  const dob = moment(req.body.dob).format('YYYY-MM-DD');
  const religion = req.body.religion;
  const gender = req.body.gender;
  const aadharNo = req.body.aadharNo;
  const userId = req.user.id;
  return models.Student.create({
    firstName,
    lastName,
    emailId,
    address,
    dob,
    religion,
    gender,
    aadharNo,
    userId,
  })
    .then((student) => {
      console.log("Students **************", student);
      const response = {
        resultShort: "success",
        resultLong: "Student created with id: " + student.id,
      };
      return res.status(200).json(response);
    })
    .catch((err) => {
      const resposne = {
        resultShort: "failure",
        resultLong: err.errors[0].message,
      };
      res.json(resposne);
    });
};

const getTeacher = (req, res, next) => {
  console.log('In /get-teachers routes')
  console.log('Inside the getTeacher function')
  const turorTableAtttibutes = attributes[14].columnsHeader;
  const tutorDBAttributes = attributes[14].tutorDBAttributes
  return models.Tutor.findAll()
    .then((teachers) => {
      const respose = {
        resultShort: "success",
        resultLong: "Successfully retrived all Teachers",
        data: teachers,
        turorTableAtttibutes: turorTableAtttibutes
      };

      res.status(200).json(respose);
    })
    .catch((err) => {
      const respose = {
        resultShort: "failure",
        resultLong: "Failed to retrieve teachers",
      };
    });
};

const getTeacherById = (req, res, next) => {
  console.log("in /teachersDetails/:teacherId route")
  console.log("in getTeacherById function");
  const teacherId = req.params.teacherId;
  const tutorDetailsAttributes = attributes[15].tutorDetailsAttributes;
  const tutorDBAttributes = attributes[15].tutorDBAttributes
  const educationAttrbutes = attributes[15].educationAttributes
  models.Tutor.findByPk(teacherId, {
    include: [
      {
        model: models.TutorEducationDetails
      }
    ]
  },{attributes: tutorDBAttributes} 
  )
    .then((teacher) => {
      const response = {
        resultShort: "success",
        resultLong: "Successfully retrived Teacher" + teacherId,
        data: teacher,
        attributes: tutorDetailsAttributes,
        educationAttributes: educationAttrbutes
      };
      return res.status(200).json(response);
    })
    .catch((err) => {
      console.log('Error while fetching tutor-details by Id', err)
      const response = {
        resultShort: "failure",
        resultLong: "Failed to retrieve teacher data with Id: " + teacherId,
      };
      res.json(response);
    });
};

const addTeacher = (req, res, next) => {
  console.log("In /add-teacher routes");
  console.log("Inside addTeacher function");
  console.log("Request body", req.body);
  const fullName = req.body.fullName;
  const emailId = req.body.emailId;
  const mobileNo = req.body.mobileNo
  const address = req.body.address;
  const dob = moment(req.body.dob).format('YYYY-MM-DD');
  const religion = req.body.religion;
  const gender = req.body.gender;
  const aadharNo = req.body.aadharNo;
  const userId = req.user.id;
  let panNo = req.body.panNo ? req.body.panNo : 'null';
  models.Tutor.create({
    fullName,
    emailId,
    mobileNo,
    address,
    dob,
    religion,
    gender,
    aadharNo,
    userId,
    panNo,
  })
    .then((teacher) => {
      const response = {
        resultShort: "success",
        resultLong: "Teacher created with use id: " + teacher.id,
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      const resposne = {
        resultShort: "failure",
        resultLong: err.errors[0].message,
      };
      res.json(resposne);
    });
};

const addParent = (req, res, next) => {
  console.log(JSON.stringify(req.body));
  console.log('Inside addParent function')
  const fatherName = req.body.fatherName;
  const motherName = req.body.motherName;
  const motherAadhar = req.body.motherAadhar;
  const fatherAadhar = req.body.fatherAadhar;
  const fatherEmailId = req.body.fatherEmailId;
  const motherEmailId = req.body.motherEmailId;
  const fatherHighestQualifaction = req.body.fatherHighestQualifaction;
  const motherHighestQualification = req.body.motherHighestQualifaction;
  const motherdob = moment(req.body.motherdob).format('YYYY-MM-DD')
  const fatherDob = moment(req.body.fatherDob).format('YYYY-MM-DD');
  const studentId = req.body.studentId

  models.Parent.create({
    fatherName,
    motherName,
    motherAadhar,
    fatherAadhar,
    fatherEmailId,
    motherEmailId,
    fatherHighestQualifaction,
    motherHighestQualification,
    motherdob,
    fatherDob,
  })
    .then((parent) => {
      return models.Student.update({
          ParentId: parent.id
        },
        {
          where: {
            id: studentId
          }
        }
      )
      .then(updatedObj => {
        console.log("Parent", parent);
        const response = {
          resultShort: "success",
          resultLong: "Parents created for student with Id: " + studentId,
          parentId: parent.id
        };
        return res.status(200).json(response);
      })
      .catch(error => {
        console.log("Error updating parent id for student", error);
        const response = {
          resultShort: "success",
          resultLong: "Error updating parent id for student " + studentId,
          parentId: parent.id
        };
        return res.status(500).json(response);
      })
    })
    .catch((err) => {
      console.log('Failure while adding parent details', err)
      const response = {
        resultShort: "failure",
        resultLong: "Failure while adding parent details",
      };

      return res.json(response);
    });
};

const addStudentEducationDetails = (req, res, next) => {
  const std = req.body.std;
  const seatNumber = req.body.seatNumber;
  const year = req.body.year;
  const totalMarks = req.body.totalMarks;
  const instituteName = req.body.instituteName;
  const universityName = req.body.universityName;
  const percentage = req.body.percentage;
  const StudentId = req.body.studentId;

  return models.StudentEducationDetails.create({
    std,
    seatNumber,
    year,
    totalMarks,
    instituteName,
    universityName,
    percentage,
    StudentId,
  })
    .then(details => {
      const response = {
        resultShort: "success",
        resultLong: "Student Education details added"
      }

      res.status(200).json(response)
    })
    .catch(err => {4
      console.log('Err', err);
      const response = {
        resultShort: "failure",
        resultLong: "Error Adding Education details",
      };
      return res.json(response);
    });
};

const addFeesDetails = (req, res, next) => {
  let feesAmount = req.body.feesAmount;
  let discount = req.body.discount ? req.body.discount : '0.00';
  let paidAmount = req.body.paidAmount;
  let balance = req.body.balance;
  let academicYear = req.body.academicYear;
  let reamarks = req.body.reamarks;
  let StudentId = req.body.StudentId;
  console.log("Req.body", req.body);
  return models.Fees.findAll({where: {
    StudentId: StudentId
  }})
    .then(fees => {
      if(fees.length <= 0) {
        console.log("Fees length is less then zero")
        return models.Fees.create(req.body)
          .then((fees) => {
            console.log("Fees", fees)
            const response = {
              resultShort: "success",
              resultLong: "Addedd fees details for student with Id: " + StudentId,
              fees: fees
            };

            return res.status(200).json(response);
          })
          .catch((err)=> {
            console.log("Error ===========>", err)
            const response = {
              resultShort: "failure",
              resultLong: "Error Adding Fees details for Student with id " + studentId,
            };
            return res,status(400).json(response);
          })
      } else {
        const lastPaidFees = fees[fees.length - 1]
        if(lastPaidFees.balance == 0) {
          const response = {
            resultShort: "success",
            resultLong: "Student with id: " + studentId + "have 0.00 balance",
            fees: fees
          };

          return res.status(200).json(response);
        }
        if(parseInt(lastPaidFees.balance) <= parseInt(paidAmount)){
         const response = {
            resultShort: "failure",
            resultLong: "Payment is greater than balance amount",
            fees: fees
          };
          return res.json(response);
        } else {
          balance = parseInt(lastPaidFees.balance) - parseInt(paidAmount);
          if(parseInt(discount) !== 0 && discount !== 'undefined') {
            for (let i = 0; i < fees.length; i++) {
              if(parseInt(fees[i].discount) >= 0 ) {
                // discount = "0.00"
                const response = {
                  resultShort: "failure",
                  resultLong: "discount cannot be given more than once"
                };
                return res.json(response);
              }
            }
          } else {
            return models.Fees.create({feesAmount, discount, paidAmount, balance, academicYear, reamarks, StudentId})
              .then((fees) => {
                const response = {
                  resultShort: "success",
                  resultLong: "Addedd fees details for student with Id: " + StudentId,
                  fees: fees
                };
    
                return res.status(200).json(response);
              })
              .catch((err) => {
                console.log('Err', err);
                const response = {
                  resultShort: "failure",
                  resultLong: "Error Adding Fees details",
                };
                return res.json(response);
              })
          }
        }
      }
    })
    .catch(err => {
      console.log('Error', err)
      const response = {
        resultShort: 'failure',
        resultLong: "Failure in adding fees details"
      }
      return res.json(response)
    })
}

const getFeesDetailsByStudentId = (req, res, next) => {
  const studentId = req.params.studentId;
  const tableHeader = attributes[12].columnAttributes;
  const feesDBAttributes = attributes[12].feesDBAttributes;
  models.Fees.findAll({where: {studentId: studentId}}, {attributes: feesDBAttributes})
    .then((fees) => {
      fees.map(feeDetails => {
        feeDetails.reamarks = feeDetails.reamarks ? feeDetails.reamarks : "-";
        feeDetails.date = new Date(feeDetails.createdAt).toLocaleDateString()
      })
      const response = {
        resultShort: "success",
        resultLong: "Successfully retrieved fees details for student with id: " + studentId,
        fees: fees,
        header: tableHeader
      }

      return res.status(200).json(response)
    })
    .catch((err) => {
      const response = {
        resultShort: "failure",
        resultLong: "Failed to retrieve fees details for student with id: " + studentId
      }
      return res.json(response)
    })
}

const getAllFeesData = () => {
  console.log('Inside get all fees data');
  const feesAttributes = attributes[0].columnsHeader 
  let feesDetails = [];
  let feesItem = {}
  return new Promise((resolve, reject) => {
    models.Fees.findAll()
      .then((fees) => {
        let a = 1;
        for (let i = 0; i < fees.length; i++) {
          models.Student.findByPk(fees[i].StudentId)
            .then(student => {
              feesItem = {
                ...fees[i],
                studentName: student.firstName + student.lastName,
                id: student.aadharNo
              }
              feesDetails.push({
                studentName: student.firstName + student.lastName,
                id: student.aadharNo,
                FeesId: fees[i].id,
                uuid: fees[i].uuid,
                feesAmount: fees[i].feesAmount,
                discount:fees[i].discount,
                paidAmount:fees[i].paidAmount,
                balance:fees[i].balance,
                academicYear:fees[i].academicYear,
                reamarks:fees[i].reamarks,
                createdAt:fees[i].createdAt,
                studentId: fees[i].studentId
              })
              if(i === fees.length - 1) {
                resolve({feesDetails, feesAttributes});
              }
            })
          }
      })
      .catch((err) => {
        return reject(err)
      })
  })
}

const getFeesFormFields = () => {
  console.log('Inside Fees form function');
  const feesFormAttributes = attributes[1].attributes;
  return new Promise((resolve, reject) => {
    if(feesFormAttributes && feesFormAttributes.length > 0) {
      return resolve(feesFormAttributes);
    } else {
      return reject([])
    }
  })
}

const getStudentFormFields = (req, res) => {
  console.log('Inside getStudentFormFields function')
  const studentFormFields = attributes[7].formFields
  return new Promise((resolve, reject) => {
    if(studentFormFields && studentFormFields.length > 0) {
        var optionObjPromise = []
        for (let i = 0; i < studentFormFields.length; i++) {
            if(studentFormFields[i]['method']) {
                const methodPromise = getInputOptions(studentFormFields[i]);
                methodPromise                
                    .then(data => {
                        studentFormFields[i].option = data
                    })
                    .catch((error) => {
                        console.log("Error from MadePromise function", error)
                        studentFormFields[i].option = [];
                    })
                optionObjPromise.push(methodPromise)
            }
        }
        Promise.all(optionObjPromise)
            .then(data => {
                return resolve(studentFormFields);
            })
            .catch((error) => {
                return reject(error);
            })
    }
  })
}

const getInputOptions = (optionObject) => {
  console.log('Inside the GetInputOption for optionObject with method', optionObject.method);
  return new Promise((resolve, reject) => {
      // if(optionObject.service === "standardData") 
      OptionServices[optionObject.method]()
              .then(data => {
                console.log('Data', data)
                return resolve(data)
              })
              .catch(error => {
                  console.log('Error while getting option Data for method', optionObject.method);
                  return reject(error)
              })
  })
}

const getParentFormFields = (req, res) => {
  console.log('Inside getParentFormFields function')
  const flag = req.body.flag;
  let parentFormFields
  return new Promise((resolve, reject) => {
    if(flag) {
      parentFormFields = attributes[8].formFields
    } else {
      parentFormFields = attributes[9].formFields
    }
    if(parentFormFields && parentFormFields.length > 0) {
      var optionObjPromise = []
      for (let i = 0; i < parentFormFields.length; i++) {
          if(parentFormFields[i]['method']) {
              const methodPromise = getInputOptions(parentFormFields[i]);
              methodPromise                
                  .then(data => {
                      parentFormFields[i].option = data
                  })
                  .catch((error) => {
                      console.log("Error from MadePromise function", error)
                      parentFormFields[i].option = [];
                  })
              optionObjPromise.push(methodPromise)
          }
      }
      Promise.all(optionObjPromise)
          .then(data => {
              return resolve(parentFormFields);
          })
          .catch((error) => {
              return reject(error);
          })
    }
  })
}

const updateParentDetails = (req, res) => {
  console.log('Inside updateParentDetails function')
  const requestBody = req.body;
  return new Promise((resolve, reject) => {
    if(requestBody) {
      for (const key in requestBody) {
        if (requestBody[key].value === "") {
          delete requestBody[key]
        }
      }
      Parents.update(requestBody, {
        where: {
          id: requestBody.id
        }
      })
      .then((updatedObj) => {
        if(updatedObj[0]) {
          return resolve(updatedObj[0])
        }
      })
      .catch(error => {
        console.log('Error', error)
      }) 
    } else {
      return reject("RequestBody does not contain any value", requesBody)
    }
  })
}

const fetchEducationFormFields = (req, res) => {
  console.log('Inside fetchEducationFormFields function')
  const educationFormFields = attributes[10].formFields
  return new Promise((resolve, reject) => {
    if(educationFormFields && educationFormFields.length > 0) {
      var optionObjPromise = [];
      for (let i = 0; i < educationFormFields.length; i++) {
          if(educationFormFields[i]['method']) {
              const methodPromise = getInputOptions(educationFormFields[i]);
              methodPromise                
                  .then(data => {
                      educationFormFields[i].option = data
                  })
                  .catch((error) => {
                      console.log("Error from MadePromise function", error)
                      educationFormFields[i].option = [];
                  })
              optionObjPromise.push(methodPromise)
          }
      }
      Promise.all(optionObjPromise)
          .then(data => {
              return resolve(educationFormFields);
          })
          .catch((error) => {
              return reject(error);
          })
    }
  })
}

const updateStudentEducationDetails = (req, res) => {
  console.log('Inside updateStudentEducationDetails function');
  return  models.StudentEducationDetails.update(req.body, {where: {id: req.body.id}})
    .then((updatedObj) => {
      console.log("updatedObj", updatedObj)
      return Promise.resolve(updatedObj)
    })
    .catch(error => {
      console.log("Error while updating student education details", error);
      return Promise.reject(error)
    })

}

const getTutorFormFields = () => {
  return new Promise((resolve, reject) => {
    var tutorFormFields = attributes[13].formFields;
    var optionObjPromise = []
    for (let i = 0; i < tutorFormFields.length; i++) {
        if(tutorFormFields[i]['method']) {
            const methodPromise = getInputOptions(tutorFormFields[i]);
            methodPromise                
                .then(data => {
                    tutorFormFields[i].option = data
                })
                .catch((error) => {
                    console.log("Error from MadePromise function", error)
                    tutorFormFields[i].option = [];
                })
            optionObjPromise.push(methodPromise)
        }
    }
    Promise.all(optionObjPromise)
        .then(data => {
            return resolve(tutorFormFields);
        })
        .catch((error) => {
            return reject(error);
        })
  })
}

const getTutorEducationFormFields = () => {
  return new Promise((resolve, reject) => {
    var tutorEducationFormfields = attributes[16].formFields;
    var optioPromise = [];
    for(let i = 0; i < tutorEducationFormfields.length; i++) {
      if(tutorEducationFormfields[i]['method']) {
        const methodPromise = getInputOptions(tutorEducationFormfields[i]);
        methodPromise.then(data => {
          tutorEducationFormfields[i].option = data
        })
        .catch((error) => {
          console.log("Error from method promise", error);
          tutorEducationFormfields[i].option = []
        })
        optioPromise.push(methodPromise)
         
      }
    }
    Promise.all((optioPromise))
    .then(data => {
      return resolve(tutorEducationFormfields)
    })
    .catch((error) => {
      console.log('Error', error)
      return reject(error)
    })
  })
}

const addTutorEducation = (req) => {
  const TutorId = req.body.TutorId;
  const std = req.body.std;
  const seatNumber = req.body.seatNumber;
  const year = req.body.year;
  const totalMarks = req.body.totalMarks;
  const instituteName = req.body.instituteName;
  const universityName = req.body.universityName;
  const percentage = req.body.percentage;

  return new Promise((resolve, reject) => {
    return models.TutorEducationDetails.create({std, seatNumber, year, totalMarks, instituteName, universityName, percentage, TutorId})
    .then(res => {
      if(res) {
        resolve(res)
      }
    })
    .catch(error => {
      reject(error)
    })
  })
}

const updateTutorEducationById = (req) => {
  console.log('Inside updateTutorEducationById function');
  console.log("Req.body", JSON.stringify(req.body))
  return  models.TutorEducationDetails.update(req.body, {where: {id: req.body.id}})
    .then((updatedObj) => {
      return Promise.resolve(updatedObj)
    })
    .catch(error => {
      console.log("Error while updating student education details", error);
      return Promise.reject(error)
    })
}

// const AddUser = (req) => {
//   console.log("Inside the Add User FUnction");
//   const firstName = req.body.firstName
//   const lastName = req.body.lastName
//   // const password = req.body.firstName
//   const emailId = req.body.emailId
//   const role = req.body.role
//   const status = "active";

// }

module.exports = {
  getStudent,
  getStudentById,
  addStudentInDatabase,
  getTeacher,
  getTeacherById,
  addTeacher,
  addParent,
  addStudentEducationDetails,
  addFeesDetails,
  getFeesDetailsByStudentId,
  getAllFeesData,
  getFeesFormFields,
  getStudentFormFields,
  getParentFormFields,
  updateParentDetails,
  fetchEducationFormFields,
  updateStudentEducationDetails,
  getTutorFormFields,
  getTutorEducationFormFields,
  addTutorEducation,
  updateTutorEducationById
};
