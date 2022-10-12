const User = require("../models/User")
const { options } = require("../utils/cookies")
const { enPass, dePass } = require("../utils/en_de_cryptpassword")
const { refreshToken } = require("../utils/token")

const profilepic = (req, res) => {
    try {
        return res.send(req.file)
    } catch (err) {
        return res.status(400).send({ status: false, message: err.message })
    }
}

//Register API URL 3000/api/auth/signup
const signUp = async (req, res) => {
    try {
        let user = new User(req.body)
        user.password = enPass(user.password)
        console.log(user)
        const savedUser = await user.save()
        return res.status(201).json({ status: true, message: "User Created", details: savedUser })

    } catch (err) {
        return res.status(403).send({ status: false, message: err.message })
    }
}

//Login API URL 3000/api/auth/signin
const signIn = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(422).json({ status: false, message: "Invalid email" })

        }
        const hashedPassword = dePass(user.password)
        if (hashedPassword !== req.body.password) {
            return res.status(401).json({ status: false, message: "Invalid Password" })
        } else {
            const token = refreshToken([user.id, user.usertype, user.name])
            const { password, ...users } = user._doc
            return res.status(200).cookie('token', token, options).json({
                success: true,
                users,
                token,
            })
        }
    } catch (err) {
        return res.status(422).send({ status: false, message: err.message })
    }
}

module.exports = {
    signUp,
    signIn,
    profilepic
}