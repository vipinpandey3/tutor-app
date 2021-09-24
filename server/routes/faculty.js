const express = require('express');
const fs = require('fs');
const Faculty = require('../controllers/faculty');
const FeexService = require('../services/feesServices');

const router = express.Router();

router.get('/searchFees/:searchParams', (req, res, next) => {
    console.log('Inside the searchfees route');
    console.log('res.bosy', req.params)
    const searchParams = req.params.searchParams;
    Faculty.getFeesDetailsBySearchParam(searchParams)
        .then(feesArray => {
            console.log('Feesarray with student Data', feesArray)
            const response = {
                resultShort: "success",
                resultLong: 'Successfully retrieved fees data for: ' + searchParams,
                feesArray: feesArray,
            }
            return res.status(200).json(response)
        })
        .catch(err => {
            const response = {
                resultShort: 'failure',
                resultLong: 'Failed to retrived any data'
            }

            return res.json(response);
        })
});

router.get('/downloadFeesReciept/:feesUUID', (req, res, next) => {
    console.log('inside downloadFeesReciept');
    const feesUUId = req.params.feesUUID;
    console.log('FeesUUId', feesUUId);
    FeexService.downloadFeesReciept(feesUUId)
        .then(result => {
            var file = fs.createReadStream(result);
            var stat = fs.statSync(result);

            res.setHeader('Content-Length', stat.size);
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
            file.pipe(res);
        })
        .catch(err => {
            res.status(200).json(err)
        })
})

module.exports = router