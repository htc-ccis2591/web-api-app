$(document).ready(function () {

    weatherApp = {

            $targetArea: $("#weather"),

            weatherApiKey: "",

            city: "",

            localStorageKey: "openWeatherApi",

      
            timeForecast: $("<div>", {
                id: "timeForecast"
            }),
            furtureForecast: $("<div>", {
                id: "furtureForecast"
            }),


            getFormData: function () {
                if (weatherApp.weatherApiKey === null || weatherApp.weatherApiKey === "") {
                    weatherApp.weatherApiKey = $("#apikey").val().trim();
                    weatherApp.saveApiKey();
                }

                weatherApp.city = $("#city").val().trim();
                if (weatherApp.city === null || weatherApp.city.length < 3) {

                    weatherApp.$targetArea.html("Enter a city");
                } else {
                    weatherApp.getWeatherData(weatherApp.city);
                }

            },

            // CITY _________________________________________________________________________________________________________________

            getWeatherData: function (cityCode) {
                var url = "http://api.openweathermap.org/data/2.5/weather?q=" + cityCode + ",us&appid=" + weatherApp.weatherApiKey + "&units=imperial";
                $.getJSON(url, function (data) {

                    if (data.cod === 200) {

                        weatherApp.cityName = data.name;
                        
                        Desc = $("<p>").insertAfter("#weather");


                        weatherName = data.name;
                        weatherDesc = data.weather[0].description;
                        weatherTemp = data.main.temp;

                        display = weatherApp.$targetArea.html("The current weather for " + weatherName + " is: " + weatherDesc + ".  The current temperature is: " + weatherTemp + " F.");

                        weatherApp.getWeatherForecast();
                        weatherApp.getFutureForecast();

                        $(Desc).appendTo(display);

                        console.log(weatherDesc);
                        console.log(weatherTemp);
                        console.log(weatherApp.city);

                    } else {
                        weatherApp.$targetArea.html("Sorry, no weather data is available.  Try again later.");
                    }

                }).fail(function () {
                    weatherApp.$targetArea.html("Sorry, no weather data is available.  Try again later.");
                });

            },

            // FORECAST__________________________________________________________________________________________________________________

            getWeatherForecast: function () {
                var url = "http://api.openweathermap.org/data/2.5/forecast?q=" + weatherApp.city + ",us&appid=" + weatherApp.weatherApiKey + "&units=imperial";
                $.getJSON(url, function (data) {

                    if (data.cod === "200") {
                        nextTempTime = data.list[0].dt_txt;
                        nextTemp = data.list[0].main.temp;


                     futureTemp =  $(weatherApp.timeForecast).insertAfter("#weather");
                    
                        currentTemp = $("<p>").appendTo(futureTemp);
                        displayTemp = currentTemp.text("The current weather at " + nextTempTime + " will be: " + nextTemp + " F.");
                       
                        $(displayTemp).append(currentTemp);


                    }

                });
            },

            // 16 day Forecast_____________________________________________________________________________________________________________
        
getFutureForecast: function () {
                var url = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + weatherApp.city + ",us&appid=" + weatherApp.weatherApiKey + "&units=imperial";
                $.getJSON(url, function (data) {

                    if (data.cod === "200") {
                      
                        nextForecastTemp = data.list[0].temp.day;
                        nextForecastWeather = data.list[0].weather[0].main;

                        console.log(nextForecastTemp);
                        console.log(nextForecastWeather);
                     futureForecast =  $(weatherApp.furtureForecast).insertAfter("#timeForecast");
                    
                       futureForecastTemp = $("<p>").appendTo(futureForecast);
                        
                       
                        displayForecastTemp = futureForecastTemp.text("In 7 days, the weather will be " + nextForecastWeather + " , and the temp will be " + nextForecastTemp + " F.");
                      
                        $(displayForecastTemp).append(futureForecastTemp);


                    }

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