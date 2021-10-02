const express = require('express');
var passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken');
const UserService = require('../services/userServices');

router.post('/login', (req, res, next) => {
    const userEmail = req.body.emailId;
    console.log('password', req.body);
    return UserService.getUser(userEmail)
        .then(user => {
            if(user.password !== req.body.password) {
                const response = {
                    resultShort: 'failure',
                    resultLong: 'Failed to log in',
                }
                return res.status(200).json(response);
            } else {
                const token = jwt.sign({emailId: user.password}, process.env.SECRET_KEY, { expiresIn: '1h' })
                const response = {
                    resultShort: 'success',
                    resultLong: 'Logged In user',
                    user: user,
                    authKey: token
                }
                return res.status(200).json(response);
            }
        })
        .catch(err => {
            console.log(err);
        })
})

// router.post('/login',
//     passport.authenticate('login-custom'),
//     (req, res) => {
//         console.log('req.body', res.body)
//         res.status(200).status(req.user);
// })

module.exports = router;