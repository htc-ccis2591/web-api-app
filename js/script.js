$(function()
 {
    var $lat = '';
    var $lng = '';
    var owmAPI = '';
    // Setting global vars
    
    $('title').text('Project 3');
    // Change tab text
    $('main').prepend('<div id="latLon"><div id="LAT"><h3>Latitude:</h3><input id="lati" type="text" name="lat" readonly></div><div id="LON"><h3>Longitude:</h3><input id="longi" type="text" name="lon" readonly></div></div>');
    // Add labels and inputs to <main>
    $('main').prepend('<div id="map" style="width: 640px; height: 360px;"></div>');
    // Add map to <main>
    $('#map').after('<div id="Alert" class="hid">Please Select a Location</div>');
    // Add error popup to <main>
    $('#latLon').after('<div id="subButton"><button id="btnSub" type="submit">Get Data</button></div>');
    // Add submit button to <main>
    $('#subButton').after('<div id="weather"></div>');
    // Add data display to <main>
    
    $('#weather').hide();
    // Hide data display on page load
    $('#Alert').hide();
    // Hide error popup on page load

    
    $('main').on('click', '#btnSub', function() //On submit button click...
        {
            var $err = $('#Alert'); //Asign error popup selector to var
            $lat = $('#lati').val(); //Add data from input to var
            $lng = $('#longi').val(); // ^
            if ($lat == '') //If var is empy
            {
                $err.slideDown(); //Show altert
                if ($err.hasClass('shown')) //If submit button is clicked while error is shown
                {
                    $err.fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); //Flash error
                }
                $err.addClass('shown');
                $err.removeClass('hid');
            }
            else
            {    
                getTemp($lat,$lng); //Call function to get weather data based on lat and lon 
                $('#map').slideUp();
                $('#btnSub').removeAttr('id').attr('id','btnFsh').text('Locations'); //Change button properties 
                $('#weather').slideDown(); 
                $('#latLon').animate({opacity: '0.5'});
                $err.hide();
                $err.addClass('hid');
                $err.removeClass('shown');
            }
        });
    
    $('main').on('click', '#btnFsh', function() //On locations button click
        {   
            clearLatLon(); //Call function to clear inputs
            clearResults(); //Call function to clear data display
            $('#map').slideDown();
            $('#btnFsh').removeAttr('id').attr('id','btnSub').text('Get Data'); //Change button properties 
            $('#weather').slideUp();
            $('#LAT').addClass('latPre');
            $('#LON').addClass('lonPre');
            $('#latLon').animate({opacity: '1'})
        });
    
    
    
    function clearResults()
    {
        $('#weather').children().remove(); //Remove the childeren of the data display, thus clearing it
    }
    
    function clearLatLon()
    {
        $('#lati').val(''); //Set both inputs to an empty string
        $('#longi').val(''); // ^
        
    }
    
    function getTemp(lat,lng)
    {
        $.getJSON('//api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lng+'&appid='+owmAPI).done(
        function(data)
        {   
            clearResults();
            var things = data.main;
            var lstItem = '';
            
            var clouds = data.clouds.all; //Gather cloud cover data
            lstItem += '<p> Cloud Cover: ' + clouds + '%</p>';
            
            var wnd = data.wind.speed; //Get wind speed
            var wndSpd = wnd * 2.23694; // Convert from Meters/seccond to MPH
            var rndSpd = Math.round( wndSpd * 10)/10; //Trim off some extra decimals
            lstItem += '<p> Wind: ' + rndSpd + ' MPH </p>';
                        
            var locName = data.name; //Get location Name
            lstItem += '<p>' + locName + '</p>';
            
            $('#weather').append(lstItem);
        }).fail(function() //If API fails to get data
                {
                    clearResults(); //Clear the data display
                    $('#weather').append('<p>Error retrieving data :( </p>'); //Show error
                }); 
    }
    
    
    
    
 });
