const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const helmet = require("helmet")
const cookieParser = require('cookie-parser')

const app = express()
app.use(cookieParser())
dotenv.config()
app.use(helmet())
app.use(express.json())
app.use(morgan('tiny'))
require("../routes")(app)

module.exports = app

