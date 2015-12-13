$(document).ready(function () {

    weatherApp = {

            $targetArea: $("#weather"),

            weatherApiKey: "",

            localStorageKey: "openWeatherApi",

            getFormData: function () {
                if (weatherApp.weatherApiKey === null || weatherApp.weatherApiKey === "") {
                    
                    weatherApp.weatherApiKey = $("#apikey").val().trim();
                    weatherApp.saveApiKey();
                }

                var city = $("#city").val().trim();
                if (city === null || city.length < 5) {

                    weatherApp.$targetArea.html("Enter a city");
                } else {
                    weatherApp.getWeatherData(city);
                }
console.log(weatherApiKey);
            },

            getWeatherData: function (city) {
                var url = "api.openweathermap.org/data/2.5/forecast?q=" + city + ",us&type=like&mode=html " + weatherApp.weatherApiKey + " &units=imperial";
                $.getJSON(url, function (data) {

                    if (data.cod === 200) {


                        Desc = $("<p>").insertAfter("#weather");
                        console.log(Desc);

                        cityDesc = data.city.name;
                   
                        
                         console.log(cityDesc);
                        console.log(cityTemp);

                        display = weatherApp.$targetArea.html("The current weather is: " + cityDescDesc + ".  The current temperature is: " + cityTempTemp + " F.");
                        $(Desc).append(display);

                       

                    } else {
                        weatherApp.$targetArea.html("Sorry, no weather data is available.  Try again later.");
                    }

                }).fail(function () {
                    weatherApp.$targetArea.html("Sorry, no weather data is available.  Try again later.");
                });

            },


            loadApiKey: function () {
                if (typeof (localStorage) === 'undefined') {
                    weatherApp.$targetArea.html("Sorry, local storage is not supported for this browser.");
                } else {
                    // Get API Key

                    weatherApiKey = localStorage.getItem(weatherApp.localStorageKey);
                    if (weatherApiKey === null || weatherApp.weatherApiKey === "") {
                        //weatherApp.$targetArea.html("Sorry, no api key was found.");
                        return false;
                    }
                    return true;
                }
            },


            saveApiKey: function () {
                if (typeof (localStorage) === 'undefined') {

                    weatherApp.$targetArea.html("Sorry, local storage is not supported for this browser.");
                } else {
                    if (weatherApp.weatherApiKey === null || weatherApp.weatherApiKey === "") {
                        //weatherApp.$targetArea.html("Sorry, you must have an API Key.");
                    } else {
                        localStorage.setItem(weatherApp.localStorageKey, weatherApp.weatherApiKey);
                        $("#apiDiv").attr("class", "hide");
                    }
                }
            }
        },

        $("#submit").click(function () {
            weatherApp.getFormData();
            return false;
        });
    if (weatherApp.loadApiKey()) {
        $("#apiDiv").attr("class", "hide");
    };



});