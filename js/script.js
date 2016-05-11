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
    
   
    function getStarships(){
        $.getJSON('//swapi.co/api/starships/')
        .done(function(data){
            $('#starships').append('<ul>The up to date starships:</ul>');
            for (var i = 0; i < data.results.length; i++){
                $('#starships ul').append('<li>' + data.results[i].name + '&nbsp &nbsp<em>Model:</em>&nbsp ' + data.results[i].model + '</li>');
            };
        })
        .fail(function(){
            alert('Something went wrong.');
        });
    };
getStarships();

$('#pokemon li').on('click', function(){
    var id = $(this).attr('id');
    var type = $(this).text();
    $('#pokemon .text-center p').remove();
    getPokeData(str, type);
});
    
    function getPokeData(id, type){
        $.getJSON('//pokeapi.co/api/v2/type/' + id + '/')
        .done(function(data){
            var halfDmg = []
            for (var i = 0; i < data.damage_relations.half_damage_to.length; i++){
                halfDmg += data.damage_relations.half_damage_to[i].name;
            };
            $('#pokemon .text-center').append('<p>The ' + type + ' type pokemon do half damage to ' + halfDmg + ' type Pokemon</p>');
        })
        .fail(function(){
            alert('Something went wrong');
        });
    };



   /* function getPokemon(){
        $.getJSON('//pokeapi.co/api/v2/type/')
        .done(function(data){
           for (var i = 0; i < data.results.length; i++){
               $('#pokemon .dropdown-menu').append('<li><a href="' + data.results[i].url +'">' + data.results[i].name + '</a></li>');
            };
        })
        .fail(function(){
            alert("We couldn't catch any Pokemon");
        });
    };
    getPokemon();
    function loadPokeDmg(){
        $('#pokemon li').on('click', function (e){
               e.preventDefault();
               var url = $(this).attr('href');
               $.getJSON(url)
               .done(function (data){
                   $('#pokemon .well').append('<p>No damage done to ' + data.damge_relations.no_damage_to + '</p>');
               })
               .fail(function (){
                   alert('Something went wrong');
               });
           });
    };
    loadPokeDmg();*/
});