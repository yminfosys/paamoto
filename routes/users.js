var express = require('express');
var router = express.Router();

var dbCon = require('../module/db/con');
var database=require('../module/db/bdModule')
var auto_incriment=require('../module/db/autoIncriment');

var dotenv=require('dotenv').config();

/* GET users listing. */
router.get('/', function(req, res, next) {
  dbCon.connectDB()
  res.render('user/user',{YOUR_API_KEY: process.env.API_KEY})
});

module.exports = router;
