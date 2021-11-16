const mongoose=require("mongoose")

const completedFareSchema=mongoose.Schema({
    fareData:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fare'
    },
    completedAt:{
        type:Date,
        default:Date.now
    },
    distance:{
        type:Number,
        default:null
    },
    paidAmt:{
        type:Number,
        default:null
    },
    paymentMethod:{
        type:String,
        default:null
    },
    review:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    },
    timeTaken:{
        type:Number,
        default:null
    }
})

module.exports=mongoose.model("CompletedFare",completedFareSchema)
