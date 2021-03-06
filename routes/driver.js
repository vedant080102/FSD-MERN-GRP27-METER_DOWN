const express= require("express")
const router=express.Router()

const {getDriverData, updateDriverInfo, markBusy, updateLocation, markStartRide, markRideComplete, getChats, getBusyStatus, getOneRideData}=require("../controllers/driver")
const { isDriver, checkToken } = require("../middleware/auth")
const { upload } = require("../middleware/multer")

// router.post("/updateDriverInfo",checkToken,isDriver,updateDriverInfo)
router.get("/getonedriverdata",checkToken,isDriver,getDriverData)
router.post("/updateDriverInfo",checkToken,isDriver,upload.fields([{ name: 'permit'}, { name: 'liscence' },{ name: 'registration'},{ name: 'driverPhoto', maxCount: 1 },{ name: 'carPhoto', maxCount: 10 }]),updateDriverInfo)
router.put("/markBusy",checkToken,isDriver,markBusy)
router.put("/updateLocation",checkToken,isDriver,updateLocation)
router.put("/startRide",checkToken,isDriver,markStartRide)
router.post("/rideComplete",checkToken,isDriver,markRideComplete)
router.get("/rideChat/:fare",checkToken,getChats)
router.get("/getDriverStatus",checkToken,isDriver,getBusyStatus)
router.get("/getOneRide/:rideId",checkToken,getOneRideData)

module.exports=router