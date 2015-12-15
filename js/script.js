
$(document).ready(function () {

    console.log("hello");

    weatherApp = {
        
        $targetArea : $("#weather"),
        $targetArea1 : $("#test"),
        
        weatherApiKey : "",
        
        localStorageKey : "openWeatherApi",

        getFormData : function () {
            if (weatherApp.weatherApiKey === null || weatherApp.weatherApiKey === "" ) {
                weatherApp.weatherApiKey = $("#apikey").val().trim();                
                weatherApp.saveApiKey();
            }
            
            var city = $("#city").val().trim();
            city = city.trim();
            if (city === null) {
                weatherApp.$targetArea.html("Enter a City.");
            } else {
                weatherApp.getWeatherData(city);
            }

            console.log(apikey);
            console.log(city);
        },
        
        getWeatherData : function (cityName) {
            
            var url = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + ",us&appid=" + weatherApp.weatherApiKey + "&units=imperial";
            var url2 = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + cityName + "&units=imperial&cnt=7&appid=" + weatherApp.weatherApiKey;
            var url3 = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=" + weatherApp.weatherApiKey;
            
            //function to get current weather data
            $.getJSON(url,function (data) {
                
                if (data.name.toLowerCase() === cityName.toLowerCase()) {   
                console.log(data);                 
               weatherApp.$targetArea.html("Success!");
                    
                    //add data for current city
                    currentCity = data.name;
                    console.log(currentCity);
                    $("#test").html(currentCity)

                    //add data for current temperature
                    currentTemp = data.main.temp;
                    console.log(currentTemp);
                    $("#test2").html(currentTemp + " °F");
                    
                    //add data for current country conditions
                    currentSys = data.sys.country;
                    console.log(currentSys);
                    $("#test4").html(currentSys);

                    //add data for current weather conditions
                    currentWeather = data.weather[0].description;
                    console.log(currentWeather);
                    
                    if (currentWeather === "sky is clear") {
                        $('#theDiv').html('<img id="theImg" src="images/sunny.png" />');
                    } else if (currentWeather === "scattered clouds" || currentWeather === "few clouds" || currentWeather === "overcast clouds") {
                        $('#theDiv').html('<img id="theImg" src="images/cloudy.png" />');
                    } else if (currentWeather === "Thunderstorm") {
                        $('#theDiv').html('<img id="theImg" src="images/thunder.png" />');
                    } else if (currentWeather === "snow") {
                        $('#theDiv').html('<img id="theImg" src="images/snow.png" />');
                    } else if (currentWeather === "Rain" || currentWeather === "shower rain") {
                        $('#theDiv').html('<img id="theImg" src="images/rain.png" />');
                    } else if (currentWeather === "mist") {
                        $('#theDiv').html('<img id="theImg" src="images/mist.png" />');
                    } else {
                        $('#theDiv').html('<h1>' + currentWeather + "</h1>");
                    } 
                                        

            //function to get forecast weather data
            $.getJSON(url2,function (data) {
                console.log(data);

                //add data for humidity forecast
                var text = ""
                for (i = 0; i < 7; i++) {
                    $("#test3").html(text += (i + 1) + ": " + data.list[i].humidity + "% ");
                }
            });            
            
            $.getJSON(url3,function (data) {
                console.log(data);

                //add data for temperature every 3 hours for 24 hours
                var text2 = ""
                for (i = 1; i <= 8; i++) {
                    $("#test5").html(text2 += (i) + ": " + data.list[i].main.temp + "°F ");
                }


            });

                
                } else {
                    weatherApp.$targetArea.html("Sorry, no weather data available. Try again later.");
                }
            }).fail( function() {
                weatherApp.$targetArea.html("Sorry, no weather data available. Try again later.");
            });
        },

        loadApiKey : function () {
            if (typeof (localStorage) === 'undefined') {
                weatherApp.$targetArea.html("Sorry, local storage is not supported for this browser.");
            } 
            
            else {
                // Get API Key  
                
                weatherApp.weatherApiKey = localStorage.getItem(weatherApp.localStorageKey);
                if (weatherApp.weatherApiKey === null || weatherApp.weatherApiKey === "" ) {
                    //weatherApp.$targetArea.html("Sorry, no api key was found.");
                    return false;
                } 
                return true;
            }
        },

        saveApiKey : function () {
            if (typeof (localStorage) === 'undefined') {
                weatherApp.$targetArea.html("Sorry, local storage is not supported for this browser.");
            } 
            
            else {
                if (weatherApp.weatherApiKey === null || weatherApp.weatherApiKey === "" ) {
                    weatherApp.$targetArea.html("Sorry, you must enter an API Key.");
                } else {
                    localStorage.setItem(weatherApp.localStorageKey, weatherApp.weatherApiKey);
                    $("#apidiv").attr("class", "hide");
                }
            }
        }
    }
    
    // Form submit handler
    $("#submit").click(function () {
        weatherApp.getFormData();
        return false;
    });
    
    if ( weatherApp.loadApiKey() ) {
        $("#apikey").attr("class", "hide");
    }

});