const {saveExcelDataInDB} = require('../importService')
const models = require('../../models');
const fs = require('fs');

const Process = (job) => {
    if(job.data.type === "import") {
        return uploadExcel(job.data.data)
        .then(result => {
            return Promise.resolve(result)
        })
        .catch(error => {
            return Promise.reject(error)
        })
    }
};

const uploadExcel = (reqBody) => {
    return models.ExcelImport.findByPk(reqBody.file.id)
    .then(databaseFile => {
        let fileObj = fs.readFileSync(databaseFile.filePath);
        const objData = {data: fileObj, fileType: reqBody.filetype}
        return saveExcelDataInDB(objData)
            .then(result => {
                return Promise.resolve(result)
            })
            .catch(error => {
                console.log('Error occurred in childProcessService.importData', error);
                return Promise.reject(error)
            })
    })
    .catch(error => {
        console.log('Error while ExcelImport query', error)
        return error
    })
}

module.exports = {
    Process: Process
}