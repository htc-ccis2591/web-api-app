$(function() {
    
    // Declare Variables
    var $StarWarsFilms = $("#StarWarsFilms");
    var $StarWarsFilmInfo = $("#StarWarsFilmInfo");
    var $FilmPeoplePlanets = $("#StarWarsFilmInfo, #StarWarsPeopleInfo, #StarWarsPlanetsInfo");
    var characters = [];
    var planets = [];
    // Hide children of asides
    $FilmPeoplePlanets.children().remove();
       
    function loadFilmData(selectedValue) { 
      // ajax method creates html elements when successful        
        
        $.getJSON('http://swapi.co/api/films/' + selectedValue + '/')
        .done(function(data) {
            swFilms = data; 
            loadCharacters(selectedValue);
            
            
            $StarWarsFilmInfo.append('<img id="filmPicture" src="/Images/Episode' + selectedValue + '.png" />');
            $StarWarsFilmInfo.append('<ul id="i"><li>Director: ' + swFilms.director + '</li><li>Release Date: ' + swFilms.release_date +  '</li></ul>'
                                     + '<div><label>Characters</label><select id="Characters"><option value="0">-- Select Character --</option>' +
                                    '<option value="' + characters[0].value + '">' + characters[0].name + 
                                    '</option><option value="' + characters[1].value + '">' + characters[1].name + 
                                    '</option><option value="' + characters[2].value + '">' + characters[2].name + 
                                    '</option><option value="' + characters[3].value + '">' + characters[3].name + '</option></select></div>');
            
            $StarWarsFilmInfo.append('<div id="divPlanets"><label>Planets</label><select id="Planets"><option value="0">-- Select Planet --</option>' +
                                     loadPlanets(selectedValue) + '</select></div>');
            
            
            $('#Characters').on('change', function(){
                $('#StarWarsPeopleInfo').children().remove(); 
                if (this.value != "0"){
                    displayCharacterData(this.value);
               }                       
            });  
            
            $('#Planets').on('change', function(){
                $('#StarWarsPlanetsInfo').children().remove(); 
                if (this.value != "0"){
                    displayPlanetsData(this.value);
               }                       
            });
                      
        }).fail(function() {
            
        });
        
        
    }
    
    function displayCharacterData(characterValue) {
        $.getJSON('http://swapi.co/api/people/' + characterValue + '/')
            .done(function(data) {
                swCharacter = data;
                $('#StarWarsPeopleInfo').append('<p>Character Information</p><ul id="characterList"><li>' + swCharacter.name + '</li>' +
                                                '<li>Gender: ' + swCharacter.gender + '</li>' +
                                                '<li>Birth Year: ' + swCharacter.birth_year + '</li>' +
                                                '<li>' + getCharImage(characterValue) + '</li></ul>');
                        
            }).fail(function() {
                        
            });
    }
    
    function displayPlanetsData(planetValue) {
        $.getJSON('http://swapi.co/api/planets/' + planetValue + '/')
            .done(function(data) {
                swPlanet = data;
                $('#StarWarsPlanetsInfo').append('<p>Planet Information</p><ul id="planetList"><li>' + swPlanet.name + '</li>' +
                                                 '<li>Diameter: ' + swPlanet.diameter + '</li>' +
                                                 '<li>Climate: ' + swPlanet.climate + '</li>' +
                                                 '<li>Terrain: ' + swPlanet.terrain + '</li>' +
                                                 '<li>Population: ' + swPlanet.population + '</li></ul>');
                        
            }).fail(function() {
                        
            });
    }
    
    function loadCharacters(filmValue) {
        if (filmValue === '1' || filmValue === '2' || filmValue === '3') {
                characters[0] = {name: "Luke Skywalker", value: "1"};
                characters[1] = {name: "Darth Vader", value: "4"};
                characters[2] = {name: "Han Solo", value: "14"};
                characters[3] = {name: "Leia Organa", value: "5"};
                
            } else {
                characters[0] = {name: "Han Solo", value: "14"};
                characters[1] = {name: "Rey", value: "85"};
                characters[2] = {name: "Finn", value: "84"};
                characters[3] = {name: "BB8", value: "87"};
            }
    }
    
    function getCharImage(characterValue) { 
        
        var filmValue = $StarWarsFilms.val();
        
        if (characterValue === '87'){
            return '<img src="Images/char' + characterValue + '.png" />';
        }
        else if (filmValue === '7' && characterValue === '14')
            {
                return '<img src="Images/HanForceAwakens.jpg" />';
            }
        else {
            return '<img src="Images/char' + characterValue + '.jpg" />';
        }
        
    }
    
    function loadPlanets(filmValue) {       
        planets = [];
        
        switch (filmValue){
            case "1":
                planets[0] = {name: "Tatooine", value: "1"};
                planets[1] = {name: "Alderaan", value: "2"};
                break;
            case "2":
                planets[0] = {name: "Hoth", value: "4"};
                planets[1] = {name: "Dagobah", value: "5"};
                planets[2] = {name: "Bespin", value: "6"};
                break;
            case "3":
                planets[0] = {name: "Dagobah", value: "5"};
                planets[1] = {name: "Endor", value: "7"};
                planets[2] = {name: "Naboo", value: "8"};
                break;
            case "7":
                planets[0] = {name: "Jakku", value: "61"};
                break;
        }
        
        var planetOptions = "";
        for (var i = 0; i < planets.length; i++){
            planetOptions += '<option value="' + planets[i].value + '">' + planets[i].name + '</option>';
        }
        
        return planetOptions;
    }
    
    $('#StarWarsFilms').on('change', function(){
        $FilmPeoplePlanets.children().remove();
        if (this.value != "0"){
            loadFilmData(this.value);     
        }         
    });      
});
