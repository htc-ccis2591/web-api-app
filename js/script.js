$(document).ready(function () {

    console.log("hello");


    weatherApp = {

        $targetArea: $("#weather"),
        weatherApiKey: "",
        localStorageKey: "openWeatherApi",
        $btnHourly: $("<button/>", {
                text: "Hourly forecast",
                id: "btnHourly"}),
        $btnSixteenDays: $("<button/>", {
            text: "16 days forecast",
            id: "btnSixteenDays"}),                    
        



        getFormData: function () {
            if (weatherApp.weatherApiKey === null || weatherApp.weatherApiKey === "") {
                weatherApp.weatherApiKey = $("#apikey").val().trim();
                weatherApp.saveApiKey();
            }
            var zip = $("#zip").val().trim();

            if (zip === null) {
                (weatherApp.$targetArea.html("Enter a zip code.")).insertBefore($("#form"));
            } else if (zip.length != 5) {
                (weatherApp.$targetArea.html("Zip code is not valid. It must be 5 characters long!")).insertBefore($("#form"));
            } else {
                weatherApp.getWeatherData(zip);
            }

            console.log(apikey);
            console.log(zip);
        },

        getWeatherData: function (zipcode) {
            var url = "http://api.openweathermap.org/data/2.5/weather?zip=" + zipcode + ",us&appid=" + weatherApp.weatherApiKey + "&units=imperial";

            $.getJSON(url, function (data) {
                if (data.cod === 200) {

                    // THIS IS WHERE YOU WOULD ADD THE DATA TO THE PAGE
                    var weatherDesc = data.weather[0].description,
                        weatherCity = data.name,
                        weatherCurrentTemp = data.main.temp,
                        weatherMaxTemp = data.main.temp_max,
                        weatherMinTemp = data.main.temp_min,
                        weatherCountry = data.sys.country,
                        weatherHumidity = data.main.humidity,
                        weatherWindSpeed = data.wind.speed,
                        weatherCityID = data.id;
                    console.log(weatherCityID);

                    weatherApp.$targetArea.html(
                        "</br><li><b>Success!</b></li>" +
                        "<li>Here is the weather information for " + "<b>" + weatherCity + "</b>" + "</li>" +
                        "<li>Currently, " + weatherDesc + "</li>" +
                        "<li> Current Temperature: " + weatherCurrentTemp + "°F" + "</li>" +
                        "<li> Maximum Temperature: " + weatherMaxTemp + "°F" + "</li>" +
                        "<li> Minimum Temperature: " + weatherMinTemp + "°F" + "</li>" +
                        "<li> Humidity: " + weatherHumidity + " %" + "</li>" +
                        "<li> Wind Speed: " + weatherWindSpeed + " mph" + "</li>").insertBefore(weatherApp.$btnHourly).insertBefore(weatherApp.$btnSixteenDays);

                } else {
                    weatherApp.$targetArea.html("Sorry, no weather data available.!");
                }

            }).fail(function () {
                weatherApp.$targetArea.html("Sorry, no weather data available. Try again later.");
            });
        },
        
        getHourlyData: function(hourlyData){
            var url = "http://api.openweathermap.org/data/2.5/forecast?id=" + weatherApp.weatherCityID + "&appid=" + weatherApp.weatherApiKey + "&units=imperial";
            $.getJSON(url, function(data) {
                if (data.cod === 200) {
                    console.log("Hello from hourly forecast");
                    
                    
                }
                else {
                    weatherApp.$targetArea.html ("Sorry, no houly data available.!");
                }
            }).fail(function() {
                weatherApp.$targetArea.html("Sorry, no weather data avalable. Try again later.");
            });
        },
        
         getSixteenDaysData: function(sixteenDaysData){
            var url = "http://api.openweathermap.org/data/2.5/forecast/daily?id=" + weatherApp.weatherCityID + "&appid=" + weatherApp.weatherApiKey + "&units=imperial";
            $.getJSON(url, function(data) {
                if (data.cod === 200) {
                    console.log("Hello from 16 days forecast");
                    
                    
                }
                else {
                    weatherApp.$targetArea.html ("Sorry, no 16 days data available.!");
                }
            }).fail(function() {
                weatherApp.$targetArea.html("Sorry, no weather data avalable. Try again later.");
            });
        },
        
        
        
                
//
//
//        btnHourly: function () {
//            var $btnHourly = $("<button/>", {
//                text: "Hourly forecast",
//                id: "btnHourly",
//                click: function () {
//                    alert("hi");
//                }
//            });
//        },
//        btnSixteenDays: function () {
//            var btnSixteenDays = $("<button/>", {
//                text: "16 days forecast",
//                id: "btnSixteenDays",
//                click: function () {
//                    alert("hi second");
//                }
//            });
//        },

        loadApiKey: function () {
            if (typeof (localStorage) === 'undefined') {
                weatherApp.$targetArea.html("Sorry, local storage is not supported for this brower.");
            } else {
                // Get API key
                weatherApp.weatherApiKey = localStorage.getItem(weatherApp.localStorageKey);
                if (weatherApp.weatherApiKey === null || weatherApp.weatherApiKey === "") {
                    //weatherApp.$targetArea.html("Sorry, no Api Key was found.");
                    return false;
                }
                return true;

            }

        },

        saveApiKey: function () {
            if (typeof (localStorage) === 'undefined') {
                weatherApp.$targetArea.html("Sorry, local storage is not supported for this brower. ");
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


    $("#submit").click(function () {

        weatherApp.getFormData();
        return false;

    });

    weatherApp.loadApiKey();
    if (weatherApp.loadApiKey()) {
        $("#apidiv").attr("class", "hide");
    }


});