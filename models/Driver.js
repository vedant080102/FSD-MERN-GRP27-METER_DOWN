const mongoose=require("mongoose")

const driverSchema=mongoose.Schema({
    permit:{
        type:String,
        required:true
    },
    liscence:{
        type:String,
        required:true
    },
    registration:{
        type:String,
        required:true
    },
    driverPhoto:{
        type:String,
        required:true
    },
    vehicleNumber:{
        type:String,
        required:true
    },
    vehicleType:{
        type:String,
        required:true
    },
    carPhoto:[
        {
            type:String,
            required:true,
            default:null
        }
    ],
    carPhotoLastUpdated:{
        type:Date,
        default:null
    },
    busy:{
        type:Boolean,
        default:false,
        required:true
    },
    ongoingFare:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fare'
    },
    pastFares:[
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CompletedFare'
        }
    ],
    futureFares:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Fare'
        }
    ],
    reviews:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    approved:{
        type:Boolean,
        default:false
    },
    account:{
        type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
    }
})

module.exports=mongoose.model("Driver",driverSchema)