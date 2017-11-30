
    function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 4,
            center: {lat: 39.8282, lng: -98.579515 }
        });
        map.addListener('click', function(e) {
            $('#lati').val(e.latLng.lat()); //Assign the Lat and Lon to the inputs
            $('#longi').val(e.latLng.lng());
            placeMarkerAndPanTo(e.latLng, map);
        });
    }

    function placeMarkerAndPanTo(latLng, map) {
        var marker = new google.maps.Marker({
        position: latLng,
        map: map
            
    });
    }
