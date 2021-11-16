const mongoose=require("mongoose")

const passengerSchema=mongoose.Schema({
    address:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Address',
            default:null
        }
    ],
    prevRides:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CompletedFare',
            default:null
        }
    ],
    upcomingRides:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Fare',
            default:null
        }
    ],
    ongoingRide:{
        type: mongoose.Schema.Types.ObjectId,
            ref: 'Fare',
            default:null
    },
    account:{
        type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
    }
})

module.exports=mongoose.model("Passenger",passengerSchema)