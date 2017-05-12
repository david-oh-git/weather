

var pLocation = document.getElementById("location");
var pWeather = document.getElementById("weather");
var longitude;
var latitude;
var city;
var country;





function createCORSrequest(method, url){
  var Q = new XMLHttpRequest();

  // check if reuest has with credential property chrome , firefox
  if("withCredentials" in Q){
    Q.open(method, url, true);
  }else if (typeof XDomainRequest != "undefined") {
    // internet explorer
    Q = new XDomainRequest();
    Q.open(method, url);
  }else {
    // CORS is not supported
    Q = null;
  }

  return Q;
}

function getTitle(text) {
  return text.match('<title>(.*)?</title>')[1];

}

function makeRequest(url){
  var Q = createCORSrequest('GET', url);
  if(!Q){
    alert('CORS not supported');
    return;
  }

  // response handlers
  Q.onload = function(){
    var text = Q.responseText;
    var title = getTitle(text);
    alert("response from CORS request to "+ url+'  '+title);
  };

  Q.onerror = function(){
    alert('CORS request error');
  };

  Q.setRequestHeader('Access-Control-Allow-Origin','https://crossorigin.me');
  Q.send();
  getWeatherData(Q.responseText);
}

function getWeatherData(data){
  var weather = data["summary"];
  pWeather.innerHTML = weather;
}

function getLocation(){
  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(showPosition);
  }else {
    pLocation.innerHTML = "geolocation is not supported by this browser ";
  }
}

function showPosition(position){
  pLocation.innerHTML = "Latitude: "+ position.coords.latitude+
  "<br>Longitude: "+ position.coords.longitude;
}


// document.addEventListener('DOMContentLoaded', function(){
//   getLocation();
// }, false);

var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status == 200) {
        callback(null, xhr.response);
      } else {
        callback(status);
      }
    };
    xhr.send();
};


function getCityCoord(){
  pLocation.innerHTML= city +","+" "+
  country +"<br>Latitude: is "+ latitude +
  "<br>Longitude: "+ longitude;
}

function getWeather(){

}

// to return darksky api url
function darkSkyApiCallUrl(){
  var madaK = "a46a4c2f4ee2017cfdc9702f459b9c68";
  return "https://crossorigin.me/https://api.darksky.net/forecast/" + madaK +
  "/"+ latitude+","+longitude;
}


var get = function(apiUrl){
  var url = darkSkyApiCallUrl();
  getJSON(url ,
function(err, data) {
  if (err != null) {
    alert('Something went wrong: ' + err);
  } else {
    console.log("good to go");
  }
  pWeather.innerHTML = "weather is "+ data["icon"];


});
}

document.addEventListener('DOMContentLoaded', function(){
  getJSON('http://ip-api.com/json/?callback',
function(err, data) {
  if (err != null) {
    alert('Something went wrong: ' + err);
  } else {
    console.log("good to go");
  }
  longitude = data["lon"];
  latitude = data["lat"];
  city = data["city"];
  country = data["country"];


  getCityCoord();
  makeRequest(darkSkyApiCallUrl());

});
}, false);
