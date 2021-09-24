const fs = require('fs');

const readFileFromSource = (fileSource) => {
    console.log('Inside file read functions in file service', fileSource);
    return new Promise((resolve, reject) => {
        fs.readFile(fileSource, (err, data) => {
            if(err) {
                return reject(err);
            }
            return resolve(data);
        });
    });
}

module.exports = {
    readFileFromSource,
}