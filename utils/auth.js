const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const pathToKey = path.join(__dirname, '..', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

const validPassword=(password, passwordDB)=> {
    bcrypt.compare(password,passwordDB,(err,isMatch)=>{
        if(err) throw err

        if(isMatch){
            return true
        }else{
            return false
        }
    })
}

const genPassword=(password) =>{
    var salt = crypto.randomBytes(32).toString('hex');
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    
    return {
      salt: salt,
      hash: genHash
    };
}

const issueJWT=(user)=> {
    const _id = user._id;
  
    const expiresIn = 86400000;
    
  
    const payload = {
      sub: _id,
      iat: Date.now()
    };
  
    const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' });
  
    return {
      token: "Bearer " + signedToken,
      expires: expiresIn
    }
  }

  module.exports={
      validPassword,
      issueJWT,
      genPassword
  }