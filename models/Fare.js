const mongoose=require("mongoose")

const fareSchema=mongoose.Schema({
    bookedAt:{
        type:Date,
        default:Date.now
    },
    driver:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver',
        default:null
    },
    passenger:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Passenger'
    },
    startsAt:{
        type:Date,
        default:Date.now
    },
    startType:{
        type:String,
        default:null
    },
    rideStart:{
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
    },
    otp:{
        type:Number,
        default:null
    }
})

module.exports=mongoose.model("Fare",fareSchema)