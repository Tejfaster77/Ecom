const auth = require('./auth');
const otp = require('./otp_pay')

const routes = app => {
    app.use("/api/auth",auth)
    app.use(`/api/otp`,otp)
    app.use("/",(req,res) => {
        res.send('<h1>Hello From Node</h1>')
    })
}

module.exports = routes