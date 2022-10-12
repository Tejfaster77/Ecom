const CryptoJS = require('crypto-js')

const enPass = password  => {
    return CryptoJS.AES.encrypt(password,process.env.PASS_SECRET_KEY).toString()
}

const dePass = password =>{
    return CryptoJS.AES.decrypt(password,process.env.PASS_SECRET_KEY).toString(CryptoJS.enc.Utf8)
}

module.exports = {
    enPass,
    dePass
}