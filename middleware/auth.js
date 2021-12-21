const jwt= require("jsonwebtoken")
const fs = require('fs');
const path = require('path');
const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');
const User = require("../models/User")

const checkToken=(req,res,next)=>{
    if (req.signedCookies.jwt == undefined){
        res.status(401).send({msg:"no token",userData:{}})
    }else{
       let token
            try {
                 token=req.signedCookies.jwt.slice(7)
            } catch (error) {
                res.status(401).clearCookie('jwt').send({msg:"invalid token",userData:{}})
                return 
            }
            
      
            jwt.verify(token, PUB_KEY, function(err, decoded) {
                console.log(decoded)
                if(err){
                    res.status(401).send("error")
                }else{
    
                   if(decoded.exp<Date.now()){
                       console.log(decoded.exp,Date.now())
                        res.status(401).clearCookie('jwt').send({msg:"token expired",userData:{}})
                    }else{
                        req.headers.authorization=req.signedCookies.jwt
                        req.userId=decoded.sub
                        console.log("Authorized!")
                        next()
                    }
                    
                }
               
              });
       

}}

const isPassenger=(req,res,next)=>{
    User.findOne({_id:req.userId})
    .then(user=>{
        if(!user){
            res.status(403).send("Not a judge")
        }else{
            if(user.type=="passenger"){
                req.Passenger=true
                next()
            }
            else{
                res.status(403).send("Not a passenger")
            }
        }
    })
}

const isDriver=(req,res,next)=>{
    User.findOne({_id:req.userId})
    .then(user=>{
        if(!user){
            console.log("hell")
            res.status(403).send("Not a judge")
        }else{
            if(user.type=="driver"){
                req.isDriver=true
                next()
            }
            else{
                console.log("hi")
                res.status(403).send("Not a driver")
            }
        }
    })
}


module.exports={
    checkToken,
    isPassenger,
    isDriver
}
