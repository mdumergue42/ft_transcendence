import '../ui/auth-modal.js';

export function renderHome() {
	return `<app-navbar></app-navbar>
		<auth-modal></auth-modal>
		<main class="ml-[80px] min-h-screen bg-black text-green-400 overflow-x-hidden relative font-mono">
			<div class="absolute inset-0 pointer-events-none z-40" style="background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.03) 2px, rgba(0,255,0,0.03) 4px);"></div>
			<div class="absolute inset-0 opacity-5" style="background-image: repeating-conic-gradient(#00ff00 0% 25%, transparent 0% 50%) 50% / 4px 4px;"></div>
			<div class="bg-black border-b-2 border-green-400 p-2 font-mono text-xs text-green-400">
				<div class="flex justify-between items-center">
					<span>TRANSCENDENCE_TERMINAL_v1.42 █ READY</span>
					<span id="terminal-clock" class="animate-pulse"></span>
				</div>
			</div>
			<div class="relative z-10 max-w-4xl mx-auto p-4">
				<div class="text-center mb-8 p-6 border-2 border-green-400 bg-black/80 shadow-[inset_0_0_20px_rgba(0,255,0,0.1)]">
					<pre class="text-green-400 text-xs md:text-sm leading-tight mb-4 whitespace-pre-wrap relative">
						<span class="absolute inset-0 animate-noise-anim text-green-400 opacity-80">
████████╗██████╗  █████╗ ███╗   ██╗███████╗
╚══██╔══╝██╔══██╗██╔══██╗████╗  ██║██╔════╝
   ██║   ██████╔╝███████║██╔██╗ ██║███████╗
   ██║   ██╔══██╗██╔══██║██║╚██╗██║╚════██║
   ██║   ██║  ██║██║  ██║██║ ╚████║███████║
   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝
    ██████╗  ██████╗ ███╗   ██╗ ██████╗
    ██╔══██╗██╔═══██╗████╗  ██║██╔════╝
    ██████╔╝██║   ██║██╔██╗ ██║██║  ███╗
    ██╔═══╝ ██║   ██║██║╚██╗██║██║   ██║
    ██║     ╚██████╔╝██║ ╚████║╚██████╔╝
    ╚═╝      ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝
</span>
						<span class="relative z-10 animate-glitch-light">
████████╗██████╗  █████╗ ███╗   ██╗███████╗
╚══██╔══╝██╔══██╗██╔══██╗████╗  ██║██╔════╝
   ██║   ██████╔╝███████║██╔██╗ ██║███████╗
   ██║   ██╔══██╗██╔══██║██║╚██╗██║╚════██║
   ██║   ██║  ██║██║  ██║██║ ╚████║███████║
   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝
    ██████╗  ██████╗ ███╗   ██╗ ██████╗
    ██╔══██╗██╔═══██╗████╗  ██║██╔════╝
    ██████╔╝██║   ██║██╔██╗ ██║██║  ███╗
    ██╔═══╝ ██║   ██║██║╚██╗██║██║   ██║
    ██║     ╚██████╔╝██║ ╚████║╚██████╔╝
    ╚═╝      ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝
</span>
					</pre>
					<div class="text-sm mb-4 text-green-300">
						>>> RETRO GAMING SYSTEM INITIALIZED <<<
						>>> COPYRIGHT 1982-2025 ARCADE CORP <<<
					</div>
					<button id="play-button" class="px-6 py-3 border-2 border-green-400 bg-black text-green-400 font-bold uppercase tracking-widest hover:bg-green-400 hover:text-black transition-all duration-200 animate-pulse">
						[PRESS START]
					</button>
				</div>
				<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
					<div class="border-2 border-green-400 bg-black p-4 text-center relative">
						<div class="absolute top-1 left-1 text-xs text-green-300">SCORE</div>
						<div class="text-2xl font-bold text-green-400 mt-4">000028</div>
						<div class="text-xs text-green-300 mt-1">WINS</div>
					</div>
					<div class="border-2 border-green-400 bg-black p-4 text-center relative">
						<div class="absolute top-1 left-1 text-xs text-green-300">COMBO</div>
						<div class="text-2xl font-bold text-green-400 mt-4">+00005</div>
						<div class="text-xs text-green-300 mt-1">STREAK</div>
					</div>
					<div class="border-2 border-green-400 bg-black p-4 text-center relative">
						<div class="absolute top-1 left-1 text-xs text-green-300">LEVEL</div>
						<div class="text-2xl font-bold text-green-400 mt-4">000042</div>
						<div class="text-xs text-green-300 mt-1">SKILL</div>
					</div>
					<div class="border-2 border-green-400 bg-black p-4 text-center relative">
						<div class="absolute top-1 left-1 text-xs text-green-300">PERF</div>
						<div class="text-2xl font-bold text-green-400 mt-4">087.0%</div>
						<div class="text-xs text-green-300 mt-1">ACC</div>
					</div>
				</div>
				<div class="space-y-2 mb-8">
					<div class="border-2 border-green-400 bg-black p-4">
						<div class="text-sm text-green-300 mb-2">SELECT GAME MODE:</div>
						<a href="#ai" data-page="ai" class="block p-3 border border-green-400/50 bg-black/50 text-green-400 hover:bg-green-400 hover:text-black transition-all duration-200 uppercase tracking-wide">
							> 1. FIGHT AGAINST ARTIFICIAL INTELLIGENCE
						</a>
						<a href="#match" data-page="match" class="block p-3 border border-green-400/50 bg-black/50 text-green-400 hover:bg-green-400 hover:text-black transition-all duration-200 uppercase tracking-wide mt-1">
							> 2. PLAYER VS PLAYER BATTLE
						</a>
						<a href="#tournament" data-page="tournament" class="block p-3 border border-green-400/50 bg-black/50 text-green-400 hover:bg-green-400 hover:text-black transition-all duration-200 uppercase tracking-wide mt-1">
							> 3. GALACTIC TOURNAMENT MODE
						</a>
						<a href="#history" data-page="history" class="block p-3 border border-green-400/50 bg-black/50 text-green-400 hover:bg-green-400 hover:text-black transition-all duration-200 uppercase tracking-wide mt-1">
							> 4. VIEW BATTLE HISTORY
						</a>
					</div>
				</div>
				<div class="border-2 border-green-400 bg-black p-4 mb-8">
					<div class="text-sm text-green-300 mb-3">SYSTEM LOG:</div>
					<div class="space-y-1 text-xs text-green-400">
						<div class="opacity-80">[23:42] VICTORY: PLAYER DEFEATED OPPONENT42</div>
						<div class="opacity-70">[23:38] ACHIEVEMENT: "PIXEL MASTER" UNLOCKED</div>
						<div class="opacity-60">[23:35] RANK_UP: PROMOTED TO LEVEL 42</div>
						<div class="opacity-50">[23:30] HIGH_SCORE: NEW RECORD SET - 15 RALLIES</div>
						<div class="opacity-40">[23:25] SYSTEM: GAME SESSION STARTED</div>
					</div>
				</div>
				<div class="border-2 border-green-400 bg-black p-4 text-center">
					<div class="text-sm text-green-300 mb-3">ARCADE SIMULATOR:</div>
					<canvas id="pong-canvas" class="mx-auto border border-green-400 bg-black" width="480" height="240" style="image-rendering: pixelated;"></canvas>
					<div class="mt-3 text-xs text-green-300">
						USE ARROW KEYS TO CONTROL PADDLE
					</div>
				</div>
				<div class="text-center mt-8 text-xs text-green-400/50">
					[ESC] EXIT | [F1] HELP | [F12] SETTINGS<br>
					TRANSCENDENCE v1.42 - 1982 ARCADE CORPORATION
				</div>
			</div>
		</main>`;
}
