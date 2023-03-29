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
const dashboardRoute = require('./routes/dashboard');
const models = require("./models");
var Redis = require('ioredis');
const {authenticateRequest} = require('./services/Authentication.js')

const app = express();
if(process.env.TO_CACHE_DATA) {
  global.CACHE_OBJ = new Redis({
    port: process.env.CACHE_STORE_PORT, // Redis port
    host: process.env.CACHE_STORE_URL, // Redis host
    family: 4, // 4 (IPv4) or 6 (IPv6)
    db: 0
  })
}
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

app.use(passport.initialize());
// app.use(passport.session())
app.use('/',authenticateRoute)
app.use("/admin", authenticateRequest, adminRoute);
app.use('/faculty', authenticateRequest, facultyRoute);
app.use('/dashboard', authenticateRequest, dashboardRoute);

models.sequelize
  .sync({force: false})
  .then((user) => {
    app.listen(process.env.SERVER_PORT);
    console.log("Listning to port",process.env.SERVER_PORT)
  })
  .catch((e) => console.log(e));


  // process.on('unhandledRejection', (reason, promise) => {
  //   console.log("Server Error ************", reason);
  // });

  process.on("unhandledex", (err, da) =>{
    console.log("Server Error ************", err);
    process.exit();
  })
