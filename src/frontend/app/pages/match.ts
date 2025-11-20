import {Pong} from '../components/pong/game.js'
import {ChatUser} from '../components/chat/chat.js'
import {DevPongGame} from '../components/pongLib/game.js'

export function renderMatch() {
	return `
	<app-navbar></app-navbar>
	<main style="margin-left: 100px; padding: 20px; background: black; color: #00ff00; min-height: 100vh;">
	<canvas id="pong-canvas" width="1200" height="800"></canvas>
	<button id="join-match-making">Join Matchmaking</button>
	</main>
	`;
}

function devBtnMM(user: ChatUser) {
	const mmBtn = <HTMLButtonElement>document.getElementById("join-match-making");

	if (!mmBtn)
		return ;
	mmBtn.onclick = () => {
		mmBtn.style.visibility = "hidden";
		user.sendFindGame();
	}
}

export function DevGame(user: ChatUser) {
	//check if not already in game!
	devBtnMM(user);
	user.pongGame.setCanvas(<HTMLCanvasElement>document.getElementById("pong-canvas"));

	//Pong()
}
