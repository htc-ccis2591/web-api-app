$(function() {
       
    function loadCharacter(film) { 
      // ajax method creates html elements when successful
      $.getJSON('http://swapi.co/api/' + film)
      .done(function(data){
          
          jsonChars = data;
          $('body').append('<br /><br />' + data.release_date);
          
          
      }).fail(function() {
          
         alert('no'); 
      });
                     
         
    }
    
    $('#StarWarsMovie').on('change', function(){
          
        loadCharacter('films/' + this.value + '/');        
    });
    
     
    
});
