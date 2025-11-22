export class AppChat extends HTMLElement
{

    constructor()
    {
        super();
    }

    connectedCallback()
    {
        this.render();
        
        const bubble = this.querySelector('#chat-bubble-toggle') as HTMLButtonElement;
        const sidebar = this.querySelector('#chat-sidebar') as HTMLDivElement;
        const closeBtn = this.querySelector('#chat-close-btn') as HTMLButtonElement;

        this.initHome(bubble, sidebar, closeBtn);
    }

    render()
    {
        this.innerHTML = `
        <button id="chat-bubble-toggle" 
            class="fixed bottom-4 right-4 w-16 h-16 border-2 border-green-400 bg-black 
            text-green-400 text-3xl rounded-full z-50 
            hover:bg-green-400 hover:text-black transition-all duration-200 
            hover:shadow-[0_0_20px_rgba(0,255,0,0.8)] animate-pulse">
            💬
        </button>

        <div id="chat-sidebar" 
            class="fixed top-0 right-0 h-screen w-96 bg-black border-l-2 border-green-400 z-[60]
            transform transition-transform duration-300 ease-in-out translate-x-full
            flex flex-col font-mono shadow-[-20px_0_50px_rgba(0,20,0,0.8)]">
            
            <div class="flex justify-between items-center p-4 border-b-2 border-green-400 bg-green-900/20">
                <h3 class="text-lg font-bold tracking-widest text-green-400 flex items-center gap-2">
                    <span class="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                    [CHAT]
                </h3>
                <button id="chat-close-btn" 
                    class="text-green-400 hover:text-red-500 transition-colors font-bold border border-transparent hover:border-red-500 px-2 rounded">
                    [X]
                </button>
            </div>

            <div class="p-4 border-b border-green-800 bg-black">
                <div class="text-[10px] uppercase text-green-600 mb-1">> SEARCH</div>
                <div class="flex gap-2">
                    <input id="add-friend" type="text" placeholder="Name..." 
                        class="flex-1 bg-black border border-green-600 rounded p-2 text-sm text-green-400 
                        focus:outline-none focus:border-green-400 focus:shadow-[0_0_10px_rgba(0,255,0,0.2)] 
                        placeholder-green-800 transition-all">
                    
                    <button id="send-add" 
                        class="bg-green-900/30 text-green-400 border border-green-600 px-3 py-1 rounded 
                        hover:bg-green-400 hover:text-black transition-all text-xs font-bold tracking-wider">
                        ADD
                    </button>
                </div>
                <div id="log-add-friend" class="h-4 text-[10px] text-green-600/70 mt-1 italic truncate"></div>
            </div>

            <div class="flex-1 overflow-y-auto p-2 space-y-1 border-b border-green-800 scrollbar-thin scrollbar-thumb-green-900 scrollbar-track-black">
                <div class="text-[10px] uppercase text-green-600 px-2 mb-2">> FRIEND_LIST</div>
                <ul id="friends-list" class="space-y-1"></ul>
            </div>

            <div class="h-[45%] flex flex-col bg-black/90">
                <div id="chat-header" class="bg-green-900/40 text-green-300 text-xs font-bold px-3 py-1 border-t-2 border-b border-green-400 uppercase tracking-wider flex justify-between">
                    <span>[NO_SIGNAL]</span>
                    <span class="text-[10px] opacity-50">chat</span>
                </div>

                <div id="chat-box" class="flex-1 overflow-y-auto p-3 space-y-2 text-sm scrollbar-thin scrollbar-thumb-green-900 scrollbar-track-black bg-[url('/public/scanline.png')] bg-repeat"></div>

                <div class="p-3 border-t border-green-400 bg-black">
                    <div class="flex gap-2 items-center">
                        <span class="text-green-500 text-xs animate-pulse">></span>
                        <input id="msg" type="text" placeholder="Message..." 
                            class="flex-1 bg-transparent border-b border-green-800 p-1 text-sm text-green-400 
                            focus:outline-none focus:border-green-400 transition-all placeholder-green-900">
                        
                        <button id="send-msg" 
                            class="text-green-400 hover:text-white hover:bg-green-900/50 rounded px-2 py-1 transition-colors">
                            ⏎
                        </button>
                    </div>
                </div>
            </div>
        </div>
        `;
    }

    private initHome(bubble: HTMLButtonElement, sidebar: HTMLDivElement, closeBtn: HTMLButtonElement)
    {
        if (!bubble || !sidebar || !closeBtn) return;

        const openChat = () => sidebar.classList.remove('translate-x-full');
        const closeChat = () => sidebar.classList.add('translate-x-full');

        bubble.addEventListener('click', openChat);
        closeBtn.addEventListener('click', closeChat);
    }
}

customElements.define('app-chat', AppChat);