const Passenger = require("../models/Passenger")
const User = require("../models/User")
const Fare = require("../models/Fare")
const Address=require("../models/Address")

const bookRide=async(req,res)=>{
    rideData={...req.body}
    const source= await Address.create(rideData.source)
    const destination= await Address.create(rideData.destination)
    rideData.source=source._id
    rideData.destination=destination._id
    rideData.passenger=req.userId
    var fare=await Fare.create(rideData)
    console.log(fare)
    res.send(fare)
}
// populate("source destination passenger driver")
const getOneRideData=async(req,res)=>{
    var fare=await Fare.findOne({passenger:req.userId,_id:req.params.rideId}).populate("source destination").populate({
        path:"passenger",
        populate:{"path":"account"}
    }).populate({
        path:"driver",
        populate:{"path":"account"}
    })
    res.send(fare)
}



module.exports={
    bookRide,
    getOneRideData
}
