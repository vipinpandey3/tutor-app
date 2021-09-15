const Students = require("../models/student");
const Parents = require("../models/Parents");
const Teachers = require("../models/teacher");
const Student = require("../models/student");
const Teacher = require("../models/teacher");
const Parent = require("../models/Parents");
const StudentEducationDetails = require("../models/student-education-details");
const Fees = require('../models/fees')

const getStudent = (req, res, next) => {
  Students.findAll()
    .then((students) => {
      const respose = {
        resultShort: "success",
        resultLong: "Successfully retrived all Students",
        students: students,
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
  const studentId = req.params.studentId;
  console.log("Student Id", studentId);
  Student.findByPk(studentId)
    .then((student) => {
      Parent.findAll({ where: { studentId: student.id } })
        .then((parent) => {
          StudentEducationDetails.findAll({where: {studentId: student.id}})
          .then(educationDetails => {
            const response = {
              resultShort: "success",
              resultLong: "Student details Found",
              studentDetails: student,
              parentDetails: parent[0],
              educationDetails: educationDetails
            };
            res.status(200).json(response);
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
  const dob = req.body.dob;
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
  const fatherName = req.body.fatherName;
  const motherName = req.body.motherName;
  const motherAadhar = req.body.motherAadhar;
  const fatherAadhar = req.body.fatherAadhar;
  const fatherEmailId = req.body.fatherEmailId;
  const motherEmailId = req.body.motherEmailId;
  const fatherHighestQualifaction = req.body.fatherHighestQualifaction;
  const motherHighestQualification = req.body.motherHighestQualifaction;
  const motherdob = req.body.motherdob;
  const fatherDob = req.body.fatherDob;
  const studentId = req.body.studentId;
  console.log("Req.body", req.body);

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
      };
      return res.status(200).json(response);
    })
    .catch((err) => {
      const response = {
        resultShort: "failure",
        resultLong: err.errors[0].message,
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
  let studentId = req.body.studentId
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
            const response = {
              resultShort: "failure",
              resultLong: "Error Adding Fees details",
            };
            return res.json(response);
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
  Fees.findAll({where: {studentId: studentId}})
    .then((fees) => {
      const response = {
        resultShort: "success",
        resultLong: "Successfully retrieved fees details for student with id: " + studentId,
        fees: fees
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
  getFeesDetailsByStudentId
};
