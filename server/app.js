const express = require("express");
const bodyParser = require('body-parser');
const adminRoute = require("./routes/admin");
const sequelize = require("./models/database");
const Student = require("./models/student");
const Teacher = require("./models/teacher");
const StudentTeacherMap = require("./models/student-teacher-map");
const StudentParentMap = require("./models/student-parent-map");
const Parent = require("./models/Parents");
const User = require('./models/user');
const StudentEducationDetails = require('./models/student-education-details');
const Fees = require('./models/fees');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


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
Student.hasOne(Parent);
// Student.hasMany(Teacher);
// Teacher.hasMany(Student);
Parent.belongsTo(Student);
Student.belongsTo(User)
// User.hasMany(Student);
// User.hasMany(Teacher);
// Teacher.belongsTo(Student, {through: StudentTeacherMap});
Teacher.belongsTo(User);
// Student.hasMany(StudentEducationDetails);
StudentEducationDetails.belongsTo(Student)
Fees.belongsTo(Student);



sequelize
  .sync({force: false})
  .then(() => {
    return User.findByPk(1);
    app.listen(5000);
  })
  .then((user) => {
    if(!user) {
      return User.create({name: "Vipin Pandey", emailId: "Vipin@gmail.com" })
    }
    return user
  })
  .then((user) => {
    console.log('User created with id: ==>', user.id),
    app.listen(5000)
  })
  .catch((e) => console.log(e));

// app.listen(5000);
