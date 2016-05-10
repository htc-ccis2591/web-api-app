// script.js

$(function () {
    
    var stationImageList = {};
    var stationNameList = {};
    
    //**************************************
    // set up the page's initial state
    //**************************************
    function initPage() {
        
        var jsonURL;
        
        // hide the error message area
        $('.errMessageDiv').hide();
        
        // hide the tables that show results we haven't gotten yet
        $('.dataTable').hide();
        
        // add data picker
        $('#sailDate').datepicker({
            inline:true
        });
        
        // get the station data from local JSON file and populate drop down list
        jsonURL = './stations.json';
        
        $.getJSON(jsonURL)
            .done(function (jsData) {
                
                var newContent = '';
                var statID;
            
                $.each(jsData["stations"], function(key, value){
                    
                    newContent = "<option value='" + value.stationID + "'>";
                    newContent += value.stationName;
                    newContent += "</option>";
                    
                    statID = value.stationID;
                    stationImageList[statID] = value.image;
                    stationNameList[statID] = value.stationName;
                    
                    $('#stations').append(newContent);
                });
            
        })
            .fail( function(jqxhr){
                $('#errMessage').text('Failure retrieving station data.');
                $('.errMessageDiv').show();
        });
        
        
    }
    
    
    //**************************************
    // click event for button that retreives station and tide data
    //**************************************
    $('#doIt').on('click', function(){
        
        var noaaDataType;
        var jsonURL;
        var stationID, imageSource, stationName;
        var newContent = "";
        
        // hide the error message area
        $('.errMessageDiv').hide();
        
        // clear out the old station image
        $('.tableDiv').children('img').remove();
        
        // hide the tables and clear out all the existing table stuff
        $('.dataTable').hide();
        $('.hdrRow').siblings().remove();
        
        // add the image of the selected station
        stationID = $('#stations').val();
        imageSource = "none";
        
        for (var key in stationImageList) {
            if (key = stationID){
                imageSource = stationImageList[key];
                stationName = stationNameList[key];
            }
        }
        
        if (imageSource != "none"){
            newContent = '<img src="./images/' + imageSource + '" class="stationImage">';
            $('#stationTable').before(newContent);
        }
        
        // add the station name and ID of the newly-selected ID
        $('#stationName').text(stationName);
        $('#stationID').text(stationID);
        
        $('#stationTable').show();
                
        
        // get the tide data
        noaaDataType = "tide";
        jsonURL = buildURL(noaaDataType);
        
        getStationData(jsonURL, noaaDataType);
        
        // get wind data
        noaaDataType = "wind";
        jsonURL = buildURL(noaaDataType);
        
        getStationData(jsonURL,noaaDataType);
        
        // get barometric data
        noaaDataType = "barom";
        jsonURL = buildURL(noaaDataType);
        
        getStationData(jsonURL,noaaDataType);
        
    });
    
    
    //**************************************
    // build the URL for retrieving the station info and tide data
    //**************************************
    function buildURL(noaaDataType){
        
        var $myDate = $('#sailDate').datepicker('getDate');
        
        var urlDay;
        var urlMonth;
        var urlYear;
        var urlFullDate;
        var urlDateRange;
        
        var stationID;
        var urlStationID;
        
        var urlProduct;
        
        var jsonURL;
        
        urlYear = $myDate.getFullYear();
        urlMonth = ($myDate.getMonth() + 1).toString();
        urlDay = $myDate.getDate().toString();
        
        if(urlMonth.length < 2) { urlMonth = '0' + urlMonth; }
        if(urlDay.length < 2) { urlDay = '0' + urlDay; }
        
        urlFullDate = urlYear + urlMonth + urlDay;
        urlDateRange = '&begin_date=' + urlFullDate + '%2000:00&end_date=' + urlFullDate + '%2023:59';
        
        stationID = $('#stations').val();
        urlStationID = '&station=' + stationID;
        
        urlProduct = '&product='
        switch(noaaDataType){
                
            case 'tide':
                urlProduct += 'predictions&interval=h&datum=STND';
                break;
            case 'wind':
                urlProduct += 'wind&interval=h';
                break;
            case 'barom':
                urlProduct += 'air_pressure&interval=h';
                break;
            default:
                urlProduct += 'predictions';
                break;
        }
        
        jsonURL = 'http://tidesandcurrents.noaa.gov/api/datagetter?time_zone=lst_ldt&format=json&units=english';
        jsonURL += urlDateRange;
        jsonURL += urlStationID;
        jsonURL += urlProduct;
        
        //console.log('jsonURL for ' + noaaDataType + ' is ' + jsonURL);
        
        return jsonURL;
    }
    
    
    //**************************************
    // Retrieve the CO-OPS api data
    //  call functions to populate the data
    //**************************************
    function getStationData(jsonURL, noaaDataType){
        
        var jsonData = '';
        var yqlURL = 'https://query.yahooapis.com/v1/public/yql';
        
        var yqlData = '{\'q\': \'SELECT * FROM json WHERE url=\"'+ jsonURL;
        yqlData += '\",\'format\': \'json\',\'jsonCompat\': \'new\',\}\;';
        
        $.ajax({
            'type': 'GET',
            'url': yqlURL,
            'data': {
                'q': 'SELECT * FROM json WHERE url="' + jsonURL + '"',
                'format': 'json',
                'jsonCompat': 'new',
            },
            dataType: 'json',
            
            success: function(jsData) {
                var jsonData;
                
                jsonData = jsData.query.results.json;
                
                switch(noaaDataType){
                    case 'barom':
                        loadBaromInfo(jsonData);
                        break;
                    case 'wind':
                        loadWindInfo(jsonData);
                        break;
                    case 'tide':
                        loadTideInfo(jsonData);
                        break;
                    default:
                        break;
                }
            },
            
            fail: function (jqXHR, textStatus) {
                $('#errMessage').text('Failure retrieving ' + noaaDataType + ' data.\n' + textStatus);
                $('.errMessageDiv').show();
            },
            error: function(){
                $('#errMessage').text('Failure retrieving ' + noaaDataType + ' data.');
                $('.errMessageDiv').show();
            }
        });
    }
    
    
    //**************************************
    // Populate the tide informatin table
    //**************************************
    function loadTideInfo(jsonData) {
        
        var fullContent, heightContent, dateContent, myDate;
        var myDateFormat = new Intl.DateTimeFormat(["en-US"],{
                hour12: false,
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit"
            });
        
        $tbl = $('#tidesTable');
            
            
        $.each(jsonData["predictions"], function(key, prediction){
            
            myDate = new Date(prediction.t);
            dateContent = myDateFormat.format(myDate);
            
            heightContent = prediction.v;
            
            fullContent = '<tr><td>' + dateContent + '</td><td>' + heightContent + '</td></tr>';
            
            $tbl.append(fullContent);
        });
        
        $tbl.show();
    }
    
    
    function loadBaromInfo(jsonData) {
        
        var fullContent, heightContent, dateContent, myDate;
        var myDateFormat = new Intl.DateTimeFormat(["en-US"],{
                hour12: false,
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit"
            });
        
        $tbl = $('#baromsTable');
        
        // need to check if we have baromteter data
        //  we won't if we picked a date in the future
        if (!jsonData){
            console.log('no barom history');
        }
        else { 
            $.each(jsonData["data"], function(key, data){

                myDate = new Date(data.t);
                dateContent = myDateFormat.format(myDate);

                heightContent = data.v;

                fullContent = '<tr><td>' + dateContent + '</td><td>' + heightContent + '</td></tr>';

                $tbl.append(fullContent);
            });

            $tbl.show();
            console.log('have barom history')
        ;}
        
    }
    
    
    function loadWindInfo(jsonData) {
        
        var fullContent, directionContent, speedContent, dateContent, myDate;
        var myDateFormat = new Intl.DateTimeFormat(["en-US"],{
                hour12: false,
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit"
            });
        
        $tbl = $('#windsTable');
        
        // need to check if we have wind data
        //  we won't if we picked a date in the future
        if (!jsonData){
            console.log('no wind history');
        }
        else { 
            $.each(jsonData["data"], function(key, data){

                myDate = new Date(data.t);
                dateContent = myDateFormat.format(myDate);
                
                speedContent = data.s;
                directionContent = data.dr;

                fullContent = '<tr><td>' + dateContent + '</td><td>' + directionContent + '</td><td>' + speedContent + '</td></tr>';

                $tbl.append(fullContent);
            });

            $tbl.show();
            console.log('have wind history')
        ;}
    }
    
    
    
//**************************************    

//    Script execution begins here.
    
//**************************************
    
    initPage();
    
});