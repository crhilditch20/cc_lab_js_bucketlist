var Countries = require('../models/countries');
var selectedCountry;

var UI = function(){
  this.countries = new Countries();

  var addButton = document.querySelector('#add-my-country');
  addButton.onclick = this.getSelectedCountry.bind(this); 

  this.getBucketListFromDb();
};

UI.prototype = {

  getSelectedCountry: function(){
    var selected = document.querySelector('#country-list');
      selectedCountry = {name: selected.value};
      var jsonString = JSON.stringify(selectedCountry);
      this.countries.makePostRequest('/api/bucketlist', jsonString, function(){
        console.log(this.responseText);
      });
  },

  getBucketListFromDb: function(){
    var self = this;
    var blist_url = '/api/bucketlist';
    this.countries.makeRequest(blist_url, function(){
    if(this.status !== 200) return;
   var jsonString = this.responseText; 
    bucketList = JSON.parse(jsonString);
      console.log(this);
    self.displayBucketList(bucketList);
  });
  },

  displayBucketList: function(bucketlist){
    var div = document.querySelector('#my-bucket-list');
      var list = document.createElement('ul');
      div.appendChild(list);
      bucketlist.forEach(function(country){
        var checkbox = document.createElement('input');
          checkbox.setAttribute('type', 'checkbox');
          checkbox.setAttribute('name', 'country');
        var label = document.createElement('label');
          label.setAttribute('for', 'country');
          label.innerHTML = country.name;
      label.appendChild(checkbox);
      list.appendChild(label);
    });
  }


}

 

module.exports = UI;