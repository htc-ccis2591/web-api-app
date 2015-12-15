$(document).ready(function () {
            
    weatherApp = {
        $target: $("#weather"),
        weatherApiKey: "",
        localStorageKey: "wundergroundWeather",

        saveApi: function () {
            if (weatherApp.weatherApiKey === null || weatherApp.weatherApiKey === "") {
                weatherApp.weatherApiKey = $("#apikey").val().trim();
                weatherApp.saveApiKey();
            }
        },
        
        getForecast: function () {
            var state = $("#state").val().trim();
            var city = $("#city").val().trim();
            weatherApp.getSearch(state,city)
        },

        getGeo: function () {
            var state = $("#state").val().trim();
            var city = $("#city").val().trim();
            weatherApp.getCity(state,city)
        },
        
        getHour: function () {
            var state = $("#state").val().trim();
            var city = $("#city").val().trim();
            weatherApp.getHourly(state,city)
        },
        
        //FORECAST
        getSearch: function (sstate,scity) {
            var url = "http://api.wunderground.com/api/" + weatherApp.weatherApiKey + "/forecast/q/" + sstate + "/" + scity +".json";
            $.getJSON(url, function (data) {
                weatherApp.$target.html("");
                if (data.response.error) {
                    weatherApp.$target.append(data.response.error.description);
                }
                else if (data.response.results) {
                    weatherApp.$target.html("Error: Data is not available." + "<br>" + "Do you want to continue your search?" + "<br><br>" + "* Check if you missed your state search" + "<br>" + "* Try to search another state." + "<br>" + "Please try again later.");
                } 
                else {
                    var listState = data.forecast.simpleforecast.forecastday,
                    count = listState.length;
                    if (count > 0){
                        $.each(listState, function(i, obj){ 
                            var img = $('<img />', { 
                            src: obj.icon_url
                            });
                            weatherApp.$target.append(img)
                            day = obj.date.pretty
                            weekday = obj.date.weekday
                            condition = obj.conditions 
                            high = obj.high.fahrenheit
                            low = obj.low.fahrenheit
                            weatherApp.$target.append('<p>' + condition + "<br>" + weekday + ", "  + day  + "<br>" + "High: " + high + " °F " + "<br>" + "Low: " + low + " °F " + '</p>'); 
                        }); //end each
                    } //end if count check
                } //end elseif    
               }).error(function () {
               weatherApp.$target.html("Error: No data found.");
            }); //getJSON
        },

            //GEOLOOKUP
        getCity: function (sstate,scity) {
            var url = "http://api.wunderground.com/api/" + weatherApp.weatherApiKey + "/geolookup/q/" + sstate + "/" + scity +".json"; 
            $.getJSON(url, function (data) {         
                weatherApp.$target.html("");
                if (data.response.error) {
                    weatherApp.$target.append(data.response.error.description);
                }
                else if (data.response.results) {
                    weatherApp.$target.html("Error: Data is not available." + "<br>" + "Do you want to continue your search?" + "<br><br>" + "* Check if you missed your state search" + "<br>" + "* Try to search another state." + "<br>" + "Please try again later.");
                } 
                else if (data.location) {
                geoLocation = data.location.city + ", " + data.location.state;
                geoCountry = data.location.country_name;
                geoLatitude = data.location.lat;   
                geoLongitude = data.location.lon;
                geoZip = data.location.zip; 
                weatherApp.$target.append('<p>' + "City: " +  geoLocation +  "<br>" + "Country: " +  geoCountry + "<br>" + "Latitude: " +  geoLatitude + "<br>" + "Longitude: " +  geoLongitude + "<br>" + "Zipcode: " +  geoZip +'</p>'); 
                }
                else {
                    weatherApp.$target.html("Error: Please provide your state to continue.");
                }
                }).error(function () {
               weatherApp.$target.html("Error: No data found.");
            }); //getJSON
        },  
        
        
            //HOURLY
        getHourly: function (sstate,scity) {
            var url = "http://api.wunderground.com/api/" + weatherApp.weatherApiKey + "/hourly/q/" + sstate + "/" + scity +".json";
            $.getJSON(url, function (data) {
                weatherApp.$target.html("");
                if (data.response.error) {
                    weatherApp.$target.append(data.response.error.description);
                }
                else if (data.response.results) {
                    weatherApp.$target.html("Error: Data is not available." + "<br>" + "Do you want to continue your search?" + "<br><br>" + "* Check if you missed your state search" + "<br>" + "* Try to search another state." + "<br>" + "Please try again later.");
                } 
                else {
                    var listHourly = data.hourly_forecast,
                    count = listHourly.length;
                    if (count > 0){
                        $.each(listHourly, function(i, obj){ 
                            var img = $('<img />', { 
                            src: obj.icon_url
                            });
                            weatherApp.$target.append(img)
                            temp = obj.temp.english
                            condition = obj.condition
                            datetime = obj.FCTTIME.pretty
                            feelslike = obj.feelslike.english
                            weatherApp.$target.append('<p>' + temp + " °F " + "<br>" + condition + "<br>" + datetime + "<br>" + "Feels Like : " + feelslike + " °F " +'</p>'); 
                        }); //end each
                    } //end if count check

                } //end elseif    
            }).error(function () {
               weatherApp.$target.html("Error: No data found.");
            }); //getJSON
        },
        
        loadApiKey: function () {
            if (typeof (localStorage) === 'undefined') {
                weatherApp.$target.html("Sorry, local storage is not supported for this browser.");
            } else {
                //Get API Key
                weatherApp.weatherApiKey = localStorage.getItem(weatherApp.localStorageKey);
                if (weatherApp.weatherApiKey === null || weatherApp.weatherApiKey === "") {
                    //weatherApp.$target.html("Sorry, no api key was found.");
                    return false;
                }
                return true;
            }
        },
        saveApiKey: function () {
            if (typeof (localStorage) === 'undefined') {
                weatherApp.$target.html("Sorry, local storage is not supported for this browser.");
            } else {
                if (weatherApp.weatherApiKey === null || weatherApp.weatherApiKey === "") {
                    weatherApp.$target.html("Sorry, no api key was found.");
                } else {
                    localStorage.setItem(weatherApp.localStorageKey, weatherApp.weatherApiKey);
                    $("#apidiv").attr("class", "hide");
                }
            }
        },

    }//weatherApp
    weatherApp.$target.html("Welcome to my page!");
    // Form submit handler
    $("#save").click(function () {
        weatherApp.saveApi();
    });
    $("#forecast").click(function () {
        weatherApp.getForecast();
        
        return false;
    });
    $("#geolookup").click(function () {
        weatherApp.getGeo();
        
        return false;
    });
    $("#hourly").click(function () {
        weatherApp.getHour();
        
        return false;
    });

    if (weatherApp.loadApiKey()) {   
        $("#apidiv").hide();
        $("#infodiv").show();
        $("#city").focus();
    }
});