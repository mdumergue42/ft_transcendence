import '../ui/auth-modal.js';

export function renderHome() {
	return `<app-navbar></app-navbar>
		<auth-modal></auth-modal>
		<main class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-cyan-400 overflow-x-hidden relative">
			<div class="absolute inset-0 opacity-10 bg-[radial-gradient(circle,theme(colors.cyan.400)_1px,transparent_1px)] bg-[length:30px_30px] animate-pulse"></div>
			<div class="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,rgba(6,182,212,0.02)_2px,rgba(6,182,212,0.02)_4px),repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(6,182,212,0.02)_2px,rgba(6,182,212,0.02)_4px)] pointer-events-none"></div>
			<div class="relative z-10 max-w-6xl mx-auto px-4 py-8">
				<div class="text-center mb-12 p-16 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border-2 border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.3)] relative overflow-hidden group">
					<div class="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
					<h1 class="text-6xl font-black mb-6 uppercase tracking-[0.2em] bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse relative z-10">
						TRANSCENDENCE
					</h1>
					<p class="text-xl mb-8 text-cyan-300 font-mono relative z-10">
						◖ ULTIMATE RETRO PONG EXPERIENCE ◗
					</p>
					<button id="play-button" class="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold text-lg uppercase tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:shadow-[0_0_30px_rgba(236,72,153,0.7)] hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 transition-all duration-300 transform hover:-translate-y-1 relative z-10 font-mono">
						▶ COMMENCER LA PARTIE ◀
					</button>
				</div>
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
					<div class="p-6 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border-2 border-cyan-400 text-center hover:border-pink-500 hover:shadow-[0_0_25px_rgba(236,72,153,0.4)] transition-all duration-300 transform hover:-translate-y-2 group">
						<span class="text-3xl block mb-3">🏆</span>
						<div class="text-sm uppercase tracking-wider text-cyan-300">VICTOIRES</div>
						<div class="text-4xl font-bold text-cyan-400 group-hover:text-pink-400 transition-colors">28</div>
					</div>
					<div class="p-6 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border-2 border-cyan-400 text-center hover:border-pink-500 hover:shadow-[0_0_25px_rgba(236,72,153,0.4)] transition-all duration-300 transform hover:-translate-y-2 group">
						<span class="text-3xl block mb-3">🔥</span>
						<div class="text-sm uppercase tracking-wider text-cyan-300">SÉRIE</div>
						<div class="text-4xl font-bold text-cyan-400 group-hover:text-pink-400 transition-colors">+5</div>
					</div>
					<div class="p-6 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border-2 border-cyan-400 text-center hover:border-pink-500 hover:shadow-[0_0_25px_rgba(236,72,153,0.4)] transition-all duration-300 transform hover:-translate-y-2 group">
						<span class="text-3xl block mb-3">⚡</span>
						<div class="text-sm uppercase tracking-wider text-cyan-300">NIVEAU</div>
						<div class="text-4xl font-bold text-cyan-400 group-hover:text-pink-400 transition-colors">42</div>
					</div>
					<div class="p-6 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border-2 border-cyan-400 text-center hover:border-pink-500 hover:shadow-[0_0_25px_rgba(236,72,153,0.4)] transition-all duration-300 transform hover:-translate-y-2 group">
						<span class="text-3xl block mb-3">🎯</span>
						<div class="text-sm uppercase tracking-wider text-cyan-300">PRÉCISION</div>
						<div class="text-4xl font-bold text-cyan-400 group-hover:text-pink-400 transition-colors">87%</div>
					</div>
				</div>
				<div class="space-y-4 mb-10">
					<a href="#ai" data-page="ai" class="block p-5 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 border-2 border-blue-400 text-cyan-400 no-underline text-lg font-semibold uppercase tracking-wide transition-all duration-300 hover:bg-gradient-to-r hover:from-pink-500/20 hover:to-purple-500/20 hover:border-pink-500 hover:text-pink-300 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] transform hover:translate-x-3 flex items-center justify-center gap-3">
						🤖 AFFRONTER L'INTELLIGENCE ARTIFICIELLE
					</a>
					<a href="#match" data-page="match" class="block p-5 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 border-2 border-blue-400 text-cyan-400 no-underline text-lg font-semibold uppercase tracking-wide transition-all duration-300 hover:bg-gradient-to-r hover:from-pink-500/20 hover:to-purple-500/20 hover:border-pink-500 hover:text-pink-300 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] transform hover:translate-x-3 flex items-center justify-center gap-3">
						👥 COMBAT JOUEUR VS JOUEUR
					</a>
					<a href="#tournament" data-page="tournament" class="block p-5 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 border-2 border-blue-400 text-cyan-400 no-underline text-lg font-semibold uppercase tracking-wide transition-all duration-300 hover:bg-gradient-to-r hover:from-pink-500/20 hover:to-purple-500/20 hover:border-pink-500 hover:text-pink-300 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] transform hover:translate-x-3 flex items-center justify-center gap-3">
						🏆 TOURNOI GALACTIQUE
					</a>
				</div>
				<div class="p-8 bg-gradient-to-br from-green-500/10 to-cyan-500/10 border-2 border-green-400 shadow-[0_0_20px_rgba(34,197,94,0.2)] mb-10">
					<h2 class="text-2xl mb-6 text-green-400 uppercase tracking-wider font-bold">
						◆ ACTIVITÉ RÉCENTE ◆
					</h2>
					<div class="text-left space-y-3">
						<div class="text-green-300 py-2 border-b border-green-400/20">
							🏆 VICTOIRE ÉCRASANTE contre Player42
						</div>
						<div class="text-green-300 py-2 border-b border-green-400/20">
							🎖️ NOUVEAU BADGE: "Maître du Rebond"
						</div>
						<div class="text-green-300 py-2 border-b border-green-400/20">
							⬆️ PROMOTION au classement galactique
						</div>
						<div class="text-green-300 py-2 border-b border-green-400/20">
							🚀 RECORD PERSONNEL battu: 15 échanges
						</div>
					</div>
				</div>
				<canvas id="pong-canvas" class="mx-auto border-4 border-orange-500 shadow-[0_0_30px_rgba(249,115,22,0.4)] bg-black block" width="600" height="300"></canvas>
				</div>
		</main>`;
}
