
const bcrypt = require("bcryptjs")
const User = require("../models/User")
const passport = require("passport")
const utils = require("../utils/auth")
const Driver = require("../models/Driver")
const Passenger = require("../models/Passenger")
const Subscription = require("../models/Subsciption")
const webpush = require('web-push')
const axios = require('axios');


const ensureAuthenticated=(req,res,next)=>{

    passport.authenticate('jwt', {session: false}, (err, user, info)=>{
       
        if(info){return res.status(403).json({auth:false}) }

        if (err) { return res.status(500).json(err)}

        if (!user) {return res.status(403).json({auth:false})}
      
                
        res.status(200).json({auth:true})
        
    })(req, res, next);

   
}


const loginUser=(req,res,next)=>{
    User.findOne({ phone: req.body.phone })
    .then((user) => {
        console.log(user)

        if (!user) {
           res.status(401).json({ success: false, msg: "No such user found!" });
        }
        
        // Function defined at bottom of app.js
       
        bcrypt.compare(req.body.password,user.password,(err,isMatch)=>{
            if(err) throw err
    
            if(isMatch){
                const tokenObject = utils.issueJWT(user);
                res.status(202).cookie('jwt',tokenObject.token,{ expires: new Date(Date.now() + tokenObject.expires), httpOnly: true,signed:true }).json({ success: true, msg: "Successfully logged in", user: user})

                // res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires });
            }else{
                res.status(401).json({ success: false, msg: "You entered the wrong password" });
            }
        })
        
       

    })
    .catch((error) => {
        res.status(500).json({msg:error.message,userData:{}})

    });
}

const registerUser=(req,res,next)=>{
    const{name,phone,password,email,type}=(req.body)
        

        User.findOne({phone:phone})
        .then(user=>{
            if(user){
                
               return res.status(409).json({
                msg:"User already exists, try logging in with that account!",
                    
                })
            }else{
                var otp= Math.floor(1000 + Math.random() * 9000);

                const newUser=new User({
                    name,phone,password,email,type,otp
                })
                //Hash password
                bcrypt.genSalt(10,(err,salt)=>
                    bcrypt.hash(newUser.password,salt,async(err,hash)=>{
                        if(err)return res.status(500).json({msg:"there was an error",userData:{}})
                        newUser.password=hash


                        try {
                            
                            dataid=null
                            if(newUser.type=="passenger"){
                                console.log(newUser.type)
                                const newPassenger=new Passenger({_id:newUser._id,account:newUser._id})
                                await newPassenger.save()
                            }
                           else if(newUser.type=="driver"){
                                console.log(newUser.type)
                                const newDriver=new Driver({_id:newUser._id,account:newUser._id})
                                await newDriver.save()
                            }
                            newUser.data=newUser._id
                            user=await newUser.save()
                            sendOTP(`Your OTP to verify your MeterDown account is:${otp}`,"+91"+String(newUser.phone))
                          return  res.status(200).json({msg:"Successfully registered",userData:user})
                        } catch (error) {
                            console.log(error)
                            res.status(500).json({msg:error.message,userData:{}})
                            
                        }
                        
                        
                }))

            }
        })
    


}

const logoutUser=async(req,res,next)=>{
   push= await Subscription.findOneAndDelete({user:req.userId})
    console.log("",push)
    res.status(200).clearCookie("jwt").json({msg:"userLoggedOut",userData:{}})
}

const currentUser=(req,res,next)=>{
    passport.authenticate('jwt', {session: false}, (err, user, info)=>{
       
        if (err) { return res.status(500).json({msg:"there was an error: "+err,userData:{}})}

        if (!user) {return res.status(404).json({msg:"no user logged in",userData:{}}) }
      
        req.user = user;
        userData={
        name:user.name,
        email:user.email,
        phone:user.phone,
        type:user.type
        
        }
        
        res.status(200).json({msg:"user found",userData})
        
    })(req, res, next);
   

}

const notificationsSubscribe=async (req, res) => {
    const subscription = req.body
  
    console.log(subscription)
   await Subscription.create({
       "endpoint":subscription.endpoint,
       "keys":subscription.keys,
       "user":req.userId
   })
    const payload = JSON.stringify({
      title: 'Hello!',
      body: 'You have logged in! 🎉',
      data:{"type":"home"}
    })
  
    webpush.sendNotification(subscription, payload)
      .then(result => console.log(result))
      .catch(e => console.log(e.stack))
  
    res.status(200).json({'success': true})
  }

const unsubscribe=async(req,res)=>{
   push= await Subscription.deleteOne({user:req.userId})
   res.send(push)
  }

const verifyUser=async(req,res)=>{
    user=await User.findOne({_id:req.userId})
    if(String(user.otp)==String(req.body.otp)){
        await User.findOneAndUpdate({_id:req.userId},{isVerified:true})
        return res.send({msg:"User verified successfully!"})
    }else{
        return res.send({msg:"Invalid otp"})
    }

}

async function sendOTP(msg,phone) {
    try {
        const response = await axios.post('https://dummy-sms.herokuapp.com/sender/sendMessage',{
            "senderName":"MeterDown",
            "message":msg,
            "recieverPhone":phone
        });
        console.log(response.data);
       
      } catch (error) {
        console.error(error);
        // res.send("error")
      }
}

module.exports={
    loginUser,
    registerUser,
    ensureAuthenticated,
    logoutUser,
    currentUser,
    notificationsSubscribe,
    verifyUser
}
