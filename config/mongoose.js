const mongoose = require('mongoose');
require("dotenv").config();
console.log(process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI, {
    
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
})
.then(() => {
    console.log("Mongoose connection successful!!")
})
.catch((err) => {
    console.log(`Error: ${err.message}`)
});