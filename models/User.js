const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    type:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        default:null
    },
    email:{
        type:String,
        default:null
    }
    

})

const User= mongoose.model("User",userSchema)
module.exports=User