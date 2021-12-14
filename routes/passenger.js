const express= require("express")
const { bookRide } = require("../controllers/passenger")
const router=express.Router()

const {  checkToken, isPassenger } = require("../middleware/auth")



router.post("/bookRide",checkToken,isPassenger,bookRide)

module.exports=router