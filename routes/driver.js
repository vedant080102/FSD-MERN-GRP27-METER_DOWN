const express= require("express")
const router=express.Router()

const {getDriverData, updateDriverInfo}=require("../controllers/driver")
const { isDriver, checkToken } = require("../middleware/auth")
const { upload } = require("../middleware/multer")

// router.post("/updateDriverInfo",checkToken,isDriver,updateDriverInfo)
router.get("/getonedriverdata",checkToken,isDriver,getDriverData)
router.post("/updateDriverInfo",checkToken,isDriver,upload.fields([{ name: 'permit'}, { name: 'liscence' },{ name: 'registration'},{ name: 'driverPhoto', maxCount: 1 },{ name: 'carPhoto', maxCount: 10 }]),updateDriverInfo)

module.exports=router