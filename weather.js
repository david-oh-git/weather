

var pLocation = document.getElementById("location");
var pWeather = document.getElementById("weather");
var longitude;
var latitude;
var city;
var country;
// var data;
var temperature;
var currentweather;
var weathericon;
var isCelcious;
var pTemp = document.getElementById("temperature");


function fahrenheitAndCelsius(){
  // coverts between celsius and fahrenheit and write to p tag
  var temp = sessionStorage.getItem("temperature");
  temp = Number(temp);
  var insidetext;
  if(isCelcious){
    temp = temp * 9;
    temp = temp / 5;
    temp = temp + 32;
    sessionStorage.setItem("temperature", temp);
    temp = Math.round(temp);
    isCelcious = false;
    // temp = temp.toString();
    var F = "<a href=\"javascript:fahrenheitAndCelsius()\">"+String.fromCharCode(8457)+"</a>";
    insidetext = temp + " "+ F;
  }else {
    temp = temp - 32;
    temp = temp * 5;
    temp = temp / 9;
    sessionStorage.setItem("temperature", temp);
    temp = Math.round(temp);
    // temp = temp.toString();
    isCelcious = true;
    var C = "<a href=\"javascript:fahrenheitAndCelsius()\">"+String.fromCharCode(8451)+"</a>";
    insidetext = temp + " "+ C;
  }
  pTemp.innerHTML = insidetext;
}







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

function assignToVariables(info){
  // assign values to variables from api response
  currentweather = info["currently"]["summary"];
  weathericon = info["currently"]["icon"];
  temperature = info["currently"]["temperature"];
  sessionStorage.setItem("temperature", temperature);

  temperature = Math.round(temperature);
  isCelcious = false;
}



function makeRequest(url){
  var Q = createCORSrequest('GET', url);
  if(!Q){
    alert('CORS not supported');
    return;
  }

  // response handlers
  Q.onload = function(){
    var data = Q.responseText;
    data = JSON.parse(data);
    assignToVariables(data);
    // alert("response from CORS request is "+ text);
    sessionStorage.getItem("temperature");
    sessionStorage.setItem("icon", weathericon);
    var F = "<a href=\"javascript:fahrenheitAndCelsius(temperature)\">"+String.fromCharCode(8457)+"</a>";
    pTemp.innerHTML = temperature + " "+ F;
    pWeather.innerHTML = weathericon;
  };

  Q.onerror = function(){
    alert('CORS request error');
  };

  // Q.setRequestHeader('Access-Control-Allow-Origin','https://crossorigin.me');
  Q.send();
  // getWeatherData(Q.responseText);
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
  console.log("current postion was successful");
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
  country;
}


// to return darksky api url
function darkSkyApiCallUrl(){
  var madaK = "a46a4c2f4ee2017cfdc9702f459b9c68";
  return "https://crossorigin.me/https://api.darksky.net/forecast/" + madaK +
  "/"+ latitude+","+longitude;
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
