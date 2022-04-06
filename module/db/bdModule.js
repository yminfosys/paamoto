const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({ 
    postCode:String,
    doorNo:String,
    address:String,
    country:String,
    email:String,
    password:String,
    name:String,
    mobile:String,
    userID:Number,
    userProfID:String,
    status:{ type: String, default: "New" },
    regdate: { type: Date, default: Date.now },
    rating:{type:Number, default:5}
});
var usermodul = mongoose.model('usercollections', userSchema);





module.exports={
    user:usermodul,
    
}