$(document).ready(function () {
  $("#btnNext").hide();
    $("#img").hide();
    $("#divTop").addClass("div2ndFormat");
    $("#divName").addClass("div2ndFormat").addClass("removePadding"); 
    $("#mainDiv").addClass("adjustment");
    
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
                var dayCityName = $("#cityName").val().trim();
                if (cityName === null) {
                    
                    
                    weatherApp.$targetArea.html("no city name for 5 day forecast");
                    
                if(cityNameCurrent === null){
                    weatherApp.$targetArea.html("no city name for current weather");
                    }    
                } if($("#radChoice5Day").attr("checked", "true")){
                    weatherApp.$targetArea.html("");
                    //        add code to clear boxes
                    //        weatherApp.getWeatherData(zip);
                    weatherApp.getWeatherData(cityName);
                }
                    if($("#radChoiceDay").attr("checked", "true")){
                    weatherApp.$targetArea.html("");
                    //        add code to clear boxes
                    //        weatherApp.getWeatherData(zip);
                    weatherApp.getWeatherData(dayCityName);
                }
            },
            getWeatherData: function (cityName) {
                var url = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + ",us&appid=" + weatherApp.weatherApiKey + "&units=imperial";

                $.getJSON(url, function (data) {

                    if (data.cod === "200") {
                       
                        
                        $("#mainDiv").addClass("divFormat");
//         Clear Fields  
                        $("#lblTempHead").text("Temperature:");
                        $("#lblDesHead").text("Description:");
                        $("#windSpeedHead").text("Wind Speed:")
                         $("#lblWeather").text("");
                            $("#lblTime").text("");
                            $("#lblDes").text("");
                            $("#windSpeed").text("");
                        
                        
                        $("#lblWeather").append(Math.round(data.list[0].main.temp));
                        var jDate = data.list[0].dt_txt;

                        var momentData = moment.utc(jDate, "YYYY-MM-DD HH:mm:ss");

                        $("#lblTime").addClass("timeTitle").append(moment(momentData).subtract(1, 'days').format('LLL'));
                        $("#lblDes").append(data.list[0].weather[0].description);

                        
                        $("#windSpeed").append(data.list[0].wind.speed + " " + "MPH");
                        var src = $('img').attr('src').replace('code',data.list[0].weather[0].icon);
                        $('img').attr('src', src);

                         $("#btnNext").show().text("Next");
                         $("#img").show();
                       
                       var index = 0;
                        var nextItem = function(index, length){
                            return((index + 1)% length)
                        };
                        
                        $("#btnNext").click(function(next) {
                            
                            $("#lblWeather").text("");
                            $("#lblTime").text("");
                            $("#lblDes").text("");
                            $("#windSpeed").text("");
                           
                            index = nextItem(index,data.list.length);
                          $("#lblWeather").append(Math.round(data.list[index].main.temp));
                            $("#lblTime").addClass("timeTitle").append(moment(momentData).subtract(1, 'days').add(3 * index, 'hours').format('LLL'));
                            $("#lblDes").append(data.list[index].weather[0].description);
                             $("#windSpeed").append(data.list[index].wind.speed + " " + "MPH");
                             var src = $('img').attr('src').replace(data.list[index - 1].weather[0].icon,data.list[index].weather[0].icon);
                             $('img').attr('src', src);
                        });
//                        weatherApp.$targetArea.html("success1");

                    } else {
                        weatherApp.$targetArea.html("Sorry, no weather data available. Try again later.");
                    }


                }).fail(function () {
                    weatherApp.$targetArea.html("Sorry, no weather data available. Try again later.");
                });
            },
        
//        getWeatherData: function (dayCityName) {
//            var url = "http://api.openweathermap.org/data/2.5/weather?q=" + dayCityName + ",us&appid=" + weatherApp.weatherApiKey + "&units=imperial";
////                            
//            $.getJSON(url, function (data) {
//
//                    if (data.cod === "200") {
//                        
//                        weatherApp.$targetArea.html("success2");
//
//                    } else {
//                        weatherApp.$targetArea.html("Sorry, no weather data available. Try again later.");
//                    }
//
//
//                }).fail(function () {
//                    weatherApp.$targetArea.html("Sorry, no weather data available. Try again later.");
//                });
//        },
            
            
            
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