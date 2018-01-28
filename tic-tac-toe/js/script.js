const table = document.getElementById("play-space");
let user = "";
let ai = "";
const tiles = {
	free: [1, 2, 3, 4, 5, 6, 7, 8, 9],
	human: [],
	ai: []
};
const winConditions = {
	winConditionV1: [1, 4, 7],
	winConditionV2: [2, 5, 8],
	winConditionV3: [3, 6, 9],
	winConditionH1: [1, 2, 3],
	winConditionH2: [4, 5, 6],
	winConditionH3: [7, 8, 9],
	winConditionD1: [1, 5, 9],
	winConditionD2: [3, 5, 7]
};

function handlePlayerSelection(e) {
	if(e.target.id === "maru") {
		user = e.target.id;
		ai = "batsu"
	} else {
		user = e.target.id;
		ai = "maru"
	}
}

function handleSpaceClick(e) {
	if(e.target.className === user || e.target.className === ai) {
		return null;
	}	else {
		const number = parseInt(e.target.id);
		e.target.className = user;
		tiles.free.splice(tiles.free.indexOf(number), 1);
		tiles.human.push(number);
	}
	checkWinCondition();
	setTimeout(handleAiClick, 1000);
}

function handleAiClick() {
	const choice = tiles.free[Math.floor(tiles.free.length * Math.random())];
	tiles.free.splice(tiles.free.indexOf(choice), 1);
	tiles.ai.push(choice);
	document.getElementById(choice.toString()).className = ai;
	checkWinCondition();
}

function checkWinCondition() {
	const humanTiles = tiles.human.sort();
	const aiTiles = tiles.ai.sort();
	for(let set in winConditions) {
		if(humanTiles.includes(winConditions[set][0]) && humanTiles.includes(winConditions[set][1]) && humanTiles.includes(winConditions[set][2])) {
			modalInstance2.open();
		} else if(aiTiles.includes(winConditions[set][0]) && aiTiles.includes(winConditions[set][1]) && aiTiles.includes(winConditions[set][2])) {
			modalInstance3.open();
		}
	}
}

function reset() {
	location.reload();
}

table.addEventListener("click", handleSpaceClick);
document.getElementById("maru").addEventListener("click", handlePlayerSelection);
document.getElementById("batsu").addEventListener("click", handlePlayerSelection);
document.getElementById("maru").addEventListener("click", closeModal);
document.getElementById("batsu").addEventListener("click", closeModal);
document.getElementById("reset1").addEventListener("click", reset);
document.getElementById("reset2").addEventListener("click", reset);