const express = require('express');
const router = express();
const {getStanndards} = require('../controllers/generic.controller')

router.get('/getStandards', (req, res) =>getStanndards(req, res))

module.exports = router