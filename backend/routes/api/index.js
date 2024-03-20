const express = require('express');
const router = express.Router()
const authRouter = require("./auth.routes")
const organisationRouter = require("./organisation.routes");
const salesRouter = require("./sales.routes")

router.use('/auth', authRouter);
router.use('/organisation', organisationRouter)
router.use('/sales', salesRouter)

module.exports = router;