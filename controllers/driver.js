
const CompletedFare=require("../models/Completedfares")
const Driver = require("../models/Driver")
const Fare = require("../models/Fare")
const Passenger = require("../models/Passenger")
const User = require("../models/User")
const Chat=require("../models/Chat")

const updateDriverInfo=async(req,res)=>{
    
    console.log(req.files)
    console.log(req.body)
    updateData={}
    if(req.files.permit!=undefined||req.files.permit!=null){updateData.permit="http://drive.google.com/uc?export=view&id="+req.files.permit[0].fileId}
    if(req.files.liscence!=undefined||req.files.liscence!=null){updateData.liscence="http://drive.google.com/uc?export=view&id="+req.files.liscence[0].fileId}
    if(req.files.registration!=undefined||req.files.registration!=null){updateData.registration="http://drive.google.com/uc?export=view&id="+req.files.registration[0].fileId}
    if(req.files.driverPhoto!=undefined||req.files.driverPhoto!=null){updateData.driverPhoto="http://drive.google.com/uc?export=view&id="+req.files.driverPhoto[0].fileId}
    if(req.files.carPhoto!=undefined||req.files.carPhoto!=null){updateData.carPhoto=[]
    req.files.carPhoto.forEach((i)=>{
        updateData.carPhoto.push("http://drive.google.com/uc?export=view&id="+i.fileId)
    })
    updateData.carPhotoLastUpdated=Date.now()
    }
    if(req.body.vehicleNumber!=undefined||req.body.vehicleNumber!=null){updateData.vehicleNumber=req.body.vehicleNumber}
    if(req.body.vehicleType!=undefined||req.body.vehicleType!=null){updateData.vehicleType=req.body.vehicleType}



    
    updatedDriver= await Driver.findOneAndUpdate({_id:req.userId},{
        ...updateData
    },{new:true})
    res.send(updatedDriver)

}

const getDriverData=async(req,res)=>{
   data=await User.findOne({_id:req.userId}).populate({ path: 'data', model: Driver })

   res.send({id:data._id,name:data.name,type:data.type,email:data.email,data:data.data})
}

const markBusy=async(req,res)=>{
    data=await Driver.findOneAndUpdate({_id:req.userId},{busy:req.body.busy},{new:true})
    res.send({busy:data.busy})
}

const updateLocation=async(req,res)=>{
    data=await Driver.findOneAndUpdate({_id:req.userId},{location:req.body.location},{new:true})
    res.send(data)
}

const markStartRide=async(req,res)=>{
    driver=await Driver.findOne({_id:req.userId})
    data=await Fare.findOne({_id:driver.ongoingFare})
    if(req.body.otp==String(data.otp)){
        await Fare.findOneAndUpdate({_id:driver.ongoingFare},{rideStart:Date.now()})
        res.json({
            "msg":"Passenger picked up!"
        })
        io.socketsLeave(String(data._id));

    }else{
        res.status(409).json({
            "msg":"Invalid Passenger Data!"
        })
    }
}

const markRideComplete=async(req,res)=>{
    driver=await Driver.findOne({_id:req.userId})
    data=await Fare.findOne({_id:driver.ongoingFare})
    if(true){

      fare= await Fare.findOneAndUpdate({_id:driver.ongoingFare},{completed:true},{new:true})
      var completedAt=Date.now()
      timeTaken=completedAt-fare.rideStart

       completedfare=await CompletedFare.create({
           fareData:fare._id,
           completedAt: completedAt,
           paidAmt:req.body.paidAmt,
           timeTaken:timeTaken

       })

        await Driver.findOneAndUpdate({_id:req.userId},{ongoingFare:null,busy:false,$push:{
            pastFares:completedfare._id
        }})
        await Passenger.findOneAndUpdate({_id:data.passenger},{ongoingRide:null,$push:{
            prevRides:completedfare._id
        }})
        res.json({
            "msg":"Fare completed"
        })
    }else{
        res.status(409).json({
            "msg":"Invalid Passenger Data!"
        })
    }
}

const getOneRideData=async(req,res)=>{
    var fareid = await Driver.findOne({_id:req.userId})
    var fare=await Fare.findOne({_id:fareid.ongoingFare,_id:req.params.rideId}).populate("source destination").populate({
        path:"passenger",
        populate:{"path":"account"}
    }).populate({
        path:"driver",
        populate:{"path":"account"}
    })
    res.send(fare)
}

const getChats=async(req,res)=>{
    chats=await Chat.find({fare:req.params.fare}).lean()
    console.log(chats)
    //0 self 1 other
    chats.forEach((chat,index)=>{
        if(String(chat.sender)==req.userId){
            chats[index].origin=0
        }else{
            chats[index].origin=1

        }
    })
    chats=chats.sort(function(x, y){
        return x.timestamp - y.timestamp;
    })
    res.send(chats)
}

const getBusyStatus=async(req,res)=>{
    driver=await Driver.findOne({_id:req.userId})
    res.send({"busy":driver.busy})
}


module.exports={
    updateDriverInfo,
    getDriverData,
    markBusy,
    updateLocation,
    markStartRide,
    markRideComplete,
    getChats,
    getBusyStatus,
    getOneRideData
}