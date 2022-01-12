var requestURL = '';
var srchBtn =  $('#searchBt');
var plantName = $('#searchField').val();
var plantData = [];



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
        plantData = data.data[0].attributes
        plantData.name
        console.log();
        displayInfo();
      });
  }

  function displayInfo() {
     document.getElementById("plantDescName").textContent = plantData.name + " Info"
     document.getElementById("image").src = main_img_path
    
  }
 

 function plantSearch () {
   //e.preventDefault();
   plantName = 'pepper';//$('.searchField').val();
   requestURL = 'https://cors-anywhere.herokuapp.com/https://openfarm.cc/api/v1/crops/?filter='+plantName;
   getApi(requestURL);
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