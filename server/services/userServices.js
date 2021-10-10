const User = require('../models/user');
const bcrypt = require('bcryptjs');
const attributes = require('../attributes/attributes.json');
const { use } = require('passport');

const getUser = (useEmailId) => {
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

const getAllUser = (req, res, next) => {
    const userArray = []
    return User.findAll()
        .then((users) => {
            const userTableHeader = attributes[2].columnsHeader;
            const response = {
                resultShort: "success",
                resultLong: "Successfully retried all the user",
                userData: users,
                attributes: userTableHeader
            }

            return res.status(200).json(response);
        })
        .catch((err) => {
            console.log('error', err)
            const response = {
                resultShort: 'failrue',
                resultLong: "Failed to get Users"
            }

            return res.json(response);
        })
}

const addUser = (req, res, next) => {
    console.log("Inside Add User Function")
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const fullName = firstName + " " + lastName;
    const emailId = req.body.emailId;
    const role = req.body.role;
    const password = req.body.password
    const hashedPassword = bcrypt.hashSync(password, 8);
    console.log("Req.body", req.body);
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
        console.log('User Created', JSON.stringify(user))
        const response = {
            resultShort: "success",
            resultLong: "User created with id " + user[0].emailId,
        }
        return res.status(200).json(response)
    })
    .catch(err => {
        return err
    })
}

const updateUser =(userBody) => {
    if(!userBody.emailId) {
        return err
    }
    if(userBody.emailId)  {
        delete userBody['emailId'];
    }

    let hashedPassword = "";
    if(userBody.password !== null || userBody.password !== "undefined") {
        let password = userBody.password;
        hashedPassword = bcrypt.hashSync(password, 8);
        userBody.password = hashedPassword;
    } else {
        delete userBody['password'];
    }
    return new Promise((resolve, reject) => {
        User.update(userBody, {
            where: {emailId: "vipinpandey@gmail.com"}
        })
        .then((user) => {
            return resolve(user);
        })
        .catch(err => {
            return reject(err);
        })
    })
};

const getUserBySearchParams = (searchParams) => {
    console.log('inside getUserBySearchParams function');
    const userSearchParams = searchParams.trim();
    const userArray = [];
    return User.findAll()
            .then((users) => {
                users.forEach(user => {
                    console.log('User', user)
                    if(user.name.toLowerCase().includes(userSearchParams.toLowerCase())) {
                        userArray.push(user);
                    }
                });
                return userArray
            })
            .catch(error => {
                return error
            })
}

const getUserFormsFields = () => {
    return new Promise((resolve, reject) => {
        const attributeJson = require('../attributes/attributes.json');
        const formAttributes = attributeJson[3].attributes;
        if(formAttributes.length > 0) {
            return resolve(formAttributes)
        } else {
            return reject("Error while getting attributes");
        }
    })
}

module.exports = {
    getUser,
    addUser,
    updateUser,
    getAllUser,
    getUserBySearchParams,
    getUserFormsFields
}