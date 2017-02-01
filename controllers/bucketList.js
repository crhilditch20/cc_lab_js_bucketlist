var express = require('express');
var app = express();
var countryRouter = express.Router();

var BucketListQuery = require("../db/bucketListQuery.js")
var query = new BucketListQuery();

//index
countryRouter.get('/', function(req, res){
 query.all(function(results){
  res.json(results);
 });
});

//add to db
countryRouter.post('/', function(req, res){
  var data = {
    name: req.body.name
  };
  console.log(data);
  query.add(data);
  query.all(function(results){
    res.json(results);
  })
})

module.exports = countryRouter;