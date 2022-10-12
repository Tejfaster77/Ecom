const mongoose = require('mongoose');
const { ENUM_USER } = require("../constant/user")

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        phone: {
            type: String,
            require: true,
            unique: true
        },
        usertype: {
            type: String,
            enum: ENUM_USER,
            default: ENUM_USER[0]
        },
        password: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("USER", UserSchema)