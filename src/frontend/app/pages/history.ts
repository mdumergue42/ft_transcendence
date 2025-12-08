import '../ui/def.js';
import { ChatUser } from '../components/chat/chat.js'

function statSquare(title: string, id:string) {
	return `
	<div class="border-2 PBoxBorder p-4 text-center relative" style="padding-bottom: 28px">
		<div class="absolute top-1 left-1 text-xs PText">${title}</div>
		<div id="${id}" class="text-2xl font-bold PText mt-4">-</div>
	</div>
	`;
}

function dotIsOnline() {
	return `
	<div class="relative">
	  <div id="ring-online" class="ring-online"></div>
	  <div id="dot-online" class="dot-online"></div>
	</div>
	`;
}

function profile() {
	return `
	<div class="text-center mb-8 p-6 border-2 PBoxBorder" style="margin-top: 24px">
		<div style="text-align: center; display: flex">
			<img id="avatar" src="/image/avatar/default/404.png" style="width:128px;height:128px;">
			<div class="relative" style="padding-left: 15px; margin-bottom: 10px;">
				<h1 id="name-plate" class="PText" style="font-size: 2.5rem">Profile Page</h1>
				<div id="about-me" class="absolute PText text-s"></div>
			</div>
			${dotIsOnline()}
		</div>
	</div>
	`
}

export function renderHistory() {
	return `
	<app-def>
		${profile()}
		<div class="text-center mb-8 p-6 border-2 PBoxBorder">
			<div style="display: flex; gap: 15px; flex-wrap: wrap; align-items: center;">
				<select id="type-filter" class="bg-black/80 PBorder border-2" style="padding: 10px 15px; font-size: 14px; cursor: pointer;">
					<option value="all">Tous les matchs</option>
					<option value="pvp">PvP uniquement</option>
					<option value="ai">vs IA uniquement</option>
				</select>
				<select id="limit-filter" class="bg-black/80 PBorder border-2" style="padding: 10px 15px; font-size: 14px; cursor: pointer;">
					<option value="10">Last 10</option>
					<option value="30">Last 30</option>
					<option value="100">Last 100</option>
				</select>
				<button id="valid-filters" class="bg-black/80 PBorder border-2" style="padding: 8px 15px;font-size: 14px; cursor: pointer;">
				[Update]
				</button>
			</div>
		</div>
		<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 15px; margin-bottom: 30px;">
			${statSquare("total Win", "stat-win")}
			${statSquare("total Lost", "stat-lose")}
			${statSquare("Win rate", "stat-win-rate")}
			${statSquare("Win streak", "stat-win-streak")}
			${statSquare("K/D", "stat-kd")}
		</div>
		<div class="mb-8 p-6 border-2 PBoxBorder">
			<div class="text-sm PText mb-2">HISTORIC:</div>

			<div id="match-list" style="display: flex; flex-direction: column; gap: 15px;">
		</div>
	</app-def>`
}

function _getHistory(user: ChatUser, name:string) {
	const type = <HTMLSelectElement>document.getElementById("type-filter");
	const limit = <HTMLSelectElement>document.getElementById("limit-filter");
	if (type && limit)
		user.askHistoric(name, {mode: type.value, limit: limit.value});

	const namePlate = <HTMLSelectElement>document.getElementById("name-plate");
	namePlate.innerHTML = name;
}

export function DevHistory(user:ChatUser, name:string | null)
{
	if (name == null)
		return ;
	_getHistory(user, name);

	const btn = <HTMLButtonElement>document.getElementById("valid-filters");
	if (btn)
		btn.onclick = () => {_getHistory(user, name);}
}

