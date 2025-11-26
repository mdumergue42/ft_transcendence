export function renderWaitScreen() {
	return `
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
			>>> RETRO GAMING SYSTEM INITIALIZATION <<<
		</div>
		<div class="text-sm mb-4 text-green-300">
			>>> COPYRIGHT 1982-2025 ARCADE CORP <<<
		</div>
		<a class="text-green-300" style="opacity:50%" id="logs-waiting-screen">Waiting for Connection</a>
		<div class="relative" style="height:150px">
			<div class="loader absolute" style="transform:translate(-50%, 0%); top:50%; left:50%"></div>
		</div>	
	`
}
