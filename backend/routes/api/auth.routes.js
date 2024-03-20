const express = require('express');
const { registerUser, verifyOtp, resendOtp, signIn } = require('../../controllers/auth.controller');
const router = express.Router()

router.post('/register', registerUser)
router.post('/verifyOtp', verifyOtp)
router.post('/resendOtp', resendOtp)
router.post('/signIn', signIn)


module.exports = router;