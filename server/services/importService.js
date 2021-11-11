const async = require('async');
const ExcelImport = require('../models/excelImport');
const path = require('path');
const fs = require('fs')
const XLSX = require('xlsx');
const Fees = require('../models/fees');

// ExcelImport.create({
//     fileName,
//     uploadedBy,
//     filePath
// })
// .then(fileObj => {
//     return resolve(fileObj)
// })
// .catch(error => {
//     console.log("error", error)
//     return reject(error);
// })

const SaveFileDetailsInDB = (inputFileObj) => {
    console.log('Input File ==========>', inputFileObj);
    const fileName = inputFileObj.inputfile.name;
    const uploadedBy = 1;
    const filePath = "localPath";
    return new Promise((resolve, reject) => {
        async.waterfall([
            function(callback) {
                ExcelImport.create({
                    fileName,
                    uploadedBy,
                    filePath
                })
                .then(uploadedFile => {
                    callback(null, uploadedFile)
                    // return resolve(uploadedFile)
                })
                .catch(error => {
                    console.log("error", error)
                    let callBackErrorResponse =
                    (error && error.parent && error.parent.sqlMessage) ||
                    'Error occurred while uploading excel';
                    callback(callBackErrorResponse);
                    return reject(error);
                })
            },
            function(uploadedFile, callback) {
                var file = JSON.parse(JSON.stringify(uploadedFile));
                console.log("File **********", file)
                var path1 = "/home/vipin/Documents/Tutorist2/tutorist-app";
                var finalPath = path.join(path1, file.fileName);
                console.log("inputFileObj ======", inputFileObj)
                inputFileObj.inputfile.mv(finalPath, function(err) {
                    if (err) {
                        console.log('local file store err');
                        console.log(err);
                        reject(err);
                    }
                    console.log("File uplaoded in local folder");
                    uploadedFile.update({
                        filePath: finalPath
                    })
                    .then((updatedFile) => {
                        callback(null, updatedFile);
                    });
                })
            }
        ],
        function (err, updatedFile) {
            console.log('waterfall completed');
            if (err) reject({ message: err });
            resolve(updatedFile);
        }
        );
    })
}

const importExceldata = (file) => {
    console.log("Inside importExcelData function")
    return new Promise((resolve, reject) => {
        ExcelImport.findByPk(file.id)
            .then(databaseFile => {
                let fileObj = fs.readFileSync(databaseFile.filePath);
                saveExcelDataInDB({data: fileObj})
                    .then(result => {
                        return resolve(result)
                    })
                    .catch(error => {
                        return reject(error)
                    })
            })
    })
}

const saveExcelDataInDB = (data) => {
    console.log("========== Inside saveExcelDataInDB function =========")
    defCount = 0;
    empCount = 0;
    dueCount = 0;
    defAddCount = 0;
    defEmailCount = 0;
    defPhoneCount = 0;
    actSheets = 0;
    errorData = [];
    errorReason = [];
    const workbook = XLSX.read(data.data, {
        type: 'buffer'
    });
    let populatePromises = []
    return new Promise((resolve, reject) => {
        var sheetsList = workbook.SheetNames;
        for (var index = 0; index < sheetsList.length; index++) {
            var curWorksheet = workbook.Sheets[sheetsList[index]];
            actSheets++;
            if (curWorksheet === null || curWorksheet['!ref'] === undefined || curWorksheet['!ref'] === null) {
            continue;
            }
            var curHeaders = get_header_row(curWorksheet);
            populatePromises.push(
            mapPopulateData(
                curHeaders,
                curWorksheet,
            ).catch((e) => {
                console.error('Error in populating sheets: ', e);
                return Promise.reject(e);
            })
            );
        }
        Promise.all(populatePromises)
            .then(() => {
                const result = {
                status: 'success'
                }
                resolve(result)
            })
            .catch(error => {
                const result = {
                    status: "failrue",
                    message: error
                }

                reject(result)
            })
    })
}

function get_header_row(sheet) {
    var headers = [];
    var range = XLSX.utils.decode_range(sheet['!ref']);
    var C;
    var R = range.s.r; /* start in the first row */
    /* walk every column in the range */
    for (C = range.s.c; C <= range.e.c; ++C) {
        var cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })];

        var hdr = {};
        hdr.colName = 'UNKNOWN ' + C;
        var emptyCheck = hdr.colName;
        if (cell && cell.t) {
        hdr.colName = XLSX.utils.format_cell(cell);
        hdr.colNum = C;
        }
        if (hdr.colName !== emptyCheck) {
        headers.push(hdr);
        }
    }
    return headers;
}

  const mapPopulateData = (sheetHeader, sheet) => {
    return new Promise((resolve, reject) => {
        var range = XLSX.utils.decode_range(sheet['!ref']);
        var R;
        var C;
        var H;
        var defCreatePromises = [];
        let promiseArr = [];
        let returnVar;
        for (R = range.s.r + 1; R <= range.e.r; ++R) {
            let feesArray = [];
            console.log("R")
            for(C = range.s.c; C <= range.e.c; ++C) {
                var cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })];
                returnVar = XLSX.utils.format_cell(cell);
                feesArray.push(returnVar);
            }
            const uuid = feesArray[0];
            const feesAmount = feesArray[1];
            const discount = feesArray[2];
            const paidAmount = feesArray[3];
            const balance = feesArray[4];
            const academicYear = feesArray[5];
            const reamarks = feesArray[6]
            const studentId = feesArray[7];
            const feesObj = {uuid, feesAmount, discount, paidAmount, balance, academicYear, reamarks, studentId}
            Fees.create(feesObj)
                .then(feesObject => {
                    return resolve(feesObject)
                })
                .catch(error => {
                    return reject(error);
                })
        }
    })
  }

  function get_cell_value(sheet, colNum, rowNum) {
    console.log("Inside get_cell_value function")
    var cell = sheet[XLSX.utils.encode_cell({ c: colNum, r: rowNum })];
    console.log("")
    var returnVar = '';
    if (cell && cell.t) {
      return returnVar = XLSX.utils.format_cell(cell);
    }
    return returnVar;
  }

module.exports = {
    SaveFileDetailsInDB: SaveFileDetailsInDB,
    importExceldata: importExceldata
}
