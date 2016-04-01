$(document).ready(function () {

	var playersGuess, count = 0;
	var winningNumber = generateWinningNumber(); 
	var guesses = [];
	var maxTries = 5; 

	$('#submit').on('click', playersGuessSubmission);
	$('#hint').on('click', provideHint);
	$("#again").on('click', playAgain);
	
	function generateWinningNumber(){
		return Math.floor(Math.random() * 100 + 1);
	}

	function lowerOrHigher(a, b){
		if (a > b) {
			return "lower"; 
		} else {
			return "higher";
		}
	}

	function repeatNumCheck(num) {
		guesses.push(num);
		for (var i = 0, len = guesses.length; i < len-1; i++) {
			if (num === guesses[i]) {
				guesses.pop();
				alert("You've already guessed that number!");
				return true;
			}
		}
		return false;
	}

	function playersGuessSubmission (event) {
		event.preventDefault(); 
		playersGuess = +$('#guess').val(); 
		$('#guess').val(''); 
		$('p').replaceWith("<p></p>");

		if (!repeatNumCheck(playersGuess)) {
			if (count < maxTries) {
				count++; 
				checkGuess(playersGuess, winningNumber);
			} else {
				$('p').replaceWith("<p>Oh boy, looks like you ran out of tries! The winning number was " + winningNumber + ".</p>");
				$('#content').hide();
				$('#fail').show(); 
			}
		}
	}

	function checkGuess(a, b){
		if (isNaN(a) || a > 100 || a === "" || a < 1) {
			alert("Please enter a valid number between 1 and 100!");
			count--; 
		} else {
			if (a === b) {
				$('p').replaceWith("<p>Weeee! You got it!</p>");
				$('#content').hide();
				$('#success').show(); 
			} else { 
				guessMessage(playersGuess, winningNumber);
			}	
		}
	}

	function guessMessage(a, b) {
		var output = ""; 
		if (Math.abs(a-b) < 5) {
			output = "within 5 of the winning number!";
		} else if (Math.abs(a-b) < 10) {
			output = "within 10 of the winning number!"; 
		} else if (Math.abs(a-b) < 20) {
			output = "within 20 of the winning number!";
		} else {
			output = "more than 20 away from the winning number!";
		}
		$('p').replaceWith("<p>Oops, your guess needs to be " + lowerOrHigher(playersGuess, winningNumber) + "! You are " + output + "</p>"); 
	}

	function provideHint () {
		if (winningNumber % 2 === 0) {
			$('p').replaceWith("<p>Psssst... the number is even...</p>")
		} else {
			$('p').replaceWith("<p>Psssst... the number is odd...</p>")
		}
		$('p').fadeOut(1800); 
	}

	function playAgain () {
		count = 0; 
		guesses = [];
		$('#content').show(); 
		$('#success').hide(); 
		$('#fail').hide(); 
		$('p').text('');
		winningNumber = generateWinningNumber();	
	}

});