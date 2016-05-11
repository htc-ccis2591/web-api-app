$(function () {


    var apiKey;
    apiKey = 'eb80359d364336adc10538102a1a7230';
    $('form').hide();
    $('h2#zipcode').on("click", function () {
        $(this).next().show();

    })

    $('#form1').on("submit", function (e) {
        e.preventDefault();
        var zipcode = $("#zip").val();
        console.log(zipcode);

        console.log(apiKey);
        var url = "http://api.openweathermap.org/data/2.5/weather?zip=" + zipcode + ",us&appid=" + apiKey;
        console.log(zipcode, apiKey, url)
        $.getJSON(url)
            .done(function (data) {

                var weatherInfo = "";
                weatherInfo += "<h3> humidity " + data.main.humidity + "</h3>";
                weatherInfo += "<h3>temperature " + converTemp(data.main.temp) + "</h3>";
                weatherInfo += "<h3>wind " + data.wind.speed + "</h3>";
                $("#form1").append("<div>" + weatherInfo + "</div> ");


            });

    });

    $('h2#cty').on("click", function () {
        $(this).next().show();

    })

    $('#form2').on("submit", function (e) {
        e.preventDefault();
        var city = $("#city").val();
        console.log(city);

        console.log(city);
        var url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + ",us&appid=" + apiKey;
        console.log(city, apiKey, url)
        $.getJSON(url)
            .done(function (data) {

                var cityWeather = "";
                cityWeather += "<h3> description " + data.weather.description + "</h3>";
                cityWeather += "<h3> sunrise " + data.sys.sunrise + "</h3>";
                cityWeather += "<h3>sky " + data.clouds.all + "</h3>";
                $("#form2").append("<div>" + cityWeather + "</div>");


            });

    });

    $('h2#loc').on("click", function () {
        $(this).next().show();

    })

    $('#form3').on("submit", function (e) {
        e.preventDefault();
        var lat = $("#lat").val();
        var lon = $("#lon").val();

        var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;

        console.log(lat, lon, apiKey, url)
        $.getJSON(url)
            .done(function (data) {

                var weatherCoord = "";
                weatherCoord += "<h3> humidity " + data.main.humidity + "</h3>";
                // weatherCoord += "<img src =" + data.weather[0].icon + "alt=" + data.weather[0].icon + " >";



                weatherCoord += "<h3>temperature " + converTemp(data.main.temp) + "</h3>";

                if (data.rain != undefined) {
                    weatherCoord += "<h3>rain " + data.rain['3h'] + "</h3>";

                }


                $("#form3").append("<div>" + weatherCoord + "</div>");


            });









    });



    function converTemp(temp) {

        return Math.round((temp * 1.8) - 459.67);
    }








});