const fs = require('fs');
const crypto = require("crypto");
const config = require('../config/index')
const password = config.CRYPTO_SECRET_KEY;

let dataObj = {
    // Fetch JSON file from local
    fetchJSONFile: (obj, res) => {
        let url = '../jsonFiles/' + obj.type + '/' + obj.format + '.json';
        try {
            const data = fs.readFileSync(url, 'utf8');
            dataObj.res_ok(res, data);
        } catch (err) {
            dataObj.res_err(res, err);
        }
    },

    // Res Ok
    res_ok: (res, data) => {
        return res.status(200).json(data);
    },

    res_Blob: (res, data) => {
        console.log("data =data", data.data.path);
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="output.csv"');
        // Send the CSV file as the response
        res.sendFile(data.data.path);
    },

    // Custom format
    res_custom: (res, optional, data) => {
        return res.status(200).json({
            success: true,
            optional: optional,
            response: data
        });
    },

    // Res Error
    res_err: (res, data) => {
        return res.status(422).json(data);
    },

    // Res Auth err
    res_auth_err: (res, mssg) => {
        return res.status(401).json({
            success: false,
            response: 'Authenticattion failed.',
            message: mssg
        });
    },

    // CS Message
    cs_msg: (res, msg) => {
        return res.status(422).json({
            success: false,
            response: msg
        });
    },

    cs_msg_status: (res, errObj) => {
        console.log("errObj errObj", errObj);
        return res.status(422).json({
            success: errObj.status,
            response: errObj.message
        });
    },

    // Error
    // v_err: (req, res, next) => {
    //     let err = validationResult(req);
    //     if (!err.isEmpty()) {
    //         return dataObj.res_err(res, error)
    //     } else {
    //         next();
    //     }
    // },

    // check_err: (req) => {
    //     let err = validationResult(req);
    //     if (!err.isEmpty()) {
    //         return false;
    //     } else {
    //         return true;
    //     }
    // },

    // Group by
    groupBy: (xs, key) => {
        return xs.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, []);
    },

    checkValues: (valueOne, valueTwo) => {
        return valueOne === valueTwo ? true : false
    },

    encryptString: (string) => {
        const iv = crypto.randomBytes(16);
        const algorithm = config.CRYPTO_ALGORITHM;
        const cipher = crypto.createCipheriv(algorithm, Buffer.from(password), iv);
        let encrypted = cipher.update(string);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
    },

    decryptString: (string) => {
        const [iv, encryptedString] = string.split(':').map(part => Buffer.from(part, 'hex'));
        const algorithm = config.CRYPTO_ALGORITHM;
        const decipher = crypto.createDecipheriv(algorithm, Buffer.from(password), iv);
        let decrypted = decipher.update(encryptedString);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    },

    getArray: (array, key) => {
        return array.map(x => x[key])
    }
};

module.exports = dataObj;