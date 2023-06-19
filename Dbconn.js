const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/Data", {useNewUrlParser:true, useUnifiedTopology:true}).then(()=>{
    console.log("Database Connected successsfully!")
}).catch((e)=>{
    console.log(e);
});