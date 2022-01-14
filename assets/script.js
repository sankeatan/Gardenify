/* ############################# setting global variables ############################# */

//empty global request url
var requestURL = '';
//search button and input field selectors
var srchBtn =  $('.searchBt');
var plantName = $('.searchField').val();
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
var plantData = [];
//selector for the info element
var veggieInfoEl = $('#veg-info');
//hiding the info elemtns initially
$('#sci-name').hide();
$('#plant-name').hide();
$('#sun-requirements').hide();
$('#row-spacing').hide();
$('#plant-height').hide();
$('#sowing-method').hide();

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

        plantData = data.data[0].attributes;

        console.log(data);
        
        displayInfo();
      });
    }
    
/* ############################# plant search ############################# */
  function plantSearch (e) {
   e.preventDefault();
   //getting the searched plant name
   plantName = $('.searchField').val();
   console.log(plantName);
   //setting up request URL for api function
   requestURL = 'https://cors-anywhere.herokuapp.com/https://openfarm.cc/api/v1/crops/?filter='+plantName;
   getApi(requestURL);
   //calling hardi search here until we can get a zipcode input
   //hardiSearch();
 }
 /* ############################# display info ############################# */
 function displayInfo () {
        //populating planet objet's keys
        plantObject.imageData = plantData.main_image_path;
        plantObject.plantDesc = plantData.description;
        plantObject.sunReq = plantData.sun_requirements;
        console.log(plantData.sun_requirements);
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
/* ############################# hardiness zones ############################# */
function hardiSearch() {
  var input = $('.searchField').val();
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://cors-anywhere.herokuapp.com/https://plant-hardiness-zone.p.rapidapi.com/zipcodes/" + input,
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "plant-hardiness-zone.p.rapidapi.com",
      "x-rapidapi-key": "b71a1c4a5bmshb848c727310c6bbp18da7cjsnbb90f586f1b4"
    }
  };
  $.ajax(settings).done(function (response) {
    console.log(response.hardiness_zone);
    // $('#details-head').text(response.hardiness_zone)
  });
}
  
srchBtn.on('click', plantSearch);

