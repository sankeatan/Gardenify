$(".searchBt").on('click', function () {
    console.log('click');
    if ($('.searchField').val()==''){
        alert("Please enter a plant to search");
    } else {
    sessionStorage.setItem('landingSearch', $('.searchBt').val());
    location.href = "main-page.html";
    }
});