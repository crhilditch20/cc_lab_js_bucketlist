var express = require('express');
var app = express();
var countryRouter = express.Router();

var BucketListQuery = require("../db/bucketListQuery.js")
var query = new BucketListQuery();

module.exports = countryRouter;