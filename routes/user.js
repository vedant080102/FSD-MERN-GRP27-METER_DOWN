const express= require("express")
const router=express.Router()
const {registerUser,loginUser,currentUser, logoutUser, notificationsSubscribe}=require("../controllers/user")
const { checkToken } = require("../middleware/auth")

router.post("/login",loginUser)
router.post("/register",registerUser)
router.get("/user",checkToken,currentUser)
router.get("/logout",logoutUser)
router.post("/subscribeUser",checkToken,notificationsSubscribe)

module.exports=router