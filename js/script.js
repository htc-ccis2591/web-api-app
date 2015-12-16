(function () {
    
    $('#search').on('click', function () {
        ApplicationObject.geocodeAddress(geocoder, ApplicationObject.map);
        $("#searchtext").val('');
    });
    
    $("#clearMap").on('click', function () {
        ApplicationObject.clearMap()
    });
    
    function titleCase (val) {
                return val.charAt(0).toUpperCase()+val.substr(1).toLowerCase();
    };
    
    var geocoder = new google.maps.Geocoder();
    
    var ApplicationObject = {
            "map" :   map = new google.maps.Map(document.getElementById('map'), {
            zoom: 9,
            center: { lat: 45, lng: -93.25 }
        }),
            "variables": {
            "gmarkers": [],
            "target": null,
        },
        
            "geocodeAddress" : function(geocoder, resultsMap) {
                var address = document.getElementById('searchtext').value;
                geocoder.geocode({ 'address': address }, function (results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        resultsMap.setCenter(results[0].geometry.location);
                        var marker = new google.maps.Marker({
                            title: address,
                            map: resultsMap,
                            position: results[0].geometry.location
                        });
                        ApplicationObject.displayLocation(marker);
                        marker.addListener('click', function () {
                            ApplicationObject.displayLocation(this)
                        });
                        ApplicationObject.variables.gmarkers.push(marker);
                    } else {
                        alert('Geocode was not successful for the following reason: ' + status);
                    }
                });
            },

            "displayLocation" : function(marker) {
                ApplicationObject.variables.target = marker;
                $("#title").empty();
                $("#title").append("<h2>" + titleCase(marker.title) + "</h2>");
            },
        
            "clearMap" : function () {
                for (i = 0; i < ApplicationObject.variables.gmarkers.length; i++) {
                    ApplicationObject.variables.gmarkers[i].setMap(null)
                }
                ApplicationObject.variables.gmarkers = [];
                $("#title").empty();
                $("#title").append("<h2>Google Maps API</h2>")
            },
    }
}());