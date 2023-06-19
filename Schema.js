const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    phone : {
        type : Number,
        required : true,
    },
    email : {
        type : String,
        required: true,
    }
})

//COLLECTION CREATION

const Student = new mongoose.model("Student", Schema);

module.exports = Student;