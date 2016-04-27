$(function(){
    var weatherKey = "7b21daac2891491963f09e298f79e97e";
    function getWeather(zipCode, apiKey){
        $.getJSON('//api.openweathermap.org/data/2.5/weather?zip=' + zipCode + ',us&units=imperial&APPID=' + apiKey)
        .done(function(data){
            $('#weatherData').append("<p>It's currently " + data.main.temp + "&deg</p>");
        })
        .fail(function(){
            alert('Something went wrong. Please check the zip code and try agian')
        });
    };
var zip = "55344";   
    
    
    var wineKey = "c2b17b38e2a85c5f2d0c9fcac6c39cef"
    function getWine(apiKey){
        $.getJSON('//http://services.wine.com/api/version/service.svc/JSON/categorymap?apikey=key' + apiKey)
        .done(function(data){
            console.log(data);
        })
        .fail(function(){
            alert('Sorry, something went wrong. No wine for you.');
        });
    };

    getWine(wineKey);
    
});