var passport = require('passport-custom');
const jwt = require('jsonwebtoken');
const CustomStrategy = require('passport-custom').Strategy;
// const UserService = require('../services/userServices');
const User = require('../models/user');

// passport.use('login-custom', new CustomStrategy(
//     function(req, done) {
//         User.findOne({emailId: req.body.emailId}, function(err, user) {
//             done(err, user)
//         })
//         // const getExpiryTime = getExpirry(req,body);
//         // return UserService.getUser(req.body)
//         //     .then(user => {
//         //         return done(null, {
//         //             user: user,
//         //             success: true
//         //         })
//         //     })
//         //     .catch(err => {
//         //         console.log('err', err);
//         //     })
//     }
// ));

module.exports = function(passport) {
    passport.use('login-custom', new CustomStrategy(
        function(req, done) {
            console.log('request body', req.body);
            return User.findOne({ where: {emailId: req.body.emailId}}, 
                function(err, user) {
                console.log('User', user);
                if(err) {
                    console.log('err', err)
                    return err
                }
                    return done(err, user)
                }
            )
        }
    ));

     // const getExpiryTime = getExpirry(req,body);
            // return UserService.getUser(req.body)
            //     .then(user => {
            //         return done(null, {
            //             user: user,
            //             success: true
            //         })
            //     })
            //     .catch(err => {
            //         console.log('err', err);
            //     })

    const getExpirry = (reqBody) => {
        if(reqBody.emailId && reqBody.password) {
            return {
                where: {
                  emailId: reqBody.username,
                  status: 'active'
                },
                expiry: '10h',
                otp: false
            };
        }
    }
}
