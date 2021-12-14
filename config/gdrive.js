const {google} = require('googleapis');
require('dotenv').config()


const content=process.env.GDRIVE

const {client_secret, client_id, redirect_uris} = JSON.parse(content).installed;
const oAuth2Client =new google.auth.OAuth2(
  client_id, client_secret, redirect_uris[0]);
const token=process.env.TOKEN
oAuth2Client.setCredentials(JSON.parse(token))


module.exports=oAuth2Client
