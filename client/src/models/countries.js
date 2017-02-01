var Countries = function(){
  var url = 'https://restcountries.eu/rest/v1/all';
  var self = this;
  this.makeRequest(url, function(){
    if(this.status !== 200) return;
   var jsonString = this.responseText; 
   countries = JSON.parse(jsonString);
   self.populateList(countries);
  });
};

Countries.prototype = {
makeRequest: function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = callback;
  request.send();
},

makePostRequest: function(url, data, callback){
  var request = new XMLHttpRequest();
  request.open("POST", url);
  request.setRequestHeader("Content-type", "application/json");
  request.onload = callback;
  console.log(data);
  request.send(data);
},

populateList: function(countries){
  var select = document.querySelector('#country-list');
    countries.forEach(function(country){
      var option = document.createElement('option'); 
        option.innerText = country.name; 
        option.value = country.name;
      select.appendChild(option); 
    });
}

};

module.exports = Countries;