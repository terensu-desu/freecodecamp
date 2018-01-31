const table = document.getElementById("play-space");
const start = document.getElementById("start");
const strictBtn = document.getElementById("strict");
const choices = ["blue", "green", "red", "yellow"];
let gameState = false;
let strict = false;
let counter = 0;
let simonPath = [];
let userPath = [];
let mistake = false;
const sounds = {
	green: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
	red: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
	yellow: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
	blue: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")
};

const handleStart = () => {
	// Check if game was running previously.
	if(gameState === true) {
		// If so run the reset function to clean the slate.
		handleReset();
	}
	handleGameInitialization();
}
const handleReset = () => {
	gameState = false;
	round = 0;
	simonPath = [];
	userPath = [];
	counter = 0;
	clearInterval(handleGlows);
}
const handleGameInitialization = () => {
	// Set gameState to show we're/we've been running.
	gameState = true;
	// Initialize first round indicator in display.
	document.getElementById("display").value = 1;
	// Start our first Simon move after a short pause.
	setTimeout(() => handleSimonMove(), 500);
}

const handleSimonMove = () => {
	// Counter and userPath from handleUserClick need to be reset when this begins.
	counter = 0;
	userPath = [];
	// Generate a new choice (a move Simon will make) in case we have to use it.
	const choice = choices[Math.floor(Math.random() * 4)];
	if(simonPath.length >= 1) {
		let index = 0;
		// Run a setInterval call to iterate through the simonPath elements.
		// Originally I tried a for-of loop but that generates everything immediately.
		const handleGlows = setInterval(() => {
			// Pass the element in the array to light up and play audio.
			handleButtonGlow(simonPath[index]);
			// Iterate index up 1.
			index++;
			// Check if we're at the end of the array.
			if(index === simonPath.length) {
				// If so, clear the interval
				clearInterval(handleGlows);
				// Did we meet the win condition and we're not retrying the round?
				if(simonPath.length < 20 && !mistake) {
					// Push and handle the next Simon choice
					simonPath.push(choice);
					setTimeout(() => handleButtonGlow(choice), 1000);
				}
			}
		}, 1000);
	} else {
		// otherwise, we do not have any array elements, so push choice and light it up and make sound
		simonPath.push(choice);
		handleButtonGlow(choice);
	}
}

const handleUserClick = (e) => {
	// Push the ID from the clicked element in table.
	userPath.push(e.target.id);
	// Check if it matches the first array element in simonPath.
	// Counter will iterate, so we can check this round's choices.
	if(userPath[counter] === simonPath[counter]) {
		// Light up and make sound for the user's choice.
		handleButtonGlow(e.target.id);
		// Visually response for a correct choice.
		handleBulbGlow();
		// Iterate counter up one.
		counter++;
		// Set mistake to false in case the user made a mistake previously.
		mistake = false;
	} else {
		handleButtonGlow(e.target.id);
		// If it's wrong, send a message to the handleDisplayMessage function.
		handleDisplayMessage("Incorrect move");
		// Check for strict mode.
		if(strict === true) {
			return setTimeout(() => handleStart(), 1500);
		}
		// If not strict, set global helper variable mistake to true,
		// delay into handleSimonMove to try that round again.
		mistake = true;
		setTimeout(() => handleSimonMove(), 1000);
	}
	// The user choices match Simon's.
	if(counter >= simonPath.length) {
		// check if we have reached the win condition
		if(simonPath.length < 20) {
			// If not, update the display of what round the user is on
			document.getElementById("display").value = simonPath.length + 1;
			// Delay into handleSimonMove
			setTimeout(() => handleSimonMove(), 1000);
		} else {
			// Otherwise, send a message of victory!
			handleDisplayMessage("You've won!");
		}
	}
}

// Accepts a string that will be used to lookup an HTML element.
const handleButtonGlow = (id) => {
	document.getElementById(id).className = "glow";
	// From the sounds object, grab the property matching that id.
	sounds[id].play();
	// Background colors come from IDs, we can use .className = "" to safely clear glow.
	setTimeout(() => {
		document.getElementById(id).className = "";
	}, 500);
}

// Accepts a string and displays it in the message-space ID.
const handleDisplayMessage = (message) => {
	document.getElementById("message-space").value = message;
	setTimeout(() => {
		document.getElementById("message-space").value = "Good luck!";
	}, 1500)
}

// Similar to handleButtonGlow, this lights up the lightbulb icon.
const handleBulbGlow = () => {
	document.getElementById("bulb").classList.add("lightup");
	setTimeout(() => {
		document.getElementById("bulb").classList.remove("lightup");
	}, 1000);
}

start.addEventListener("click", handleStart);
strictBtn.addEventListener("click", () => strict = !strict);
table.addEventListener("click", handleUserClick);