const router = require("express").Router()
const { signUp, signIn,profilepic } = require("../controller/auth")
const { signUpValidate, signInValidate} = require("../validation/auth")
const multer = require('multer')
const upload = multer({dest:'uploads/'})


router.post('/signup',signUpValidate,signUp)
router.post('/signin',signInValidate,signIn)
router.post('/profilepic',upload.single('profile'),profilepic)


module.exports = router