/* ############################# setting global variables ############################# */

var requestURL = '';
var srchBtn =  $('.searchBt');
var plantName = $('.searchField').val();
var plantData = [];
var veggieInfoEl = $('#veg-info');
var imageData = "";
var plantDesc = "";
$('#sci-name').hide();
$('#plant-name').hide();

/* ############################# const settings ############################# */

const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://cors-anywhere.herokuapp.com/https://plant-hardiness-zone.p.rapidapi.com/zipcodes/",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "plant-hardiness-zone.p.rapidapi.com",
		"x-rapidapi-key": "b71a1c4a5bmshb848c727310c6bbp18da7cjsnbb90f586f1b4"
	}
};

/* ############################# getting api ############################# */

function getApi(url) {
    fetch(url)
      .then(function (response) {
        console.log(response.status);
        //  Conditional for the the response.status.
        if (response.status !== 200) {
          // Place the response.status on the page.
          responseText.textContent = response.status;
        }
        return response.json();
      })
      .then(function (data) {
        // Make sure to look at the response in the console and read how 404 response is structured.
        console.log(data);
        plantData = data.data[0].attributes;
        imageData = plantData.main_image_path;
        plantDesc = plantData.description;
        displayInfo();
      });
    }
    
/* ############################# plant search ############################# */
  function plantSearch (e) {
   e.preventDefault();
   plantName = $('.searchField').val();
   console.log(plantName);
   requestURL = 'https://cors-anywhere.herokuapp.com/https://openfarm.cc/api/v1/crops/?filter='+plantName;
   getApi(requestURL);
 }
 /* ############################# display info ############################# */
 function displayInfo () {
   $('#sci-name').text('Scientific Name: '+ plantData.binomial_name).show();
   $('#plant-name').text('Common Name:'+ plantData.name).show();
   $('#plant-title').text(plantData.name);
   $('#image').attr("src", imageData);
   $('#details-p').text(plantDesc)
   }

hardiSearch()


function hardiSearch() {
  inputUrl = settings.url + 76904;
  console.log(inputUrl);
  $.ajax(settings).done(function (response) {
    console.log(response);
  });
}
 
 
srchBtn.on('click', plantSearch);

