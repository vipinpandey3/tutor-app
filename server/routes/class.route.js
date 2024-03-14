const express = require('express');
const router = express();
const {createRemarks} = require('../controllers/class.controller')

router.post('/createRemarks', (req, res) =>createRemarks(req, res))

module.exports = router