$(document).ready(function () {

    weatherApp = {
        $targetArea: $("#forecast"),
        weatherApiKey: "",
        localStorageKey: "openWeatherApi",
        clearDataLocally: "clear",

        getFormData: function () {
            if (weatherApp.weatherApiKey === null || weatherApp.weatherApiKey === "") {
                weatherApp.weatherApiKey = $("#apikey").val();
                weatherApp.weatherApiKey = weatherApp.weatherApiKey.trim();
                weatherApp.saveApiKey();

            // test mcPoop FArtz

                weatherApp.$targetArea.html(" ");
            } else {
                weatherApp.getCurrentData();
            }

            var city = $("#city").val().trim();
            if (city === null || city.length < 3) {
                weatherApp.$targetArea.html("Enter a valid City Name.");
            } else {
                weatherApp.getWeatherData(city);
            }

            var cityCode = $("#cityCode").val().trim();
            if (cityCode === null || cityCode.length < 6) {
                weatherApp.$targetArea.html("Enter a valid City Code.  If you don't know your 'City Code' please visit: http://bulk.openweathermap.org/sample/ ");
            } else {
                weatherApp.getForecastData(cityCode);
            }

            console.log(apikey);
            console.log(city);
            console.log(cityCode);
//            console.log(currentData);
        },

        
        getCurrentData: function () {

        var url = "http://api.openweathermap.org/data/2.5/weather?zip=55406,us&appid=" + weatherApp.weatherApiKey + "&units=imperial";
         $.getJSON(url, function (data) {
             
             

                if (data.cod === 200) {
                    
                    var jDate = data.dt_txt; 
var momentDate = moment.utc(jDate, "YYYY-MM-DD HH:mm:ss");
console.log(momentDate.local().format('MMMM Do YYYY, h:mm:ss a'));
                    
                    weatherApp.$targetArea.html("Successful API Call");
//                    $("#currentWeather").append("Current Weather: ");
                    $("#currWeath").append(data.main.temp);
//                    $("#nowDateDisp").append("Date & Time:");
//                    $("#nowDateValue").append(data.dt_txt);
//                    $("#nowTempDisp").append("Temperature (ºF):");
//                    $("#nowTempValue").append(data.list[0].main.temp);
        
         if (data.weather[0].main === "Rain") {
                        weatherApp.$targetArea.html("Better Bring a Slicker Along!");
                    }
                    if (data.weather[0].main === "Clouds") {
                        weatherApp.$targetArea.html("Cloudy, Possibly a Chance of Meatballs; you never know!");
                    }

                } else {
                    weatherApp.$targetArea.html("Sorry, ain't no dang weather datar available. Try again later ya jabroni.");
                }
//                  if (data.cod === "404") {
//                    weatherApp.$targetArea.html("Error, City Not Found.");
//                }
                
            }).fail(function () {
                weatherApp.$targetArea.html("Oh dear, something terrible has happened. Try again later.");
            });
        },
         // this is where the data from the ajax return populates the page

            // 5 day forecast via user input for City 
        
        getWeatherData: function (cityName) {

            var url = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + ",us&appid=" + weatherApp.weatherApiKey + "&units=imperial";

            $.getJSON(url, function (data) {

                if (data.cod === "200") {
                    weatherApp.$targetArea.html("Successful API Call");
                    $("#forecastTitle").append("12 Hour Forecast: ");
                    $("#forecastTitle").append(data.city.name);
                    $("#dateDisp").append("Date & Time:");
                    $("#dateValue").append(data.list[0].dt_txt);
                    $("#tempDisp").append("Temperature (ºF):");
                    $("#tempValue").append(data.list[0].main.temp);
                    $("#condDisp").append("Condition:");
                    $("#condValue").append(data.list[0].weather[0].description);

                    $("#dateDisp2").append("Date & Time:");
                    $("#dateValue2").append(data.list[1].dt_txt);
                    $("#tempDisp2").append("Temperature (ºF):");
                    $("#tempValue2").append(data.list[1].main.temp);
                    $("#condDisp2").append("Condition:");
                    $("#condValue2").append(data.list[1].weather[0].description);

                    $("#dateDisp3").append("Date & Time:");
                    $("#dateValue3").append(data.list[2].dt_txt);
                    $("#tempDisp3").append("Temperature (ºF):");
                    $("#tempValue3").append(data.list[2].main.temp);
                    $("#condDisp3").append("Condition:");
                    $("#condValue3").append(data.list[2].weather[0].description);

                    if (data.list[0].weather[0].main === "Rain") {
                        weatherApp.$targetArea.html("Better Bring a Slicker Along!");
                    }
                    if (data.list[0].weather[0].main === "Clouds") {
                        weatherApp.$targetArea.html("Cloudy, Possibly a Chance of Meatballs; you never know!");
                    }

                } else {
                    weatherApp.$targetArea.html("Sorry, ain't no dang weather datar available. Try again later ya jabroni.");
                }
                  if (data.cod === "404") {
                    weatherApp.$targetArea.html("Error, City Not Found.");
                }
                
            }).fail(function () {
                weatherApp.$targetArea.html("Oh dear, something terrible has happened. Try again later.");
            });
        },


        // 16 day API Call
        getForecastData: function (cityCode) {

            var url = "http://api.openweathermap.org/data/2.5/forecast/daily?id=" + cityCode + ",us&appid=" + weatherApp.weatherApiKey + "&units=imperial";

            $.getJSON(url, function (data) {

                if (data.cod === "200") {
                    weatherApp.$targetArea.html("Successful API Call");
                    $("#forecastTitle").append("3 Day Forecast: ");
                    $("#forecastTitle").append(data.city.name);
                    $("#dayTitle").append("Date:");
                    $("#dayDisp").append(data.list[0].dt);
                    $("#minTitle").append("Low Temp:");
                    $("#minDisp").append(data.list[0].temp.min);
                    $("#maxTitle").append("High Temp:");
                    $("#maxDisp").append(data.list[0].temp.max);
                    
                    $("#dayTitle2").append("Date:");
                    $("#dayDisp2").append(data.list[1].dt);
                    $("#minTitle2").append("Low Temp:");
                    $("#minDisp2").append(data.list[1].temp.min);
                    $("#maxTitle2").append("High Temp:");
                    $("#maxDisp2").append(data.list[1].temp.max);
                    
                    $("#dayTitle3").append("Date:");
                    $("#dayDisp3").append(data.list[2].dt);
                    $("#minTitle3").append("Low Temp:");
                    $("#minDisp3").append(data.list[2].temp.min);
                    $("#maxTitle3").append("High Temp:");
                    $("#maxDisp3").append(data.list[2].temp.max);
                    
    
                } else {
                    weatherApp.$targetArea.html("Sorry, ain't no dang weather datar available. Try again later ya jabroni.");}
                
            
            }).fail(function () {
                weatherApp.$targetArea.html("Oh dear, something terrible has happened. Try again later.");

 })
            
        },


        loadApiKey: function () {
            if (typeof (localStorage) === 'undefined') {
                weatherApp.$targetArea.html = ("Sorry, local storage is not supported for this browser.");
            } else {
                // Get API Key
                weatherApp.weatherApiKey = localStorage.getItem(weatherApp.localStorageKey);
                if (weatherApp.weatherApiKey === null || weatherApp.weatherApiKey === "") {
                    //weatherApp.$targetArea.html("Sorry, no api key was found.");
                    return false;
                }
                return true;
            }
        },

        saveApiKey: function () {
            if (typeof (localStorage) === 'undefined') {
                weatherApp.$targetArea.html("Sorry");
            } else {
                if (weatherApp.weatherApiKey === null || weatherApp.weatherApiKey === "") {
                    weatherApp.$targetArea.html("Sorry");
                } else {
                    localStorage.setItem(weatherApp.localStorageKey, weatherApp.weatherApiKey);
                    $("#apidiv").attr("class", "hide");
                }
            }
        },
        clearDataLocally: function () {
            if (typeof (localStorage) === 'undefined') {
                targetArea.html = "Sorry, local storage is not supported for this browser.";
            } else {
                localStorage.removeItem(localStorageKey);
                //                onclick.clear.remove.localStorageKey;
            }
        }
    }

    $(document).ready(function(){
    $("button").click(function(){
        $("div").empty();
    });
});
    //Attempting to clear data from form upon click of Submit button
    //$("#clear")onclick.reset;

    $("#submit").click(function () {

        weatherApp.getFormData();
        return false;
        

    });

    if (weatherApp.loadApiKey()) {
        $("#apidiv").attr("class", "hide");

    }
});