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
    
    
    var beerKey = "d6b3926a400f0e8dc33d739b65f1838d"
    function getBeer(apiKey){
        $.getJSON('//api.brewerydb.com/v2/styles?key=' + apiKey + '&format=json')
        .done(function(data){
            console.log(data);
        })
        .fail(function(){
            alert('Sorry, something went wrong. No beer for you.');
        });
    };

    getBeer(beerKey);
    
});