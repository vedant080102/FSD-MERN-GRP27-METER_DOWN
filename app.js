require("dotenv").config();
const express= require("express")
var cookieParser = require('cookie-parser')
var cors = require('cors')

const app =express()
require("./config/mongoose")


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors())

app.use("/api/user",require("./routes/user"))


app.listen(process.env.port,()=>{
    console.log("Running on port ",process.env.port)
})