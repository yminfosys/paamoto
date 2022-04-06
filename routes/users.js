var express = require('express');
var router = express.Router();

var dbCon = require('../module/db/con');
var db=require('../module/db/bdModule')
var auto_incriment=require('../module/db/autoIncriment');
var smsotp = require('../module/smsotp');
var dotenv=require('dotenv').config();




////Randanm OTP/////////
function randamNumber() {
  var tex = "";
  for (var i = 0; i < 4; i++) {
      tex += '' + Math.floor(Math.random() * 10) + '';
  }
  return tex;

}

/* GET users listing. */
router.get('/', async function(req, res, next) {
  res.render('user/user',{YOUR_API_KEY: process.env.API_KEY})
  
});



router.post('/checkuserexist', async function(req, res, next) {
  await dbCon.connectDB()

  const user= await db.user.findOne({mobile:req.body.mobile})

  await dbCon.closeDB();
  res.json(user)

})


///////////OTP////////////
router.post('/otpSend', function(req, res, next) {
  var otp=randamNumber()
  smsotp.otpsend({
          apikey: process.env.OTP2KEYu,
          mobileno: "+91" + req.body.mobile + "",
          otp: otp
      }, function(data) {
          console.log(data);
          res.send({data:data,otp:otp});
      })
      
});








module.exports = router;
