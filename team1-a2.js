//$.fn.hexed = function() {



(function ($) {
    $.fn.hexed = function(difficulty, rounds) {
        //To add in the colors, sliders, buttons, etc for the game
        $('#hexgame').html("<div id='container'></div><div id='results'></div>");
        var title = '<h1>Hexed</h1>';
     	var slider = "<div id='red'></div><div id='green'></div><div id='blue'></div>";
        var colors = '<div id="colors" class="ui-widget-content ui-corner-all"></div>';
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
$(function(){
  $( "#red, #green, #blue" ).slider({
    orientation: "horizontal",
    range: "min",
    min: 0,
    max: 255,
    slide: refreshSwatch,
    change: refreshSwatch
  });
  $( "#red" ).slider( "value", 0 );
  $( "#green" ).slider( "value", 0 );
  $( "#blue" ).slider( "value", 0 );

  $( "#input_red" ).change(function() {
    $( "#red" ).slider( "value", $(this).val() );
  });
  $( "#input_green" ).change(function() {
    $( "#green" ).slider( "value", $(this).val() );
  });
  $( "#input_blue" ).change(function() {
    $( "#blue" ).slider( "value", $(this).val() );
  });

});

function refreshSwatch() {
  var red = $( "#red" ).slider( "value" ),
  green = $( "#green" ).slider( "value" ),
  blue = $( "#blue" ).slider( "value" ),
  color = "rgb(" + red.toString() + ", " + green.toString() + ", " + blue.toString() + ")";
  $( "#swatch" ).css( "background-color", color);
  $('#input_red').val(red);
  $('#input_green').val(green);
  $('#input_blue').val(blue);
}
$.fn.hexed = function() {
    // Establish default settings
    var difficulty, turns;
    $("#final_score").hide();	
    var start, r, g, b,
	startGame, showResult, next;
	
    startGame = function() {
      total_score = 0;
	  
	  $(this).text("Got it!");
	  start =  new Date().getTime();
	  r = Math.floor(255*Math.random()); 
	  g = Math.floor(255*Math.random());
	  b = Math.floor(255*Math.random());
	  var randomCol = "rgb(" + r.toString() + ", " + g.toString() + ", " + b.toString() + ")";
	  $("#rand_swatch").css("background-color", randomCol);
	  
	  difficulty = parseInt(document.getElementsByName("difficulty")[0].value);
	  turns = parseInt(document.getElementsByName("turns")[0].value);
	  $("input[name=difficulty]").attr("disabled", "disabled");
	  $("input[name=turns]").attr("disabled", "disabled");
	  $("#game").show("slow");
	  $(this).unbind().click(showResult);
	},
	

	showResult = function(){
	  $(this).text("Next");
	  var red = $( "#red" ).slider( "value" ),
	  green = $( "#green" ).slider( "value" ),
	  blue = $( "#blue" ).slider( "value" ),
	  
	  accuracy = (Math.abs(r - red) + Math.abs(g - green) + Math.abs(b - blue))/765,
	  milliseconds_taken =  new Date().getTime() - start,
	  score = Math.floor(((15 - difficulty- accuracy*100)/(15 - difficulty))
			  * (15000-milliseconds_taken));
	  if(score < 0)
		score = 0;
	  total_score += score;
	  $("#scoreboard").text( score.toString() );
	  $("#swatch").show("slow");
	  $("#result").show("slow");
	  var y = $(window).scrollTop();
	  $("#result").scrollTop(y + 800);  
	  $( "#red, #green, #blue" ).slider({ disabled: true });
	  $("#input_red, #input_green, #input_blue").attr("disabled", "disabled");
	  $("input[type=submit]").attr("disabled", "disabled");
	  $(this).unbind().click(next);
	},

	next = function (){
	  $("#scores").html($("#scores").html() + "<li class='resultScore'>" + $("#result").html() + "</li>");
	  turns--;
	  if(turns != 0) {
        $(this).text("Got it!");
		$("#swatch").hide("slow");
	    $("#result").hide("slow",  function() {});
		$('#input_red').val(0);
        $('#input_green').val(0);
        $('#input_blue').val(0);
        $( "#red, #green, #blue").slider("option", "value", $("#red, #green, #blue").slider("option", "min"));
		$( "#red, #green, #blue" ).slider({ disabled: false});
	    $("#input_red").attr("disabled", false);
	    $("#input_green").attr("disabled", false);
		$("#input_blue").attr("disabled", false);
	    $("input[type=submit]").attr("disabled", false);
	    
		r = Math.floor(255*Math.random()); 
	    g = Math.floor(255*Math.random());
	    b = Math.floor(255*Math.random());
	    var randomCol = "rgb(" + r.toString() + ", " + g.toString() + ", " + b.toString() + ")";
	    $("#rand_swatch").css("background-color", randomCol);
		
		$(this).unbind().click(showResult);
		start =  new Date().getTime();
	  } else {
	  	$("#total_score").text(total_score);
		$("#final_score").show("fast");
		$("#result").hide("slow")
		$(this).text("Play Again!");
		$(this).unbind().click(function() {
			window.location.reload();
		});
	  }
	};
	$(this).click(startGame);
}
