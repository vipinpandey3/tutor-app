const async = require('async');
const path = require('path');
const fs = require('fs')
const XLSX = require('xlsx');
const models = require('../models');
const fillerFunction = require('./excelimport/fillerFunction');
const studentService = require('./studentServices');
const student = require('../models/student');

const SaveFileDetailsInDB = (inputFileObj) => {
    const fileName = inputFileObj.inputfile.name;
    const uploadedBy = 1;
    const filePath = "localPath";
    return new Promise((resolve, reject) => {
        async.waterfall([
            function(callback) {
                models.ExcelImport.create({
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
                var path1 = "/home/vipin/Documents";
                var finalPath = path.join(path1, file.fileName);
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
        models.ExcelImport.findByPk(file.id)
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
    var defCount = 0;
    var empCount = 0;
    var dueCount = 0;
    var defAddCount = 0;
    var defEmailCount = 0;
    var defPhoneCount = 0;
    var actSheets = 0;
    var errorData = [];
    var errorReason = [];
    var importJSON;
    importJSON = require('./excelimport/feesImport.json');
    return new Promise((resolve, reject) => {
        const workbook = XLSX.read(data.data, {
            type: 'buffer'
        });
        let populatePromises = []
        var sheetsList = workbook.SheetNames;
        for (var index = 0; index < sheetsList.length; index++) {
            var curWorksheet = workbook.Sheets[sheetsList[index]];
            actSheets++;
            if (curWorksheet === null || curWorksheet['!ref'] === undefined || curWorksheet['!ref'] === null) {
            continue;
            }
            var curHeaders = get_header_row(curWorksheet);
            if(curHeaders.length !== importJSON.mapping.length) {
                console.error('Error uploading file in the database');
                reject("Excel header is not matching");
            }
            populatePromises.push(
            mapPopulateData(
                curHeaders,
                curWorksheet,
                importJSON
            ).catch((e) => {
                console.error('Error in populating sheets: ', e);
                return Promise.reject(e);
            })
            );
        }
        Promise.all(populatePromises)
            .then(() => {
                console.log("Returned from all the commits [" + populatePromises.length + " ]");
                const result = {
                    status: 'success',
                    message: "File Uploaded Successfully",
                    resultShort: 'success'
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

  const mapPopulateData = (sheetHeader, sheet, clientJSON) => {
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
            for(C = range.s.c; C <= range.e.c; ++C) {
                var cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })];
                returnVar = XLSX.utils.format_cell(cell);
                feesArray.push(returnVar);
            }
            // const uuid = feesArray[0];
            let student = {}
            student.rowNum = R;
            student.status = models.Student.STUDENT_STATUS_ACTIVE_VALUE;
            clientJSON.mapping.forEach((mapElement, index) => {
                let valueToStore = get_cell_value(sheet, sheetHeader[index]['colNum'], R)
                    student[mapElement.DBColumnName] = valueToStore;
            })

            let fees = student.Fees;
            if(!fees)  fees = {};
            fees.createdBy = 1;

            const fileType = 1;
            if(fileType === 1) {
                createFees(student).then(resultObj => {
                    console.log("SUccesfully createFees in database",resultObj);
                    resolve(resultObj);
                })
                .catch(errorObj => {
                    console.error("Error while creating fees", errorObj);
                    reject(errorObj);
                })
            }
        }
    })
  }

  function get_cell_value(sheet, colNum, rowNum) {
    var cell = sheet[XLSX.utils.encode_cell({ c: colNum, r: rowNum })];
    console.log("")
    var returnVar = '';
    if (cell && cell.t) {
      return returnVar = XLSX.utils.format_cell(cell);
    }
    return returnVar;
  }


  const createFees = (fees) => {
    return new Promise((resolve, reject) => {
        console.log("Fees", fees);
        const whereQuery = {
            aadharNo: fees.aadharNo
        }
        return studentService.getStudenByCondition(whereQuery).then(student => {
            return models.Fees.findFees(student.id).then(prevFees => {
                fees.StudentId = student .id
                const lastPaidFees = prevFees[prevFees.length - 1];
                console.log("Prev Fees", JSON.stringify(prevFees));
                if(prevFees.length > 0) {
                    console.log("prevFees.length > 0", prevFees.length > 0);
                    if (parseInt(lastPaidFees.balance) == 0) {
                        console.log("parseInt(lastPaidFees.balance) === 0.00", parseInt(lastPaidFees.balance) === 0.00);
                        const result = {
                            status: 'success',
                            message: "Student with aadhar: " + student.aadharNo + " have 0 Balance."
                        };
                        resolve(result)
                    } else if(parseInt(lastPaidFees.balance) < parseInt(fees.paidAmount)) {
                        const result = {
                            status: "success",
                            message: "Fees collected for student " + student.aadharNo + " is greater then previous balance"
                        }
                        resolve(result)
                    } else if(parseInt(fees.discount) !== 0 && parseInt(fees.discount) !== 'undefined') {
                        const feesDiscount = prevFees.filter(element => {
                            console.log("element.discount", element.discount);
                            console.log("typeof(element.discount)", typeof(element.discount));
                            return element.discount != 0;
                        })
                        if(feesDiscount.length > 0) {
                            const result = {
                                status: 'success',
                                message: "Discount can not be given more than once",
                            };
                            resolve(result)
                        } else {
                            return models.Fees.create(fees)
                            .then(createdFees => {
                                const result = {
                                    status: 'success',
                                    message: "Fees Created for student with id: " +  student.aadharNo
                                }
                                resolve(result)
                            })
                            .catch(error => {
                                console.error("Error creating fees", error);
                                const result = {
                                    status: 'failure',
                                    message: "Error creating fees"
                                }
                                reject(result)
                            })
                        }
                    } else {
                        return models.Fees.create(fees)
                        .then(createdFees => {
                            const result = {
                                status: 'success',
                                message: "Fees Created for student with id: " +  student.aadharNo
                            }
                            resolve(result)
                        })
                        .catch(error => {
                            console.error("Error creating fees", error);
                            const result = {
                                status: 'failure',
                                message: "Error creating fees"
                            }
                            reject(result)
                        })
                    }
                } else {
                    return models.Fees.create(fees)
                    .then(createdFees => {
                        const result = {
                            status: 'success',
                            message: "Fees Created for student with id: " +  student.aadharNo
                        }
                        resolve(result)
                    })
                    .catch(error => {
                        console.error("Error creating fees", error);
                        const result = {
                            status: 'failure',
                            message: "Error creating fees"
                        }
                        reject(result)
                    })
                }
            })
            .catch(error => {
                console.error("Error while geeting fees", error);
                reject(error)
            })
        })
    })
  }

module.exports = {
    SaveFileDetailsInDB: SaveFileDetailsInDB,
    importExceldata: importExceldata,
    saveExcelDataInDB: saveExcelDataInDB
}
