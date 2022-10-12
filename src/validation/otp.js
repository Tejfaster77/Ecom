const { body } = require('express-validator')
const { USER } = require("./validate")
const User = require('../models/User')

const isPhoneAvailable = phone => {
    return User.findOne({ phone }).then((user) => {
        if (user) {
            return Promise.reject('Phone Number already taken')
        }
    })
}


const otpValidate = (req, res, next) => {
    const otp = [
        body('phone', USER.PHONE.MESSAGE).isLength({
            min: USER.PHONE.LENGTH_MIN,
            max: USER.PHONE.LENGTH_MAX
        }).custom(isPhoneAvailable)
    ]
    return otp ? next() : res.send({ status: false });
}

module.exports = {
    otpValidate
}