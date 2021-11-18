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
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Passenger'
    }
})

module.exports=mongoose.model("Review",reviewSchema)