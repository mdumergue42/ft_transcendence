import {Pong} from '../components/pong/game.js'
import {ChatUser} from '../components/chat/chat.js'
import {DevPongGame} from '../components/pongLib/game.js'
import '../ui/match.js'
import '../ui/def.js'

export function renderMatch() {
	return `
	<app-def>
	<app-match></app-match>
	<button id="join-match-making">Join Matchmaking</button>
	</app-def>
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
	user.pongGame.setCanvas(
		<HTMLCanvasElement>document.getElementById("pong-canvas"),
		{
			p1: document.getElementById("match-header-p1"),
			p2: document.getElementById("match-header-p2"),
			s1: document.getElementById("match-header-s1"),
			s2: document.getElementById("match-header-s2"),
			def: document.getElementById("match-header-def")
		}
	);

	//Pong()
}
