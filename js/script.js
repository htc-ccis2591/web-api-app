$(function () {
    var $event = $('#events');
    var $performer = $('#performers');
    var $venue = $('#venues');
    var apikey = '';
    var $mPage = $('#mPage');
    var $sType = $('#sType');
    var $displayOptions = $('#displayOptions');
    $.ajax({
       beforeSend: function(xhr) {
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
        //getEventfulData($('#zip').val());
    });
        //function to display type of search
    $event.on("click", function(){
        var $content = '';
        var $evSearch = '';
        $sType.hide();
        $displayOptions.hide();
        $mPage.append('<div id = "content"></div>');   
        $content = $('#content');
        $content.append('<form id = "eventSearch"><label>What type of event?</label><input type="text" name="eType" id="eType"><input type="submit" name="Submit" value="Submit"></form>');
        $evSearch = $('#eventSearch');
        
        $content.prepend('<h2>Search for types of events</h2>');
    //Function to get json data for events
    function getEventData(eventType) {
        
        var eventApi = 'http://api.eventful.com/json/events/search?q=' + eventType + '&cors_filter=1&app_key=' + apikey;
        
       /* console.log("apikey=" + apikey);*/
        console.log("eventType=" + eventType);
        

        $.getJSON(eventApi)
            .done(function (data) {
                addNewItem(data);
            }).fail(function () {
                $('#API').append('<p> Can not load data </p>');
            });
    }
        
        $evSearch.on('submit', function (e) {
            eventType = $('#eType').val();
            e.preventDefault(); 
            getEventData(eventType);
        });
        $('h1').on("click", function(){
            $sType.show();
            $displayOptions.show();
            $content.hide();
        });
    });

    

    function addNewItem(data) {
        var nItem = '';
        nItem += '<h3>Event chosen was' + ' ' + data.title + '</h3>';
        nItem += '<p>Description: ' + data.events[0].description + '</p>';
       // nItem += '<p>' + data.events[0].description + '</p>';
        $('#form').append('<div id = events>' + nItem + '</div>');
    }


});