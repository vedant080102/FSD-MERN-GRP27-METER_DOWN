
const bcrypt = require("bcryptjs")
const User = require("../models/User")
const passport = require("passport")
const utils = require("../utils/auth")
const Driver = require("../models/Driver")
const Passenger = require("../models/Passenger")

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
                const newUser=new User({
                    name,phone,password,email,type
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
                          return  res.status(200).json({msg:"Successfully registered",userData:user})
                        } catch (error) {
                            console.log(error)
                            res.status(500).json({msg:error.message,userData:{}})
                            
                        }
                        
                        
                }))

            }
        })
    


}

const logoutUser=(req,res,next)=>{
    
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

module.exports={
    loginUser,
    registerUser,
    ensureAuthenticated,
    logoutUser,
    currentUser,
    
}
