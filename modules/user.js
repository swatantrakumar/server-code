const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    name:String,
    email:String,
    mobile:Number,
    remark:String
})

const UserModule = mongoose.model("UserMode",userSchema,"user");

module.exports = UserModule;

