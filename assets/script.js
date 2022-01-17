/* ############################# setting global variables ############################# */

//empty global request url
var requestURL = '';
//search button and input field selectors
var srchBtn =  $('.searchBt');
var searchValue = $('.searchField').val();
//weather card id hooks and default
var temperature = $('#current-temp');
temperature.text("Temp: \xB0F");
var currentIcon = $('#current-icon');

//plant object with empty key:value pairs
var plantObject = {
  imageData : "",
  plantDesc : "",
  sunReq : "",
  sowMeth : "",
  plantSpace : "",
  growHeight : ""
};
//empty global array to dump data
var weatherData = [];
var plantData = [];
var firstCar = [];
var secondCar = [];
var thirdCar = [];
var fourthCar = [];
var fifthCar = [];
var frostData = [];
//selector for the info element
var veggieInfoEl = $('#veg-info');

//hiding the info elemtns initially
$('#sci-name').hide();
$('#plant-name').hide();
$('#sun-requirements').hide();
$('#row-spacing').hide();
$('#plant-height').hide();
$('#sowing-method').hide();
$('#current-temp').hide();
$('#current-icon').hide();
$('#hardiness').hide();
$('#humid').hide();
$('#pop-card').hide();

//pulling data from landing page search
getPlantApi(sessionStorage.getItem('landingSearch'));

/* ############################# carousel ####################################*/
$('.slider').slick({
  centerMode: true,
  centerPadding: '60px',
  slidesToShow: 3,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 3
      }
    },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1
      }
    }
  ]
});

/* ############################# getting plant info ############################# */
function getPlantApi(plantName) {
    var url = 'https://cors-anywhere.herokuapp.com/https://openfarm.cc/api/v1/crops/?filter='+plantName;
    fetch(url)
      .then(function (response) {
        console.log(response.status);
        if (response.status !== 200) {
          responseText.textContent = response.status;
        }
        return response.json();
      })
      .then(function (data) {

        plantData = data.data[0].attributes;
        firstCar = data.data[1].attributes.main_image_path;
        secondCar = data.data[2].attributes.main_image_path;
        thirdCar = data.data[3].attributes.main_image_path;
        fourthCar = data.data[4].attributes.main_image_path;
        fifthCar = data.data[5].attributes.main_image_path;

        console.log(data);
        
        displayPlantInfo();
      });
    }

/* ############################# search ############################# */
  function search (e) {
  e.preventDefault();
  searchValue = $('.searchField').val();
  //checks to see if search field is a number
  if (!isNaN(searchValue)) {
  //checks to see if the search field is less than 5 characters
    if (searchValue.length>5){
      //**************** need to put a zip warning here ***************
      return false;
    }
    //searchs for zip info
    else {
      zipInfo(searchValue);
    }
  }
  else {
    getPlantApi(searchValue);
  }
 }
 /* ############################# display plant info ############################# */
 function displayPlantInfo () {
        //populating planet object's keys
        plantObject.imageData = plantData.main_image_path;
        plantObject.plantDesc = plantData.description;
        plantObject.sunReq = plantData.sun_requirements;
        console.log(plantData.sun_requirements);
        plantObject.sowMeth = plantData.sowing_method;
        plantObject.plantSpace = plantData.row_spacing;
        plantObject.growHeight = plantData.height;
        //populating carousel images//
        
        $('#first-car').attr("src", firstCar);
        $('#second-car').attr("src", secondCar);
        $('#third-car').attr("src", thirdCar);
        $('#fourth-car').attr("src", fourthCar);
        $('#fifth-car').attr("src", fifthCar);
        
        //if keys aren't null then we display the data to the page
          if ( plantObject.plantSpace != null) {
          $('#row-spacing').text('Plant Spacing: ' + plantObject.plantSpace + ' cm.').show(); 
          }
          if ( plantData.binomial_name != null) {
          $('#sci-name').text('Scientific Name: '+ plantData.binomial_name).show();
          }
          if ( plantData.name != null) {
          $('#plant-name').text('Common Name:'+ plantData.name).show();
          }
          if ( plantData.name != null) {
          $('#plant-title').text(plantData.name);
          }
          if ( plantObject.plantDesc != null) {
          $('#details-p').text(plantObject.plantDesc);
          }
          if ( plantObject.sunReq != '') {
          $('#sun-requirement').text('Sun Requirements: ' + plantObject.sunReq).show();
          }
          if ( plantObject.sowMeth != '') {
          $('#sowing-method').text('Sowing Method: ' + plantObject.sowMeth + '.').show();
          }
          if ( plantObject.growHeight != null) {
          $('#plant-height').text('Fully Grown Height: ' + plantObject.growHeight + ' cm.').show();
          }
          if (plantObject.imageData != null){
          $('#image').attr("src", plantObject.imageData);
          }
        }
