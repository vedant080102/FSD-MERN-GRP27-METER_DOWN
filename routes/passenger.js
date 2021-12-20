const express= require("express")
const { bookRide, getOneRideData, getPriceEstimate, createPrices, getPastRides } = require("../controllers/passenger")
const router=express.Router()

const {  checkToken, isPassenger } = require("../middleware/auth")



router.post("/bookRide",checkToken,isPassenger,bookRide)
router.get("/getOneRide/:rideId",checkToken,isPassenger,getOneRideData)
router.get("/priceEstimate",getPriceEstimate)
router.get("/getPrevRides",checkToken,isPassenger,getPastRides)
// router.get("/createprice",createPrices)

module.exports=router