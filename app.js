require("dotenv").config();
const express= require("express")
var cookieParser = require('cookie-parser')
var cors = require('cors')
const path = require("path")
const passport=require("passport")
const webpush = require('web-push')
webpush.setVapidDetails(process.env.WEB_PUSH_CONTACT, process.env.PUBLIC_VAPID_KEY, process.env.PRIVATE_VAPID_KEY)


const app =express()


server=app.listen(process.env.PORT,()=>{
    console.log("Running on port ",process.env.PORT)
})

io=require("./config/socket")

global.server=server


require("./config/mongoose")
require('./config/passport')(passport);


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser("secret"))
var whitelist = ['http://localhost:3000', '*' ]
var corsOptions = {
  credentials: true,
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(null, true)
    }
  }
}
app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, "frontend", "build")))

app.use("/api/user",require("./routes/user"))
app.use("/api/driver",require("./routes/driver"))
app.use("/api/passenger",require("./routes/passenger"))
app.use("/api/admin",require("./routes/admin"))

app.post('/notifications/subscribe', (req, res) => {
  const subscription = req.body

  console.log(subscription)

  const payload = JSON.stringify({
    title: 'Hello!',
    body: 'It works.',
  })

  webpush.sendNotification(subscription, payload)
    .then(result => console.log(result))
    .catch(e => console.log(e.stack))

  res.status(200).json({'success': true})
});

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.header('origin') );
    next();
  });

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});




