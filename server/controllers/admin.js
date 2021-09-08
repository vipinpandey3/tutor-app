const Students = require("../models/student");
const Parents = require("../models/Parents");
const Teachers = require("../models/teacher");
const Student = require("../models/student");
const Teacher = require("../models/teacher");
const Parent = require("../models/Parents");

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
      Parent.findAll({where: {studentId: student.id}})
        .then((parent) => {
          const response = {
            resultShort: "success",
            resultLong: "Student details Found",
            studentDetails: student,
            parentDetails: parent[0]
          }
          res.status(200).json(response);
        })
        .catch(err => {
          const response = {
            resultShort: "failure",
            resultLong: "Failed to retrieve parent details for id: " + student.id
          }

          res.json(response);
        })
      // const response = {
      //   resultShort: "success",
      //   resultLong: "Student found with id: " + studentId,
      //   data: student,
      // };
      // res.status(200).json(response);
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
  console.log(JSON.stringify(req.body))
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
    studentId
  })
    .then((parent) => {
      console.log('Parent', parent)
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

const getParentsDetails = (req, res, next) => {
  console.log('id', req.params)
  const studentsId = req.params.studentId;
  Parents.findAll({where: {studentId: studentsId}})
    .then((parent) => {
      const response = {
        resultShort: "success",
        resultLong: "Parent details retrieved for student with id: " + studentsId,
        data: parent[0]
      }
      console.log('Parent details', parent);
      res.status(200).json(response);
    })
    .catch(err => {
      const response = {
        resultShort: "failure",
        resultLong: "Failed to retreive parents details",
      };

      return res.json(response);
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
  getParentsDetails
};
