$(document).ready(function () {

    console.log("hello");


    weatherApp = {

        $targetArea: $("#weather"),

        weatherApiKey: "",

        localStorageKey: "openWeatherApi",


        getFormDataCurrent: function (city) {
            if (weatherApp.weatherApiKey === null || weatherApp.weatherApiKey === "") {
                weatherApp.weatherApiKey = $("#apikey").val().trim();
                weatherApp.saveAPIKey();
            }
            
            var city = $("#city").val().trim();
            if (city === null) {
                weatherApp.$targetArea.html("Enter a city.");
            } else {
                weatherApp.getWeatherDataCurrent(city);
            }
        },
            
             getFormDataCurrentName: function (city) {
            if (weatherApp.weatherApiKey === null || weatherApp.weatherApiKey === "") {
                weatherApp.weatherApiKey = $("#apikey").val().trim();
                weatherApp.saveAPIKey();
            }
            var cityname = $("#city").val().trim();
            if (cityname === null) {
                weatherApp.$targetArea.html("Enter a city.");
            } else {
                weatherApp.getWeatherDataCurrentName(city);
            }
            

            console.log(apikey);
            //console.log(city);
        },
        
        getWeatherDataCurrent : function (citycode) {
            var urlCurrent = "http://api.openweathermap.org/data/2.5/weather?id=" + citycode + "appid=" + weatherApp.weatherApiKey + "&units=imperial";
            
            $.getJSON(urlCurrent, function (data) {
                if (data.cod === 200) {
                    //weatherApp.$targetArea.html("Success!");
                    weatherApp.$targetArea.html('<h3>' + "Current Weather" + '</h3>');
                    weatherDesc = data.weather[0].description;
                    weatherApp.$targetArea.append('<p>' + "Condition:  " + weatherDesc + '</p>');
                    weatherTemp = data.main.temp;
                    weatherApp.$targetArea.append('<p>' + "Temperature:  " +  weatherTemp + "° F" +  '</p>');
                    weatherMaxTemp = data.main.temp_max;
                    weatherApp.$targetArea.append('<p>' + "High:  " +  weatherMaxTemp + "° F" + '</p>');
                    weatherMinTemp = data.main.temp_min;
                    weatherApp.$targetArea.append('<p>' + "Low:  " +  weatherMinTemp + "° F" + '</p>');
                    weatherHum = data.main.humidity;
                    weatherApp.$targetArea.append('<p>' + "Humidity:  " +  weatherHum + "%" + '</p>');
                    console.log(weatherDesc, weatherTemp, weatherMaxTemp, weatherMinTemp, weatherHum);
                } else {
                    weatherApp.$targetArea.html("Sorry, no weather data available. Try again later.");
                }
            }).fail ( function() {
                
                weatherApp.$targetArea.html("Sorry, no weather data available. Try again later.");
            });
            
        },
    
        getWeatherDataCurrentName : function (cityname) {
            var urlCurrentName = "http://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=" + weatherApp.weatherApiKey + "&type=like" + "&units=imperial";
            
            $.getJSON(urlCurrentName, function (data) {
                if (data.cod === 200) {
                   // weatherApp.$targetArea.html("Success!");
                    weatherApp.$targetArea.html('<h3>' + "Current Weather" + '</h3>');
                    weatherDescName = data.weather[0].description;
                    weatherApp.$targetArea.append('<p>' + "Condition:  " + weatherDescName + '</p>');
                    weatherTempName = data.main.temp;
                    weatherApp.$targetArea.append('<p>' + "Temperature:  " +  weatherTempName + "° F" +  '</p>');
                    weatherMaxTempName = data.main.temp_max;
                    weatherApp.$targetArea.append('<p>' + "High:  " +  weatherMaxTempName + "° F" + '</p>');
                    weatherMinTempName = data.main.temp_min;
                    weatherApp.$targetArea.append('<p>' + "Low:  " +  weatherMinTempName + "° F" + '</p>');
                    weatherHumName = data.main.humidity;
                    weatherApp.$targetArea.append('<p>' + "Humidity:  " +  weatherHumName + "%" + '</p>');
                    console.log(weatherDescName, weatherTempName, weatherMaxTempName, weatherMinTempName, weatherHumName);
                } else {
                    weatherApp.$targetArea.html("Sorry, no weather data available. Try again later.");
                }
            }).fail ( function() {
                
                weatherApp.$targetArea.html("Sorry, no weather data available. Try again later.");
            });
            
        },
        
        getFormData5: function (city) {
            if (weatherApp.weatherApiKey === null || weatherApp.weatherApiKey === "") {
                weatherApp.weatherApiKey = $("#apikey").val().trim();
                weatherApp.saveAPIKey();
            }
            var city = $("#city").val().trim();
            if (city === null) {
                weatherApp.$targetArea.html("Enter a city.");
            } else {
                weatherApp.getWeatherData5(city);
            }

            console.log(apikey);
            //console.log(city);
        },
        getWeatherData5 : function (citycode) {
            var url5 = "http://api.openweathermap.org/data/2.5/forecast/daily?id=" + citycode + "appid=" + weatherApp.weatherApiKey + "&units=imperial";
            
            $.getJSON(url5, function (data) {
                if (data.cod === "200") {
                    //weatherApp.$targetArea.append("Success!");
                    weatherApp.$targetArea.append('<h2>' + "5 Day Forecast" + '</h2>')
                    weatherApp.$targetArea.append('<h3>' + "Today" + '</h3>');
                    weatherDesc = data.list[0].weather[0].description;
                    weatherApp.$targetArea.append('<p>' + "Condition:  " + weatherDesc + '</p>');
                    weatherMaxTemp = data.list[0].temp.max;
                    weatherApp.$targetArea.append('<p>' + "High:  " +  weatherMaxTemp + "° F" + '</p>');
                    weatherMinTemp = data.list[0].temp.min;
                    weatherApp.$targetArea.append('<p>' + "Low:  " +  weatherMinTemp + "° F" + '</p>');
                    weatherHum = data.list[0].humidity;
                    weatherApp.$targetArea.append('<p>' + "Humidity:  " +  weatherHum + "%" + '</p>');
                    
                    weatherApp.$targetArea.append('<h3>' + "Tomorrow" + '</h3>');
                    weatherDescTom = data.list[1].weather[0].description;
                    weatherApp.$targetArea.append('<p>' + "Condition:  " + weatherDescTom + '</p>');
                    weatherMaxTempTom = data.list[1].temp.max;
                    weatherApp.$targetArea.append('<p>' + "High:  " +  weatherMaxTempTom + "° F" + '</p>');
                    weatherMinTempTom = data.list[1].temp.min;
                    weatherApp.$targetArea.append('<p>' + "Low:  " +  weatherMinTempTom + "° F" + '</p>');
                    weatherHumTom = data.list[1].humidity;
                    weatherApp.$targetArea.append('<p>' + "Humidity:  " +  weatherHumTom + "%" + '</p>');
                    console.log(weatherDescTom, weatherMaxTempTom, weatherMinTempTom, weatherHumTom);
                    
                    weatherApp.$targetArea.append('<h3>' + "Day 3" + '</h3>');
                    weatherDescThree = data.list[2].weather[0].description;
                    weatherApp.$targetArea.append('<p>' + "Condition:  " + weatherDescThree + '</p>');
                    weatherMaxTempThree = data.list[2].temp.max;
                    weatherApp.$targetArea.append('<p>' + "High:  " +  weatherMaxTempThree + "° F" + '</p>');
                    weatherMinTempThree = data.list[2].temp.min;
                    weatherApp.$targetArea.append('<p>' + "Low:  " +  weatherMinTempThree + "° F" + '</p>');
                    weatherHumThree = data.list[2].humidity;
                    weatherApp.$targetArea.append('<p>' + "Humidity:  " +  weatherHumThree + "%" + '</p>');
                    console.log(weatherDescThree, weatherMaxTempThree, weatherMinTempThree, weatherHumThree);
                    
                    weatherApp.$targetArea.append('<h3>' + "Day 4" + '</h3>');
                    weatherDescFour = data.list[3].weather[0].description;
                    weatherApp.$targetArea.append('<p>' + "Condition:  " + weatherDescFour + '</p>');
                    weatherMaxTempFour = data.list[3].temp.max;
                    weatherApp.$targetArea.append('<p>' + "High:  " +  weatherMaxTempFour + "° F" + '</p>');
                    weatherMinTempFour = data.list[3].temp.min;
                    weatherApp.$targetArea.append('<p>' + "Low:  " +  weatherMinTempFour + "° F" + '</p>');
                    weatherHumFour = data.list[3].humidity;
                    weatherApp.$targetArea.append('<p>' + "Humidity:  " +  weatherHumFour + "%" + '</p>');
                    console.log(weatherDescFour, weatherMaxTempFour, weatherMinTempFour, weatherHumFour);
                    
                    weatherApp.$targetArea.append('<h3>' + "Day 5" + '</h3>');
                    weatherDescFive = data.list[4].weather[0].description;
                    weatherApp.$targetArea.append('<p>' + "Condition:  " + weatherDescFive + '</p>');
                    weatherMaxTempFive = data.list[4].temp.max;
                    weatherApp.$targetArea.append('<p>' + "High:  " +  weatherMaxTempFive + "° F" + '</p>');
                    weatherMinTempFive = data.list[4].temp.min;
                    weatherApp.$targetArea.append('<p>' + "Low:  " +  weatherMinTempFive + "° F" + '</p>');
                    weatherHumFive = data.list[4].humidity;
                    weatherApp.$targetArea.append('<p>' + "Humidity:  " +  weatherHumFive + "%" + '</p>');
                    console.log(weatherDescFive, weatherMaxTempFive, weatherMinTempFive, weatherHumFive);
                } else {
                    weatherApp.$targetArea.html("Sorry, no weather data available. Try again later.");
                }
            }).fail ( function() {
                
                weatherApp.$targetArea.html("Sorry, no weather data available. Try again later.");
            });
            
        },

        loadApiKey: function () {
            if (typeof (localStorage) === 'undefined') {
                weatherApp.$targetArea.html("Sorry, local storage is not supported for this browser");

            } 
            else {
                //Get API Key
                weatherApp.weatherApiKey = localStorage.getItem(weatherApp.localStorageKey);
                if (weatherApp.weatherApiKey === null || weatherApp.weatherApiKey === "") {
                   // weatherApp.$targetArea.html("Sorry, no api key was found.");
                    return false;
                }
                return true;
            }
        },
        saveAPIKey: function () {
            if (typeof (localStorage) === 'undefined') {
                weatherApp.$targetArea.html("Sorry, local storage is not supported for this browser.");
            } 
            else {
                if (weatherApp.weatherApiKey === null || weatherApp.weatherApiKey === "") {
                    weatherApp.$targetArea.html("Sorry, you must enter an API Key.");
                } else {
                    localStorage.setItem(weatherApp.localStorageKey, weatherApp.weatherApiKey);
                    $("#apidiv").attr("class", "hide");
                }
            }
        },
        
    };

    $("#submit").click(function () {
        var city = $("#city").val().trim();
                
        if (isNaN(city))
            {
                weatherApp.getFormDataCurrentName(city);
        return false;
            }
        else{
         weatherApp.getFormDataCurrent(city);
        weatherApp.getFormData5(city);
        return false;
    }
    });
        if (weatherApp.loadApiKey()) {
            $("#apidiv").attr("class", "hide");
        }
});
                  