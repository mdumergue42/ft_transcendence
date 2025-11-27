export function renderWaitScreen() {
	return `
	<div class="PBoxBorder border-2 text-center mb-8 p-6 shadow-[inset_0_0_20px_rgba(0,255,0,0.1)]">
		<pre class="PText text-xs md:text-sm leading-tight mb-4 whitespace-pre-wrap relative">
			<span class="PText absolute inset-0 animate-noise-anim opacity-80">
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
		<div class="PText text-sm mb-4">
			>>> RETRO GAMING SYSTEM INITIALIZATION <<<
		</div>
		<div class="PText text-sm mb-4">
			>>> COPYRIGHT 1982-2025 ARCADE CORP <<<
		</div>
		<a class="PText" style="opacity:50%" id="logs-waiting-screen">Waiting for Connection</a>
		<div class="relative" style="height:150px">
			<div class="loader absolute" style="transform:translate(-50%, 0%); top:50%; left:50%"></div>
		</div>	
	`
}
