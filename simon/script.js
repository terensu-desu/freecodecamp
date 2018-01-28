const table = document.getElementById("play-space");
const start = document.getElementById("start");
const strict = document.getElementById("strict");
const choices = ["blue", "green", "red", "yellow"];
let gameState = 0;
let simonPath = [];
let userPath = [];

const handleStart = () => {
	if(gameState === 1) {
		handleReset();
	}
	handleGame();
}

const handleGame = () => {
	gameState = 1;
	playSimon();
}

const handleReset = () => {
	gameState = 0;
	simonPath = [];
	userPath = [];
}

const playSimon = () => {
	const choice = Math.floor(Math.random() * choices.length);
	if(simonPath.length >= 1) {
		let count = simonPath.length;
		for(let step of simonPath) {
			handleGlow(step, count);
		}
	}
	simonPath.push(choices[choice]);
	let count = simonPath.length;
	handleGlow(choices[choice], count);
	console.log(simonPath);
}

const handleClick = (e) => {
	const lastElm = userPath.length;
	userPath.push(e.target.id);
	if(simonPath[lastElm] != userPath[lastElm]) {
		alert("Failure!");
		handleReset();
	} else{
		handleBulbGlow();
		handleDisplay();
		playSimon();
	}
}

const handleDisplay = () => {
	document.getElementById("display").value = userPath.length;
}

const handleGlow = (id, count) => {
	document.getElementById(id).className = "glow";
	handleGlowRemove(id, count);
}

const handleGlowRemove = (id, count) => {
	setTimeout(function() {
		document.getElementById(id).className = "";
	}, count * 1000);
}

const handleBulbGlow = () => {
	document.getElementById("bulb").classList.add("lightup");
	handleBulbColorRemove();
}

const handleBulbColorRemove = () => {
	setTimeout(function() {
		document.getElementById("bulb").classList.remove("lightup");
	}, 1000);
}

start.addEventListener("click", handleStart);
table.addEventListener("click", handleClick);