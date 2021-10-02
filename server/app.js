const express = require("express");
const bodyParser = require('body-parser');
require('dotenv').config({path: __dirname + '/.env'})
const adminRoute = require("./routes/admin");
const facultyRoute = require('./routes/faculty');
const authenticateRoute = require('./routes/authenticate');
const sequelize = require("./models/database");
const Student = require("./models/student");
const Teacher = require("./models/teacher");
const StudentTeacherMap = require("./models/student-teacher-map");
const StudentParentMap = require("./models/student-parent-map");
const Parent = require("./models/Parents");
const User = require('./models/user');
const StudentEducationDetails = require('./models/student-education-details');
const Fees = require('./models/fees');
const passport = require('passport');
require('./services/AuthServices')(passport);
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(passport.initialize());
// // app.use(passport.session());

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

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  // console.log("req header",req.headers)
  const token = authHeader.split(' ')[1];
  if(token  == null) return res.status(401);
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if(err) return res.sendStatus(403);
    console.log('User body', req.body);
    req.user = user;
    next()
  })
}

app.use("/admin", authenticateToken, adminRoute);
app.use('/faculty', authenticateToken, facultyRoute);
app.use('/',authenticateRoute)
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
      const firstName = 'Vipin';
      const lastName = 'Pandey';
      const name = firstName + " " + lastName;
      const password = '12345678';
      const emailId = 'vipinpandey@gmail.com';
      const role = "teacher";
      return User.create({firstName, lastName, name, password, emailId, role});
    }
    return user
  })
  .then((user) => {
    console.log('User created with id: ==>', user.id),
    app.listen(5000)
  })
  .catch((e) => console.log(e));
// app.listen(5000);
