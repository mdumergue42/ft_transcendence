export class AppMatch extends HTMLElement {

	constructor() {
		super();
	}

	menu() {
		return `
		<div class="p-4">
			<div class="text-sm PText mb-2">SELECT GAME MODE:</div>

			<button id="select-mm" style="width:100%; text-align: left;" class="block p-3 border PBoxBorder bg-black/50 PText PBoxHover hover:text-black transition-all duration-200 uppercase tracking-wide">
			> 1. ONLINE PVP
			</button>

			<button id="select-ai" style="width:100%; text-align: left;" class="block p-3 border PBoxBorder bg-black/50 PText PBoxHover hover:text-black transition-all duration-200 uppercase tracking-wide">
			> 2. FIGHT AGAINST ARTIFICIAL INTELLIGENCE
			</button>

			<button id="select-pvp" style="width:100%; text-align: left;" class="block p-3 border PBoxBorder bg-black/50 PText PBoxHover hover:text-black transition-all duration-200 uppercase tracking-wide mt-1">
			> 3. PLAYER VS PLAYER BATTLE
			</button>

			<button id="select-tr" style="width:100%; text-align: left;" class="block p-3 border PBoxBorder bg-black/50 PText PBoxHover hover:text-black transition-all duration-200 uppercase tracking-wide mt-1">
			> 4. ONLINE TOURNAMENT
			</button>

			<button id="select-cancel" style="width:100%;display:none; text-align: left;" class="block p-3 border PBoxBorder bg-black/50 PText PBoxHover hover:text-black transition-all duration-200 uppercase tracking-wide mt-1">
			> CANCEL
			</button>

			<button id="select-start" style="width:100%;display:none; text-align: left;" class="block p-3 border PBoxBorder bg-black/50 PText PBoxHover hover:text-black transition-all duration-200 uppercase tracking-wide mt-1">
			> START TOURNAMENT
			</button>

			<div id="select-list-tr" style="margin-top:40px;width:100%;display:none; text-align: left;" class="block p-3 border PBoxBorder bg-black/50 PText PBoxHover hover:text-black transition-all duration-200 uppercase tracking-wide mt-1">
			<div>todo liste jouer tournoi</div>
			<div>todo liste jouer tournoi</div>
			<div>todo liste jouer tournoi</div>
	
			</div>
		</div>
		`;

		//TODO LISTE PLAYER!!
	}

	case(id:string) {
		return `
		<div id="${id}" class="block p-3 border PBoxBorder bg-black/50 PText relative">
			<div id="${id}-name">player's name</div>
			<div id="${id}-score" class="absolute right-1" style="transform: translate(-50%, -50%); top:50%">0</div>
		</div>
		`;
	}
	tr() {
		return `
		<div style="height:100%">
			<div class="text-center" style="display: grid; grid-template-columns: auto auto auto; grid-gap: 20px; height:100%; padding: 40px">
				<div style="display: grid; grid-template-rows: repeat(7, 1fr); height:100%; grid-template-columns: 100%">
					<div style="grid-row: 1 / 2;">${this.case("tr-m1-p1")}</div>
					<div style="grid-row: 3 / 4;">${this.case("tr-m1-p2")}</div>
					<div style="grid-row: 5 / 6;">${this.case("tr-m2-p1")}</div>
					<div style="grid-row: 7 / 8;">${this.case("tr-m2-p2")}</div>
				</div>
				<div style="display: grid; grid-template-rows: repeat(7, 1fr); height:100%; grid-template-columns: 100%">
					<div style="grid-row: 2 / 3;">${this.case("tr-m3-p1")}</div>
					<div style="grid-row: 6 / 7;">${this.case("tr-m3-p2")}</div>
				</div>
				<div style="display: grid; grid-template-rows: repeat(7, 1fr); height:100%; grid-template-columns: 100%">
					<div style="grid-row: 4 / 5; ">
						<div class="block p-3 border PBoxBorder PBoxBg text-black relative">
							<div id="tr-winner-name">player's name</div>
							<div class="absolute right-1" style="transform: translate(-50%, -50%);top:50%">🏆</div>
						</div>
					</div>

				</div>
			</div>
		</div>
		`
	}

	async connectedCallback() {
		const match = document.createElement('match');

		match.className = `match-dev`;
		match.innerHTML = `
		<div class="block border text-center relative PBoxBorder bg-black/50 PText PBoxHover hover:text-black transition-all duration-200 tracking-wide">

			<div id="match-header-def" class="absolute top-1 left-1" style="font-size: 0.9rem; opacity: 0.9; margin-bottom: 5px; text-transform: uppercase;">
				match def
			</div>
			<div style="font-size: 2.5rem; font-weight: bold;">
				<a id="match-header-p1">P1</a>
				<a id="match-header-s1">0</a>
				<a>-</a>
				<a id="match-header-s2">0</a>
				<a id="match-header-p2">P2</a>
				<button id="match-header-ff" class="PRevTextHover absolute right-0 top-0 PBoxBg text-black hover:bg-black transition-all duration-200 tracking-wide" style="font-size: 2.5rem; font-weight: bold; padding:0px 20px">FF</button>
			</div>

		</div>

		<div class="border-2 PBoxBorder bg-black" id="pong-interface" style="margin-top: 8px;width:988px; height:540px">

			<div id="pong-vw-game" style="width:100%; height: 100%; display:none;">
				<canvas id="pong-canvas" width="984" height="534"></canvas>
			</div>

			<div id="pong-vw-menu" style="width:100%; height: 100%;">
				${this.menu()}
			</div>

			<div id="pong-vw-tournament" style="width:100%; height: 100%; display:none;">
				${this.tr()}
			</div>

		</div>
		`;

		this.appendChild(match);
	}
}

customElements.define('app-match', AppMatch);


