const Passenger = require("../models/Passenger")
const User = require("../models/User")
const Fare = require("../models/Fare")
const Address=require("../models/Address")
const Driver=require("../models/Driver")
const geolib = require('geolib');
const io = require("../config/socket")
const FarePrice=require("../models/FarePrice")
const Completedfares = require("../models/Completedfares")
const Review = require("../models/Review")
const Chat=require("../models/Chat")
const axios = require('axios');
const sleep = (delay) => new Promise (( resolve) =>setTimeout (resolve, delay))
const webpush = require('web-push')
const Subsciption = require("../models/Subsciption");
const farePrice = require('../fareprices.json');

// console.log("fareprice len:", farePrice.length);
const getDrivers=async(blackList,source,vehicleType)=>{
    driversList= await Driver.find({busy:false,vehicleType:vehicleType}).lean()
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
    var vehicleType=req.body.vehicleType
    drivers=await getDrivers(blackList,source,vehicleType)
    var allotted=0
      var driverIndex=0
      rejectcount=0
      while(driverIndex<drivers.length &&rejectcount<10){
        console.log("Driver index:",drivers[driverIndex]._id)
         await  Driver.updateOne({_id:drivers[driverIndex]._id},{busy:true,ongoingFare:fare._id})
        io.socketsLeave(String(fare._id));
        io.in(String(drivers[driverIndex]._id)).socketsJoin(String(fare._id));
        console.log(io.sockets.adapter.rooms)
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
                var otp= Math.floor(1000 + Math.random() * 9000);
                console.log("allotted!")
                await Fare.updateOne({_id:fare._id},{allotted:true,otp:otp})
                await Passenger.updateOne({_id:req.userId,ongoingRide:fare._id})
                io.sockets.to(String(req.userId)).emit("allottedPassenger",{
                    "status":"success",
                    "fareid":fare._id,
                    "message":`Ride booked successfully! Your ${drivers[driverIndex].vehicleType} with registration no: ${drivers[driverIndex].vehicleNumber} will be at your location shortly`,
                })
                var subscription=await Subsciption.findOne({user:req.userId}).lean()
                var payload = JSON.stringify({
                    title: 'Ride booked successfully!',
                    body: `Your ${drivers[driverIndex].vehicleType} with registration no: ${drivers[driverIndex].vehicleNumber} will be at your location shortly. Your OTP for your ride is:${otp}`,
                  })
                
                  webpush.sendNotification(subscription, payload)
                    .then(result => console.log(result))
                    .catch(e => console.log(e.stack))


                io.sockets.to(String(drivers[driverIndex]._id)).emit("allottedDriver",{
                    "status":"success",
                    "fareid":fare._id,
                    "message":`Ride booked successfully! `,
                })
                var subscription2=await Subsciption.findOne({user:drivers[driverIndex]._id}).lean()
                var payload = JSON.stringify({
                    title: 'Ride booked successfully!',
                    body: `Your passenger is waiting at the pickup location`,
                  })
                
                  webpush.sendNotification(subscription2, payload)
                    .then(result => console.log(result))
                    .catch(e => console.log(e.stack))


                io.in(String(req.userId)).socketsJoin(String(fare._id));
                us=await User.findOne({_id:req.userId})
               
               await sendOTP(`Ride booked successfully! Your ${drivers[driverIndex].vehicleType} with registration no: ${drivers[driverIndex].vehicleNumber} will be at your location shortly. Your OTP for your ride is:${otp}`,"+91"+String(us.phone))
                break
            }
            waitCount=waitCount+1
        }
        if(allotted==1){
            break
        }

        blackList.push(drivers[driverIndex])
        await  Driver.updateOne({_id:drivers[driverIndex]._id},{busy:false,ongoingFare:null})
        rejectcount+=1
        driverIndex=0
        drivers=await getDrivers(blackList,source,vehicleType)

        if(drivers.length==0){
            break
        }
      }
      if(allotted==0){
        io.sockets.to(String(req.userId)).emit("allotted",{
            "status":"failure",
            "message":`Unfortunately no rides available currently :( . Try again later`,
        })
        io.socketsLeave(String(fare._id));

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

const getPriceEstimate=async(req,res)=>{
    // fareData=await FarePrice.findOne({distance:req.query.distance,vehicleType:req.query.type})

    console.log("requi", req.query.distance, req.query.type)
    fareData = farePrice.filter((fare)=> (fare.distance == Number(req.query.distance)) && fare.vehicleType == req.query.type)
    console.log("fare data:", fareData);
    price=0
    if(req.query.time=="day"){
        price=fareData[0].dayPrice
    }else{
        price=fareData[0].nightPrice

    }
    res.send({
        "price":price
    })
}

const getPastRides=async(req,res)=>{
    passenger=await Passenger.findOne({_id:req.userId}).populate({path:"prevRides",populate:{"path":"fareData",populate:"source destination driver"}})
    res.send(passenger.prevRides)
}

const giveReview=async(req,res)=>{
    review=await Review.create({
        "star":req.body.star,
        "comment":req.body.comment,
        "ride":req.body.rideId
    })
    completedid=await Completedfares.findOneAndUpdate({fareData:req.body.rideId},{review:review._id},{new:true})
    console.log("compled",completedid)
   ride =await Fare.findOne({_id:req.body.rideId})
   console.log("ride",ride)
    await Driver.findOneAndUpdate({_id:ride.driver},{$push:{
        reviews:completedid._id
    }})
    res.send({
        "msg":"Review recorded successfully"
    })
}

const getChats=async(req,res)=>{
    chats=await Chat.find({fare:req.params.fare}).lean()
    chats.forEach((chat,index)=>{
        if(String(chat._id)==req.userId){
            chat[index].origin=0
        }else{
            chat[index].origin=1

        }
    })
    chats=chats.sort(function(x, y){
        return x.timestamp - y.timestamp;
    })
    res.send(chats)
}
// const createPrices=async(req,res)=>{
    
//     dr=[]
//     dist=0.1
//     dp=25
//     np=32
//     for(i=0;i<1000;i++){
//         dr.push({
//             "vehicleType":"Taxi",
//             "dayPrice":dp,
//             "nightPrice":np,
//             "distance":Math.round((dist+(0.1*i)) * 10) / 10
//         })
//         if((Math.round((dist+(0.1*i)) * 10) / 10)>1.4){
//             dp=dp+2
//             np=np+2
//         }
//     }
//     da=await FarePrice.insertMany(dr)
    
//     res.send({est:(21/1.5)*22.2,lst:da})
// }

// console.log(io.sockets.adapter.rooms)
const test=async(req,res)=>{
    try {
        const response = await axios.post('https://dummy-sms.herokuapp.com/sender/sendMessage',{...req.body});
        console.log(response);
        res.send(response.data)
      } catch (error) {
        console.error(error);
        res.send("error")
      }
    // const data = await response.json();
    // res.send(data)
}
async function sendOTP(msg,phone) {
    try {
        const response = await axios.post('https://dummy-sms.herokuapp.com/sender/sendMessage',{
            "senderName":"MeterDown",
            "message":msg,
            "recieverPhone":phone
        });
        console.log(response.data);
       
      } catch (error) {
        console.error(error);
        // res.send("error")
      }
}


module.exports={
    bookRide,
    getOneRideData,
    getPriceEstimate,
    getPastRides,
    giveReview,
    getChats,
    test
}
