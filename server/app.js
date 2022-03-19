const express = require("express");
const bodyParser = require('body-parser');
require('dotenv').config({path: __dirname + '/.env'})
const authenticateRoute = require('./routes/authenticate');
var passport = require('passport');
require('./services/AuthServices')(passport);
const jwt = require('jsonwebtoken');
var fileUpload = require('express-fileupload');
const adminRoute = require("./routes/admin");
const facultyRoute = require('./routes/faculty');
const models = require("./models");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());;
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
  models.User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if(token  == null) return res.status(401);
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if(err) return res.status(403).json({
      resultShort: "failure",
      resultLong: 'Authorization failed'
    });
    models.User.findOne({
      where: {
        emailId: user.emailId
      }
    })
    .then(result => {
      const userObj = JSON.stringify(result)
      if(!userObj) {
        res.status(400).json({
          resultShort: "failure",
          resultLong: "User not find"
        })
      }
      req.user = {
        firstName: userObj.firstName,
        lastName: userObj.lastName,
        emailId: userObj.emailId,
        role: userObj.role
      };
      next()
    })
    .catch(error => {
      console.log("Error while user find");
      res.status(400).json({
        resultShort: "failure",
        resultLong: "User not find for authorization"
      })
    })
  })
}

app.use(passport.initialize());
// app.use(passport.session())
app.use('/',authenticateRoute)
app.use("/admin", authenticateToken, adminRoute);
app.use('/faculty', authenticateToken, facultyRoute);



models.sequelize
  .sync({force: false})
  .then((user) => {
    app.listen(5000)
  })
  .catch((e) => console.log(e));
