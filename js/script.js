$(function () {


    function getpokemon(apikey) {
        var pokeadress = 'http://pokeapi.co/api/v2/pokemon/' + apikey;
        $.getJSON(pokeadress)
            .done(function (pokedata) {
                console.log(pokedata);



            })
    }



    function gettype(apikey) {
        var typeadress = 'http://pokeapi.co/api/v2/type/' + apikey;
        $.getJSON(typeadress)
            .done(function (typedata) {
                console.log(typedata);




            });
    }



    function getabi(apikey) {

        var abiadress = 'http://pokeapi.co/api/v2/ability/' + apikey;
        $.getJSON(abiadress)
            .done(function (abidata) {
                console.log(abidata);




            });
    }



    $("#submitP").click(function (e) {
        e.preventDefault();

        var apikey = $('#pokepass').val();


        getpokemon(apikey);


    });

    $("#submitT").click(function (e) {
        e.preventDefault();

        var apikey = $('#typepass').val();


        gettype(apikey);



    });

    $("#submitA").click(function (e) {
        e.preventDefault();

        var apikey = $('#abipass').val();


        getabi(apikey);



    });




});