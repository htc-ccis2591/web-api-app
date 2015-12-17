$(document).ready(function () {

    $( document ).ajaxError(function() {
        $( "#error" ).append($("<p>").text( "There was an error when loading the requested Ajax data" ));
});
    var DropDown = $("<select>");
    var WorkSpace = $("#menu");
    var Submit = $("<button>");
    
    Submit.attr("type", "button");
    Submit.text("Submit");
    Submit.attr("id", "button");
    
    DropDown.attr("id", "name");
    WorkSpace.append(DropDown);
    
    
    $("<select>").attr("id", "perunit");
    WorkSpace.append($("<select>").attr("id", "perunit"));
    WorkSpace.append(Submit);
    
    function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds){
                break;
            }
        }
    }
    
    function correlation(arrayX, arrayY)
    {
        var z = 0;
        var x = 0;
        var y = 0;
        var xy = 0;
        var xSqr = 0;
        var ySqr = 0;
        var n = arrayX.length;
        var r;
        for (z = 0; z < arrayX.length; z = z + 1)
        {
            x = x + arrayX[z];
            y = y + arrayY[z];
            xy = xy + (arrayX[z] * arrayY[z]);
            xSqr = xSqr + (arrayX[z] * arrayX[z]);
            ySqr = ySqr + (arrayY[z] * arrayY[z]);
        }
        r = ((n * xy) - (x * y)) / Math.sqrt(((n * xSqr) - (x * x)) * ((n * ySqr) - (y * y)))
        return r;
    }
    
    function populate() {
        
        $.ajax({
            url: "data/stats.json",
     
            success: function (data) {
                console.log(data["Stats"][0]["name"]);
                var i;
                var nba = data["Stats"];
                var count = 0;
                for (i = 0; i < nba.length; i = i + 1) {
                    count = count + 1;
                    var TeamName = $("<option>");
                    var TeamName2 = $("<option>");
                    TeamName.attr("value", nba[i]["name"]);
                    TeamName.attr("id", count);
                    TeamName2.attr("id", count);
                    TeamName.text(nba[i]["name"]);
                    TeamName2.attr("value", nba[i]["name"]);
                    TeamName2.text(nba[i]["name"]);
                    $("#name").append(TeamName);
                    $("#perunit").append(TeamName2);
                }
            }
        });
    }
    function compute() {
        var computedstat = 0;
        var StatTotal = 0;
        var StatTotal2 = 0;
        
        var typestat;
        $.ajax({
            url: "data/Team_constants.json",
            
            success: function (data) {
                var teams = data["NBA Teams"];
                var i = 0;
                var StatArray = [];
                var StatArray2 = [];
                var StatArray3 = [];
                var counter = 0;
                for (i = 0; i < teams.length; i = i + 1){
                    var teamID = teams[i]["id"];
                    var IsOpp = "Base";
                    
                    if ($("#name").val() == "Opponent Field Goal %" || $("#perunit").val() == "Opponent Free Throws Attempted per 100 Possessions" || $("#perunit").val() == "Opponent Assists per 100 Possessions")
                        IsOpp = "Opponent";
                    
                    
                    if ($("#name").val() == "Opponent Field Goal %" || $("#name").val() == "Field Goal %")
                        typestat = 10;
                    if ($("#name").val() == "Opponent Free Throws Attempted per 100 Possessions" || $("#name").val() == "Free Throws Attempted per 100 Possessions")
                        typestat = 15;
                    if ($("#name").val() == "Opponent Assists per 100 Possessions" || $("#name").val() == "Assists per 100 Possessions")
                        typestat = 20;
                    
                    var IsOpp2 = "Base";                  
                    if ($("#perunit").val() == "Opponent Field Goal %" || $("#perunit").val() == "Opponent Free Throws Attempted per 100 Possessions" || $("#perunit").val() == "Opponent Assists per 100 Possessions")
                        IsOpp2 = "Opponent";
                    var j = i + 1
                    $.ajax({
                        url: "http://stats.nba.com/stats/teamdashboardbygeneralsplits?SeasonType=Regular Season&TeamID=" + teamID + "&MeasureType=" + IsOpp + "&PerMode=Per100Possessions&PlusMinus=N&PaceAdjust=N&Rank=N&Season=2014-15&Outcome= &Location= &Month=0&SeasonSegment= &DateFrom= &DateTo= &OpponentTeamID=0&VsConference= &VsDivision= &GameSegment= &Period=0&LastNGames=0",
                        success: function (data) 
                        {    
                            StatTotal = StatTotal + data["resultSets"][0]["rowSet"][0][typestat];
                            StatArray.push(data["resultSets"][0]["rowSet"][0][typestat]);                     
                        }
                    });
                    sleep(500);
                    $.ajax({
                        url: "http://stats.nba.com/stats/teamdashboardbygeneralsplits?SeasonType=Regular Season&TeamID=" + teamID + "&MeasureType=" + IsOpp2 + "&PerMode=Per100Possessions&PlusMinus=N&PaceAdjust=N&Rank=N&Season=2014-15&Outcome= &Location= &Month=0&SeasonSegment= &DateFrom= &DateTo= &OpponentTeamID=0&VsConference= &VsDivision= &GameSegment= &Period=0&LastNGames=0",
                        success: function (data) {
                            var typestat2;
                            if ($("#perunit").val() == "Opponent Field Goal %" || $("#perunit").val() == "Field Goal %")
                                typestat2 = 10;
                            if ($("#perunit").val() == "Opponent Free Throws Attempted per 100 Possessions" || $("#perunit").val() == "Free Throws Attempted per 100 Possessions")
                                typestat2 = 15;
                            if ($("#perunit").val() == "Opponent Assists per 100 Possessions" || $("#perunit").val() == "Assists per 100 Possessions")
                                typestat2 = 20;
                            StatTotal2 = StatTotal2 + data["resultSets"][0]["rowSet"][0][typestat2];
                            StatArray2.push(data["resultSets"][0]["rowSet"][0][typestat2]);
                            StatArray3.push(data["resultSets"][0]["headers"][typestat2]);
                            console.log(counter);
                            if (counter == 29) {
                                console.log(StatArray);
                                console.log(StatArray2);
                                console.log(StatArray3);
                                StatTotal = StatTotal / 30;
                                var Pcorrelation = $("<h3>");
                                Pcorrelation.attr("role", "alert");
                                $("#correl1").empty();
                                var ext = "The correlation coefficient is: " + (correlation(StatArray, StatArray2)).toString();
                                Pcorrelation.text(ext);
                                $("#correl1").append(Pcorrelation);
                            }
                            counter = counter + 1;
                                        }
                    });
                    
                }                     
                }
            });
        }    
    $(document).ready(populate);
    $("#button").click(compute);

});