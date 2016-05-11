//5/11/2016 2:06
$(function () {
    //*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_
    //set up variables
    //*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_
    var $event = $('#events');
    var $performer = $('#performers');
    var $venue = $('#venues');
    var $mPage = $('#mPage');
    var $sType = $('#sType');
    var $displayOptions = $('#displayOptions');
    var $searchresults = $('#SearchResults');
    var $error = '';
    var apikey = '';
    var $visited = '';

    //*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_
    //checking ajax
    //*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_
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
    });

    //function to display type of search
    //this one is for event
    $event.on("click", function () {
        var $evSearch = '';
        var $back = '';
        var $evSearchfrm = '';

        toggleDisplays();
        $mPage.append('<div id = "evSearch"></div>');
        $evSearch = $('#evSearch');
        $evSearch.append('<form id = "eventSearch"><label>What type of event?</label><input type="text" name="eType" id="eType"><label>Enter a City, State, or Zip code: </label><input type="text" name="location" id="location"><input type="submit" name="Submit" value="Submit"></form>');
        $evSearch.prepend('<h2>Search for types of events</h2>');
        $evSearchfrm = $('#eventSearch');
        $mPage.append('<input type ="button" name ="back" id = "back" value = "go back"/>');
        $back = $('#back');


        $evSearch.on('submit', function (e) {
            eventType = $('#eType').val();
            uLocation = $('#location').val();
            e.preventDefault();
            getEventData(eventType, uLocation);
            //searchDisplayToggle();
            $searchresults.show();
            //$evSearch.remove();
        });

        //Function to get json data for events
        function getEventData(eventType, uLocation) {

            var eventApi = 'http://api.eventful.com/json/events/search?q=' + eventType + '&l=' + uLocation + '&cors_filter=1&app_key=' + apikey;

            /* console.log("apikey=" + apikey);*/
            console.log("eventType=" + eventType);
            console.log("uLocation=" + uLocation);


            $.getJSON(eventApi)
                .done(function (data) {
                    addNewEvent(data);
                }).fail(function () {
                    $('#API').append('<p> Can not load data </p>');
                });
        }



        $back.on("click", function () {
            toggleDisplays();
            $evSearch.remove();
            $("#eventContent").remove();
            //searchDisplayToggle();
            $searchresults.hide();
            $back.remove();
        });

    }); //end of event set up, adds for each are at bottom
    //Begin Performer setup
    $performer.on("click", function () {
        var $performerContent = '';
        var $perSearch = '';
        var $back = '';
        var $perSearchfrm = '';
        toggleDisplays();
        $mPage.append('<div id = "perfSearch"></div>');
        $perSearch = $('#perfSearch');
        $perSearch.append('<form id = "performerSearch"><label>What specific perfomer are you looking for?</label><input type="text" name="pType" id="pType"><label>Enter a City, State, or Zip code: </label><input type="text" name="location" id="location"><input type="submit" name="Submit" value="Submit"></form>');
        $perSearch.prepend('<h2>Search for a specific performer</h2>');
        $perSearchfrm = $('#performerSearch');

        $mPage.append('<input type ="button" name ="back" id = "back" value = "go back"/>');
        $back = $('#back');

        $perSearch.on('submit', function (e) {
            pFormer = $('#pType').val();
            uLocation = $('#location').val();
            e.preventDefault();
            getPerformerData(pFormer, uLocation);
            // $perSearchfrm.remove();
        });

        //Function to get json data for performers
        function getPerformerData(pFormer, uLocation) {

            var performerApi = 'http://api.eventful.com/json/performers/search?q=' + pFormer + '&l=' + uLocation + '&cors_filter=1&app_key=' + apikey;

            console.log("performer=" + pFormer);
            console.log("location=" + uLocation);


            $.getJSON(performerApi)
                .done(function (data) {
                    addNewPerformer(data);
                }).fail(function () {
                    $('#API').append('<p> Can not load data </p>');
                });
        }
        $back.on("click", function () {
            toggleDisplays();
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

        toggleDisplays();
        $mPage.append('<div id = "venueSearch"></div>');
        $venSearch = $('#venueSearch');
        $venSearch.append('<form id = "venueSearchfrm"><label>What specific venue are you looking for?</label><input type="text" name="vType" id="vType"><label>Enter a City, State, or Zip code: </label><input type="text" name="location" id="location"><input type="submit" name="Submit" value="Submit"></form>');
        $venSearch.prepend('<h2>Search for a specific venue</h2>');
        $venSearchfrm = $('#venueSearchfrm');
        $mPage.append('<input type ="button" name ="back" id = "back" value = "go back"/>');
        $back = $('#back');


        $venSearch.on('submit', function (e) {
            uVenue = $('#vType').val();
            uLocation = $('#location').val();
            e.preventDefault();
            getVenueData(uVenue, uLocation);
            $searchresults.show();
            //$venSearchfrm.remove();
        });

        //Function to get json data for performers
        function getVenueData(uVenue, uLocation) {

            var venueApi = 'http://api.eventful.com/json/venues/search?q=' + uVenue + '&l=' + uLocation + '&cors_filter=1&app_key=' + apikey;

            /* console.log("apikey=" + apikey);*/
            console.log("venueType=" + uVenue);
            console.log("location=" + uLocation);


            $.getJSON(venueApi)
                .done(function (data) {
                    addNewVenue(data);
                }).fail(function () {
                    $('#API').append('<p> Can not load data </p>');
                });
        }
        $back.on("click", function () {
            toggleDisplays();
            $("#venuesContent").remove();
            $venSearch.remove();
            $back.remove();

        });

    });

    ///////////////////////////////////end of displaying seaches\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    //begin functions for adding data
    //first is for event type
    function addNewEvent(data) {
        if (data.total_items == 0) {
            $mPage.append('<p id ="error"> Error no information was returned, Try Again! Hint: click me to reset form!</p>');
            $('p#error').on("click", function () {
                $('p#error').remove();
                $('#eventSearch').trigger("reset");
            });
        } else {

            var nItem = '';
            nItem += '<h3>Event type chosen was' + ' ' + data.events.event[0].title + '</h3>';
            nItem += '<p>Description: ' + data.events.event[0].description + '</p>';
            $("#searchContent").append('<div id = eventContent>' + nItem + '</div>');
            $('#evSearch').remove();
        }

    }

    //this is for adding performer
    function addNewPerformer(data) {
        if (data.total_items == 0) {
            $mPage.append('<p id ="error"> Error no information was returned, Try Again! Hint: click me to reset form!</p>');
            $('p#error').on("click", function () {
                $('p#error').remove();
                $('#performerSearch').trigger("reset");
            });
        } else if (data.total_items == 1) {
            var nItem = '';
            nItem += '<h3>Performer chosen was' + ' ' + data.performers.performer.name + '</h3>';
            nItem += '<p>Description: ' + data.performers.performer.short_bio + '</p>';
            $("#searchContent").append('<div id = performerContent>' + nItem + '</div>');
            $('#perfSearch').remove();          
        } else {
            var nItem = '';
            nItem += '<h3>Performer chosen was' + ' ' + data.performers.performer[0].name + '</h3>';
            nItem += '<p>Description: ' + data.performers.performer[0].short_bio + '</p>';
            $("#searchContent").append('<div id = performerContent>' + nItem + '</div>');
            $('#perfSearch').remove();

        }
    }

    //this is for adding venue
    function addNewVenue(data) {
        if (data.total_items == 0) {
            $mPage.append('<p id ="error"> Error no information was returned, Try Again! Hint: click me to reset form!</p>');
            $('p#error').on("click", function () {
                $('p#error').remove();
                $('#venueSearchfrm').trigger("reset");
            });
        } else {
            var nItem = '';
            nItem += '<h3>Venues included ' + ' ' + data.venues.venue[0].venue_name + '</h3>';
            nItem += '<p>Description: ' + data.venues.venue[0].description + '</p>';
            $("#searchContent").append('<div id = venuesContent>' + nItem + '</div>');
            $searchresults.show();
            $('#venueSearch').remove();
        }
    }
    //this is for toggle displays
    function toggleDisplays() {
        $sType.toggle("slow");
        $displayOptions.toggle("slow");

    }
    // function searchDisplayToggle() {
    //   $searchresults.toggle();
    //$evSearch.remove();       
    //    }
    function goBack() {
        var $back = '';
        $mPage.append('<input type ="button" name ="back" id = "back" value = "go back"/>');
        $back = $('#back');
    }

});