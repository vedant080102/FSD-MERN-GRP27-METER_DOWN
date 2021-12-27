const Driver = require("../models/Driver")
const Fare = require("../models/Fare")
const Passenger = require("../models/Passenger")
const Completedfares = require("../models/Completedfares")
const User = require("../models/User")

const getAllPassengers=async(req,res)=>{
    passengers =await Passenger.find().populate("account")
    res.send(passengers)
}

const getAllDrivers=async(req,res)=>{
    drivers=await Driver.find().populate("account")
    res.send(drivers)
}

const approveDriver=async(req,res)=>{
    driver=await Driver.findOneAndUpdate({_id:req.body.driver},{approved:true},{new:true})
    res.send(driver)
}

const getOnePassenger=async(req,res)=>{
    passenger=await Passenger.findOne({_id:req.params.id}).populate("account address").populate({path:"prevRides",populate:{"path":"fareData",populate:{"path":"driver source destination"}}}).populate({path:"ongoingRide",populate:{"path":"source destination driver"}})
    res.send(passenger)
}

const getOneDriver=async(req,res)=>{
    driver=await Driver.findOne({_id:req.params.id}).populate("account reviews").populate({path:"ongoingFare",populate:{"path":"source destination passenger"}}).populate({path:"pastFares",populate:{"path":"fareData",populate:{"path":"passenger source destination"}}})
    res.send(driver)
}

const getAllRides=async(req,res)=>{
    fares=await Fare.find().populate("driver passenger source destination")
    res.send(fares)
}

const getAllCompletedFares=async(req,res)=>{
    completedFares=await Completedfares.find().populate({"path":"fareData",populate:{"path":"driver source destination passenger"}})
    res.send(completedFares)
}

const deleteUser=async(req,res)=>{
    user=await User.findOne({_id:req.body.user})
    if(user.type=="driver"){
        delUser= await Driver.deleteOne({_id:user.data})
    }else if(user.type=="passenger"){
        delUser= await Passenger.deleteOne({_id:user.data})

    }
    userDel= await User.deleteOne({_id:user._id})
    res.send(userDel)

}


const dataStats=async(req,res)=>{
    userCount=0
    driverCount=0
    passengerCount=0
    completedRidesCount=0
    ongoingRidesCount=0
    users= await User.find()
    rides=await Fare.find()
    ridesCount= rides.length
    
    users.forEach((item)=>{
        if(item.type=="driver"){
            driverCount+=1
        }else if(item.type=="passenger"){
            passengerCount+=1
        }
    })

    
    rides.forEach((item)=>{
        if(item.completed==true ){
            completedRidesCount+=1
        }else if(item.completed==false && item.alloted==true){
            ongoingRidesCount+=1
        }
    })
    usersCount=driverCount+passengerCount
    res.send({usersCount,driverCount,passengerCount,ridesCount,completedRidesCount,ongoingRidesCount})
}

module.exports={
    getAllDrivers,
    getAllPassengers,
    approveDriver,
    getOnePassenger,
    getOneDriver,
    getAllRides,
    getAllCompletedFares,
    deleteUser,
    dataStats
}