const express = require("express");
const bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');
const adminRoute = require("./routes/admin");
const facultyRoute = require('./routes/faculty');
const models = require("./models");

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
  models.user.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoute);
app.use('/faculty', facultyRoute);



models.sequelize
  .sync({force: false})
  .then(() => {
    return models.user.findByPk(1);
  })
  .then((user) => {
    if(!user) {
      return  models.user.create({name: "Vipin Pandey", emailId: "Vipin@gmail.com" , status: "active"})
    }
    return user
  })
  .then((user) => {
    console.log('User created with id: ==>', user.id),
    app.listen(5000)
  })
  .catch((e) => console.log(e));
