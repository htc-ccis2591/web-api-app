$(document).ready(function () {





    weatherApp = {
        $targetArea: $("#weather"),
        $tempday: $("#daytemp"),
        $ninedes: $("#nine"),
        ninetemp: $("#temps"),
        londes: $("#lonlatdes"),
        lontemp: $("#lonlattemp"),
        weatherApiKey: "",

        localStorageKey: "openWeatherApi",

        getFormData: function () {
            if (weatherApp.weatherApiKey === null || weatherApp.weatherApiKey === "") {
                weatherApp.weatherApiKey = $("#apikey").val();
                weatherApp.saveApiKey();

            }
            var town = $("#town").val();
            if (town === null || town === "") {
                weatherApp.$targetArea.html("enter in a town.");
            } else {
                weatherApp.getWeatherData(town);
            }
        },

        getWeatherData: function (towncode) {
            var url = "http://api.openweathermap.org/data/2.5/forecast?q=" + towncode + ",us&appid=" + weatherApp.weatherApiKey + "&units=imperial";
            $.getJSON(url, function (data) {
                weatherApp.$targetArea.html("Works")

                weatherD = data.list[26].weather[0].description;
                weatherApp.$targetArea.html(weatherD);
                daystemp = data.list[26].main.temp;
                weatherApp.$tempday.html(daystemp);

            }).fail(function () {
                weatherApp.$targetArea.html("sorry");
            });
        },

        LoadApiKey: function () {
            if (typeof (localStorage) === 'undefined') {
                weatherApp.$targetArea.html("will not work");
            } else {
                weatherApp.weatherApiKey = localStorage.getItem(weatherApp.localStorageKey);
                if (weatherApp.weatherApiKey === null || weatherApp.weatherApiKey === "") {
                    // weatherApp.$targetArea.html("sorry, no api key was found")
                    return false;
                }
                return true;
            }
        },

        saveApiKey: function () {
            if (typeof (localStorage) === 'undefined') {
                $targetArea.html("you cant use save localstorage");
            } else {

                if (weatherApp.weatherApiKey === null || weatherApp.weatherApiKey === "") {
                    weatherApp.$targetArea.html("Sorry, you must enter an API Key.");
                } else {
                    localStorage.setItem(weatherApp.localStorageKey, weatherApp.weatherApiKey);
                    $("#apidiv").attr("class", "hide");
                }
            }
        },
        getnineDate: function () {

            var idcode = $("#cityid").val();
            if (idcode === null || idcode === "") {} else {
                weatherApp.getDayWeatherData(idcode);
            }
        },

        getDayWeatherData: function (codeid) {
            var url = "http://api.openweathermap.org/data/2.5/forecast/daily?cnt=9&id=" + codeid + ",us&appid=" + weatherApp.weatherApiKey + "&units=imperial";
            $.getJSON(url, function (data) {

                ninedis = data.list[8].weather[0].description
                weatherApp.$ninedes.html(ninedis)
                ninetemp = data.list[8].temp.day
                weatherApp.ninetemp.html(ninetemp)

            })
        },
        
       // getlonlatDate : function() {
            
           // var loncode = $("#lon").val();
            //var latcode = $("#lat").val();
          //  weatherApp.getlonlatWeather(loncode)
       // },
        
        getlonlatWeather: function(lonlat) {
var url = "http://api.openweathermap.org/data/2.5/weather?lat=44.798019&lon=-93.526901&us&appid=" + weatherApp.weatherApiKey + "&units=imperial";
            $.getJSON(url, function(data){
                
                latdes = data.weather[0].description
                weatherApp.londes.html(latdes) 
                lattemp = data.main.temp
                weatherApp.lontemp.html(lattemp)
                
                
            });
        }
}

   $("#click2").click(function(){
      weatherApp.getlonlatWeather()
       return false;
        
     });
    $("#click").click(function () {
        weatherApp.getnineDate();
        return false;
    });
    $("#submit").click(function () {
        weatherApp.getFormData();
        return false;


    });

    if (weatherApp.LoadApiKey()) {
        $("#apidiv").attr("class", "hide");
    }

});