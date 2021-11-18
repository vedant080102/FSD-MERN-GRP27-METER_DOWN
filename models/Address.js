const mongoose=require("mongoose")

const addressSchema=mongoose.Schema({
    lat:{
        type:Number,
        default:null
    },
    lng:{
        type:Number,
        default:null
    },
    address:{
        type:String,
        default:null
    }
})

module.exports=mongoose.model("Address",addressSchema)
