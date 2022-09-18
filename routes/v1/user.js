const express = require("express")
const router = express.Router()
const { getAllUsers, getUser, sendSms } = require('../../controllers/user.js')

router.post('/sms', sendSms)
router.get('/:userId', getUser)
router.get('/', getAllUsers)


module.exports = router