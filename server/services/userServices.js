const User = require('../models/user');
const bcrypt = require('bcryptjs');
const attributes = require('../attributes/attributes.json');
const { use } = require('passport');
const models = require('../models')

const getUser = (useEmailId) => {
    return models.User.findAll({where: {emailId: useEmailId}})
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

const getUserFormFields = () => {
    return new Promise((resolve, reject) => {
        var userFormFields = attributes[21].formFields;
        var optionObjPromise = []
        for (let i = 0; i < userFormFields.length; i++) {
            if(userFormFields[i]['method']) {
                const methodPromise = getInputOptions(userFormFields[i]);
                methodPromise                
                    .then(data => {
                        userFormFields[i].option = data
                    })
                    .catch((error) => {
                        console.log("Error from MadePromise function", error)
                        userFormFields[i].option = [];
                    })
                optionObjPromise.push(methodPromise)
            }
        }
        Promise.all(optionObjPromise)
            .then(data => {
                return resolve(userFormFields);
            })
            .catch((error) => {
                return reject(error);
            })
      })
}

const getAllUser = (req, res) => {
    const userArray = []
    return models.User.findAll()
        .then((users) => {
            const userTableHeader = attributes[22].columnsHeader;
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

const addUser = (req) => {
    console.log("Inside Add User Function")
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const emailId = req.body.emailId;
    const role = req.body.role;
    const password = req.body.password
    const hashedPassword = bcrypt.hashSync(password, 8);
    const status = "active"
    return models.User.findOrCreate({
        where: {
            emailId: emailId
        },
        defaults: {
            firstName: firstName,
            lastName: lastName,
            emailId: emailId,
            password: hashedPassword,
            role: role,
            status: status
        }
    })
    .then(user => {
        console.log('User Created', JSON.stringify(user))
        return Promise.resolve(user)
    })
    .catch(err => {
        return Promise.reject(err)
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
    getUserFormFields
}