const mongoose=require("mongoose")

const reviewSchema = mongoose.Schema({
    star:{
        type:Number,
        default:null
    },
    comment:{
        type:String,
        default:null
    },
     ride:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompletedFare'
    },
})

module.exports=mongoose.model("Review",reviewSchema)