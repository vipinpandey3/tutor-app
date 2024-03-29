const express = require('express');
var passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserService = require('../services/userServices');


// router.post('/login', (req, res, next) => {
//     console.log('Inside the Login Path')
//     const userEmail = req.body.emailId;
//     console.log('req.body', req.body);
//     return UserService.getUser(userEmail)
//         .then(user => {
//             bcrypt.compare(req.body.password, user.password, function(err, result) {
//                 if(err) {
//                     console.log('err', err);
//                     const response = {
//                         resultShort: 'failure',
//                         resultLong: 'Failed to log in',
//                     }
//                     return res.status(200).json(response);
//                 }

//                 const token = jwt.sign({emailId: user.password}, process.env.SECRET_KEY, { expiresIn: '8h' })
//                 const userObj = {
//                     emailId: user.emailId,
//                     role: user.role
//                 }
//                 const response = {
//                     resultShort: 'success',
//                     resultLong: 'Logged In user',
//                     userObj: userObj,
//                     authKey: token
//                 }
//                 return res.status(200).json(response);
//             })
//         })
//         .catch(err => {
//             return res.json(400).json({
//                 resultShort: 'failure',
//                 resultLong: "Unable to login"
//             })
//         })
// })

router.post('/login',
    passport.authenticate('login-custom', {
        session: false
    }),
    (req, res) => {
        if(req.user.success) {
            global.CACHE_OBJ.set('USER_TOKEN', JSON.stringify(req.user.token));
            const result = {
                resultShort: 'success',
                resultLong: 'Login Successful',
                user: req.user
            }
            return res.status(200).json(result);
        } else {
            console.log("req.user", req.user);
            const result = {
                resultShort: 'failure',
                resultLong: req.user.message,
            }
            return res.status(200).json(result);
            res.status(200).json(req.user);
        }
});

module.exports = router;