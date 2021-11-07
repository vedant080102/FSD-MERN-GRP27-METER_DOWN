require("dotenv").config();
const express= require("express")
var cookieParser = require('cookie-parser')
var cors = require('cors')
const path = require("path")
const app =express()
require("./config/mongoose")


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors())

app.use(express.static(path.join(__dirname, "frontend", "build")))

app.use("/api/user",require("./routes/user"))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});


app.listen(process.env.PORT,()=>{
    console.log("Running on port ",process.env.PORT)
})