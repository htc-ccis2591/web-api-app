$(document).ready(function () {

    weatherApp = {

            $targetArea: $("#weather"),

            weatherApiKey: "",

            city: "",

            localStorageKey: "openWeatherApi",

            currentWeather: $("<div>", {
                id: "currentWeather"
            }),

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

                        weatherName = data.name;
                        weatherDescription = data.weather[0].description;
                        weatherTemp = data.main.temp;
                        weatherHumidity = data.main.humidity;
                        weatherWind = data.wind.speed;

                        currentWeather = $(weatherApp.currentWeather).appendTo("#weather");

                        city = $("<h3>").appendTo(currentWeather);
                        citydisplay = city.text("The current weather for " + weatherName).appendTo(city);

                        conditions = $("<p>").insertAfter(city);
                        conditionsDisplay = conditions.text("Current Conditions: " + weatherDescription).appendTo(conditions);

                        temp = $("<p>").insertAfter(city);
                        tempDisplay = temp.text("Current Temperature: " + weatherTemp).appendTo(temp);


                        humidity = $("<p>").insertAfter(temp);
                        humidityDislpay = humidity.text("Humidity: " + weatherHumidity).appendTo(humidity);

                        wind = $("<p>").insertAfter(humidity);
                        windDisplay = wind.text("Wind Speed: " + weatherWind).appendTo(wind);

                        weatherApp.getWeatherForecast();
                        weatherApp.getFutureForecast();

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
                        nextHumidity = data.list[0].main.humidity;
                        nextConditions = data.list[0].weather[0].main;
                        nextTempMin = data.list[0].main.temp_min;
                        nextTempMax = data.list[0].main.temp_max;

                        nextTempTime1 = data.list[8].dt_txt;
                        nextTemp1 = data.list[8].main.temp;
                        nextHumidity1 = data.list[8].main.humidity;
                        nextConditions1 = data.list[8].weather[0].main;
                        nextTempMin1 = data.list[8].main.temp_min;
                        nextTempMax1 = data.list[8].main.temp_max;

                        nextTempTime2 = data.list[16].dt_txt;
                        nextTemp2 = data.list[16].main.temp;
                        nextHumidity2 = data.list[16].main.humidity;
                        nextConditions2 = data.list[16].weather[0].main;
                        nextTempMin2 = data.list[16].main.temp_min;
                        nextTempMax2 = data.list[16].main.temp_max;

                        nextTempTime3 = data.list[24].dt_txt;
                        nextTemp3 = data.list[24].main.temp;
                        nextHumidity3 = data.list[24].main.humidity;
                        nextConditions3 = data.list[24].weather[0].main;
                        nextTempMin3 = data.list[24].main.temp_min;
                        nextTempMax3 = data.list[24].main.temp_max;

                        nextTempTime4 = data.list[32].dt_txt;
                        nextTemp4 = data.list[32].main.temp;
                        nextHumidity4 = data.list[32].main.humidity;
                        nextConditions4 = data.list[32].weather[0].main;
                        nextTempMin4 = data.list[32].main.temp_min;
                        nextTempMax4 = data.list[32].main.temp_max;

                        futureTemp = $(weatherApp.timeForecast).appendTo("#time");

                        nextWeather = $("<h3>").appendTo(futureTemp);
                        nextWeatherDisplay = nextWeather.text("Five day forcast for " + weatherName);

                        dayOneHeader = $("<h4>Day One</h4>").insertAfter(nextWeather);

                        dayOne = $("<p>").appendTo(dayOneHeader);
                        dayOneDisplay = dayOne.text("Date/Time: " + nextTempTime + ".....Weather Conditions: " + nextConditions + ".....Temperature: " + nextTemp + "F .....Min Temp " + nextTempMin + "F .....Max Temp " + nextTempMax + "F .....Humidity :" + nextHumidity + "%").append(dayOne);

                        dayTwoHeader = $("<h4>Day Two</h4>").insertAfter(dayOne);

                        dayTwo = $("<p>").insertAfter(dayTwoHeader);
                        dayTwoDisplayDisplay = dayTwo.text("Date/Time: " + nextTempTime1 + ".....Weather Conditions: " + nextConditions1 + ".....Temperature: " + nextTemp1 + "F .....Min Temp " + nextTempMin1 + "F .....Max Temp " + nextTempMax1 + "F .....Humidity :" + nextHumidity1 + "%").appendTo(dayTwo);

                        dayThreeHeader = $("<h4>Day Three</h4>").insertAfter(dayTwo);

                        dayThree = $("<p>").insertAfter(dayThreeHeader);
                        dayThreeDisplay = dayThree.text("Date/Time: " + nextTempTime2 + ".....Weather Conditions: " + nextConditions2 + ".....Temperature: " + nextTemp2 + "F .....Min Temp " + nextTempMin2 + "F .....Max Temp " + nextTempMax2 + " F .....Humidity :" + nextHumidity2 + "%").appendTo(dayThree);

                        dayFourHeader = $("<h4>Day Four</h4>").insertAfter(dayThree);
                        dayFour = $("<p>").insertAfter(dayFourHeader);
                        dayFourDisplay = dayFour.text("Date/Time: " + nextTempTime3 + ".....Weather Conditions: " + nextConditions3 + ".....Temperature: " + nextTemp3 + "F .....Min Temp " + nextTempMin3 + "F .....Max Temp " + nextTempMax3 + " F .....Humidity :" + nextHumidity3 + "%").appendTo(dayFour);

                        dayFiveHeader = $("<h4>Day Five</h4>").insertAfter(dayFour);

                        dayFive = $("<p>").insertAfter(dayFiveHeader);
                        dayFiveDisplay = dayFive.text("Date/Time: " + nextTempTime4 + ".....Weather Conditions: " + nextConditions4 + ".....Temperature: " + nextTemp4 + "F .....Min Temp " + nextTempMin4 + "F .....Max Temp " + nextTempMax4 + " F .....Humidity :" + nextHumidity4 + "%").appendTo(dayFive);

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


                        futureForecast = $(weatherApp.furtureForecast).appendTo("#future");

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
            },
        },

        $("#submit").click(function () {
            weatherApp.getFormData();
            $("#city").val("");
            $(weatherApp.timeForecast).empty();
            $(weatherApp.furtureForecast).empty();
            $(weatherApp.$targetArea).empty();

            return false;
        });




    if (weatherApp.loadApiKey()) {
        $("#apiDiv").attr("class", "hide");
    };



});