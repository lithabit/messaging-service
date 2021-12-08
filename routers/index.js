const router = require('express').Router()
const Controller = require('../controllers')

router.post('/single', Controller.sendEmail)
router.post('/multi', Controller.sendMultiEmail)

module.exports = router