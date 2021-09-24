const FileService = require('./fileServices');

class GenericAction {

    static generatePDF(outputPDF, htmlVar) {
        return new Promise((resolve, reject) => {
            try {
              var pdf = require('html-pdf');
              var options = {
                orientation: 'portrait',
                zoomFactor: '0.3',
                type: 'pdf',
                height: '14in',
                width: '10.5in',
                timeout: 60 * 1000
              };
              pdf.create(htmlVar, options).toFile(outputPDF, function(err, res) {
                if (err) {
                  console.error('error occurred in convertToPdf========', err);
                  return reject(err);
                }
                return resolve(outputPDF);
              });
            } catch (error) {
              console.error('error occurred in convertToPdf========', error);
              return reject(error);
            }
          });
    }

    static getHTMLFromFile(filepath) {
        console.log('Inside getHTMLFromFile function');
        let finalHtml;
        return FileService.readFileFromSource(filepath)
            .then(html => {
                finalHtml = html.toString();
                // return new Promise((resolve, reject) => {
                    return Promise.resolve(finalHtml);
                // })
            })
            .catch()
    }
}

module.exports = GenericAction;