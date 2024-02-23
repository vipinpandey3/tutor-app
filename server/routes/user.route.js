const express = require('express');
const router = express();
const {fetchAllStandards} = require('../controllers/user.controller')


/**
 * GET /api/user/fetchAllStandards
 * */ 
router.post('/fetchAllStandards', (req, res) => fetchAllStandards(req, res))


module.exports = router