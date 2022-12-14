const mongoose = require("mongoose")
const url = "mongodb://localhost:27017/crud"
mongoose.connect(url, (err)=>{
    if(!err){
        console.log("DB Connected")
    }
})