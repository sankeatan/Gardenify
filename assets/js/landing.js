$("#searchBt").onclick = function () {
    if ($('#searchField').val()==''){
        return 
    } else {
    sessionStorage.setItem('landingSearch', $('.searchBt').val());
    location.href = "main-page.html";
    }
};