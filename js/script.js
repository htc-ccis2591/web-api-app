$(document).ready(function () {

    console.log("hello");


    weatherApp = {

        $targetArea: $("#weather"),
        weatherApiKey: "",
        localStorageKey: "openWeatherApi",

        $btnHourly: $("<button/>", {
            text: "3 Hourly forecast",
            id: "btnHourly"
        }),
        $btnSixteenDays: $("<button/>", {
            text: "7 days forecast",
            id: "btnSixteenDays"
        }),




        getApiKey: function () {
            if (weatherApp.weatherApiKey === null || weatherApp.weatherApiKey === "") {
                weatherApp.weatherApiKey = $("#apikey").val().trim();
                weatherApp.saveApiKey();
            }
        },

        getWeatherBothData: function () {
             weatherApp.getApiKey();
             var inputData = $("#zip").val().trim();
            if(isNaN(inputData)){
               weatherApp.getCityData(inputData);
            }else{
                weatherApp.getZipData(inputData);            
            }
        },
        
        
                getCityData: function (city) {
                    //weatherApp.getApiKey();
                    //var city = $("#zip").val().trim();
                    if(city.length < 3){
                        weatherApp.$targetArea.html("Enter a valid city name.");
                    } else {
                        //console.log(city);
                        weatherApp.getCityWeatherData(city);
                    }
                },
        

        
         getCityWeatherData: function (cityName) {
             //http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=2de143494c0b295cca9337e1e96b00e0
            var url = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + ",us&appid=" + weatherApp.weatherApiKey + "&units=imperial";
             console.log(url);

            $.getJSON(url, function (data) {
                if (data.cod === 200) {
                    console.log("I am inside city");

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
                    //console.log(weatherCityID);
                    //weatherApp.getWeatherData(weatherCityID)

                    weatherApp.$targetArea.html(
                        "</br><li><b>Today's forecast</b>" + " " + "for" + "</li>" +
                        "<li>" + "<h3>" + weatherCity + "</h3>" + "</li>" +
                        "<li>Currently, " + weatherDesc + "</li>" +
                        "<li> Current Temperature: " + weatherCurrentTemp + "°F" + "</li>" +
                        "<li> Maximum Temperature: " + weatherMaxTemp + "°F" + "</li>" +
                        "<li> Minimum Temperature: " + weatherMinTemp + "°F" + "</li>" +
                        "<li> Humidity: " + weatherHumidity + " %" + "</li>" +
                        "<li> Wind Speed: " + weatherWindSpeed + " mph" + "</li>"

                    )
                    weatherApp.$btnHourly.insertBefore(weatherApp.$targetArea);
                    weatherApp.$btnSixteenDays.insertAfter(weatherApp.$btnHourly);

                    weatherApp.$btnHourly.click(function () {
                        weatherApp.getHourlyData(weatherCityID, weatherCity);
                        return false;
                    });

                    weatherApp.$btnSixteenDays.click(function () {
                        weatherApp.getSixteenDaysData(weatherCityID, weatherCity);
                        return false;
                    });



                } else {
                    weatherApp.$targetArea.html("Sorry, no weather data available.!");
                }

            }).fail(function () {
                weatherApp.$targetArea.html("Sorry, no weather data available. Try again later.");
            });
        },
        


        getZipData: function (zip) {

           // weatherApp.getApiKey();

           // var zip = $("#zip").val().trim();

            if (zip === null) {
                (weatherApp.$targetArea.html("Enter a zip code."));
            } else if (zip.length != 5) {
                (weatherApp.$targetArea.html("Zip code is not valid. It must be 5 characters long!"));
            } else {
                weatherApp.getWeatherData(zip);
            }

            //            console.log(apikey);
            //            console.log(zip);
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
                    //console.log(weatherCityID);
                    //weatherApp.getWeatherData(weatherCityID)

                    weatherApp.$targetArea.html(
                        "</br><li><b>Today's forecast</b>" + " " + "for" + "</li>" +
                        "<li>" + "<h3>" + weatherCity + "</h3>" + "</li>" +
                        "<li>Currently, " + weatherDesc + "</li>" +
                        "<li> Current Temperature: " + weatherCurrentTemp + "°F" + "</li>" +
                        "<li> Maximum Temperature: " + weatherMaxTemp + "°F" + "</li>" +
                        "<li> Minimum Temperature: " + weatherMinTemp + "°F" + "</li>" +
                        "<li> Humidity: " + weatherHumidity + " %" + "</li>" +
                        "<li> Wind Speed: " + weatherWindSpeed + " mph" + "</li>"

                    )
                    weatherApp.$btnHourly.insertBefore(weatherApp.$targetArea);
                    weatherApp.$btnSixteenDays.insertAfter(weatherApp.$btnHourly);

                    weatherApp.$btnHourly.click(function () {
                        weatherApp.getHourlyData(weatherCityID, weatherCity);
                        return false;
                    });

                    weatherApp.$btnSixteenDays.click(function () {
                        weatherApp.getSixteenDaysData(weatherCityID, weatherCity);
                        return false;
                    });



                } else {
                    weatherApp.$targetArea.html("Sorry, no weather data available.!");
                }

            }).fail(function () {
                weatherApp.$targetArea.html("Sorry, no weather data available. Try again later.");
            });
        },

        getHourlyData: function (cityId, city) {
            var url = "http://api.openweathermap.org/data/2.5/forecast?id=" + cityId + "&appid=" + weatherApp.weatherApiKey + "&units=imperial";
            //524901
            $.getJSON(url, function (data) {
                //console.log("Hello from hourly forecast");
                if (data.cod === "200") {
                    console.log("Hello from hourly Inside");
                    weatherApp.$targetArea.empty();

                    weatherApp.$targetArea.html("<h3>" + "3 Hourly forecast for " + "</h3>" + "<h2>" + city + "</h2>");

                    for (i = 0; i < data.list.length; i++) {
                        var jDate = data.list[i].dt_txt;
                        var momentDate = moment.utc(jDate, "YYYY-MM-DD HH:mm:ss");
                        var day = momentDate.local().format('MMM Do YY, h a');

                        $("#weather").append("<li>" + day + "&nbsp;" + "&nbsp;" + "&nbsp;" + "&nbsp;" + "<u>" + data.list[i].weather[0].description + "</u>" + "&nbsp;" + "&nbsp;" + "&nbsp;" + "&nbsp;" + data.list[i].main.temp + "°F" + "</li>");


                    }


                } else {
                    weatherApp.$targetArea.html("Sorry, no houly data available.!");
                }
            }).fail(function () {
                weatherApp.$targetArea.html("Sorry, no weather data avalable. Try again later.");
            });
        },




        getSixteenDaysData: function (cityId, city) {
            var url = "http://api.openweathermap.org/data/2.5/forecast/daily?id=" + cityId + "&appid=" + weatherApp.weatherApiKey + "&units=imperial";
            $.getJSON(url, function (data) {
                if (data.cod === "200") {
                    console.log("Hello from 7 days forecast");

                    weatherApp.$targetArea.empty();
                    weatherApp.$targetArea.html("<h3>" + "7 days weather forecast for " + "</h3>" + "<h2>" + city + "</h2>");



                    for (i = 0; i < data.list.length; i++)
                    {

                  

                    

                                        var dt=parseInt(data.list[i].dt*1000);
                                        var myDate = new Date(dt);
                                        var jDate = (myDate.toLocaleString()).substr(0,10); 
                                        console.log(jDate);
                    //                        
                    //
                    //                    //var momentDate = moment.utc(myDate, "YYYY-MM-DD HH:mm:ss");
                    //                    //console.log(momentDate);
                    //                    //console.log(momentDate.local().format('MMMM Do YYYY, h:mm:ss a'));
                    //                    
                    //                    
                                        $("#weather").append("<li>" + jDate+ ":  " + "&nbsp;" + "&nbsp;" + "Max " + data.list[i].temp.max + "°F"  + "&nbsp;" + "&nbsp;" + " - "  + "&nbsp;" + "&nbsp;" + "Min " + data.list[i].temp.min + "°F" + "&nbsp;" + "&nbsp;" + "&nbsp;" + "&nbsp;" +"<u>" + data.list[i].weather[0].main + "</u>" + "</li>");

                    //This one work but without the date!
                   //$("#weather").append("<li>" + "Day " + i + ":  " + "&nbsp;" + "&nbsp;" + "Max " + data.list[i].temp.max + "°F" + "&nbsp;" + "&nbsp;" + " - " + "&nbsp;" + "&nbsp;" + "Min " + data.list[i].temp.min + "°F" + "&nbsp;" + "&nbsp;" + "&nbsp;" + "&nbsp;" + "<u>" + data.list[i].weather[0].main + "</u>" + "</li>");





                }
                }else {
                    weatherApp.$targetArea.html("Sorry, no 16 days data available.!");
                }
            }).fail(function () {
                weatherApp.$targetArea.html("Sorry, no weather data avalable. Try again later.");
            });
        },





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

        weatherApp.getWeatherBothData();
        //weatherApp.getZipData();
        return false;

    });

    weatherApp.loadApiKey();
    if (weatherApp.loadApiKey()) {
        $("#apidiv").attr("class", "hide");
    }


});