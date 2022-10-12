const mongoose = require("mongoose")
const { app } = require('./src/app')
// const mysql = require('mysql')

// const sql = mysql.createConnection({
//     host:""
// }) 

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("DB is connected successfull"))
    .catch(err => console.log(err.message))

app.listen(process.env.PORT, () => console.log("server is running at :", process.env.PORT))