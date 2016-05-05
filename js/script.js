$(function () {
    //////////////////////////////
    /////// keys go here! ////////
    //////////////////////////////

    var currencyKey = '';
    var timeKey = '';
    var languageKey = '';
    var mapKey = '';

    //////////////////////////////
    //////////////////////////////
    //////////////////////////////

    // declare variables
    var exchangeRate;
    var weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var months = ['January', 'February', 'March', 'April', 'March', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


    ////// draw html frame to the dom
    $('body').prepend(
        "<div class='header'>" +
        "<img class='banner' src='img/LOGO2.png' alt='It/'s a TrApp!'>" +
        "</div>" +
        "<div class='sidebar'>" +

        "</div>" +

        "<div class='main' aria-live='polite' aria-relevant='additions removals'>" +

        "<h1>To begin, please enter the 4 keys below:</h1>" +

        '<div id="keyForm">' +
        '<strong>Time API: </strong>' +
        '<input type="text" name="timeKeyInput" id="timeKeyInput" value="">' +
        '<br><strong>Money API: </strong>' +
        '<input type="text" name="currencyKeyInput" id="currencyKeyInput" value="">' +
        '<br><strong>Language API: </strong>' +
        '<input type="text" name="languageKeyInput" id="languageKeyInput" value="">' +
        '<br><strong>Map API: </strong>' +
        '<input type="text" name="mapKeyInput" id="mapKeyInput" value="">' +
        '<br><button id="fetchKeys">Let\'s go!</button>' +
        '</div>' +

        "</div>"
    );


    $('#fetchKeys').on('click', function () {
        
        currencyKey = $('#currencyKeyInput').val();
        timeKey = $('#timeKeyInput').val();
        languageKey = $('#languageKeyInput').val();
        mapKey = $('#mapKeyInput').val();

        $('body').append('<script src="https://maps.googleapis.com/maps/api/js?key=' + mapKey + '"></script>');
        
        $('.main').html("<h1>Where would you like to go?</h1>");
        $('.sidebar').html("<h3>Locations</h3>" +
            "<ul>" +
            "<li>New Zealand</li>" +
            "<li>Thailand</li>" +
            "<li>Sweden</li>" +
            "<li>California/USA</li>" +
            "<li>Iceland</li>" +
            "<li>Hawaii/USA</li>" +
            "<li>Fiji</li>" +
            "</ul>");

       


        //////// On click of location add the 4 info sections
        $('li').on('click', function () {
            var location = $(this).text();
            // add new structure to main
            $('.main').html(
                "<h1>Welcome to " + location + "!</h1>" +
                "<div id='time'>" +
                "<h2>Local Time</h2>" +
                "</div>" +
                "<div id='currency'>" +
                "<h2>Local Currency</h2>" +
                "</div>" +
                "<br>" +
                "<div id='language'>" +
                "<h2>Local Language</h2>" +
                "</div>" +
                "<div id='map'>" +
                "<h2>Map of the Area</h2>" +
                "</div>"
            );
            // add in form blanks
            $('#currency').append('<div id = "conversiondiv">' +
                '<div id="conversionTO" class = "currencydiv">' +
                '<strong>USD: </strong>' +
                '<input type="text" name="usdAmount" id="usdAmount" value="1">' +
                '</div>' +
                '<span> = </span><strong id="convertTOCurrency"> USD:  </strong><span id="convertTOResult"> 1 </span>' +
                '<br><button id="fetchTOusd">Convert</button>' +
                '<br><br>' +
                '<div id="conversionFROM" class = "currencydiv">' +
                '<strong id="convertFROMCurrency">USD: </strong>' +
                '<input type="text" name="destAmount" id="destAmount" value="1">' +
                '</div>' +
                '<span> = </span><strong> USD:  </strong><span id="convertFROMResult"> 1 </span>' +
                '<br><button id="fetchFROMusd">Convert</button>' +
                '</div>'
            );

            // onclick to perform conversion TO usd
            $('#fetchTOusd').on('click', function () {
                var value = $('#usdAmount').val();
                var amount = (exchangeRate * Number(value)).toFixed(2);
                $('#convertTOResult').text(amount);
            });

            // onclick to perform conversion FROM usd
            $('#fetchFROMusd').on('click', function () {
                var value = $('#destAmount').val();
                var amount = (Number(value) / exchangeRate).toFixed(2);
                $('#convertFROMResult').text(amount);
            });

            ///// fill in 4 sections
            loadTime(location);
            loadCurrency(location);

            loadLanguage(location);
            loadMaps(location);
        })


        //////// Time!
        function loadTime(location) {
            //get current local time and date and add to the dom
            var localTime = new Date();
            var localOffset = -5;
            addTimeandDate('Local', localTime);

            //determine zone
            var zone;
            switch (location) {
                case 'Sweden':
                    zone = 'Europe/Stockholm'
                    break;
                case 'California/USA':
                    zone = 'America/Los_Angeles'
                    break;
                case 'Thailand':
                    zone = 'Asia/Bangkok'
                    break;
                case 'New Zealand':
                    zone = 'Pacific/Auckland'
                    break;
                case 'Iceland':
                    zone = 'Atlantic/Reykjavik'
                    break;
                case 'Hawaii/USA':
                    zone = 'Pacific/Honolulu'
                    break;
                case 'Fiji':
                    zone = 'Pacific/Fiji'
                    break;
            }

            //call timezone service to get local time, calculate time difference, add info to dom
            var timezoneInfo;
            var url = 'http://api.timezonedb.com/?zone=' + zone + '&format=json&key=' + timeKey;
            $.getJSON(url).done(function (data) {
                var locationTime = new Date(data.timestamp * 1000);
                var locationOffset = (data.gmtOffset) / 3600;
                var timeDiff = locationOffset + 5;
                var timeDiffText;
                if (timeDiff > 0) {
                    timeDiffText = '+' + timeDiff + ' hours ahead of Local Time'
                } else {
                    timeDiffText = timeDiff + ' hours behind of Local Time'
                }

                addTimeandDate(location, locationTime);

                $('#time').append('<p id="timedifference"><strong>Time Difference: </strong>' + timeDiffText + '</p>');


            }).error(function () {
                $('#time').append('<p><strong>Sorry, information on time in destination is not available.</strong></p>');
            });
        };

        function addTimeandDate(location, dateObj) {
            //extract info from date object
            var localYear = dateObj.getFullYear();
            var localMonth = dateObj.getMonth();
            var localDate = dateObj.getDate();
            var localDay = dateObj.getDay();
            var localHours = dateObj.getHours();
            var localMinutes = dateObj.getMinutes();

            //offset for local time difference from GMT
            if (location !== 'Local') {
                localHours = localHours + 5;
            }
            //time formatting from 24hrs
            if (localMinutes < 10) {
                localMinutes = '0' + localMinutes
            }
            var ampm = 'AM';
            if (localHours > 12) {
                localHours = localHours - 12;
                ampm = 'PM';
            } else if (localHours === 12) {
                ampm = 'PM';
            } else if (localHours === 0) {
                localHours = 12;
            }
            //add to dom
            $('#time').append('<p id="localtime"><strong>' + location + ' Time: </strong>' + localHours + ':' + localMinutes + ampm + '</p>' +
                '<p id="localdate"><strong>' + location + ' Date: </strong>' + weekDays[localDay] + ', ' + months[localMonth] + ' ' + localDate + ', ' + localYear + '</p>');
        };


        ////// Currency!
        function loadCurrency(location) {
            var currency;
            //determine currency
            switch (location) {
                case 'Sweden':
                    currency = 'SEK'
                    break;
                case 'California/USA':
                    currency = 'USD'
                    break;
                case 'Thailand':
                    currency = 'THB'
                    break;
                case 'New Zealand':
                    currency = 'NZD'
                    break;
                case 'Iceland':
                    currency = 'ISK'
                    break;
                case 'Hawaii/USA':
                    currency = 'USD'
                    break;
                case 'Fiji':
                    currency = 'FJD'
                    break;
            }

            //call exchange service, add text about rate, fill in the forms
            var url = 'http://apilayer.net/api/live?access_key=' + currencyKey + '&currencies=' + currency + '&format=1';
            $.getJSON(url).done(function (data) {
                var exchangeRateObj = data.quotes;
                var rates = $.map(exchangeRateObj, function (key) {
                    return key
                });
                exchangeRate = rates[0].toFixed(2);

                addExchangeRate(exchangeRate, currency);
                var value = $('#usdAmount').val();

                $('#convertTOCurrency').text(currency + ': ');
                $('#convertFROMCurrency').text(currency + ': ');

                $('#convertTOResult').text(exchangeRate);
                $('#convertFROMResult').text((1 / exchangeRate).toFixed(2));

            }).error(function (data) {
                $('#conversiondiv').text('Sorry, the converter is not working.');
            });

            //call exchange service again (different endpoint), add text about currency name, fill in the forms
            var url2 = 'http://apilayer.net/api/list?access_key=' + currencyKey;
            $.getJSON(url2).done(function (data) {
                var exchangeNameObj = data.currencies;
                var currencyName = exchangeNameObj[currency];
                console.log(currencyName);
                $('#exchangerate').before('<p>The currency in ' + location + ' is called the ' + currencyName + ' (' + currency + ').</p>');

            }).error(function (data) {
                $('#currency').append('Sorry, the currency information is not available.');
            });

        };

        
        //add text about rate
        function addExchangeRate(rate, currency) {
            $('#conversiondiv').before('<p id="exchangerate">1 USD = ' + rate + ' ' + currency + '</p>');
        };

        
        //////// Language!
        function loadLanguage(location) {

            //array of phrases I want to add, as a string for the api call and as an array
            var phraseString = '&q=How are you?&q=Thank you&q=Do you speak English?&q=How much does this cost?&q=Where is the toilet?';
            var ENphrases = ['How are you?', 'Thank you', 'Do you speak English?', 'How much does this cost?', 'Where is the toilet?'];

            var source = 'en';
            //determine target language
            var target, nationalLanguage;
            switch (location) {
                case 'Sweden':
                    target = 'sv'
                    nationalLanguage = 'Swedish'
                    break;
                case 'California/USA':
                    target = 'en'
                    nationalLanguage = 'English'
                    break;
                case 'Thailand':
                    target = 'th'
                    nationalLanguage = 'Thai'
                    break;
                case 'New Zealand':
                    target = 'en'
                    nationalLanguage = 'English'
                    break;
                case 'Iceland':
                    target = 'is'
                    nationalLanguage = 'Icelandic'
                    break;
                case 'Hawaii/USA':
                    target = 'en'
                    nationalLanguage = 'English'
                    break;
                case 'Fiji':
                    target = 'en'
                    nationalLanguage = 'English and Fijian'
                    break;
            }
            //display language name
            $('#language').append('<h3>The national language of ' + location + ' is ' + nationalLanguage + '.</h3>');

            $('#language').append('<h3>Common Phrases</h3>');
            //if language is not english, call service to translate all the phrases and add to page
            if (target !== 'en') {
                var translation;
                var url = 'https://www.googleapis.com/language/translate/v2?key=' + languageKey + '&source=' + source + '&target=' + target + phraseString;
                $.getJSON(url).done(function (data) {

                    for (i = 0; i < ENphrases.length; i++) {
                        var thisPhrase = data.data.translations[i].translatedText;
                        $('#language').append('<p id="timedifference"><strong>' + ENphrases[i] + ': </strong>' + thisPhrase + '</p>');
                    }

                }).error(function () {
                    $('#language').append('<p id="timedifference"><strong>Sorry, common phrases are not available.</strong></p>');
                });
            } else {
                // if it is english just show the phrases as they are.
                for (i = 0; i < ENphrases.length; i++) {
                    $('#language').append('<p id="timedifference"><strong>' + ENphrases[i] + '</strong></p>');
                }
            }

        };


        //////// Maps!
        function loadMaps(location) {

            // determine the correct lat/long/zoom
            var lat, lng, zoom;
            switch (location) {
                case 'Sweden':
                    lat = 63.32
                    lng = 18.06
                    zoom = 4
                    break;
                case 'California/USA':
                    lat = 36.77
                    lng = -119.41
                    zoom = 5
                    break;
                case 'Thailand':
                    lat = 13.87
                    lng = 100.99
                    zoom = 5
                    break;
                case 'New Zealand':
                    lat = -40.90
                    lng = 174.8
                    zoom = 5
                    break;
                case 'Iceland':
                    lat = 64.96
                    lng = -18.02
                    zoom = 5
                    break;
                case 'Hawaii/USA':
                    lat = 19.89
                    lng = -155.58
                    zoom = 6
                    break;
                case 'Fiji':
                    lat = -17.71
                    lng = 178.56
                    zoom = 7
                    break;
            }
            //add map container
            $('#map').append('<div id="mapdiv"></div>');


            // Create a map object and specify the DOM element for display.
            var map = new google.maps.Map($('#mapdiv')[0], {
                center: {
                    lat: lat,
                    lng: lng
                },
                scrollwheel: false,
                zoom: zoom
            });


        };

    });



});
