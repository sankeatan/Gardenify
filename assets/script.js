var requestURL = '';
var srchBtn = $('#searchBt');
var plantName = $('#searchField').val();
var plantData = [];
var veggieInfoEl = $('#veg-info');
var imageData = "";
var plantDesc = "";
var sunReq = "";
var sowMeth = "";
var plantSpace = "";
var growHeight = "";
$('#sci-name').hide();
$('#plant-name').hide();
$('#sun-requirements').hide();
$('#row-spacing').hide();
$('#plant-height').hide();
$('#sowing-method').hide();

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
        sunReq = plantData.sun_requirements;
        sowMeth = plantData.sowing_method;
        plantSpace = plantData.row_spacing;
        growHeight = plantData.height;
        console.log();
        displayInfo();
      });
    }
    
    
    function plantSearch () {
   //e.preventDefault();
   plantName = 'pepper';//$('.searchField').val();
   requestURL = 'https://cors-anywhere.herokuapp.com/https://openfarm.cc/api/v1/crops/?filter='+plantName;
   getApi(requestURL);
 }

 function displayInfo () {
   $('#sci-name').text('Scientific Name: '+ plantData.binomial_name).show();
   $('#plant-name').text('Common Name:'+ plantData.name).show();
   $('#plant-title').text(plantData.name);
   $('#image').attr("src", imageData);
   $('#details-p').text(plantDesc);
   $('#sun-requirement').text('Sun Requirements: ' + sunReq).show();
   $('#sowing-method').text('Sowing Method: ' + sowMeth).show();
   $('#row-spacing').text('Plant Spacing: ' + plantSpace).show();
   $('#plant-height').text('Fully Grown Height: ' + growHeight).show();
   
   

 }

plantSearch();
 //srchBtn.on('click', plantSearch);

 /*data we want: 
 
 name:
 scientific name:
 img:
 description:
 sun req:
 spacing:
 sowing method


 
 
 
 */