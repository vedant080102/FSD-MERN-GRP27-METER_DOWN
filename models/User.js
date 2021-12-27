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
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    data:{
        type: mongoose.Schema.Types.ObjectId,
        default:null
    },
    otp:{
        type:Number
    }
    

})

const User= mongoose.model("User",userSchema)
module.exports=User