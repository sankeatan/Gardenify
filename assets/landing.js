$(".searchBt").on('click', function () {
    console.log('click');
    if ($('.searchField').val()==''){
        alert("Please enter a plant to search");
    } else {
    sessionStorage.setItem('landingSearch', $('.searchField').val());
    location.href = "main-page.html";
    }
});