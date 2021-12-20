
const CompletedFare=require("../models/Completedfares")
const Driver = require("../models/Driver")
const Fare = require("../models/Fare")
const Passenger = require("../models/Passenger")
const User = require("../models/User")

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
    res.send(data)
}

const updateLocation=async(req,res)=>{
    data=await Driver.findOneAndUpdate({_id:req.userId},{location:req.body.location},{new:true})
    res.send(data)
}

const markStartRide=async(req,res)=>{
    driver=await Driver.findOne({_id:req.userId})
    data=await Fare.findOne({_id:driver.ongoingFare})
    if(req.body.passenger==String(data.passenger)){
        await Fare.findOneAndUpdate({_id:driver.ongoingFare},{rideStart:Date.now()})
        res.json({
            "msg":"Passenger picked up!"
        })
    }else{
        res.status(409).json({
            "msg":"Invalid Passenger Data!"
        })
    }
}

const markRideComplete=async(req,res)=>{
    driver=await Driver.findOne({_id:req.userId})
    data=await Fare.findOne({_id:driver.ongoingFare})
    if(req.body.passenger==String(data.passenger)){

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
        await Passenger.findOneAndUpdate({_id:req.body.passenger},{ongoingRide:null,$push:{
            pastFares:completedfare._id
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


module.exports={
    updateDriverInfo,
    getDriverData,
    markBusy,
    updateLocation,
    markStartRide,
    markRideComplete
}