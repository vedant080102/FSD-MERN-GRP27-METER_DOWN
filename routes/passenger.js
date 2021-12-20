const express= require("express")
const { bookRide, getOneRideData, getPriceEstimate, createPrices } = require("../controllers/passenger")
const router=express.Router()

const {  checkToken, isPassenger } = require("../middleware/auth")



router.post("/bookRide",checkToken,isPassenger,bookRide)
router.get("/getOneRide/:rideId",checkToken,isPassenger,getOneRideData)
router.get("/priceEstimate",getPriceEstimate)
// router.get("/createprice",createPrices)

module.exports=router