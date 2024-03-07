const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Redis = require('../services/cache/redis');
const models = require('../models');

const authenticattionObj = {
    authenticateRequest: (req, res, next) => {
        const token = req.headers['authorization'];
        if(token  == null) return res.status(401);
        return jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if(err) return res.status(403).json({
                resultShort: "failure",
                resultLong: 'Authorization failed',
                status: 403
            });
            const hashKey = crypto.createHash("sha256", process.env.SECRET_KEY);
            const hash = hashKey.update(token).digest("hex");
            return Redis.get(hash).then(savedToken => {
                if(savedToken != `"${user.emailId}"`) {
                    console.log("savedToken", savedToken == `"${user.emailId}"`)
                    return res.status(400).json({
                        resultShort: "failure",
                        resultLong: "Authentication failed",
                        status: 403
                    })
                }
                return models.User.findOne({
                    where: {
                        emailId: user.emailId
                    },
                    include: [
                        {
                            model: models.Roles,
                            as: 'role',
                        }
                    ]
                })
                .then(result => {
                if(!result) {
                    res.status(400).json({
                        resultShort: "failure",
                        resultLong: "User not find",
                        status: 403
                    })
                }
                req.user = {
                    firstName: result.firstName,
                    lastName: result.lastName,
                    emailId: result.emailId,
                    role: result.role.name,
                    id: result.id
                };
                global.CACHE_OBJ.set("LOGGED_IN_USERS", JSON.stringify(req.user));
                next()
                })
                .catch(error => {
                console.log("Error while user find", error);
                res.status(400).json({
                    resultShort: "failure",
                    resultLong: "User not find for authorization",
                    status: 403
                })
                })
            })
        })
    }
}

module.exports = authenticattionObj