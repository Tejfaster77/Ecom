const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema(
    {   
        amount:{
            type:String
        },
        description:{
            type:String
        }        
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("PAYMENT", PaymentSchema)