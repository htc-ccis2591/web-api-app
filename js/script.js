$(function() {
    
    //My first request for the Deadpool section.
    $.ajax({url: "http://gateway.marvel.com:80/v1/public/characters?name=deadpool&apikey=3c8c5553e9a58fb7b24cedd0eb1b0a19",
            success: function(json) { if (json.data.results.length > 0){
                $("main").prepend("<h1>" + json.data.results[0].name + "</h1><div id='first'><p>Deadpool is an anti-hero in the marvel universe. He is known as the merc with the mouth. He is my favorite comic book charictor.</p><img src=" + json.data.results[0].thumbnail.path + "." + json.data.results[0].thumbnail.extension + " alt=Deadpool></div>");
                $("div").hide();
                $("h1").on("click", function() {
                    $("#first").fadeToggle();
                })
                
            }
            },
            error: function(json) {
                $("main").append("<p>Sorry we are unable to display your data.</p>")
            }
           });
    
    //My next request for the first apperance section.
    $.ajax({url:  "http://gateway.marvel.com:80/v1/public/comics?titleStartsWith=new%20mutants&startYear=1983&issueNumber=98&apikey=3c8c5553e9a58fb7b24cedd0eb1b0a19",
            async:false,
            success: function(json) { if (json.data.results.length > 0) {
                $("main").append("<h2>His first appearance</h2><div id='comic'><p>Deadpool first appeared in, " + json.data.results[0].title + "</p><h4>The description of this comic:</h4><p>" + json.data.results[0].description + "</p><img src=" + json.data.results[0].images[1].path + "." + json.data.results[0].images[1].extension + " alt='New Mutants #98'></div>");
            $("div").hide();
            $("h2").on("click", function() {
                    $("#comic").fadeToggle();
                })
           }
           },
           error: function(json) {
               $("$main").append("<p>Sorry we are unable to display your data.</p>")
           }
           });

    //My final request for my favorite series section.
    $.ajax({url: "http://gateway.marvel.com:80/v1/public/series?titleStartsWith=deadpool%20kills%20the&apikey=3c8c5553e9a58fb7b24cedd0eb1b0a19",
            success: function(json) {if (json.data.results.length > 0) {
                $("main").append("<h2 id='2'>My favorite Deadpool series</h2><div id='series'><p>" + json.data.results[0].title + " is my favorite Deadpool series</p><p>There are " + json.data.results[0].comics.available + " comic books in this series.</p><img src=" + json.data.results[0].thumbnail.path + "." + json.data.results[0].thumbnail.extension + " alt='Deadpool Kills The Marvel Universe'></div>");
                $("div").hide();
                $("#2").on("click", function() {
                    $("#series").fadeToggle();
                })
            }
            },
            error: function(json) {
                $("$main").append("<p>Sorry we are unable to display your data.</p>")
            }
           });
});
