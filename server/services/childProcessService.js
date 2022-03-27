const importService = require('./importService');
const models = require('../models');
const fs = require('fs')

process.on('message', (reqBody) => {
    if(reqBody.type === 'upload') {
        process.send({msg: "Excel Upload started"});
        uploadExcel(reqBody.obj);
    }
})

const uploadExcel = (reqBody) => {
    console.log("Inside the Childprocess");
    models.ExcelImport.findByPk(reqBody.file.id)
    .then(databaseFile => {
        console.log("databaseFile.filePath", databaseFile.filePath);
        let fileObj = fs.readFileSync(databaseFile.filePath);
        importService.saveExcelDataInDB({data: fileObj})
            .then(result => {
                console.log("Result in side the childprocess service", result);
                if(result.status === 'success') {
                    process.send({msg: 'Success', result: "File uplaoded successfully"});
                } else if(result.status('Failrue')) {
                    process.send({ msg: 'failure', result: result.message ? `File not uploaded due to ${result.message}` : 'File not uploaded' });
                }
                console.log("Excel Upload Complete");
                process.exit(0);
                // return resolve(result)
            })
            .catch(error => {
                console.log('Error occurred in childProcessService.importData', err);
                process.send({msg: 'failure', result: (err && err.reason) ? err.reason : 'Error while uploading file'});
                process.exit(0);
                // return reject(error)
            })
    })
    // models.ExcelImport.findByPk(reqBody.file.id)
    // .then(file => {

    // })
}