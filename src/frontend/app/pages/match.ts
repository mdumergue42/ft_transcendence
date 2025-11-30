import {ChatUser} from '../components/chat/chat.js'
import '../ui/match.js'
import '../ui/def.js'

export function renderMatch() {
	return `
	<app-def>
	<app-match></app-match>
	</app-def>
	`;
}

function reset() {
	const mmBtn = <HTMLButtonElement>document.getElementById("select-mm")!;
	const aiBtn = <HTMLButtonElement>document.getElementById("select-ai")!;
	const pvpBtn = <HTMLButtonElement>document.getElementById("select-pvp")!;
	const trBtn = <HTMLButtonElement>document.getElementById("select-tr")!;
	const trStartBtn = <HTMLButtonElement>document.getElementById("select-start")!;
	const cancelBtn = <HTMLButtonElement>document.getElementById("select-cancel")!;
	const trList = <HTMLDivElement>document.getElementById("select-list-tr")!;
	if (mmBtn)
		mmBtn.style.display = "";
	if (aiBtn)
		aiBtn.style.display = "";
	if (pvpBtn)
		pvpBtn.style.display = "";
	if (trBtn)
		trBtn.style.display = "";
	if (trStartBtn)
		trStartBtn.style.display = "none";
	if (cancelBtn)
		cancelBtn.style.display = "none";
	if (trList) {
		trList.style.display = "none";
		trList.innerHTML = "";
	}
}

export function DevGame(user: ChatUser) {

	const mmBtn = <HTMLButtonElement>document.getElementById("select-mm")!;
	const aiBtn = <HTMLButtonElement>document.getElementById("select-ai")!;
	const pvpBtn = <HTMLButtonElement>document.getElementById("select-pvp")!;
	const trBtn = <HTMLButtonElement>document.getElementById("select-tr")!;
	const trStartBtn = <HTMLButtonElement>document.getElementById("select-start")!;
	const cancelBtn = <HTMLButtonElement>document.getElementById("select-cancel")!;
	const trList = <HTMLDivElement>document.getElementById("select-list-tr")!;
	const FFBtn = <HTMLButtonElement>document.getElementById("match-header-ff")!;

	cancelBtn.onclick = () => {
		reset();
		user.sendCancel();
	};
	FFBtn.onclick = () => {
		user.sendCancel();
	};
	mmBtn.onclick = () => {
		aiBtn.style.display = "none";
		pvpBtn.style.display = "none";
		trBtn.style.display = "none";
		cancelBtn.style.display = "";
		user.sendFindGame();
	};
	trBtn.onclick = () => {
		mmBtn.style.display = "none";
		aiBtn.style.display = "none";
		pvpBtn.style.display = "none";
		trBtn.style.display = "";
		trStartBtn.style.display = "";
		cancelBtn.style.display = "";
		trList.style.display = "";
		user.createTR();
		//real tr xd
	};
	trStartBtn.onclick = () => {
		return ;
	}
	aiBtn.onclick = () => {
		user.sendPvAI();
	};
	pvpBtn.onclick = () => {
		user.sendPvP();
	};

	user.pongGame.setCanvas(
		<HTMLCanvasElement>document.getElementById("pong-canvas"),
		{
			p1: document.getElementById("match-header-p1"),
			p2: document.getElementById("match-header-p2"),
			s1: document.getElementById("match-header-s1"),
			s2: document.getElementById("match-header-s2"),
			def: document.getElementById("match-header-def")
		},
		{
			vwMenu: document.getElementById("pong-vw-menu"),
			vwTr: document.getElementById("pong-vw-tournament"),
			vwGame: document.getElementById("pong-vw-game"),
			vwCancel: reset
		}

	);
	user.pongGame.initCanvas(null);
}
