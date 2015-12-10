$(document).ready(function () {

    weatherApp = {


            $targetArea: $("#weather"),
            weatherApiKey: "",

            localStorageKey: "openWeatherApi",

            getFormData: function () {
                if (weatherApp.weatherApiKey === null || weatherApp.weatherApiKey === "") {
                    weatherApp.weatherApiKey = $("#apiKey").val().trim();
                    weatherApp.saveApiKey();

                }
                var cityName = $("#cityName").val().trim();
                if (cityName === null) {


                    weatherApp.$targetArea.html("no city name");
                } else {
                    weatherApp.$targetArea.html("");
                    //        add code to clear boxes
                    //        weatherApp.getWeatherData(zip);
                    weatherApp.getWeatherData(cityName);
                }
            },
            getWeatherData: function (cityName) {
                var url = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + ",us&appid=" + weatherApp.weatherApiKey + "&units=imperial";

                $.getJSON(url, function (data) {

                    if (data.cod === "200") {
                        $("#lblWeather").append("text");
                        weatherApp.$targetArea.html("success");

                    } else {
                        weatherApp.$targetArea.html("Sorry, no weather data available. Try again later.");
                    }


                }).fail(function () {
                    weatherApp.$targetArea.html("Sorry, no weather data available. Try again later.");
                });
            },
            loadApiKey: function () {
                if (typeof (localStorage) === 'undefined') {
                    weatherApp.$targetArea.html("Sorry, local storage is not supported for this browser.");
                } else {
                    // Get API Key                 
                    weatherApp.weatherApiKey = localStorage.getItem(weatherApp.localStorageKey);
                    if (weatherApp.weatherApiKey === null || weatherApp.weatherApiKey === "") {
                        //                    weatherApp.$targetArea.html("Sorry, no api key was found.");
                        return false;
                    }
                    return true;
                }
            },
            saveApiKey: function () {
                if (typeof (localStorage) === 'undefined') {
                    weatherApp.$targetArea.html("sorry local storage not supported for this browser");
                } else {
                    if (weatherApp.weatherApiKey === null || weatherApp.weatherApiKey === "") {
                        weatherApp.$targetArea.html("Sorry, you must enter an API Key.");
                    } else {
                        localStorage.setItem(weatherApp.localStorageKey, weatherApp.weatherApiKey);
                        $("#apidiv").attr("class", "hide");
                    }
                }
            }
        }
        //submit form
    $("#submit").click(function () {
        weatherApp.getFormData();
        return false;
    });
    if (weatherApp.loadApiKey()) {
        $("#apidiv").attr("class", "hide");
    }

});