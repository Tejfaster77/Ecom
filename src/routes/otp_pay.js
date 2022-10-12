const router = require("express").Router()
const { sendOTP,verifyOTP,payment } = require('../controller/otp_pay')
const {otpValidate} = require("../validation/otp")

router.post("/send",otpValidate,sendOTP)
router.get('/verify',verifyOTP)
router.post('/pay',payment)

module.exports = router