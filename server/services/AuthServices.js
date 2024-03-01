var passport = require('passport-custom');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
const CustomStrategy = require('passport-custom').Strategy;
// const UserService = require('../services/userServices');
const models = require('../models/');
const moment = require('moment');
const crypto = require('crypto');
const Redis = require('../services/cache/redis');

module.exports = function(passport) {
    passport.use('login-custom', new CustomStrategy(
        function(req, done) {
            const password = req.body.password;
            let dbUser;
            if(req.body.emailId === '' || req.body.password === '') {
                console.log("Input empty");
                return Promise.reject({
                    resultShort:"failure",
                    resultLong:"Error loging User"
                })
            }
            console.log("At line number 25");
            return models.User.findOne({ 
                where: {emailId: req.body.emailId},
                include: [
                    {
                        model: models.Roles,
                        as: 'role',
                        attributes: ['id', "name"]
                    }
                ],
            })
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
                return bcrypt.compare(password, userObj.password)
                .then(result => {
                    console.log("bcrypt compare result", result);
                    if(!result) {
                        return done(null, {
                            success: false,
                            message: "User emailId or password does not match"
                        })
                    } else {
                        const token = jwt.sign({emailId: dbUser.emailId, password: dbUser.password}, process.env.SECRET_KEY,  { expiresIn: '8h' })
                        const hashKey = crypto.createHash("sha256", process.env.SECRET_KEY);
                        const hash = hashKey.update(token).digest("hex");
                        Redis.set(hash, req.body.emailId);
                        return done(null, {
                            token: token,
                            firstName: dbUser.firstName,
                            lastName: dbUser.lastName,
                            status: dbUser.status,
                            emailId: dbUser.emailId,
                            roleId: dbUser.roleId,
                            roleName: dbUser.role.name,
                            id: userObj.id,
                            success: true
                        })
                    }
                })
            })
            .catch(error => {
                return done(null, {
                    success: false,
                    error: error,
                    message: "Error Loging User"
                })
            })
        }
    ));
}
