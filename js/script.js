$(function() {
    
    // Declare Variables
    var $StarWarsFilms = $("#StarWarsFilms");
    var $StarWarsFilmInfo = $("#StarWarsFilmInfo");
    var $FilmPeoplePlanets = $("#StarWarsFilmInfo, #StarWarsPeopleInfo, #StarWarsPlanetsInfo");
    var characters = [];
    var planets;
    
    // Hide children Film People and Planets dynamic elements
    $FilmPeoplePlanets.children().remove();
     
    //Event Handler for the change event of the Star Wars Films drop down list
    $('#StarWarsFilms').on('change', function(){
        $FilmPeoplePlanets.children().remove();
        if (this.value != "0"){
            loadFilmData(this.value);     
        }         
    });      
     
    // function to load Star Wars Film data.  Selected option value of select input is used as a parameter.
    function loadFilmData(selectedValue) { 
      // getJSON method makes call to Star Wars API to return film data using the films selected value               
        $.getJSON('http://swapi.co/api/films/' + selectedValue + '/')
        .done(function(data) {
            swFilms = data;
            //Make call to loadCharacters to populate characters array variable
            loadCharacters(selectedValue);
            
            //Build elements and append to Film Info aside
            //Get the films director and release date from the JSON Data.  Get select options from character array.  Call loadPlanets function to populate planets array variable
            $StarWarsFilmInfo.append('<img id="filmPicture" src="Images/Episode' + selectedValue + '.png" />' +
                                     '<ul id="ulFilmData"><li>Director: ' + swFilms.director + '</li><li>Release Date: ' + swFilms.release_date +  '</li></ul>' +
                                     '<div><label>Characters</label><select id="Characters"><option value="0">-- Select Character --</option>' +
                                     '<option value="' + characters[0].value + '">' + characters[0].name + 
                                     '</option><option value="' + characters[1].value + '">' + characters[1].name + 
                                     '</option><option value="' + characters[2].value + '">' + characters[2].name + 
                                     '</option><option value="' + characters[3].value + '">' + characters[3].name + '</option></select></div>' +
                                     '<div id="divPlanets"><label>Planets</label><select id="Planets"><option value="0">-- Select Planet --</option>' +
                                     loadPlanets(selectedValue) + '</select></div>');
            
            // Event Handler for Characters drop down list on change.  Remove previous data first.  Call displayCharacterData function passing the selected value as argument.
            $('#Characters').on('change', function(){
                $('#StarWarsPeopleInfo').children().remove(); 
                if (this.value != "0"){
                    displayCharacterData(this.value);
               }                       
            });  
            
            // Event Handler for Planets drop down list on change.  Remove previous data first.  Call displayPlanetsData function passing the selected value as argument.
            $('#Planets').on('change', function(){
                $('#StarWarsPlanetsInfo').children().remove(); 
                if (this.value != "0"){
                    displayPlanetsData(this.value);
               }                       
            });
        // If done function is unsuccesful.  This fail function will execute.              
        }).fail(function() {
            $StarWarsFilmInfo.append('<p>An error occured loading the Star Wars Film Data</p>');
        }); 
    }
    
    // function to load Star Wars Character data.  Selected option value of Character Select Input is used as a parameter.
    function displayCharacterData(characterValue) {
        // getJSON method makes call to Star Wars API to return character data using the characters selected value   
        $.getJSON('http://swapi.co/api/people/' + characterValue + '/')
            .done(function(data) {
                swCharacter = data;
            
                //Append character information from JSON Data.  Call getCharImage fuction to return correct character image.
                $('#StarWarsPeopleInfo').append('<p>Character Information</p><ul id="characterList"><li>' + swCharacter.name + '</li>' +
                                                '<li>Gender: ' + swCharacter.gender + '</li>' +
                                                '<li>Birth Year: ' + swCharacter.birth_year + '</li>' +
                                                '<li>' + getCharImage(characterValue) + '</li></ul>');
            // If done function is unsuccesful.  This fail function will execute.             
            }).fail(function() {
                $('#StarWarsPeopleInfo').append('<p>An error occured loading the Star Wars Character Data</p>');     
            });
    }
    
    // function to load Star Wars Planets data.  Selected option value of Planets Select Input is used as a parameter.
    function displayPlanetsData(planetValue) {
        // getJSON method makes call to Star Wars API to return planets data using the planets selected value 
        $.getJSON('http://swapi.co/api/planets/' + planetValue + '/')
            .done(function(data) {
                swPlanet = data;
            
                //Append planet information from JSON Data
                $('#StarWarsPlanetsInfo').append('<p>Planet Information</p><ul id="planetList"><li>' + swPlanet.name + '</li>' +
                                                 '<li>Diameter: ' + swPlanet.diameter + '</li>' +
                                                 '<li>Climate: ' + swPlanet.climate + '</li>' +
                                                 '<li>Terrain: ' + swPlanet.terrain + '</li>' +
                                                 '<li>Population: ' + swPlanet.population + '</li></ul>');
            // If done function is unsuccesful.  This fail function will execute.            
            }).fail(function() {
                $('#StarWarsPlanetsInfo').append('<p>An error occured loading the Star Wars Planet Data</p>');              
            });
    }
    
    //function adds elements to the character array depending on the selected film value.  
    //each array element is an object literal with a name and value.  The name is displayed in the Character Drop Down List.  The value is used in the call to the API
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
    
    //function is used to return the correct character image dependant on the Select Film and selected character.
    //Character with value 87 is BB8.  Must check this condition because the image file extension is png.
    //If film value is 7 (Force Awakens) and selected charcter is 14 (Han Solo) the older picture of Han is returned.
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
    
    //function adds elements to the planets array depending on the selected film value.  
    //each array element is an object literal with a name and value.  The name is displayed in the Planets Drop Down List.  The value is used in the call to the API
    function loadPlanets(filmValue) {    
        
        // set planets variable to an empty array.
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
        
        //create a string variable to return data from the function
        var planetOptions = "";
        for (var i = 0; i < planets.length; i++){
            planetOptions += '<option value="' + planets[i].value + '">' + planets[i].name + '</option>';
        }       
        return planetOptions;
    }   
});
