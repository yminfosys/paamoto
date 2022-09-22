var express = require('express');
var router = express.Router();

var dbCon = require('../module/db/con');
var db=require('../module/db/bdModule')
var auto_incriment=require('../module/db/autoIncriment');
var dotenv=require('dotenv').config();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/myadmin', { title: 'Express' });
});

router.post('/cityList', async function(req, res, next) {
  await dbCon.connectDB()

  const city= await db.city.find({})

  await dbCon.closeDB();

  res.json(city);

});

router.post('/newCity', async function(req, res, next) {
  await dbCon.connectDB()
  const branch= await db.city({
    branch:req.body.branch,
    country:req.body.country,
    state:req.body.state,
    city:req.body.city
  });

  await branch.save()

  await dbCon.closeDB();

  res.send("ok")

});

router.post('/branch', async function(req, res, next) {
  await dbCon.connectDB()

  const branch= await db.branch.find({})

  await dbCon.closeDB();

  console.log(branch)

  res.json(branch);

});

router.post('/addNewBranch', async function(req, res, next) {
  await dbCon.connectDB()
  const branch= await db.branch({
    branch:req.body.branch,
    country:req.body.country,
    state:req.body.state,
  });

  await branch.save()

  await dbCon.closeDB();

  res.send("ok")

});








module.exports = router;
