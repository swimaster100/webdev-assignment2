(function ($) {
    $.fn.hexed = function(difficulty, rounds) {
        //To add in the colors, sliders, buttons, etc for the game
        $('#hexgame').html("<div id='container'></div><div id='results'></div>");
        var title = '<h1>Hexed</h1>';
        var slider = "<div id='red'></div><div id='green'></div><div id='blue'></div>";
        var colors = '<div id="swatch" class="ui-widget-content ui-corner-all"></div>';
        var buttons = '<button type="button" id="calculate" >Calculate!</button> <button type="button" id="next" >Next!</button>';
	var hexv = '<div id="hexv"><input type="text" id="hex_red" class="value" /><input type="text" id="hex_green" class="value" /><input type="text" id="hex_blue" class="value" /></div>';
        $('#container').html(title + slider + colors + buttons + hexv);
        $('#results').html('<div id="recent"></div><div id="scores"></div>');
        var result = "<h2>Most Recent Results</h2>";
        var color1 = '<div class="color1"><h3>The Actual Color:</h3><div id="oldcolor" class="ui-widget-content ui-corner-all"></div></div>';
        var color2 = '<div class="color2"><h3>Your Color:</h3><div id="newcolor" class="ui-widget-content ui-corner-all"></div></div>';
        var colorpercent = '<div id="colorpercent"></div>'
        $('#recent').html(result + color1 + color2 + colorpercent);
        var scoreshtml = '<h2 id="currentGame"></h2><ul id="listScores"></ul>';
        $('#scores').html(scoreshtml);
        
    }




$.fn.hexed = function(settings) { //makes 'hexed' a jquery function
        $("#display").width(200).height(200); //sets size of display
        var difficulty = -1; //param check
        var turns = -1; 
        if(settings != null) {
                for (item in settings) {
                        if(item.first = "difficulty")
                                difficulty = item.second;
                        else if(item.first = "turns")
                                turns = item.second;
                }
        }
        if(turns == -1)
                turns = 10;
        if(difficulty == -1)
                difficulty = 5;
        
        var function2;
        var start;
        var r, g, b;
        
        var function1 = function () { //listen for the first click
                start =  new Date().getTime(); // to get the time simply recall the RSA
                                                                           // and subtract start from it
                this.innerHTML = "Got it!"; //change text of button
                r = Math.floor(255*Math.random()); //generate and show color
                g = Math.floor(255*Math.random());
                b = Math.floor(255*Math.random());
                var randomColor = "rgb(" + r.toString() + ", " + g.toString() + ", " + b.toString() + ")"
                $("#display").css("background-color", randomColor);
				
				$(this).unbind().click(function2);
        };
        
        
       
        
        function2 = function() { //listen for a second click
                this.innerHTML = "Start!";
                var redGuess = document.forms["red"]["val"].value; //get their color guess
                var greenGuess = document.forms["green"]["val"].value;
                var blueGuess = document.forms["blue"]["val"].value;
                if(redGuess == null || greenGuess == null || blueGuess == null ||
                          redGuess == "" || greenGuess == "" || greenGuess == "") {
						  this.innerHTML = "Got it!";
                        alert("You need to pick a value for all 3 sliders!");
                } else {
                        turns--; //decrement turns 
                        //using Plotka's formula
                        var accuracy = (Math.abs(r - parseInt(redGuess)) + Math.abs(g - parseInt(greenGuess)) 
                                          + Math.abs(b - parseInt(blueGuess)))/765
                        var milliseconds_taken =  new Date().getTime() - start;
                        var score = Math.floor(((15 - difficulty - accuracy*100)/(15-difficulty))
                                          * (15000-milliseconds_taken));
                        if(score < 0)
                                score = 0;
                        
                        $("#score_board").text( score.toString() );
						
			if(turns != 0) 
				$(this).unbind().click(function1);
			else 
				$(this).unbind().click(function() {
					alert("Game Over! Refresh your page to play again!");
				});
                }
        };
        this.click(function1); //sets the first listener to function 1
        return this;
};

function refreshVal() {
    var red = $("#red_slider").slider("value")
      ,green = $("#green_slider").slider("value")
      ,blue = $("#blue_slider").slider("value")
      ,hex = hexFromRGB(red, green, blue);
    $("#display").css("background-color", "rgb(red, green, blue)");
    $("#red_val").val(red);
    $("#green_val").val(green);
    $("#blue_val").val(blue);
  }

$(function() {
    $( "#red_slider, #green_slider, #blue_slider" ).slider({
    	orientation: 'horizontal',
      	min: 0,
      	max: 255,
      	value: 0,
      	slide: function (event, ui) {
            $("#testval").text( ui.value);
        }
      	//slide: refreshVal,
      	change: refreshVal
    });
});
