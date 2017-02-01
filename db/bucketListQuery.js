var MongoClient = require('mongodb').MongoClient; //database driver. lets us talk in javascript to Mongo in our web app

var BucketListQuery = function() {
  this.url = 'mongodb://localhost:27017/bucket_list'; //this is a specific mongodb url
};

BucketListQuery.prototype = {
  all: function(onQueryFinished){
    MongoClient.connect(this.url, function(err, db){
      var collection = db.collection('countries');
      collection.find().toArray(function(err, docs){
        onQueryFinished(docs);
      });
    });
  },

  add: function(chosenCountry) {
    MongoClient.connect(this.url, function(err, db){
          var collection = db.collection('countries');
            collection.insert(chosenCountry);
  });
}
}

module.exports = BucketListQuery;