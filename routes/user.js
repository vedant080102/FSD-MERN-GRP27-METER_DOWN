const express= require("express")
const router=express.Router()
const {registerUser,loginUser,currentUser, logoutUser, notificationsSubscribe, verifyUser}=require("../controllers/user")
const { checkToken } = require("../middleware/auth")

router.post("/login",loginUser)
router.post("/register",registerUser)
router.get("/user",checkToken,currentUser)
router.get("/logout",logoutUser)
router.post("/subscribeUser",notificationsSubscribe)
router.post("/verifyUser",checkToken,verifyUser)

module.exports=router