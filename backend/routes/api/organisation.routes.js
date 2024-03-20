const express = require('express');
const { createOrganisation, getOrg } = require('../../controllers/organization.controller');
const verifyAccessToken = require('../../utils/verifyToken');
const router = express.Router()

router.post('/create', verifyAccessToken, createOrganisation)
router.get('/get/:id', verifyAccessToken, getOrg)


module.exports = router;