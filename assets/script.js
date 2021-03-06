/* ############################# setting global variables ############################# */

//empty global request url
var requestURL = '';
var openWeatherApiKey='4c94f4694462733770c73418781b71f1';
//search button and input field selectors
var srchBtn =  $('.searchBt');
var searchValue = $('.searchField').val();
//weather card id hooks and default
var temperature = $('#current-temp');
temperature.text("Temp: \xB0F");
var currentIcon = $('#current-icon');

var carouselImgs = $('.slider');

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

var defaultImages = {
  0 : {
    name: 'pepper',
    url: 'https://s3.amazonaws.com/openfarm-project/production/media/pictures/attachments/54ffd16c31343500038c0200.?1426051424'},
  1 : {
    name: 'tomato',
    url: 'https://s3.amazonaws.com/openfarm-project/production/media/pictures/attachments/5dc3618ef2c1020004f936e4.jpg?1573085580'},
  2 : {
    name: 'strawberry',
    url: 'https://s3.amazonaws.com/openfarm-project/production/media/pictures/attachments/551dc6103732390003730100.jpg?1428014606'},
  3 : {
    name: 'broccoli',
    url: 'https://s3.amazonaws.com/openfarm-project/production/media/pictures/attachments/54b4b5ea61306500020b0000.jpg?1421129190'},
  4 : {
    name: 'carrot',
    url: 'https://s3.amazonaws.com/openfarm-project/production/media/pictures/attachments/58c312395865650004000000.jpg?1489179191'}
  };

//object that contains a list of potential first and last frost dates depending on their hardiness zone
var frostDates = {
  '1a': {
    lastFrost: 'May 27th - June 4th',
    firstFrost: 'August 25th - 31st'
  },
  '1b': {
    lastFrost: 'May 22nd - May 29th',
    firstFrost: 'August 25th - 31st'
  },
  '2a': {
    lastFrost: 'May 18th - 22nd',
    firstFrost: 'September 1st - 5th'
  },
  '2b': {
    lastFrost: 'May 15th - 20th',
    firstFrost: 'September 4th - 8th'
  },
  '3a': {
    lastFrost: 'May 8th - 16th',
    firstFrost: 'September 8th - 12th'
  },
  '3b': {
    lastFrost:  'May 1st - 10th',
    firstFrost: 'September 10th - 15th'
  },
  '4a': {
    lastFrost: 'April 31st - May 12th',
    firstFrost: 'September 21st - October 1st'
  },
  '4b': {
    lastFrost: 'April 24th - May 5th',
    firstFrost: 'September 27th - October 7th'
  },
  '5a': {
    lastFrost:  'April 15th - 30th',
    firstFrost: 'October 13th - October 17th'
  },
  '5b': {
    lastFrost:  'April 7th - 21st',
    firstFrost: 'October 15th - October 21st'
  },
  '6a': {
    lastFrost:  'April 12th - 21st',
    firstFrost: 'October 17th - 25th'
  },
  '6b': {
    lastFrost:  'April 1st - 15th',
    firstFrost: 'October 21st - 31st'
  },
  '7a': {
    lastFrost:  'March 26th - April 3rd',
    firstFrost: 'October 29th - November 5th'
  },
  '7b': {
    lastFrost:  'March 22nd - March 28th',
    firstFrost: 'November 3rd - November 15th'
  },
  '8a': {
    lastFrost:  'March 17th - 28th',
    firstFrost: 'November 7th - 16th'
  },
  '8b': {
    lastFrost:  'March 13th - 21st',
    firstFrost: 'November 14th - 28th'
  },
  '9a': {
    lastFrost:  'February 20th - 28th',
    firstFrost: 'November 25th - December 5th'
  },
  '9b': {
    lastFrost:  'February 6th - 21st',
    firstFrost: 'December 1st - December 13th'
  },
  '10': {
    lastFrost: 'No freeze!',
    firstFrost: 'No freeze!'
  },
  '11': {
    lastFrost: 'No freeze!',
    firstFrost: 'No freeze!'
  },
  '12': {
    lastFrost: 'No freeze!',
    firstFrost: 'No freeze!'
  },
  '13': {
    lastFrost: 'No freeze!',
    firstFrost: 'No freeze!'
  }
};
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
$('#hardiness').hide();
$('#humid').hide();
$('#pop-card').hide();
$('#first-frost').hide();
$('#last-frost').hide();

//pulling data from landing page search
getPlantApi(sessionStorage.getItem('landingSearch'));
generateDefaultImages();

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

function generateDefaultImages(){
  $('#0-card').attr("src", defaultImages[0].url).val(defaultImages[0].name);
  $('#1-card').attr("src", defaultImages[1].url).val(defaultImages[1].name);
  $('#2-card').attr("src", defaultImages[2].url).val(defaultImages[2].name);
  $('#3-card').attr("src", defaultImages[3].url).val(defaultImages[3].name);
  $('#4-card').attr("src", defaultImages[4].url).val(defaultImages[4].name);
}

/* ############################# getting plant info ############################# */
function getPlantApi(plantName) {
    var url = 'https://floating-headland-95050.herokuapp.com/https://openfarm.cc/api/v1/crops/?filter='+plantName;
    fetch(url)
      .then(function (response) {
        if (response.status !== 200) {
          responseText.textContent = response.status;
        }
        return response.json();
      })
      .then(function (data) {

       plantData = data.data[0].attributes;

        
        displayPlantInfo();
      });
    }

/* ############################# search ############################# */
  function search (e) {
  e.preventDefault();
  searchValue = $('.searchField').val();
  //checks to see if search field is a number
  if (!isNaN(searchValue)) {
  //if it is a number it checks to see if the search field is less than 5 characters
    if (searchValue.length>5){
      alert('Please enter a plant name or your zipcode for more gardening information');
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
        plantObject.sowMeth = plantData.sowing_method;
        plantObject.plantSpace = plantData.row_spacing;
        plantObject.growHeight = plantData.height;
  
        
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
    "url": "https://floating-headland-95050.herokuapp.com/https://plant-hardiness-zone.p.rapidapi.com/zipcodes/" + zipCode,
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "plant-hardiness-zone.p.rapidapi.com",
      "x-rapidapi-key": "b71a1c4a5bmshb848c727310c6bbp18da7cjsnbb90f586f1b4"
    }
  };
  $.ajax(settings).done(function (response) {
    console.log(response.hardiness_zone);
    determineFrostDates(response.hardiness_zone);
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
function determineFrostDates (hardinessZone){
  var hardi = hardinessZone
  $('#hardiness').text("Hardiness Zone: " + hardi).show();
  $('#first-frost').text("Historical First Frosts: " + frostDates[hardi].firstFrost).show();
  console.log(frostDates[hardi].firstFrost);
  $('#last-frost').text("Historical Last Frosts: " + frostDates[hardi].lastFrost).show();
  console.log(frostDates[hardi].lastFrost);
  $('#pop-card').show();
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
      $('#current-temp').text("Temp: " +weatherData.current.temp+"\xB0F").show();
      $('#humid').text("Humidity: "+ weatherData.current.humidity+"%").show();
      $('#pop-card').show();
        })
  }
srchBtn.on('click', search);

$(document).on('keypress',function(e) {
  if(e.which == 13) {
      srchBtn.trigger('click');
  }
});

carouselImgs.on('click','img', function (e){
  $('.searchField').val($(this).val());
  console.log($(this).val());
  console.log($('.searchField').val());
  srchBtn.trigger('click');
})

