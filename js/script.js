$(function(){
    var weatherKey = "7b21daac2891491963f09e298f79e97e";
    function getWeather(zipcode, apikey){
        $.getJSON('//api.openweathermap.org/data/2.5/weather?zip=' + zipcode + ',us&units=imperial&APPID=' + apikey)
        .done(function(data){
            $('#weather .well').append('<p>The temp is ' + data.main.temp + ' degrees farenheit with ' + data.weather[0].description + '</p>');
        })
        .fail(function(){
            alert('Something went wrong. Please check your zip code');
        });
    };
      
    
    $('#submit').on('click', function(){
        var zip = $('#zip').val();
        $('#weather .well p').remove();
        getWeather(zip, weatherKey);
    });
    
    
    var wineKey = "c2b17b38e2a85c5f2d0c9fcac6c39cef"
    function getWine(apiKey){
        $.getJSON('//services.wine.com/api/beta2/service.svc/JSON/categorymap?filter=categories(490)&apikey=c2b17b38e2a85c5f2d0c9fcac6c39cef')
        .done(function(data){
            console.log(data);
        })
        .fail(function(){
            alert('Sorry, something went wrong. No wine for you.');
        });
    };

    getWine(wineKey);
    
    function getPokemon(){
        $.getJSON('//pokeapi.co/api/v2/type/')
        .done(function(data){
           for (var i = 0; i < data.results.length; i++){
               $('#pokemon .dropdown-menu').append('<li><a href="' + data.results[i].url +'">' + data.results[i].name + '</a></li>');
           };
           $('#pokemon li').on('click', function (e){
               e.preventDefault();
               var url = $(this).attr('href');
               $.getJSON(url)
               .done(function (data){
                   $('#pokemon .well').append('<p>' + data.damage_relations.no_damage_to.name + '</p>');
               })
               .fail(function (){
                   alert('Something went wrong');
               });
           });
        })
        .fail(function(){
            alert("We couldn't catch any Pokemon");
        });
    };
    getPokemon();
  /*  function loadPokeDmg(){
        $('#pokemon li').on('click', function (e){
               e.preventDefault();
               var url = $(this).attr('href');
               $.getJSON(url)
               .done(function (data){
                   console.log(data);
               })
               .fail(function (){
                   alert('Something went wrong');
               });
           });
    };*/
});