/* ############################# getting zip info ############################# */
function zipInfo(zipCode) {

  //hardiness zone fetch
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://cors-anywhere.herokuapp.com/https://plant-hardiness-zone.p.rapidapi.com/zipcodes/" + zipCode,
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "plant-hardiness-zone.p.rapidapi.com",
      "x-rapidapi-key": "b71a1c4a5bmshb848c727310c6bbp18da7cjsnbb90f586f1b4"
    }
  };
  $.ajax(settings).done(function (response) {
    console.log(response.hardiness_zone);
    $('#hardiness').text("Hardiness Zone: " + response.hardiness_zone).show();

  });

  //geocode and open weather fetch
  var geocodeUrl = 'http://api.openweathermap.org/geo/1.0/zip?zip='+zipCode+'&appid='+openWeatherApiKey;
  var lat = 0;
  var long = 0;
  //geocode fetch for lat and long based on zipcode
  fetch(geocodeUrl, {
      method: 'GET', //GET is the default.
      credentials: 'same-origin', // include, *same-origin, omit
      redirect: 'follow', // manual, *follow, error
  })
      .then(function (response) {
        //checking response before returing
        if (response.status == 200) {
        return response.json();
        }
      })
      .then(function (data) {
        //saves the geocode to a global array, and then sets the lat and long of the city
        var geocodeData = data;
        console.log(geocodeData);
        lat = geocodeData.lat;
        long = geocodeData.lon;
        setCurrentWeather (lat, long);
        //uses lat and long to call for weather info

        //function to determine the frost dates
        
      });
}
/* ############################# determine frost dates ############################# */
function determineFrostDates (lattitude, longitude){
  var minMonthlyData = [];
  for (var i=1; i<13; i++) {
  var minMonthlyTempUrl = 'https://history.openweathermap.org/data/2.5/temperature/month?month='+i+'&lat='+lattitude+'&lon='+longitude+'&appid='+openWeatherApiKey;
  fetch(minMonthlyTempUrl, {
    method: 'GET', //GET is the default.
    credentials: 'same-origin', // include, *same-origin, omit
    redirect: 'follow', // manual, *follow, error
    })
    .then(function (response) {
      //checking response before returing
      if (response.status == 200) {
      return response.json();
      }
      })
    .then(function (data) {
      //saves the geocode to a global array, and then sets the lat and long of the city
      minMonthlyData = data;
      console.log(minMonthlyData);
      })
}
}
/* ############################# set current weaather ############################# */
function setCurrentWeather (lattitude, longitude){
  var weatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lattitude+'&lon='+longitude+'&units=imperial&appid='+ openWeatherApiKey;
  fetch(weatherUrl, {
    method: 'GET', //GET is the default.
    credentials: 'same-origin', // include, *same-origin, omit
    redirect: 'follow', // manual, *follow, error
      })
    .then(function (response) {
      return response.json();
      })
    .then(function (data) {
    //saves the weather data to global array
      weatherData = data;
      console.log(weatherData);
      //displaying icon, temperature, humidity
      $('#current-icon').attr('src', 'http://openweathermap.org/img/wn/'+weatherData.current.weather[0].icon+'@2x.png').show();
      $('#current-temp').text("Temp: " +weatherData.current.temp+"\xB0F").show();
      $('#humid').text("Humidity: "+ weatherData.current.humidity+"%").show();
      $('#pop-card').show();
        })
  }
srchBtn.on('click', search);

$(document).on('keypress',function(e) {
  console.log('keypress');
  if(e.which == 13) {
      srchBtn.trigger('click');
      console.log('enter');
  }
});

