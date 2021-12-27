const express= require("express")
const { getAllPassengers, getAllDrivers, approveDriver, getOnePassenger, getOneDriver, getAllRides, getAllCompletedFares } = require("../controllers/admin")
const router=express.Router()

router.get("/allPassengers",getAllPassengers)
router.get("/allDrivers",getAllDrivers)
router.put("/approveDriver",approveDriver)
router.get("/getOnePassenger/:id",getOnePassenger)
router.get("/getOneDriver/:id",getOneDriver)
router.get("/getAllFares",getAllRides)
router.get("/getAllCompletedFares",getAllCompletedFares)



module.exports=router