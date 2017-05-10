

var pLocation = document.getElementById("location");
var pWeather = document.getElementById("weather");
var longitude;
var latitude ;
var city;
var country;

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
var madaK = "a46a4c2f4ee2017cfdc9702f459b9c68";

// to return darksky api url
function darkSkyApiCallUrl(){
  return "https://api.darksky.net/forecast/" + madaK +
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
  get();

});
}, false);
