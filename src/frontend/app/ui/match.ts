export class AppMatch extends HTMLElement {

	constructor() {
		super();
	}

	async connectedCallback() {
		const match = document.createElement('match');

		match.className = `match-dev`;
		match.innerHTML = `
		<div class="block border text-center relative border-green-400/50 bg-black/50 text-green-400 hover:bg-green-400 hover:text-black transition-all duration-200 tracking-wide">

			<div id="match-header-def" class="absolute top-1 left-1" style="font-size: 0.9rem; opacity: 0.9; margin-bottom: 5px; text-transform: uppercase;">
				match def
			</div>
			<div style="font-size: 2.5rem; font-weight: bold;">
				<a id="match-header-p1">P1</a>
				<a id="match-header-s1">0</a>
				<a>-</a>
				<a id="match-header-s2">0</a>
				<a id="match-header-p2">P2</a>
				<button id="match-header-ff" class="absolute right-0 top-0 bg-green-400 text-black hover:bg-black hover:text-green-400 transition-all duration-200 tracking-wide " style="font-size: 2.5rem; font-weight: bold; padding:0px 20px">FF</button>
			</div>

		</div>

		<canvas class="border-2 border-green-400 bg-black" id="pong-canvas" width="988" height="540" style="margin-top: 8px">
		</canvas>
		`;

		this.appendChild(match);
	}
}

customElements.define('app-match', AppMatch);


