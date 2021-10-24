const async = require('async');
const ExcelImport = require('../models/excelImport');

const SaveFileDetailsInDB = (inputFileObj) => {
    console.log('Input File ==========>', inputFileObj);
    const fileName = inputFileObj.inputfile.name;
    const uploadedBy = 1;
    const filePath = "localPath";
    return new Promise((resolve, reject) => {
        ExcelImport.create({
            fileName,
            uploadedBy,
            filePath
        })
        .then(fileObj => {
            return resolve(fileObj)
        })
        .catch(error => {
            console.log("error", error)
            return reject(error);
        })
    })
}

module.exports = {
    SaveFileDetailsInDB: SaveFileDetailsInDB
}
