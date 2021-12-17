require("dotenv").config();
const express= require("express")
var cookieParser = require('cookie-parser')
var cors = require('cors')
const path = require("path")
const passport=require("passport")
const app =express()

require("./config/mongoose")
require('./config/passport')(passport);


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser("secret"))
app.use(cors())

app.use(express.static(path.join(__dirname, "frontend", "build")))

app.use("/api/user",require("./routes/user"))
app.use("/api/driver",require("./routes/driver"))
app.use("/api/passenger",require("./routes/passenger"))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});


server=app.listen(process.env.PORT,()=>{
    console.log("Running on port ",process.env.PORT)
})

const {Server}=require("socket.io")


const io= new Server(server,{
    cors: {
      origin: "http://localhost:3000",
    },
  })

io.on("connection", (socket) => {
    
    
    socket.on("join",(event)=>{
     
      socket.join(event.user)
      
    })
  
  });

module.exports=io