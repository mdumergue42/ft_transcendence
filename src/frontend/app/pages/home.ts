import '../ui/auth-modal.js';

export function renderHome() {
    return `

    <style>
        @keyframes glitch-anim
		{
            0% { clip-path: inset(40% 0 61% 0); transform: translate(-2px, 2px); }
            20% { clip-path: inset(92% 0 1% 0); transform: translate(2px, -2px); }
            40% { clip-path: inset(43% 0 1% 0); transform: translate(-2px, 2px); }
            60% { clip-path: inset(25% 0 58% 0); transform: translate(2px, -2px); }
            80% { clip-path: inset(54% 0 7% 0); transform: translate(-2px, 2px); }
            100% { clip-path: inset(58% 0 43% 0); transform: translate(2px, -2px); }
        }
        
        .glitch-text
		{
            position: relative;
        }
        
        .glitch-text::before,
        .glitch-text::after
		{
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0.8;
        }

        .glitch-text::before
		{
            left: 2px;
            text-shadow: -1px 0 red;
            background: black;
            animation: glitch-anim 2s infinite linear alternate-reverse;
            clip-path: inset(0 0 0 0);
        }

        .glitch-text::after
		{
            left: -2px;
            text-shadow: -1px 0 blue;
            background: black;
            animation: glitch-anim 3s infinite linear alternate-reverse;
            clip-path: inset(0 0 0 0);
        }
    </style>

	<app-def>
    <div class="h-screen w-full bg-black flex flex-col items-center justify-center relative overflow-hidden font-mono">
        
        <div class="absolute inset-0 pointer-events-none opacity-20" 
             style="background-image: 
                linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 255, 0, 0.1) 1px, transparent 1px);
                background-size: 40px 40px;
                mask-image: radial-gradient(circle, black 40%, transparent 100%);">
        </div>

        <div class="relative z-10 flex flex-col items-center gap-12 p-8 max-w-5xl w-full">
            
            <div class="text-center animate-in fade-in zoom-in duration-700 relative">
                
                <pre class="glitch-text PText text-[8px] md:text-[10px] lg:text-xs leading-[1.1] whitespace-pre relative font-bold select-none" 
                     data-text="
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
    ╚═╝      ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝">
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
            </div>

        </div>
    </div>
	</app-def>`;
}
