const express= require("express")
const { getAllPassengers, getAllDrivers, approveDriver, getOnePassenger, getOneDriver } = require("../controllers/admin")
const router=express.Router()

router.get("/allPassengers",getAllPassengers)
router.get("/allDrivers",getAllDrivers)
router.put("/approveDriver",approveDriver)
router.get("/getOnePassenger/:id",getOnePassenger)
router.get("/getOneDriver/:id",getOneDriver)



module.exports=router