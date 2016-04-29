$(function() {
    
    // Declare Variables
    var $StarWarsFilms = $("#StarWarsFilms");
    var $StarWarsFilmInfo = $("#StarWarsFilmInfo");
    var $FilmPeopleShips = $("#StarWarsFilmInfo, #StarWarsPeopleInfo, #StarWarsShipsInfo");
    
    // Hide children of asides
    $FilmPeopleShips.children().remove();
       
    function loadFilmData(selectedValue) { 
      // ajax method creates html elements when successful
        
        $StarWarsFilmInfo.append('<img src="/Images/Episode' + selectedValue + '.png" />');
        
    }

    
    
    $('#StarWarsFilms').on('change', function(){
        if (this.value === "0"){
            $FilmPeopleShips.children().remove();       
        }
        else {
            $FilmPeopleShips.children().remove(); 
             loadFilmData(this.value);
        }              
    });      
});
