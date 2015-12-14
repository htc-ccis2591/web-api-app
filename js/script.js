(function () {

    weatherApp = {

        $targetErrorMessage: $("#error"),
        $targetCurrent: $("#current"),
        $targetHourly: $("#hourly"),
        $targetFuture: $("#future"),
        submitButton: ("#submit"),
        currentButton: $("#currentWeatherButton"),
        hourlyButton: $("#hourlyWeatherButton"),
        futureButton: $("#futureWeatherButton"),
        cityLocationDiv: $("<div>", {
            id: "city"
        }),
        cityEntered: $("<p>", {
            id: "cEntered"
        }),
        cityFound: $("<p>", {
            id: "cFound"
        }),
        newHeader1: $("<h3>"),
        newHeader2: $("<h3>"),
        newDiv: $("<div>"),
        newTitleHeader: $("<h5>"),
        newPara1: $("<p>"),
        newPara2: $("<p>"),
        newPara3: $("<p>"),
        hourlyDiv: $("<div>"),
        hourlyHeader: $("<h3>"),
        hourlyPara1: $("<h4>"),
        hourlyParaDate1: $("<p>"),
        hourlyPara2: $("<h4>"),
        hourlyParaDate2: $("<p>"),
        hourlyPara3: $("<h4>"),
        hourlyParaDate3: $("<p>"),
        hourlyPara4: $("<h4>"),
        hourlyParaDate4: $("<p>"),
        futureDiv1: $("<div>"),
        futureDiv2: $("<div>"),
        futureDiv3: $("<div>"),
        futureDiv4: $("<div>"),
        futureDiv5: $("<div>"),
        futureDiv6: $("<div>"),
        futureDiv7: $("<div>"),
        futureHeader: $("<h3>"),
        futureTemp1: $("<h4>"),
        futureCondition1: $("<p>"),
        futureTemp2: $("<h4>"),
        futureCondition2: $("<p>"),
        futureTemp3: $("<h4>"),
        futureCondition3: $("<p>"),
        futureTemp4: $("<h4>"),
        futureCondition4: $("<p>"),
        futureTemp5: $("<h4>"),
        futureCondition5: $("<p>"),
        futureTemp6: $("<h4>"),
        futureCondition6: $("<p>"),
        futureTemp7: $("<h4>"),
        futureCondition7: $("<p>"),

        weatherApiKey: "",
        cityName: "",
        cityId: "",
        localStorageKey: "openWeatherApi",

        getFormData: function () {
            if (weatherApp.weatherApiKey === null || weatherApp.weatherApiKey === "") {
                weatherApp.weatherApiKey = $("#apiEntry").val().trim();
                weatherApp.saveApiKey();
            }

            if (weatherApp.cityName === null || weatherApp.cityName === "") {
                weatherApp.$targetErrorMessage.html("Error: Please Enter a City Name!").css("color", "red");
                weatherApp.$targetCurrent.empty();
                weatherApp.$targetHourly.empty();
                weatherApp.$targetFuture.empty();
            } else if (weatherApp.cityName.length > 2) {
                weatherApp.$targetErrorMessage.html("");
                weatherApp.getCurrentData();
                return true;
            } else {
                weatherApp.$targetErrorMessage.html("Error: City Name must be longer than 2 characters!").css("color", "red");
                weatherApp.$targetCurrent.empty();
                weatherApp.$targetHourly.empty();
                weatherApp.$targetFuture.empty();
            }

        },

        getCurrentData: function () {

            var url = "http://api.openweathermap.org/data/2.5/weather?q=" + weatherApp.cityName + ",us&appid=" + weatherApp.weatherApiKey + "&units=imperial";

            $.getJSON(url, function (data) {
                var cityLabelTarget = $("#buttons");

                if (data.cod === 200) {

                    if (name = true) {
                        weatherApp.currentButton.removeAttr("disabled");
                        weatherApp.hourlyButton.removeAttr("disabled");
                        weatherApp.futureButton.removeAttr("disabled");
                        weatherApp.cityId = data.id;

                        if (weatherApp.cityEntered.text.length <= 1) {
                            $("#cEntered").html("");
                            $("#cFound").html("");

                            if (weatherApp.cityEntered.text.length > 0) {
                                $(weatherApp.cityEntered).append(weatherApp.cityLocationDiv).text("City Entered: " + weatherApp.cityName).appendTo(cityLabelTarget);
                                $(weatherApp.cityFound).append(weatherApp.cityLocationDiv).text("City Found: " + data.name).appendTo(cityLabelTarget);
                            }
                        }

                        weatherApp.currentButton.click(function () {

                            $(weatherApp.$targetErrorMessage).empty();
                            weatherApp.displayCurrentWeather(data);

                        });

                    }

                } else {
                    weatherApp.$targetErrorMessage.html("Error code: " + data.cod + " " + data.message).css("color", "red");
                }

            }).fail(function () {
                weatherApp.$targetErrorMessage.html("Sorry, unable to connect to server :(").css("color", "red");
            }).error(function () {
                weatherApp.$targetErrorMessage.html("Sorry, unable to connect to server :(").css("color", "red");
            })

        },

        getHourlyData: function () {

            var url = "http://api.openweathermap.org/data/2.5/forecast?id=" + weatherApp.cityId + "&appid=" + weatherApp.weatherApiKey + "&units=imperial&mode=json";

            $.getJSON(url, function (data) {
                if (data.cod === "200") {

                    weatherApp.$targetErrorMessage.empty();
                    weatherApp.displayHourlyWeather(data);

                } else {
                    weatherApp.$targetErrorMessage.html("Error code: " + data.cod + " " + data.message).css("color", "red");
                }

            }).fail(function () {
                weatherApp.$targetErrorMessage.html("Sorry, unable to connect to server :(").css("color", "red");
            }).error(function () {
                weatherApp.$targetErrorMessage.html("Sorry, unable to connect to server :(").css("color", "red");
            })



        },

        getFutureData: function () {

            var url = "http://api.openweathermap.org/data/2.5/forecast/daily?id=" + weatherApp.cityId + "&units=imperial&appid=" + weatherApp.weatherApiKey;

            $.getJSON(url, function (data) {
                if (data.cod === "200") {
                    weatherApp.$targetErrorMessage.empty();
                    weatherApp.displayFutureWeather(data);

                } else {
                    weatherApp.$targetErrorMessage.html("Error code: " + data.cod + " " + data.message).css("color", "red");
                }

            }).fail(function () {
                weatherApp.$targetErrorMessage.html("Sorry, unable to connect to server :(").css("color", "red");
            }).error(function () {
                weatherApp.$targetErrorMessage.html("Sorry, unable to connect to server :(").css("color", "red");
            })

        },

        loadApiKey: function () {
            if (typeof (localStorage) === "undefined") {
                weatherApp.$targetArea.html("Sorry, local storage is not supported for this browser.").css("color", "red");
            } else {
                weatherApp.weatherApiKey = localStorage.getItem(weatherApp.localStorageKey);
                if (weatherApp.weatherApiKey === null || weatherApp.weatherApiKey === "") {
                    return false;
                }
                return true;
            }

        },

        saveApiKey: function () {
            if (typeof (localStorage) === "undefined") {
                weatherApp.$targetArea.html("Sorry, local storage is not supported for this browser.").css("color", "red");
            } else {

                if (weatherApp.weatherApiKey === null || weatherApp.weatherApiKey === "") {
                    weatherApp.$targetArea.html("Sorry, you must enter an API key.");

                } else {
                    localStorage.setItem(weatherApp.localStorageKey, weatherApp.weatherApiKey);
                    $("#apiEntry").attr("class", "hide");
                }

            }

        },

        displayCurrentWeather: function (data) {

            var currentDiv = $(weatherApp.newDiv).attr("id", "currentDivInfo"),
                mainTemp = $(weatherApp.newTitleHeader).attr("class", "titleTemp"),
                highTemp = $(weatherApp.newPara1).attr("class", "secondData"),
                lowTemp = $(weatherApp.newPara2).attr("class", "secondData"),
                currentConditions = $(weatherApp.newHeader2).attr("class", "secondData"),
                currentHumidity = $(weatherApp.newPara3).attr("class", "secondData"),
                name = (data.name),
                temp = (Math.round(data.main.temp)),
                maxTemp = (Math.round(data.main.temp_max)),
                minTemp = (Math.round(data.main.temp_min)),
                current = (data.weather[0].main),
                humidity = (data.main.humidity);

            $(weatherApp.newHeader1).attr("id", "currentHead").text("Current weather for " + name).appendTo(weatherApp.$targetCurrent);
            $(currentDiv).append($(mainTemp).text("Current Temp: " + temp + " F")).appendTo(weatherApp.$targetCurrent);
            $(currentDiv).append($(highTemp).text("High Temp: " + maxTemp + " F"));
            $(currentDiv).append($(lowTemp).text("Low Temp: " + minTemp + " F"));
            $(currentDiv).append($(currentConditions).text("Current Conditions: " + current));
            $(currentDiv).append($(currentHumidity).text("Current Humidity: " + humidity + "%"));

        },

        displayHourlyWeather: function (data) {

            var hourlyDiv = $(weatherApp.hourlyDiv).attr("id", "hourlyDivInfo"),
                mainTemp1 = $(weatherApp.hourlyPara1).attr("id", "1hourTemp"),
                hourDate1 = $(weatherApp.hourlyParaDate1).attr("id", "1hourDate"),
                mainTemp2 = $(weatherApp.hourlyPara2).attr("id", "2hourTemp"),
                hourDate2 = $(weatherApp.hourlyParaDate2).attr("id", "2hourDate"),
                mainTemp3 = $(weatherApp.hourlyPara3).attr("id", "3hourTemp"),
                hourDate3 = $(weatherApp.hourlyParaDate3).attr("id", "3hourDate"),
                mainTemp4 = $(weatherApp.hourlyPara4).attr("id", "4hourTemp"),
                hourDate4 = $(weatherApp.hourlyParaDate4).attr("id", "4hourDate"),

                temp1 = (Math.round(data.list[0].main.temp)),
                date1 = (data.list[0].dt_txt),
                temp2 = (Math.round(data.list[1].main.temp)),
                date2 = (data.list[1].dt_txt),
                temp3 = (Math.round(data.list[2].main.temp)),
                date3 = (data.list[2].dt_txt),
                temp4 = (Math.round(data.list[3].main.temp)),
                date4 = (data.list[3].dt_txt),
                name = (data.city.name);

            $(weatherApp.hourlyHeader).attr("id", "hourlyHead").text("Hourly report for " + name).appendTo(weatherApp.$targetHourly);
            $(hourlyDiv).append($(mainTemp1).text("Temp: " + temp1 + " F")).appendTo(weatherApp.$targetHourly);
            $(hourlyDiv).append($(hourDate1).text("Date: " + date1));
            $(hourlyDiv).append($(mainTemp2).text("Temp: " + temp2 + " F"));
            $(hourlyDiv).append($(hourDate2).text("Date: " + date2));
            $(hourlyDiv).append($(mainTemp3).text("Temp: " + temp3 + " F"));
            $(hourlyDiv).append($(hourDate3).text("Date: " + date3));
            $(hourlyDiv).append($(mainTemp4).text("Temp: " + temp4 + " F"));
            $(hourlyDiv).append($(hourDate4).text("Date: " + date4));

        },

        displayFutureWeather: function (data) {

            var futureDiv1 = $(weatherApp.futureDiv1).attr("id", "futureDiv1Info").css("border-style", "groove").css("border-right", "none"),
                futureDiv2 = $(weatherApp.futureDiv2).attr("id", "futureDiv2Info").css("border-style", "groove").css("border-right", "none"),
                futureDiv3 = $(weatherApp.futureDiv3).attr("id", "futureDiv3Info").css("border-style", "groove").css("border-right", "none"),
                futureDiv4 = $(weatherApp.futureDiv4).attr("id", "futureDiv4Info").css("border-style", "groove").css("border-right", "none"),
                futureDiv5 = $(weatherApp.futureDiv5).attr("id", "futureDiv5Info").css("border-style", "groove").css("border-right", "none"),
                futureDiv6 = $(weatherApp.futureDiv6).attr("id", "futureDiv6Info").css("border-style", "groove").css("border-right", "none"),
                futureDiv7 = $(weatherApp.futureDiv7).attr("id", "futureDiv7Info").css("border-style", "groove"),
                fTemp1 = $(weatherApp.futureTemp1).attr("id", "1dayTemp"),
                fCondition1 = $(weatherApp.futureCondition1).attr("id", "1dayCondition"),
                fTemp2 = $(weatherApp.futureTemp2).attr("id", "2dayTemp"),
                fCondition2 = $(weatherApp.futureCondition2).attr("id", "2dayCondition"),
                fTemp3 = $(weatherApp.futureTemp3).attr("id", "3dayTemp"),
                fCondition3 = $(weatherApp.futureCondition3).attr("id", "3dayCondition"),
                fTemp4 = $(weatherApp.futureTemp4).attr("id", "4dayTemp"),
                fCondition4 = $(weatherApp.futureCondition4).attr("id", "4dayCondition"),
                fTemp5 = $(weatherApp.futureTemp5).attr("id", "5dayTemp"),
                fCondition5 = $(weatherApp.futureCondition5).attr("id", "5dayCondition"),
                fTemp6 = $(weatherApp.futureTemp6).attr("id", "6dayTemp"),
                fCondition6 = $(weatherApp.futureCondition6).attr("id", "6dayCondition"),
                fTemp7 = $(weatherApp.futureTemp7).attr("id", "7dayTemp"),
                fCondition7 = $(weatherApp.futureCondition7).attr("id", "7dayCondition"),

                temp1 = (Math.round(data.list[0].temp.day)),
                condition1 = (data.list[0].weather[0].main),
                temp2 = (Math.round(data.list[1].temp.day)),
                condition2 = (data.list[1].weather[0].main),
                temp3 = (Math.round(data.list[2].temp.day)),
                condition3 = (data.list[2].weather[0].main),
                temp4 = (Math.round(data.list[3].temp.day)),
                condition4 = (data.list[3].weather[0].main),
                temp5 = (Math.round(data.list[4].temp.day)),
                condition5 = (data.list[4].weather[0].main),
                temp6 = (Math.round(data.list[5].temp.day)),
                condition6 = (data.list[5].weather[0].main),
                temp7 = (Math.round(data.list[6].temp.day)),
                condition7 = (data.list[6].weather[0].main),
                name = (data.city.name);

            $(weatherApp.futureHeader).attr("id", "futureHead").text("Seven day forecast for " + name).appendTo(weatherApp.$targetFuture);
            $(futureDiv1).append($(fTemp1).text("Temp: " + temp1 + " F")).appendTo(weatherApp.$targetFuture);
            $(futureDiv1).append($(fCondition1).text("Prediction: " + condition1));
            $(futureDiv2).append($(fTemp2).text("Temp: " + temp2 + " F")).appendTo(weatherApp.$targetFuture);
            $(futureDiv2).append($(fCondition2).text("Prediction: " + condition2));
            $(futureDiv3).append($(fTemp3).text("Temp: " + temp3 + " F")).appendTo(weatherApp.$targetFuture);
            $(futureDiv3).append($(fCondition3).text("Prediction: " + condition3));
            $(futureDiv4).append($(fTemp4).text("Temp: " + temp4 + " F")).appendTo(weatherApp.$targetFuture);
            $(futureDiv4).append($(fCondition4).text("Prediction: " + condition4));
            $(futureDiv5).append($(fTemp5).text("Temp: " + temp5 + " F")).appendTo(weatherApp.$targetFuture);
            $(futureDiv5).append($(fCondition5).text("Prediction: " + condition5));
            $(futureDiv6).append($(fTemp6).text("Temp: " + temp6 + " F")).appendTo(weatherApp.$targetFuture);
            $(futureDiv6).append($(fCondition6).text("Prediction: " + condition6));
            $(futureDiv7).append($(fTemp7).text("Temp: " + temp7 + " F")).appendTo(weatherApp.$targetFuture);
            $(futureDiv7).append($(fCondition7).text("Prediction: " + condition7));

        },

        buttons: function () {

            $(weatherApp.submitButton).click(function () {

                weatherApp.cityName = $("#cityName").val().trim();
                $("#cityName").val("");
                weatherApp.getFormData();

                return false;
            });

            $(weatherApp.hourlyButton).click(function () {

                weatherApp.getHourlyData();

            });

            $(weatherApp.futureButton).click(function () {

                weatherApp.getFutureData();

            });

        },

    }

    if (weatherApp.loadApiKey()) {
        $("#apiEntry").attr("class", "hide");

    }

    weatherApp.buttons();

})();