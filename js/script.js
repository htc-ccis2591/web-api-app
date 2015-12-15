




// EVENT LISTENERS
$('#submit').on('click', function () {
    ApplicationObject.geocodeAddress(geocoder, ApplicationObject.map);
});
$("#saveTarget").on('click', function () {
    if (ApplicationObject.variables.target != null) {
        ApplicationObject.saveTargert(ApplicationObject.variables.target.title, ApplicationObject.variables.target.title)
    }
});
$("#myLocButton").on('click', function () {
    ApplicationObject.getLocation()
});
$("#loadTargert").on('click', function () {
    ApplicationObject.callloadSaves()
});
$("#clearMap").on('click', function () {
    ApplicationObject.clearMarkers()
});
$("#clearSaves").on('click', function () {
    localStorage.clear();
})







// object for finding places by search string 
var geocoder = new google.maps.Geocoder();








// ApplicationObject.map
var ApplicationObject = {
        
        "map" :   map = new google.maps.Map(document.getElementById('map'), {
        zoom: 9,
        center: { lat: 45.0419073, lng: -93.78913310000002 }
    }),
        "variables": {

        "gmarkers": [],
        "weatherdata": [],
        "mylat": null,
        "mylng": null,
        "target": null,
        "targetLat": null,
        "targetLng": null,
        "timeZonedata" : []


    },

    
        "geocodeAddress": function(geocoder, resultsMap) {
            // Sends the value of the search box to google, returns a Lat, Lng. If successful, centers map and places pin. 
            // Pushes markers to the gmarkers array and adds click listeners to them.
            // Calls Display Data with arguments of the current marker.

            var address = document.getElementById('pac-input').value;

            geocoder.geocode({ 'address': address }, function (results, status) {

                if (status === google.maps.GeocoderStatus.OK) {

                    resultsMap.setCenter(results[0].geometry.location);

                    var marker = new google.maps.Marker({
                        title: address,
                        map: resultsMap,

                        position: results[0].geometry.location

                    });
                    ApplicationObject.displayLocationData(marker);

                    marker.addListener('click', function () {
                        ApplicationObject.displayLocationData(this)
                    });
                    ApplicationObject.variables.gmarkers.push(marker);


                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
        },
        "displayLocationData": function(marker) {
            // Sets global application target variables to values of the argument marker.
            // Emptys currently displayed data.
            // appends location data to the screen
            // Calls get weather function with the location of the argument marker
            // Calls get time zone data

            ApplicationObject.variables.target = marker;
            ApplicationObject.variables.targetLat = marker.position.lat();
            ApplicationObject.variables.targetLng = marker.position.lng();
            $("#target-display").empty();
            $("#dataShowCase").empty();
            $("#dataShowCase2").empty();
            $("#target-display").append("<h2>" + 'Your Current Focus Is' + ' ' + marker.title + "</h2>");

            $("#dataShowCase").append("<h3>" + 'Latitude = ' + Math.floor(ApplicationObject.variables.targetLat) + "</h3>");
            $("#dataShowCase").append("<h3>" + 'Longitude = ' + Math.floor(ApplicationObject.variables.targetLng) + "</h3>");
            ApplicationObject.getweatherdata(ApplicationObject.variables.targetLat, ApplicationObject.variables.targetLng);
            ApplicationObject.getTimezoneData();

        },
        "displayWeatherData": function() {
            // Calculates the temp from kalvins to ferinheight
            // Appends retrieved weather data to the screen

            var Ftemp = (ApplicationObject.variables.weatherdata.main.temp - 273.15) * 9 / 5 + 32
            $("#dataShowCase").append("<h3> The Current Temp Is " + Math.floor(Ftemp) + ' F' + "</h3>");
            $("#dataShowCase").append("<h3>" + 'Weather Status =' + ' ' + ApplicationObject.variables.weatherdata.weather[0].description + "</h3");
            $("#dataShowCase2").append("<h3>" + 'Humidity =' + ' ' + ApplicationObject.variables.weatherdata.main.humidity + "</h3");
            $("#dataShowCase2").append("<h3>" + 'Wind Speed =' + ' ' + ApplicationObject.variables.weatherdata.wind.speed + "</h3");
        },
        "getLocation": function () {
            // checks if the browser can use geolocation if true calls the show position message

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(ApplicationObject.showPosition);
            } else {
                $("#my-loc").append("Geolocation is not supported by this browser.");
            }
        },
        "showPosition": function (position) {
            // Emptys the my location div
            // Appends with users current Lat and Lng
            // calls setmaponme

            $("#my-loc").empty()
            $("#my-loc").append("Latitude: " + position.coords.latitude + "        " + "Longitude: " + position.coords.longitude);
            ApplicationObject.variables.mylat = position.coords.latitude;
            ApplicationObject.variables.mylng = position.coords.longitude;
            ApplicationObject.setMapOnMe(ApplicationObject.variables.mylat, ApplicationObject.variables.mylng)
        },
        "setMapOnMe": function (MyClat, MyClng) {

            // Zooms map in and centers on users location
            // sets a yellow marker on user lat and lng

            var OverMemap = ApplicationObject.map

            var marker = new google.maps.Marker({
                title: "Your Location",
                map: OverMemap,

                position: ({ lat: MyClat, lng: MyClng })

            });
            ApplicationObject.variables.gmarkers.push(marker);
            marker.setIcon('http://maps.google.com/mapfiles/ms/icons/yellow-dot.png')
            marker.addListener('click', function () {
                ApplicationObject.displayLocationData(this)
            });


            ApplicationObject.map.setCenter({ lat: MyClat, lng: MyClng })
            ApplicationObject.map.setZoom(15)
        },
        "clearMarkers": function () {
            // sets each marker inside the gmarkers array to null and removes them from the map.
            // sets the gmarkers array abck to []

            for (i = 0; i < ApplicationObject.variables.gmarkers.length; i++) {
                ApplicationObject.variables.gmarkers[i].setMap(null)

            }
            ApplicationObject.variables.gmarkers = [];
        },
        "getweatherdata": function(lat, lng) {
            // concats lat and lng arguments into api string
            // makes an AJAX call to return weahter data
            // sets application weather data to the returned JSON
            // Calls DIsplay Weather Data Function

            lat = Math.floor(lat);
            lng = Math.floor(lng);

            var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lng + "&APPID=25a24a0c9dbfc4defcd4590090bc0425"
            $.ajax({
                type: "GET",
                url: url,
                datatype: "json",
                success: function (data) {
                    if (data.message != "Error: Not found city") {
                        ApplicationObject.variables.weatherdata = data
                        ApplicationObject.displayWeatherData()
                    }
                    else {
                        alert("FAILED")
                    }
                }

            })
        },
        "saveTargert": function(key, title) {
            // Saves the sets the name of the targeted marker to the local storage
            // changes the color of the saved marker to purple 

            localStorage.setItem(key + "name", title)
            ApplicationObject.variables.target.setIcon('http://maps.google.com/mapfiles/ms/icons/purple-dot.png')
        },
        "loadSaves": function(geocoder, resultsMap, loadItem) {
            // Called in a loop for each item in localstorage by the callloadsaves function
            // takes current argument and asks google for a lat and lng 
            // sets a purple marker on the location
            // appneds the gmarkers array 

            var address = loadItem;

            geocoder.geocode({ 'address': address }, function (results, status) {

                if (status === google.maps.GeocoderStatus.OK) {

                    resultsMap.setCenter(results[0].geometry.location);

                    var marker = new google.maps.Marker({
                        title: address,
                        map: resultsMap,

                        position: results[0].geometry.location

                    });

                    marker.setIcon('http://maps.google.com/mapfiles/ms/icons/purple-dot.png')
                    marker.addListener('click', function () {
                        ApplicationObject.displayLocationData(this)
                    });
                    ApplicationObject.variables.gmarkers.push(marker);


                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });

        },
        "callloadSaves": function () {
            // helper function for loadsaves event handler
            // calls load saves in a loop

            for (i = 0; i < localStorage.length; i++) {
                var address = localStorage.getItem(localStorage.key(i))
                ApplicationObject.loadSaves(geocoder, ApplicationObject.map, address)
            }
        },
        "getTimezoneData": function() {
            // concats lat and lng arguments into api string
            // makes an AJAX call to return time zone data
            // sets application time zone data to the returned JSON
            
            var url = "https://maps.googleapis.com/maps/api/timezone/json?location=" + ApplicationObject.variables.targetLat + ',' + ApplicationObject.variables.targetLng + "&timestamp=1331161200&key=AIzaSyB2omGUXpH3xHLElK91RiyixLJL28DEH9I"
            $.ajax({
                type: "GET",
                url: url,
                datatype: "json",
                success: function (data) {
                   
                        ApplicationObject.variables.timeZonedata = data
                        ApplicationObject.displayTimeData()
                   
                }

            })
        },
        "displayTimeData": function () {
         // displays time zone data to the screen
            
            $("#dataShowCase2").prepend("<h3>" + ApplicationObject.variables.timeZonedata.timeZoneName + "</h3>");
        }
}

















   






































 