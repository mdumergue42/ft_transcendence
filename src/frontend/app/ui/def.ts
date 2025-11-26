import './navbar.js';
import './auth-modal.js';
import './chat.js';

export class AppDef extends HTMLElement {
	constructor() {
		super();

	}

	async connectedCallback() {
		const childNodes = this.innerHTML;
		this.innerHTML = "";

		const def = document.createElement('def');
		def.className = `home-default`;
		def.innerHTML = `
		<app-navbar></app-navbar>
		<auth-modal></auth-modal>
		<app-chat></app-chat>
		<main class="ml-[80px] min-h-screen bg-black text-green-400 overflow-x-hidden relative font-mono">
			<div class="absolute inset-0 pointer-events-none z-40" style="background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.03) 2px, rgba(0,255,0,0.03) 4px);"></div>
			<div class="absolute inset-0 opacity-5" style="background-image: repeating-conic-gradient(#00ff00 0% 25%, transparent 0% 50%) 50% / 4px 4px;"></div>
			<div class="bg-black border-b-2 border-green-400 p-2 font-mono text-xs text-green-400">
				<div class="flex justify-between items-center">
					<span>TRANSCENDENCE_TERMINAL_v1.42 █ READY</span>
					<span id="terminal-clock" class="animate-pulse"></span>
				</div>
			</div>
			<div id="mid-home" class="relative z-10 max-w-5xl mx-auto p-4">
				${childNodes}
			</div>
		</main>
		`;

		this.appendChild(def);
	}
}

customElements.define('app-def', AppDef);


