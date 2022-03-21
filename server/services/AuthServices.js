var passport = require('passport-custom');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
const CustomStrategy = require('passport-custom').Strategy;
// const UserService = require('../services/userServices');
const models = require('../models/');
const moment = require('moment');

module.exports = function(passport) {
    passport.use('login-custom', new CustomStrategy(
        function(req, done) {
            console.log('request body', req.body);
            const password = req.body.password;
            let dbUser;
            return models.User.findOne({ where: {emailId: req.body.emailId}})
            .then(user => {
                if(!user) {
                    console.log("User Not Found");
                    return Promise.reject({
                        resultShort:"failure",
                        resultLong:"User not found"
                    })
                }
                return user
            })
            .then(userObj => {
                dbUser = userObj
                return bcrypt.compare(password, userObj.password, function(error, result) {
                    if(error) {
                        return done(null, {
                            success: false,
                            error: err
                        })
                    }
                    return done(null, {
                        token: jwt.sign({emailId: dbUser.emailId, password: dbUser.password}, process.env.SECRET_KEY,  { expiresIn: '8h' }),
                        firstName: dbUser.firstName,
                        lastName: dbUser.lastName,
                        status: dbUser.status,
                        emailId: dbUser.emailId,
                        role: dbUser.role,
                        id: userObj.id,
                        success: true
                    })
                })
            })
            .catch(error => {
                console.error("Error ocure while login", error);
                return done(null, {
                    success: false,
                    error: err
                })
            })
        }
    ));
}
