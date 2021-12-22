const mongoose=require("mongoose")

const chatSchema = mongoose.Schema({
    sender:{
        type:String
    },
    fare:{
        type:String
    },
    timestamp:{
        type:Date,
        default:Date.now
    },
    message:{
        type:String
    }
})

module.exports=mongoose.model("Chat",chatSchema)
