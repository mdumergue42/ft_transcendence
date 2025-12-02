import '../ui/auth-modal.js';

export function renderHome() {
	return `<app-def>
				<div class="text-center mb-8 p-6 border-2 PBoxBorder PInsetLowShadow">
					<pre class="PText text-xs md:text-sm leading-tight mb-4 whitespace-pre-wrap relative">
						<span class="absolute inset-0 animate-noise-anim PText opacity-80">
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
			<span class="relative z-10">
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
					<div class="text-sm mb-4 PText">
						>>> RETRO GAMING SYSTEM INITIALIZED <<<
					</div>
					<div class="text-sm mb-4 PText">
						>>> COPYRIGHT 1982-2025 ARCADE CORP <<<
					</div>
					<button id="play-button" class="px-6 py-3 border-2 PBoxBorder PText font-bold uppercase tracking-widest PBoxHover hover:text-black transition-all duration-200 animate-pulse">
						[PRESS START]
					</button>
				</div>
				<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
					<div class="border-2 PBoxBorder p-4 text-center relative">
						<div class="absolute top-1 left-1 text-xs PText">SCORE</div>
						<div class="text-2xl font-bold PText mt-4">000028</div>
						<div class="text-xs PText mt-1">WINS</div>
					</div>
					<div class="border-2 PBoxBorder p-4 text-center relative">
						<div class="absolute top-1 left-1 text-xs PText">COMBO</div>
						<div class="text-2xl font-bold PText mt-4">+00005</div>
						<div class="text-xs PText mt-1">STREAK</div>
					</div>
					<div class="border-2 PBoxBorder p-4 text-center relative">
						<div class="absolute top-1 left-1 text-xs PText">LEVEL</div>
						<div class="text-2xl font-bold PText mt-4">000042</div>
						<div class="text-xs PText mt-1">SKILL</div>
					</div>
					<div class="border-2 PBoxBorder p-4 text-center relative">
						<div class="absolute top-1 left-1 text-xs PText">PERF</div>
						<div class="text-2xl font-bold PText mt-4">087.0%</div>
						<div class="text-xs PText mt-1">ACC</div>
					</div>
				</div>
				<div class="space-y-2 mb-8">
					<div class="border-2 PBoxBorder p-4">
						<div class="text-sm PText mb-2">SELECT GAME MODE:</div>
						<a class="block p-3 border PBoxBorder PText PBoxHover hover:text-black transition-all duration-200 uppercase tracking-wide">
							> 1. FIGHT
						</a>
						<a class="block p-3 border PBoxBorder PText PBoxHover hover:text-black transition-all duration-200 uppercase tracking-wide mt-1">
							> 2. VIEW PROFILE
						</a>
						<a class="block p-3 border PBoxBorder PText PBoxHover hover:text-black transition-all duration-200 uppercase tracking-wide mt-1">
							> 3. SETTINGS
						</a>
					</div>
				</div>
				<div class="border-2 PBoxBorder p-4 mb-8">
					<div class="text-sm PText mb-3">SYSTEM LOG:</div>
					<div class="space-y-1 text-xs PText">
						<div class="opacity-80">[23:42] VICTORY: PLAYER DEFEATED OPPONENT42</div>
						<div class="opacity-70">[23:38] ACHIEVEMENT: "PIXEL MASTER" UNLOCKED</div>
						<div class="opacity-60">[23:35] RANK_UP: PROMOTED TO LEVEL 42</div>
						<div class="opacity-50">[23:30] HIGH_SCORE: NEW RECORD SET - 15 RALLIES</div>
						<div class="opacity-40">[23:25] SYSTEM: GAME SESSION STARTED</div>
					</div>
				</div>
				<div class="border-2 PBoxBorder p-4 text-center">
					<div class="text-sm PText mb-3">ARCADE SIMULATOR:</div>
					<canvas id="pong-canvas" class="mx-auto border PBoxBorder" width="480" height="240" style="image-rendering: pixelated;"></canvas>
					<div class="mt-3 text-xs PText">
						USE ARROW KEYS TO CONTROL PADDLE
					</div>
				</div>
				<div class="text-center mt-8 text-xs PText/50">
					[ESC] EXIT | [F1] HELP | [F12] SETTINGS<br>
					TRANSCENDENCE v1.42 - 1982 ARCADE CORPORATION
				</div>
		</app-def>`;
}
