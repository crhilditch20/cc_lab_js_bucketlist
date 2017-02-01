var Countries = function(){
  var url = 'https://restcountries.eu/rest/v1/all';
  var self = this;
  console.log(this);
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
  request.open('GET', url);
  request.onload = callback;
  request.send();
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