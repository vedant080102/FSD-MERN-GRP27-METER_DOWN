const express= require("express")
const router=express.Router()
const {registerUser,loginUser,currentUser, logoutUser}=require("../controllers/user")
const { checkToken } = require("../middleware/auth")

router.post("/login",loginUser)
router.post("/register",registerUser)
router.get("/user",checkToken,currentUser)
router.get("/logout",logoutUser)

module.exports=router