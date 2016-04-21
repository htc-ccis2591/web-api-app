$(function() {
   
    //geting a request for the marvel api
    $.ajax({url: "http://gateway.marvel.com:80/v1/public/characters?name=deadpool&apikey=3c8c5553e9a58fb7b24cedd0eb1b0a19",
            success: function(json) { if (json.data.results.length > 0){
                $("main").append("<h1>" + json.data.results[0].name + "</h1>");
                $("main").append("<img src=" + json.data.results[0].thumbnail.path + "." + json.data.results[0].thumbnail.extension + ">");
            }
            },
            error: function(json) {
                $("main").append("<p>Sorry we are unable to display your data.</p>")
            }
           });
});