var startScreen;
var gameHTML;
var counter = 30;
var questionArray = [
"This group made you 'Jump Around' in 1992.", 
"This band had a battle with Ticketmaster over their high ticket prices.", 
"Which hip hop group wore clothes backwards and created a short lived fad?", 
"This band is considered to be classic rock but only had their first #1 hit in 1998.", 
"Which hip hop group burst into the scene with many members and their martial arts influenced sound?", 
"This band's video with a girl in a bee costume made them famous.", 
"This new band bumped Michael Jackson off the #1 Billboard spot in 1992.",
"Which group is gonna make you sweat?", 
"Which band had a long time legal battle with the music sharing app Napster?", 
"This singer made it big with a song written by Prince."];
var answerArray = [
["Naughty by Nature", "Beastie Boys", "House of Pain", "A Tribe Called Quest"], 
["Alice in Chains", "Pearl Jam", "Jane's Addiction", "Slipknot"], 
["Kris Kross", "Outkast", "Fugees", "Salt'n'Pepa"], 
["U2", "AC/DC", "Aerosmith", "Van Halen"], 
["Public Enemy", "The Roots", "Cypress Hill", "Wu-Tang Clan"], 
["Blind Melon", "Red Hot Chili Peppers", "Smashing Pumpkins", "Green Day"], 
["Radiohead", "Nirvana", "Nine Inch Nails", "Oasis"], 
["C+C Music Factory", "2 Unlimited", "No Doubt", "Spice Girls"], 
["Soundgarden", "Metallica", "Blur", "Stone Temple Pilots"],
["Alanis Morissette", "Mariah Carey", "Aaliyah", "Sinead O'Connor"]];
var imageArray = [
"<img class='center-block img-right' src='assets/images/houseofpain.jpg'>", 
"<img class='center-block img-right' src='assets/images/pearljam.jpg'>", 
"<img class='center-block img-right' src='assets/images/kriskross.jpg'>", 
"<img class='center-block img-right' src='assets/images/aerosmith.jpg'>", 
"<img class='center-block img-right' src='assets/images/wutang.jpg'>", 
"<img class='center-block img-right' src='assets/images/blindmelon.jpg'>", 
"<img class='center-block img-right' src='assets/images/nirvana.jpg'>", 
"<img class='center-block img-right' src='assets/images/ccmusicfactory.jpg'>", 
"<img class='center-block img-right' src='assets/images/metallica.jpg'>", 
"<img class='center-block img-right' src='assets/images/sineadoconnor.jpg'>"];
var correctAnswers = ["C. House of Pain", "B. Pearl Jam", "A. Kris Kross", "C. Aerosmith", "D. Wu-Tang Clan", "A. Blind Melon", "B. Nirvana", "A. C+C Music Factory", "B. Metallica", "D. Sinead O'Connor"];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
var clickSound = new Audio("assets/sounds/slts.mp3");


$(document).ready(function() {

function initialScreen() {
	startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Trivia Game</a></p>";
	$(".mainArea").html(startScreen);
}

initialScreen();

$("body").on("click", ".start-button", function(event){
	event.preventDefault();  
	clickSound.play();
	generateHTML();

	timerWrapper();

}); 

$("body").on("click", ".answer", function(event){
	
	clickSound.play();
	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionCounter]) {

		clearInterval(theClock);
		generateWin();
	}
	else {
		
		clearInterval(theClock);
		generateLoss();
	}
}); 

$("body").on("click", ".reset-button", function(event){
	clickSound.play();
	resetGame();
}); 

}); 

function generateLossDueToTimeOut() {
	unansweredTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/redx.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 3000);
}

function generateWin() {
	correctTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 3000);
}

function generateLoss() {
	incorrectTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/redx.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 3000);
}

function generateHTML() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
	$(".mainArea").html(gameHTML);
}

function wait() {
	if (questionCounter < 9) {
	questionCounter++;
	generateHTML();
	counter = 30;
	timerWrapper();
	}
	else {
		finalScreen();
	}
}

function timerWrapper() {
	theClock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(theClock);
			generateLossDueToTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function finalScreen() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>That's it! Here is your score:" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
	$(".mainArea").html(gameHTML);
}

function resetGame() {
	questionCounter = 0;
	correctTally = 0;
	incorrectTally = 0;
	unansweredTally = 0;
	counter = 30;
	generateHTML();
	timerWrapper();
}

