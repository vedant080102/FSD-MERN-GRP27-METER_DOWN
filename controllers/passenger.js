const Passenger = require("../models/Passenger")
const User = require("../models/User")
const Fare = require("../models/Fare")
const Address=require("../models/Address")
const Driver=require("../models/Driver")
const geolib = require('geolib');
const { Worker } = require("worker_threads");
const io = require("../config/socket")
// console.log(global.io)
// io=require("../config/socket")
const sleep = (delay) => new Promise (( resolve) =>setTimeout (resolve, delay))

const getDrivers=async(blackList,source)=>{
    driversList= await Driver.find({busy:false}).lean()
    drivers=[...driversList]
        
    drivers.forEach((driver,index) => {
       drivers[index].distance=geolib.getDistance(driver.location, {
            latitude: source.lat,
            longitude: source.lng,
        })
    });
    drivers=drivers.sort(function(a, b){return a.distance-b.distance});
    if(blackList.length>0){
        drivers = drivers.filter( x => !blackList.filter( y => String(y._id) == String(x._id)).length);
    }
    // console.log(drivers)
    return drivers
}


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
    var blackList=[]
    
    drivers=await getDrivers(blackList,source)
    var allotted=0
      var driverIndex=0
      while(driverIndex<drivers.length){
        console.log("Driver index:",drivers[driverIndex]._id)
         await  Driver.updateOne({_id:drivers[driverIndex]._id},{busy:true,ongoingFare:fare._id})
        io.socketsLeave(String(fare._id));
        io.in(String(drivers[driverIndex]._id)).socketsJoin(String(fare._id));
        io.sockets.to(String(fare._id)).emit("ride",{
            "driverId":String(drivers[driverIndex]._id),
            "fareId":String(fare._id),
            "timestamp":Date.now()
        })
        
        var waitCount=0
        
        while (waitCount<=4){
            console.log(waitCount)
            await sleep(5*1000)
            checkAccepted=await Fare.findOne({_id:fare._id}).lean()
            
            if(String(checkAccepted.driver)==String(drivers[driverIndex]._id)){
                allotted=1
                console.log("allotted!")
                await Fare.updateOne({_id:fare._id},{allotted:true})
                await Passenger.updateOne({_id:req.userId,ongoingRide:fare._id})
                io.sockets.to(String(req.userId)).emit("allotted",{
                    "status":"success",
                    "message":`Ride booked successfully! Your ${drivers[driverIndex].vehicleType} with registration no: ${drivers[driverIndex].vehicleNumber} will be at your location shortly`,
                })
                break
            }
            waitCount=waitCount+1
        }
        if(allotted==1){
            break
        }

        blackList.push(drivers[driverIndex])
        await  Driver.updateOne({_id:drivers[driverIndex]._id},{busy:false,ongoingFare:null})
        
        driverIndex=0
        drivers=await getDrivers(blackList,source)

        if(drivers.length==0){
            break
        }
      }
      if(allotted==0){
        io.sockets.to(String(req.userId)).emit("allotted",{
            "status":"failure",
            "message":`Unfortunately no rides available currently :( . Try again later`,
        })
          await Fare.findOneAndRemove({_id:fare._id})
      }
      console.log("function end")


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



// console.log(io.sockets.adapter.rooms)
module.exports={
    bookRide,
    getOneRideData,
    
}
