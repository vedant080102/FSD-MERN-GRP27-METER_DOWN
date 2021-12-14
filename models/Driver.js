const mongoose=require("mongoose")

const driverSchema=mongoose.Schema({
    permit:{
        type:String,
        // required:true
        default:null
    },
    liscence:{
        type:String,
        // required:true
        default:null
    },
    registration:{
        type:String,
        // required:true
        default:null
    },
    driverPhoto:{
        type:String,
        // required:true
        default:null
    },
    vehicleNumber:{
        type:String,
        // required:true
        default:null
    },
    vehicleType:{
        type:String,
        // required:true
        default:null
    },
    carPhoto:[
        {
            type:String,
            // required:true,
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
        // required:true
    },
    ongoingFare:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fare',
        default:null
    },
    pastFares:[
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CompletedFare',
            default:null
        }
    ],
    futureFares:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Fare',
            default:null
        }
    ],
    reviews:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review',
            default:null
        }
    ],
    approved:{
        type:Boolean,
        default:false
    },
    account:{
        type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default:null
    },
    location:{
        lat:{
            type:Number
        },
        lng:{
            type:Number
        }
    }
})

module.exports=mongoose.model("Driver",driverSchema)