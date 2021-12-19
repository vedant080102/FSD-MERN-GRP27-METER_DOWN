const { parentPort,workerData } = require("worker_threads");

const geolib = require('geolib');
const Driver=require("../models/Driver")
io=require("../config/socket")
console.log("worker",io)

const getDriverData=async()=>{
  var drivers=await Driver.find()
    console.log("driver",drivers)
    return drivers
}

parentPort.on("message", (data) => {
    // await sleep(5000)
    console.log("driver start")
    console.log(io.sockets.adapter.rooms)
    // var drivers=await Driver.find()
    // console.log("driver",drivers)
    drdata=getDriverData()
    console.log("driver end")
    // console.log(data)
  });