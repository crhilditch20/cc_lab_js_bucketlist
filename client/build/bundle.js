/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var Countries = __webpack_require__(1);
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

/***/ }),
/* 1 */
/***/ (function(module, exports) {

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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var UI = __webpack_require__(0);

var app = function() {
  new UI();
};

window.onload = app;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map