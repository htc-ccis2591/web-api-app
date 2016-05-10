//5/10/2016
$(function () {
    var $event = $('#events');
    var $performer = $('#performers');
    var $venue = $('#venues');
    var $mPage = $('#mPage');
    var $sType = $('#sType');
    var $displayOptions = $('#displayOptions');
    var $searchresults = $('#SearchResults');
    var apikey = '';
    var $visited = '';
    
    
    $.ajax({
        beforeSend: function (xhr) {
            if (xhr.overrideMimeType) {
                xhr.overrideMimeType("application/json");
            }
        }
    });


    $mPage.hide();
    $('form').on('submit', function (e) {
        apikey = $('#apikey').val();
        e.preventDefault();
        $('#API').remove();
        $mPage.show();
        $searchresults.append('<div id = "searchContent"></div>');
        $searchresults.hide();
        //getEventfulData($('#zip').val());
    });
    //function to display type of search
    //this one is for event
    $event.on("click", function () {
        //var $content = '';
        var $evSearch = '';
        var $back = '';
        var $evSearchfrm = '';

        $sType.hide();
        $displayOptions.hide();
        $mPage.append('<div id = "evSearch"></div>');
        $evSearch = $('#evSearch');
        $evSearch.append('<form id = "eventSearch"><label>What type of event?</label><input type="text" name="eType" id="eType"><label>Enter a zip code: </label><input type="text" name="zip" id="zip"><input type="submit" name="Submit" value="Submit"></form>');
        $evSearch.prepend('<h2>Search for types of events</h2>');
        $evSearchfrm = $('#eventSearch');
        $mPage.append('<input type ="button" name ="back" id = "back" value = "go back"/>');
        
        $back = $('#back');
        

        $evSearch.on('submit', function (e) {
            eventType = $('#eType').val();
            zip = $('#zip').val();
            e.preventDefault();
            getEventData(eventType);
            $searchresults.show();
            $evSearch.remove();
        });

        //Function to get json data for events
        function getEventData(eventType, zip) {

            var eventApi = 'http://api.eventful.com/json/events/search?q=' + eventType + '&l=' + zip + '&cors_filter=1&app_key=' + apikey;

            /* console.log("apikey=" + apikey);*/
            console.log("eventType=" + eventType);
            console.log("zipcode=" + zip);


            $.getJSON(eventApi)
                .done(function (data) {
                    addNewEvent(data);
                }).fail(function () {
                    $('#API').append('<p> Can not load data </p>');
                });
        }



        $back.on("click", function () {
            $sType.show();
            $displayOptions.show();
            $evSearch.remove();
            $("#eventContent").remove();
            //$searchresults.hide();
            $back.remove();
        });

    }); //end of event set up, adds for each are at bottom
    //Begin Performer setup
    //var $performer = $('#performers');
        $performer.on("click", function () {
        var $performerContent = '';
        var $perSearch = '';
        var $back = '';
        var $perSearchfrm = '';

        $sType.hide();
        $displayOptions.hide();
        $mPage.append('<div id = "perfSearch"></div>');
        $perSearch = $('#perfSearch');
        $perSearch.append('<form id = "performerSearch"><label>What specific perfomer are you looking for?</label><input type="text" name="pType" id="pType"><input type="submit" name="Submit" value="Submit"></form>');
        $perSearch.prepend('<h2>Search for a specific performer</h2>');
        $perSearchfrm = $('#performerSearch');
        $mPage.append('<input type ="button" name ="back" id = "back" value = "go back"/>');
        
        $back = $('#back');

        $perSearch.on('submit', function (e) {
            pFormer = $('#pType').val();
            e.preventDefault();
            getPerformerData(pFormer);
            $perSearchfrm.remove();
        });

        //Function to get json data for performers
        function getPerformerData(pFormer) {

            var performerApi = 'http://api.eventful.com/json/performers/search?q=' + pFormer + '&cors_filter=1&app_key=' + apikey;

            /* console.log("apikey=" + apikey);*/
            console.log("performer=" + pFormer);


            $.getJSON(performerApi)
                .done(function (data) {
                    addNewPerformer(data);
                }).fail(function () {
                    $('#API').append('<p> Can not load data </p>');
                });
        }
        $back.on("click", function () {
            $sType.show();
            $displayOptions.show();
            $perSearch.remove();
            $("#performerContent").remove();
            $back.remove();
        });

    });
    //end of adding performer part
    //begin venue
    $venue.on("click", function () {
        var $content = '';
        var $venSearchfrm = '';
        var $venSearch = '';
        var $back = '';

        $sType.hide();
        $displayOptions.hide();
        $mPage.append('<div id = "venueSearch"></div>');
        $venSearch = $('#venueSearch');
        $venSearch.append('<form id = "venueSearchfrm"><label>What specific venue are you looking for?</label><input type="text" name="vType" id="vType"><input type="submit" name="Submit" value="Submit"></form>');
        $venSearch.prepend('<h2>Search for a specific venue</h2>');
        $venSearchfrm = $('#venueSearchfrm');
        $mPage.append('<input type ="button" name ="back" id = "back" value = "go back"/>');
        $back = $('#back');
       

        $venSearch.on('submit', function (e) {
            uVenue = $('#vType').val();
            e.preventDefault();
            getVenueData(uVenue);
            $venSearchfrm.remove();
        });

        //Function to get json data for performers
        function getVenueData(uVenue) {

            var venueApi = 'http://api.eventful.com/json/venues/search?q=' + uVenue + '&cors_filter=1&app_key=' + apikey;

            /* console.log("apikey=" + apikey);*/
            console.log("venueType=" + uVenue);


            $.getJSON(venueApi)
                .done(function (data) {
                    addNewVenue(data);
                }).fail(function () {
                    $('#API').append('<p> Can not load data </p>');
                });
        }
        $back.on("click", function () {
            $sType.show();
            $displayOptions.show();
            $("#venuesContent").remove();
            $venSearch.remove();
            $back.remove();
            
        });

    });
    
    //end of displaying seaches
    //begin functions for adding data
    //first is for event type
    function addNewEvent(data) {
        var nItem = '';
        nItem += '<h3>Event type chosen was' + ' ' + data.events.event[0].title + '</h3>';
        nItem += '<p>Description: ' + data.events.event[0].description + '</p>';
        $("#searchContent").append('<div id = eventContent>' + nItem + '</div>');
    }
    
    //this is for adding performer
    function addNewPerformer(data) {
        var nItem = '';
        nItem += '<h3>Performer chosen was' + ' ' + data.performers.performer.name + '</h3>';
        nItem += '<p>Description: ' + data.performers.performer.short_bio + '</p>';
         $("#searchContent").append('<div id = performerContent>' + nItem + '</div>');
    }
    
    //this is for adding venue
    function addNewVenue(data) {
        var nItem = '';
        nItem += '<h3>Venues included ' + ' ' + data.venues.venue[0].venue_name + '</h3>';
        nItem += '<p>Description: ' + data.venues.venue[0].description + '</p>';
         $("#searchContent").append('<div id = venuesContent>' + nItem + '</div>');
    }

});