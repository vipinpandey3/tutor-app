const Students = require("../models/student");
const Parents = require("../models/Parents");
const Teachers = require("../models/teacher");
const Student = require("../models/student");
const Teacher = require("../models/teacher");
const Parent = require("../models/Parents");
const StudentEducationDetails = require("../models/student-education-details");
const Fees = require('../models/fees'); 
const attributes = require('../attributes/attributes.json');
const OptionServices = require('../services/optionServices')
const moment = require('moment');

const getStudent = (req, res, next) => {
  const columnsAttributes = attributes[6].columnsHeader
  Students.findAll()
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
  Student.findByPk(studentId, {attributes: studentDBAttributes})
    .then((student) => {
      Parent.findAll({ where: { studentId: student.id } }, {attributes: parentDBAttributes})
        .then((parent) => {
          StudentEducationDetails.findAll({where: {studentId: student.id}}, {attributes: educationDBAttributes})
          .then(educationDetails => {
            const response = {
              resultShort: "success",
              resultLong: "Student details Found",
              studentDetails: student,
              parentDetails: parent[0],
              educationDetails: educationDetails,
              studentDetailAttributes: studentDetailAttributes,
              parentDetailsAttributes: parentDetailsAttributes,
              educationDetailsAttributes: educationDetailsAttributes
            };
            return res.status(200).json(response);
          })
          .catch(err => {
            const response = {
              resultShort: "failure",
              resultLong:
                "Failed to retrieve Education Details for student with id: " + student.id,
            };
            res.json(response);  
          } )
        })
        .catch((err) => {
          const response = {
            resultShort: "failure",
            resultLong:
              "Failed to retrieve parent details for id: " + student.id,
          };

          res.json(response);
        });
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
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const emailId = req.body.emailId;
  const address = req.body.address;
  const dob = moment(req.body.dob).formate('YYYY-MM-DD');
  const religion = req.body.religion;
  const gender = req.body.gender;
  const aadharNo = req.body.aadharNo;
  const userId = req.user.id;
  Student.create({
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
  Teachers.findAll()
    .then((teachers) => {
      const respose = {
        resultShort: "success",
        resultLong: "Successfully retrived all Teachers",
        teachers: teachers,
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
  const teacherId = req.params.teacherId;
  Teachers.findByPk(teacherId)
    .then((teacher) => {
      const response = {
        resultShort: "success",
        resultLong: "Successfully retrived Teacher" + teacherId,
        data: teacher,
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      const response = {
        resultShort: "failure",
        resultLong: "Failed to retrieve teacher data with Id: " + teacherId,
      };
      res.json(response);
    });
};

const addTeacher = (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const fullName = firstName + lastName;
  const emailId = req.body.emailId;
  const address = req.body.address;
  const dob = req.body.dob;
  const religion = req.body.religion;
  const gender = req.body.gender;
  const aadharNo = req.body.aadharNo;
  const userId = req.user.id;
  const panNo = req.body.panNo;
  Teacher.create({
    fullName,
    emailId,
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
        resultShort: "Success",
        resultLong: "User created with use id: " + teacher.id,
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

  Parents.create({
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
    studentId,
  })
    .then((parent) => {
      console.log("Parent", parent);
      const response = {
        resultShort: "success",
        resultLong: "Parents created for student with Id: " + studentId,
        parentId: parent.id
      };
      return res.status(200).json(response);
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
  const studentId = req.body.studentId;

  console.log('addStudentEducationDetails', req.body)

  StudentEducationDetails.create({
    std,
    seatNumber,
    year,
    totalMarks,
    instituteName,
    universityName,
    percentage,
    studentId,
  })
    .then(details => {
      const response = {
        resultShort: "succes",
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
  let studentId = req.body.studentId;
  Fees.findAll({where: {
    studentId: studentId
  }})
    .then(fees => {
      if(fees.length <= 0) {
        Fees.create({feesAmount, discount, paidAmount, balance, academicYear, reamarks, studentId})
          .then((fees) => {
            const response = {
              resultShort: "success",
              resultLong: "Addedd fees details for student with Id: " + studentId,
              fees: fees
            };

            return res.status(200).json(response);
          })
          .catch((err)=> {
            console.log("Error", err)
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
            Fees.create({feesAmount, discount, paidAmount, balance, academicYear, reamarks, studentId})
              .then((fees) => {
                const response = {
                  resultShort: "success",
                  resultLong: "Addedd fees details for student with Id: " + studentId,
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
      const response = {
        resultShort: 'failure',
        resultLong: "Failure in adding fees details"
      }
      return res.json(response)
    })
}

const getFeesDetailsByStudentId = (req, res, next) => {
  const studentId = req.params.studentId;
  const tableHeader = [
    {
      id: "uuid",
      label: "Bill Number"
    },
    {
      id: 'date',
      label: "Date"
    },
    {
      id: "feesAmount",
      label: "Fees Amount",
    },
    {
      id: "discount",
      label: "Discount"
    },
    {
      id: "paidAmount",
      label: "Paid Amount"
    },
    {
      id: "balance",
      label: "Balance Amount"
    },
    {
      id: 'reamarks',
      label: "Remarks"
    }
  ]
  Fees.findAll({where: {studentId: studentId}})
    .then((fees) => {
      console.log("fees 1", fees)
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
    Fees.findAll()
      .then((fees) => {
        let a = 1;
        for (let i = 0; i < fees.length; i++) {
          Students.findByPk(fees[i].studentId)
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
  return  StudentEducationDetails.update(req.body, {where: {id: req.body.id}})
    .then((updatedObj) => {
      console.log("updatedObj", updatedObj)
      return Promise.resolve(updatedObj)
    })
    .catch(error => {
      console.log("Error while updating student education details", error);
      return Promise.reject(error)
    })

}

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
  updateStudentEducationDetails
};
