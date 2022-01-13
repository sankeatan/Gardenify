var requestURL = '';
var srchBtn =  $('#searchBt');
var plantName = $('#searchField').val();
var plantData = [];
var veggieInfoEl = $('#veg-info');
var imageData = "";
var plantDesc = "";
$('#sci-name').hide();
$('#plant-name').hide();

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
   $('#details-p').text(plantDesc)
   
   //veggieInfoEl.append('<li>').text('Sun Requirements: '+plantData.attributes.sun_requirements);

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