const mongoose=require("mongoose")

const farePriceSchema=mongoose.Schema({
    vehicleType:{
        type:String
    },
    dayPrice:{
        type:Number

    },
    nightPrice:{
        type:Number

    },
    distance:{
        type:Number

    }
})

module.exports=mongoose.model("FarePrice",farePriceSchema)
