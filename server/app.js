const express = require("express");
const bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');
const adminRoute = require("./routes/admin");
const facultyRoute = require('./routes/faculty');
const sequelize = require("./models/database");
const Student = require("./models/student");
const Teacher = require("./models/teacher");
const Parent = require("./models/Parents");
const User = require('./models/user');
const StudentEducationDetails = require('./models/student-education-details');
const Fees = require('./models/fees');
const ExcelImport = require('./models/excelImport');
const StandardMaster = require('./models/standardMaster');
const ExamStdMap = require('./models/examStdMap')
const Exam = require('./models/exam');
const SubjectMasters = require("./models/subjectMatser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(fileUpload())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoute);
app.use('/faculty', facultyRoute);


Student.hasOne(Parent);
Parent.belongsTo(Student);
Student.belongsTo(User)
Teacher.belongsTo(User);
StudentEducationDetails.belongsTo(Student)
Fees.belongsTo(Student);
ExcelImport.belongsTo(User);
Exam.belongsToMany(StandardMaster, {
  as: "Exam",
  foreignKey: "ExamId",
  through: ExamStdMap
});
StandardMaster.belongsToMany(Exam, {
  as: "Standard",
  foreignKey: "standardId",
  through: ExamStdMap
});
SubjectMasters.belongsTo(StandardMaster);


sequelize
  .sync({force: false})
  .then(() => {
    return User.findByPk(1);
  })
  .then((user) => {
    if(!user) {
      return User.create({name: "Vipin Pandey", emailId: "Vipin@gmail.com" , status: "active"})
    }
    return user
  })
  .then((user) => {
    console.log('User created with id: ==>', user.id),
    app.listen(5000)
  })
  .catch((e) => console.log(e));
