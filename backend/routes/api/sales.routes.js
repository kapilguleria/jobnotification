const express = require('express');
const verifyAccessToken = require('../../utils/verifyToken');
const { getParsedData, getProjectUnderstanding, addSalesRSS, getSalesRSSTitles, getFeedUpdates } = require('../../controllers/sales.controller');
const router = express.Router()

router.get('/get', verifyAccessToken, getParsedData)
router.post('/projectUnderstanding', verifyAccessToken, getProjectUnderstanding)
router.post('/create/rss', verifyAccessToken, addSalesRSS)
router.get('/get/rss', verifyAccessToken, getSalesRSSTitles)
router.get('/get/count/rss', verifyAccessToken, getFeedUpdates)


module.exports = router;