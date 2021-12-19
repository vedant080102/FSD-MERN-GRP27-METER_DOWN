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
    console.log(drivers)
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
    // driversList= await Driver.find({busy:false}).lean()
    // drivers=[...driversList]
    // console.log(typeof(drivers))
    
    // drivers.forEach((driver,index) => {
    //    drivers[index].distance=geolib.getDistance(driver.location, {
    //         latitude: source.lat,
    //         longitude: source.lng,
    //     })
    // });
    // drivers=drivers.sort(function(a, b){return a.distance-b.distance});
    start=Date.now()
    drivers=await getDrivers(blackList,source)
    end=Date.now()
    console.log("Query time",(end-start)*1000)
    // console.log("total",drivers)
    // io.sockets.to(String(drivers[0]._id)).emit("ride",{"data":"data1"})
    // blackList.push(drivers[1])
    // c = drivers.filter( ( el ) => !blackList.includes( el ) );
    // c = drivers.filter( x => !blackList.filter( y => String(y._id) == String(x._id)).length);
    // console.log("filtered",c);
    await sleep(15*1000)
      var driverIndex=0
      while(driverIndex<drivers.length){

         await  Driver.updateOne({_id:drivers[driverIndex]._id},{busy:true})
        io.socketsLeave(String(fare._id));
        io.in(String(drivers[driverIndex]._id)).socketsJoin(String(fare._id));
        io.sockets.to(String(fare._id)).emit("ride",{
            "driverId":String(drivers[driverIndex]._id),
            "fareId":String(fare._id),
            "timestamp":Date.now()
        })
        console.log("driverindex"+String(drivers[driverIndex]._id),Date.now())
        var waitCount=0
        var allotted=0
        while (waitCount<=10){
            console.log(waitCount)
            await sleep(5*1000)
            checkAccepted=await Fare.findOne({_id:fare._id}).lean()
            console.log(checkAccepted._id,String(checkAccepted._id))
            if(String(checkAccepted.driver)==String(drivers[driverIndex]._id)){
                allotted=1
                console.log("allotted!")
                await Fare.updateOne({_id:fare._id},{allotted:true})
                break
            }
            waitCount=waitCount+1
        }
        if(allotted==1){
            break
        }

        blackList.push(drivers[driverIndex])
        await  Driver.updateOne({_id:drivers[driverIndex]._id},{busy:false})
        // driverIndex=driverIndex+1
        driverIndex=0
        drivers=await getDrivers(blackList,source)

        if(drivers.length==0){
            break
        }
      }
      console.log("function end")
    // console.log(drivers)
    // res.send(drivers)
//     const seprateThread = new Worker(__dirname + "/fareAlloter.js");
//     faredata=JSON.stringify({"fareid":fare._id,"source":source})
//     // console.log("pas",faredata)
//   seprateThread.postMessage({"source":"abcaslk"});

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
