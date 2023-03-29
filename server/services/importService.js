const async = require('async');
const path = require('path');
const fs = require('fs')
const XLSX = require('xlsx');
const models = require('../models');
const fillerFunction = require('./excelimport/fillerFunction');
const studentService = require('./studentServices');

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
                var path1 = "/Users/vipinpandey/Documents/Personal";
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
    var importJSONFileName = getClientMapJSON(data.fileType);
    let importJSON = require(`./excelimport/${importJSONFileName}.json`);
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
                console.error(`Error uploading file in the database: curHeaders [${curHeaders.length}] and import JSON headers [${importJSON.mapping.length}]`);
                reject("Excel header is not matching");
            }
            populatePromises.push(
            mapPopulateData(
                curHeaders,
                curWorksheet,
                importJSON,
                data.fileType
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

function getClientMapJSON(fileTypeId) {
    console.log("fileTypeId **********", fileTypeId);
    let fileType = getFileType(fileTypeId);
    return fileType;
}
  
function getFileType(fileTypeId) {
    const mapType = {
        "1": "studentMap",
        "2": 'feesImport'
    }
    return mapType[fileTypeId]
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

  const mapPopulateData = (sheetHeader, sheet, clientJSON, fileType) => {
    return new Promise((resolve, reject) => {
        var range = XLSX.utils.decode_range(sheet['!ref']);
        var R;
        var C;
        var H;
        var defCreatePromises = [];
        let returnVar;
        for (R = range.s.r + 1; R <= range.e.r; ++R) {
            let feesArray = [];
            for(C = range.s.c; C <= range.e.c; ++C) {
                var cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })];
                returnVar = XLSX.utils.format_cell(cell);
                feesArray.push(returnVar);
            }
            let student = {}
            student.rowNum = R;
            student.status = models.Student.STUDENT_STATUS_ACTIVE_VALUE;
            clientJSON.mapping.forEach((mapElement, index) => {
                let valueToStore = get_cell_value(sheet, sheetHeader[index]['colNum'], R)
                if(mapElement.functionName !== "") {
                    fillerFunction[mapElement.functionName](student, valueToStore)
                } else {
                    if(mapElement.DBTableName === 'Student') {
                        student[mapElement.DBColumnName] = valueToStore
                    } else {
                        var otherValue = student[mapElement.DBTableName]
                        if(otherValue === undefined) otherValue = {};
                        otherValue[mapElement.DBColumnName] = valueToStore;
                        student[mapElement.DBTableName] = otherValue;
                    }
                }

                if(mapElement.DBColumnName === "aadharNo" && !student.aadharNo) {
                    const result = {};
                    result.message = "Student Aadhar not Found";
                    result.student = student;
                    result.reason = "Student Aadhar not Found";
                    return reject(result)
                };
            })
            defCreatePromises.push(student)
        }
        if(fileType === "2") {
            createFees(defCreatePromises).then(resultObj => {
                resolve(resultObj);
            })
            .catch(errorObj => {
                console.error("Error while creating fees", errorObj);
                reject(errorObj);
            })
        } else if(fileType === "1") {
            try {
                return addStudentInSerializedManner(defCreatePromises)
                .then(data => {
                    resolve(data)
                }).catch(error => {
                    console.log("Error error in addStudentInSerializedManner", error);
                    reject(error)
                })
            } catch (error) {
                console.log("addStudentInSerializedManner error", error);
                reject(error)
            }
        }
    })
  }

  function get_cell_value(sheet, colNum, rowNum) {
    var cell = sheet[XLSX.utils.encode_cell({ c: colNum, r: rowNum })];
    var returnVar = '';
    if (cell && cell.t) {
      return returnVar = XLSX.utils.format_cell(cell);
    }
    return returnVar;
  }

const createFees = (fees) => {
    return new Promise((resolve, reject) => {
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

const addStudentInSerializedManner = async(studentArray) => {
    // console.log('studentArray =======', JSON.stringify(studentArray))
    let result
    for (let index = 0; index < studentArray.length; index++) {
        result = await createStudentWithAllEntities(studentArray[index]);
    }
    return result
}

const createStudentWithAllEntities = async (student) => {
    const t = await models.sequelize.transaction();
    try {
        if(student.aadharNo === undefined || student.aadharNo === null || student.aadharNo === '' ) {
            result.status = 'Failure';
            result.message = 'Student Aadhar not found';
            result.student = student;
            reject(result)
        }
        if(student.Parents == {}) {
            result.status = 'Failure';
            result.message = 'Parents data not found';
            result.student = student;
            reject(result)
        }

        console.log("student student", student);
        const parent = await findParents(student, t);
        const createdParents = await createParent(parent, student, t)
        const foundStudent = await findStudent(student, t) 
        const createdStudents = await createStudents(createdParents, student, foundStudent, t);
        student = await bakeEducationDetails(student, createdStudents)
        const createdOrUpdatedEducation = await createStudentEudcationDetails(student.StudentEducationDetails, t)
        await t.commit();
    }
    catch(e) {
        console.log("Error =======>", e);
        await t.rollback();
    }
}

  const findParents = async(student, t) => {
    console.log("inside the student.findParents function");
    const whereCondition = {
        fatherAadhar: student.Parents.fatherAadhar,
        motherAadhar: student.Parents.motherAadhar,
    }
    const parent = await models.Parent.findParents(whereCondition, t)
    return parent;
  }

  const createParent = (parent, student, t) => {
    return new Promise((resolve, reject) => {
        if(parent && parent.length > 0) {
            return resolve(parent);
        };
        return models.Parent.createParents(student.Parents, t)
        .then(parent => {
            return resolve(parent);
        })
        .catch(error => {
            console.log("Error inside the createparents function", error);
            reject(error)
        })
    })
  }

  const findStudent = async(student, t) => {
    const where = {
        aadharNo: student.aadharNo
    };
    const foundStudent = await models.Student.findStudent(where, t)
    return foundStudent;
  }

  const createStudents = async(parents, student, foundStudent, t) => {
    if(foundStudent && foundStudent.length) {
        return foundStudent
    }
    student.ParentId = parents.id
    const studentObj = await models.Student.createStudents(student, t);
    return studentObj;
  }

  const bakeEducationDetails = (student, studentObj) => {
    return new Promise((resolve) => {
        let studentEudcation = student.StudentEducationDetails;
        studentEudcation['StudentId'] = studentObj.id
        student.StudentEducationDetails = studentEudcation;
        return resolve(student);
    })
  }

  const createStudentEudcationDetails = async(educationDetails, t) => {
    if(educationDetails.StudentId !== undefined && educationDetails.StudentId === "") {
        return "Student Id form education details not found";
    };
    const createdData = models.StudentEducationDetails.createDetails(educationDetails, t)
    return createdData;
  }

module.exports = {
    SaveFileDetailsInDB: SaveFileDetailsInDB,
    importExceldata: importExceldata,
    saveExcelDataInDB: saveExcelDataInDB
}
