var Countries = require('../models/countries');
var selectedCountry;

var UI = function(){
  this.countries = new Countries();

  this.getSelectedCountry();

  // var addButton = document.querySelector('#add-my-country');
  // addButton.onclick = addSelectedCountry;
};

UI.prototype = {

  getSelectedCountry: function(){
    var countryList = document.querySelector('#country-list');
    console.log(countryList);
    var self = this;
    countryList.onchange = function(event){
      console.log(this);
      selectedCountry = {
        name: this.value //this is undefined...
      }
      console.log(selectedCountry);
      var jsonString = JSON.stringify(selectedCountry);

      self.countries.makePostRequest("/", jsonString, function(){
        console.log(this.responseText);
      })
    };
  }

 }

module.exports = UI;