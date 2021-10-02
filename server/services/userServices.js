const User = require('../models/user');
const Users = require('../models/user');
const bcrypt = require('bcryptjs');

const getUser = (useEmailId) => {
    // return User.findOne({emailId: useObj.emailId}, function(err, use){
    //     // return 
    // })
    return User.findAll({where: {emailId: useEmailId}})
        .then(user => {
            if(!user.length) {
                return 'User Not Found'
            }
            return user[0];

        })
        .catch(err => {
            return err;
        })
}

const addUser = (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const fullName = firstName + " " + lastName;
    const emailId = req.body.emailId;
    const role = req.body.role;
    const password = req.body.password
    const hashedPassword = bcrypt.hashSync(password, 8);
    return User.findOrCreate({
        where: {
            emailId: emailId
        },
        defaults: {
            firstName: firstName,
            lastName: lastName,
            name: fullName,
            emailId: emailId,
            password: hashedPassword,
            role: role
        }
    })
    .then(user => {
        const response = {
            resultShort: "success",
            resultLong: "User created with id " + user.emailId,
        }
        return res.status(200).json(response)
    })
    .catch(err => {
        return err
    })
}

module.exports = {
    getUser,
    addUser
}