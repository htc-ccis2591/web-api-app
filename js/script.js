$(function () {








    function getpokemon(apikey) {
        var pokeadress = 'http://pokeapi.co/api/v2/pokemon/' + apikey;

        resetPage();
        $.getJSON(pokeadress)
            .done(function (pokedata) {
                console.log(pokedata);
                addpoke(pokedata);



            })


        .fail(function () {
            $('#AbiInfo').append('<p>You messed up the abillity. Or its down</p>')
        });
    }

    function addpoke(pokedata) {


        var poketxt = '';
        poketxt += '<p>Name: ' + pokedata.name + '</p>';
        poketxt += '<p> It is Number#' + pokedata.id + ' in the pokedex</p>';
        poketxt += '<img src="pokemon/' + pokedata.id + '.png">';
        poketxt += '<h4>Types</h4>';
        poketxt += '<ul>';
        console.log('Type Info');

        pokedata.types.forEach(function (t) {
            console.log(t.type.name);
            poketxt += '<li>' + t.type.name + '</li>';
        });

        $('#PokemonInfo').append(poketxt);

    }

    function gettype(apikey) {
        var typeadress = 'http://pokeapi.co/api/v2/type/' + apikey;
        resetPage();
        $.getJSON(typeadress)
            .done(function (typedata) {
                console.log(typedata);
                addtype(typedata)




            })

        .fail(function () {
            $('#TypeInfo').append('<p>You messed up the Pokemon Or its down</p>')
        })
    };

    function addtype(typedata) {

        var typetxt = '';

        typetxt += '<h2>' + typedata.name + '</h2>'
        typetxt += '<img class="thumbimg"src="types/' + typedata.name + '.png">';
        typetxt += '<h3>Damage Relations</h3>'
        typetxt += '<ul>'



        typedata.damage_relations.double_damage_from.forEach(function (dmgr) {
            console.log(dmgr.name);
            typetxt += '<p>Double damage from <b>' + dmgr.name + '</b> types</p>';
        });

        typedata.damage_relations.double_damage_to.forEach(function (dmgr) {
            console.log(dmgr.name);
            typetxt += '<p>Double damage to <b>' + dmgr.name + '</b> types</p>';
        });
        typedata.damage_relations.half_damage_from.forEach(function (dmgr) {
            console.log(dmgr.name);
            typetxt += '<p>Half damage from <b>' + dmgr.name + '</b> types</p>';
        });
        typedata.damage_relations.half_damage_to.forEach(function (dmgr) {
            console.log(dmgr.name);
            typetxt += '<p>Half damage to <b>' + dmgr.name + '</b> types</p>';
        });
        typedata.damage_relations.no_damage_from.forEach(function (dmgr) {
            console.log(dmgr.name);
            typetxt += '<p>No damage from <b>' + dmgr.name + '</b> types</p>';
        });
        typedata.damage_relations.no_damage_to.forEach(function (dmgr) {
            console.log(dmgr.name);
            typetxt += '<p>No damage to <b>' + dmgr.name + '</b> types</p>';
        });






        typetxt += '</ul>'

        $('#TypeInfo').append(typetxt);



    }

    function resetPage() {
        $('#AbiInfo').empty();
        $('#TypeInfo').empty();
        $('#PokemonInfo').empty();
    }

    function getabi(apikey) {

        var abiadress = 'http://pokeapi.co/api/v2/ability/' + apikey;
        resetPage();

        $.getJSON(abiadress)
            .done(function (abidata) {
                console.log(abidata);
                addabi(abidata);



            })

        .fail(function () {
            $('#AbiInfo').append('<p>You messed up the abillity. Or its down</p>')
        });
    }



    function addabi(abidata) {

        var abitxt = '';
        abitxt += '<h2>Abillity Name: ' + abidata.name + '</h2>'
        abitxt += '<p> What it does: ' + abidata.flavor_text_entries[abidata.flavor_text_entries.length - 1].flavor_text + '</p>'


        abitxt += '<ul>'

        abidata.pokemon.forEach(function (p) {
            console.log(p.pokemon.name);
            abitxt += '<li>' + p.pokemon.name + '</li>';
        });

        abitxt += '</ul>'
        $('#AbiInfo').append(abitxt);

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