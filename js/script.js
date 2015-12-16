$(document).ready(function () {

    weatherApp = {

            $targetArea: $("#weather"),

            weatherApiKey: "",

            city: "",

            localStorageKey: "openWeatherApi",

            // CREATING THE DIV'S THAT GO INTO EACH SECTION -----------------

            currentWeather: $("<div>", {
                id: "currentWeather"
            }),

            timeForecast: $("<div>", {
                id: "timeForecast"
            }),
            furtureForecast: $("<div>", {
                id: "furtureForecast"
            }),


            // GETTING THE DATA FOR THE API KEY ---------------------

            getFormData: function () {
                if (weatherApp.weatherApiKey === null || weatherApp.weatherApiKey === "") {
                    weatherApp.weatherApiKey = $("#apikey").val().trim();
                    weatherApp.saveApiKey();
                }

                weatherApp.city = $("#city").val().trim();
                if (weatherApp.city === null || weatherApp.city.length < 3) {

                } else {
                    weatherApp.getWeatherData(weatherApp.city);
                }

            },

            // CALLING THE CITY __________________________________________________

            getWeatherData: function (cityCode) {

                var url = "http://api.openweathermap.org/data/2.5/weather?q=" + cityCode + ",us&appid=" + weatherApp.weatherApiKey + "&units=imperial";

                $.getJSON(url, function (data) {

                    if (data.cod === 200) {

                        weatherApp.cityName = data.name;

                        // DATA FOR CURRENT WEATHER

                        weatherName = data.name;
                        weatherDescription = data.weather[0].description;
                        weatherTemp = (Math.round(data.main.temp));
                        weatherHumidity = data.main.humidity;
                        weatherWind = data.wind.speed;


                        // INSERTING DIV INTO THE #weather SECTION --------------

                        currentWeather = $(weatherApp.currentWeather).appendTo("#weather");

                        // H3 HEADER ------------------------

                        city = $("<h3>").text("Current Weather: " + weatherName).appendTo(currentWeather);

                        // ADDING PARAGRAPHS TO ENTER CURRENT CONDITIONS -----

                        conditions = $("<p>").text("Current Conditions: " + weatherDescription).insertAfter(city);

                        // TEMP

                        temp = $("<p>").text("Current Temperature: " + weatherTemp + " F").insertAfter(city);

                        // HUMIDITY

                        humidity = $("<p>").text("Humidity: " + weatherHumidity).insertAfter(temp);

                        // WIND SPEED

                        wind = $("<p>").text("Wind Speed: " + weatherWind).insertAfter(humidity);

                        //

                        weatherApp.getWeatherForecast();
                        weatherApp.getFutureForecast();

                    } else {
                        weatherApp.$targetArea.html("Sorry, no weather data is available.  Try again later.");
                    }

                }).fail(function () {
                    weatherApp.$targetArea.html("Sorry, no weather data is available.  Try again later.");
                });

            },

            // HOURLY FORECAST__________________________________________

            getWeatherForecast: function () {
                var url = "http://api.openweathermap.org/data/2.5/forecast?q=" + weatherApp.city + ",us&appid=" + weatherApp.weatherApiKey + "&units=imperial";
                $.getJSON(url, function (data) {

                    if (data.cod === "200") {

                        // HOUR 3 DATA-----------------------

                        nextTempTime = data.list[0].dt_txt;
                        nextTemp = (Math.round(data.list[0].main.temp));
                        nextHumidity = data.list[0].main.humidity;
                        nextConditions = data.list[0].weather[0].main;
                        nextTempMin = (Math.round(data.list[0].main.temp_min));
                        nextTempMax = (Math.round(data.list[0].main.temp_max));

                        // HOUR 6 DATA------------------------

                        nextTempTime1 = data.list[1].dt_txt;
                        nextTemp1 = (Math.round(data.list[1].main.temp));
                        nextHumidity1 = data.list[1].main.humidity;
                        nextConditions1 = data.list[1].weather[0].main;
                        nextTempMin1 = (Math.round(data.list[1].main.temp_min));
                        nextTempMax1 = (Math.round(data.list[1].main.temp_max));

                        // HOUR 9 DATA------------------------

                        nextTempTime2 = data.list[2].dt_txt;
                        nextTemp2 = (Math.round(data.list[2].main.temp));
                        nextHumidity2 = data.list[2].main.humidity;
                        nextConditions2 = data.list[2].weather[0].main;
                        nextTempMin2 = (Math.round(data.list[2].main.temp_min));
                        nextTempMax2 = (Math.round(data.list[2].main.temp_max));

                        // HOUR 12 DATA------------------------

                        nextTempTime3 = data.list[3].dt_txt;
                        nextTemp3 = (Math.round(data.list[3].main.temp));
                        nextHumidity3 = data.list[3].main.humidity;
                        nextConditions3 = data.list[3].weather[0].main;
                        nextTempMin3 = (Math.round(data.list[3].main.temp_min));
                        nextTempMax3 = (Math.round(data.list[3].main.temp_max));

                        // HOUR 15 DATA------------------------

                        nextTempTime4 = data.list[4].dt_txt;
                        nextTemp4 = (Math.round(data.list[4].main.temp));
                        nextHumidity4 = data.list[4].main.humidity;
                        nextConditions4 = data.list[4].weather[0].main;
                        nextTempMin4 = (Math.round(data.list[4].main.temp_min));
                        nextTempMax4 = (Math.round(data.list[4].main.temp_max));

                        // INSERTING DIV INTO THE #time SECTION --------------

                        futureTemp = $(weatherApp.timeForecast).appendTo("#time");

                        nextWeather = $("<h3>").appendTo(futureTemp);
                        nextWeatherDisplay = nextWeather.text("Forecast over the next 15 hours (3 hour incriments): " + weatherName);

                        // 3 HOUR FORECAST

                        dayOneHeader = $("<h4>3 Hours</h4>").insertAfter(nextWeatherDisplay);

                        dayOne = $("<p>").text("Date/Time: " + nextTempTime + ".....Weather Conditions: " + nextConditions + ".....Temperature: " + nextTemp + " F .....Min Temp " + nextTempMin + " F .....Max Temp " + nextTempMax + " F .....Humidity :" + nextHumidity + "%").appendTo(dayOneHeader);
                        
                        // dayOneDisplay = dayOne.text("Date/Time: " + nextTempTime + ".....Weather Conditions: " + nextConditions + ".....Temperature: " + nextTemp + " F .....Min Temp " + nextTempMin + " F .....Max Temp " + nextTempMax + " F .....Humidity :" + nextHumidity + "%");

                        // 6 HOUR FORECAST -----------------

                        dayTwoHeader = $("<h4>6 Hours</h4>").insertAfter(dayOne);

                        dayTwo = $("<p>").text("Date/Time: " + nextTempTime1 + ".....Weather Conditions: " + nextConditions1 + ".....Temperature: " + nextTemp1 + " F .....Min Temp " + nextTempMin1 + " F .....Max Temp " + nextTempMax1 + " F .....Humidity :" + nextHumidity1 + "%").insertAfter(dayTwoHeader);
                        
                        // dayTwoDisplayDisplay = dayTwo.text("Date/Time: " + nextTempTime1 + ".....Weather Conditions: " + nextConditions1 + ".....Temperature: " + nextTemp1 + " F .....Min Temp " + nextTempMin1 + " F .....Max Temp " + nextTempMax1 + " F .....Humidity :" + nextHumidity1 + "%");

                        // 9 HOUR FORECAST --------------------

                        dayThreeHeader = $("<h4>9 Hours</h4>").insertAfter(dayTwo);

                        dayThree = $("<p>").text("Date/Time: " + nextTempTime2 + ".....Weather Conditions: " + nextConditions2 + ".....Temperature: " + nextTemp2 + " F .....Min Temp " + nextTempMin2 + " F .....Max Temp " + nextTempMax2 + " F .....Humidity :" + nextHumidity2 + "%").insertAfter(dayThreeHeader);
                        
                        // dayThreeDisplay = dayThree.text("Date/Time: " + nextTempTime2 + ".....Weather Conditions: " + nextConditions2 + ".....Temperature: " + nextTemp2 + " F .....Min Temp " + nextTempMin2 + " F .....Max Temp " + nextTempMax2 + " F .....Humidity :" + nextHumidity2 + "%");

                        // 12 HOUR FORECAST --------------------

                        dayFourHeader = $("<h4>12 Hours</h4>").insertAfter(dayThree);

                        dayFour = $("<p>").text("Date/Time: " + nextTempTime3 + ".....Weather Conditions: " + nextConditions3 + ".....Temperature: " + nextTemp3 + " F .....Min Temp " + nextTempMin3 + " F .....Max Temp " + nextTempMax3 + " F .....Humidity :" + nextHumidity3 + "%").insertAfter(dayFourHeader);
                        
                        // dayFourDisplay = dayFour.text("Date/Time: " + nextTempTime3 + ".....Weather Conditions: " + nextConditions3 + ".....Temperature: " + nextTemp3 + " F .....Min Temp " + nextTempMin3 + " F .....Max Temp " + nextTempMax3 + " F .....Humidity :" + nextHumidity3 + "%");

                        // 15 HOUR FORECAST ------------------------

                        dayFiveHeader = $("<h4>15 Hours</h4>").insertAfter(dayFour);

                        dayFive = $("<p>").insertAfter(dayFiveHeader);

                        dayFiveDisplay = dayFive.text("Date/Time: " + nextTempTime4 + ".....Weather Conditions: " + nextConditions4 + ".....Temperature: " + nextTemp4 + " F .....Min Temp " + nextTempMin4 + " F .....Max Temp " + nextTempMax4 + " F .....Humidity :" + nextHumidity4 + "%");



                    }

                });
            },

            // 7 day Forecast__________________________________

            getFutureForecast: function () {
                var url = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + weatherApp.city + ",us&appid=" + weatherApp.weatherApiKey + "&units=imperial";
                $.getJSON(url, function (data) {

                    if (data.cod === "200") {

                        // DAY 1 DATA -----------------

                        nextForecastTemp = (Math.round(data.list[1].temp.day));
                        nextForecastWeather = data.list[1].weather[0].main;
                        dayTempMorn = (Math.round(data.list[1].temp.morn));
                        dayTempNight = (Math.round(data.list[1].temp.night));

                        // DAY 2 DATA ---------------
                        dayTemp2 = (Math.round(data.list[2].temp.day));
                        dayWeather2 = data.list[2].weather[0].main;
                        dayTempMorn2 = (Math.round(data.list[2].temp.morn));
                        dayTempNight2 = (Math.round(data.list[2].temp.night));

                        // DAY 3 DATA ------------------------
                        dayTemp3 = (Math.round(data.list[3].temp.day));
                        dayWeather3 = data.list[3].weather[0].main;
                        dayTempMorn3 = (Math.round(data.list[3].temp.morn));
                        dayTempNight3 = (Math.round(data.list[3].temp.night));

                        // DAY 4 DATA ------------------------

                        dayTemp4 = (Math.round(data.list[4].temp.day));
                        dayWeather4 = data.list[4].weather[0].main;
                        dayTempMorn4 = (Math.round(data.list[4].temp.morn));
                        dayTempNight4 = (Math.round(data.list[4].temp.night));

                        // DAY 5 DATA ---------------------

                        dayTemp5 = (Math.round(data.list[5].temp.day));
                        dayWeather5 = data.list[5].weather[0].main;
                        dayTempMorn5 = (Math.round(data.list[5].temp.morn));
                        dayTempNight5 = (Math.round(data.list[5].temp.night));

                        // DAY 6 DATA --------------------------

                        dayTemp6 = (Math.round(data.list[6].temp.day));
                        dayWeather6 = data.list[6].weather[0].main;
                        dayTempMorn6 = (Math.round(data.list[6].temp.morn));
                        dayTempNight6 = (Math.round(data.list[6].temp.night));

                        // INSERTING DIV INTO THE #future SECTION --------------

                        futureForecast = $(weatherApp.furtureForecast).appendTo("#future");
                        $("<h3>" + "7 Day Forecast: " + weatherName + "</h3>").appendTo(futureForecast);



                        //TABLE ---------------------------------------------------------------------

                        // CREATING TABLE ----------------------
                        mainTable = $("<table></table>");
                        dayTableMain = $(mainTable).insertAfter(futureForecast);
                        dayTableHead = $("<tr></tr>").appendTo(dayTableMain);

                        // TABLE HEADERS --------------------

                        dayTableName6 = $("<th>Day Six</th>").insertAfter(dayTableHead);
                        dayTableName5 = $("<th>Day Five</th>").insertAfter(dayTableHead);
                        dayTableName4 = $("<th>Day Four</th>").insertAfter(dayTableHead);
                        dayTableName3 = $("<th>Day Three</th>").insertAfter(dayTableHead);
                        dayTableName2 = $("<th>Day Two</th>").insertAfter(dayTableHead);

                        // DAY 1 FORECAST ---------------------------

                        dayOneWeather = $("<td>" + "Weather: " + nextForecastWeather + "</td>").appendTo(dayTableName2);
                        dayOneTemp = $("<td>" + "Temperature: " + nextForecastTemp + "F " + "</td>").appendTo(dayOneWeather);
                        dayOneMorn = $("<td>" + "Morning Temp: " + dayTempMorn + " F" + "</td>").appendTo(dayOneTemp);
                        dayOneNight = $("<td>" + "Night Temp: " + dayTempNight + " F" + "</td>").appendTo(dayOneMorn);

                        // DAY 2 FORECAST --------------------------

                        dayTwoWeather = $("<td>" + "Weather: " + dayWeather2 + "</td>").appendTo(dayTableName3);
                        dayTwoTemp = $("<td>" + "Temperature: " + dayTemp2 + " F" + "</td>").appendTo(dayTwoWeather);
                        dayTwoMorn = $("<td>" + "Morning Temp: " + dayTempMorn2 + " F" + "</td>").appendTo(dayTwoTemp);
                        dayTwoNight = $("<td>" + "Night Temp: " + dayTempNight2 + " F" + "</td>").appendTo(dayTwoMorn);

                        // DAY 3 FORECAST ------------------------------

                        dayThreeWeather = $("<td>" + "Weather: " + dayWeather3 + "</td>").appendTo(dayTableName4);
                        dayThreeTemp = $("<td>" + "Temperature: " + dayTemp3 + " F" + "</td>").appendTo(dayThreeWeather);
                        dayThreeMorn = $("<td>" + "Morning Temp: " + dayTempMorn3 + " F" + "</td>").appendTo(dayThreeTemp);
                        dayThreeNight = $("<td>" + "Night Temp: " + dayTempNight3 + "F" + "</td>").appendTo(dayThreeMorn);

                        // DAY 4 FORECAST ------------------------------

                        dayFourWeather = $("<td>" + "Weather: " + dayWeather4 + "</td>").appendTo(dayTableName5);
                        dayFourTemp = $("<td>" + "Temperature: " + dayTemp4 + " F" + "</td>").appendTo(dayFourWeather);
                        dayFourMorn = $("<td>" + "Morning Temp: " + dayTempMorn4 + " F" + "</td>").appendTo(dayFourTemp);
                        dayFourNight = $("<td>" + "Night Temp: " + dayTempNight4 + " F" + "</td>").appendTo(dayFourMorn);

                        // DAY 5 FORECAST -------------------------------

                        dayFiveWeather = $("<td>" + "Weather: " + dayWeather5 + "</td>").appendTo(dayTableName6);
                        dayFiveTemp = $("<td>" + "Temperature: " + dayTemp5 + " F" + "</td>").appendTo(dayFiveWeather);
                        dayFiveMorn = $("<td>" + "Morning Temp: " + dayTempMorn5 + " F" + "</td>").appendTo(dayFiveTemp);
                        dayFiveNight = $("<td>" + "Night Temp: " + dayTempNight5 + " F" + "</td>").appendTo(dayFiveMorn);

                    }

                });
            },


            // LOADING THE API KEY ---------------------

            loadApiKey: function () {
                if (typeof (localStorage) === 'undefined') {
                    weatherApp.$targetArea.html("Sorry, local storage is not supported for this browser.");
                } else {

                    weatherApiKey = localStorage.getItem(weatherApp.localStorageKey);
                    if (weatherApiKey === null || weatherApp.weatherApiKey === "") {
                        //weatherApp.$targetArea.html("Sorry, no api key was found.");
                        return false;
                    }
                    return true;
                }
            },

            // SAVING THE API KEY ------------------------

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

        // BUTTON FUNCTIONS ---------------------------------

        $("#submit").click(function () {
            weatherApp.getFormData();
            $("#city").val("");
            $(weatherApp.timeForecast).empty();
            $(weatherApp.furtureForecast).empty();
            $(weatherApp.currentWeather).empty();
            $("#future").empty();

            return false;
        });




    if (weatherApp.loadApiKey()) {
        $("#apiDiv").attr("class", "hide");
    };



});