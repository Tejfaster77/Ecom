const { body } = require('express-validator')
const { USER } = require("./validate")
const User = require('../models/User')

const isEmailAvailable = email => {
    return User.findOne({ email }).then((user) => {
        if (user) {
            return Promise.reject("Email already taken")
        }
    })
}

const signUpValidate = (req, res, next) => {
    const signUp = [
        body('name', USER.NAME.MESSAGE).isLength({
            min: USER.NAME.LENGTH
        }),

        body('email', USER.EMAIL.MESSAGE)
            .isEmail()
            .bail()
            .custom(isEmailAvailable),

        body('password', USER.PASSWORD.MESSAGE).isLength({
            min: USER.PASSWORD.LENGTH
        }),

        body('phone', USER.PHONE.MESSAGE).isLength({
            min: USER.PHONE.LENGTH_MIN,
            max: USER.PHONE.LENGTH_MAX
        })
    ]
    return signUp ? next() : res.send({ status: false });
}

const signInValidate = (req,res,next) => {
    const signIn = [
        body('email', USER.EMAIL.MESSAGE)
            .isEmail(),
        body('password', USER.PASSWORD.MESSAGE).isLength({
            min: USER.PASSWORD.LENGTH
        })
    ]
    return signIn ? next() : res.send({ status: false })
}

module.exports = {
    signUpValidate,
    signInValidate
}