const mongoose=require("mongoose")

const fareSchema=mongoose.Schema({
    bookedAt:{
        type:Date,
        default:Date.now
    },
    driver:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver'
    },
    passenger:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Passenger'
    },
    startsAt:{
        type:Date,
        default:null
    },
    endsAt:{
        type:Date,
        default:null
    },
    source:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    },
    destination:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    },
    distanceEstimate:{
        type:Number,
        default:null
    },
    fareEstimate:{
        type:Number,
        default:null
    },
    timeEstimate:{
        type:Number,
        default:null
    },
    time:{
        type:String,
        enum:["day","night"]
    },
    allotted:{
        type:Boolean,
        default:false
    },
    completed:{
        type:Boolean,
        default:false
    }
})

module.exports=mongoose.model("Fare",fareSchema)