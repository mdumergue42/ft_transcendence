export class AppChat extends HTMLElement
{

    constructor()
    {
        super();
    }

    connectedCallback()
    {
		if (!(localStorage.getItem('isLoggedIn') === 'true')) {
			this.innerHTML = "";
		}
        this.render();
        
        const bubble = this.querySelector('#chat-bubble-toggle') as HTMLButtonElement;
        const sidebar = this.querySelector('#chat-sidebar') as HTMLDivElement;
        const closeBtn = this.querySelector('#chat-close-btn') as HTMLButtonElement;

        this.initHome(bubble, sidebar, closeBtn);
    }

    render()
    {
		//TODO attention isloggenIn = false
        this.innerHTML = `
        <button id="chat-bubble-toggle" 
            class="PBoxBorder PBoxHover PTextHover border-2 fixed bottom-4 right-4 w-16 h-16 
            text-3xl rounded-full z-50 
            transition-all duration-200 
            PShadowHover animate-pulse">
            💬
        </button>

        <div id="chat-sidebar" 
            class="PBoxBorder border-l-2 fixed top-0 right-0 h-screen w-96 z-[60]
            transform transition-transform duration-300 ease-in-out translate-x-full
            flex flex-col font-mono PShadowSideBar">
            
            <div class="PDarkBox flex justify-between items-center p-4 border-b-2">
                <h3 class="PText text-lg font-bold tracking-widest flex items-center gap-2">
                    <span class="PBoxBg w-2 h-2 rounded-full animate-ping"></span>
                    [CHAT]
                </h3>
                <button id="chat-close-btn" 
                    class="PText hover:text-red-500 transition-colors font-bold border border-transparent hover:border-red-500 px-2 rounded">
                    [X]
                </button>
            </div>

            <div class="PBoxBorder p-4 border-b">
                <div class="PDarkText text-[10px] uppercase mb-1">> SEARCH</div>
                <div class="flex gap-2">
                    <input id="add-friend" type="text" placeholder="Name..." 
                        class="PText PDarkBox PBorderFocus flex-1 border rounded p-2 text-sm 
                        focus:outline-none 
                        transition-all">
                    
                    <button id="send-add" 
                        class="PDarkBox PText PBoxHover PTextHover px-3 py-1 rounded transition-all text-xs font-bold tracking-wider">
                        ADD
                    </button>
                </div>
                <div id="log-add-friend" class="PDarkText h-4 text-[10px] mt-1 italic truncate"></div>
            </div>

            <div class="PBoxBorder flex-1 overflow-y-auto p-2 space-y-1 border-b scrollbar-thin scrollbar-track-black">
                <div class="PDarkText text-[10px] uppercase px-2 mb-2">> FRIEND_LIST</div>
                <ul id="friends-list" class="space-y-1"></ul>
            </div>

            <div class="h-[45%] flex flex-col bg-black/90">
                <div id="chat-header" class="PText PBoxBorder PLightBox text-xs font-bold px-3 py-1 border-t-2 border-b uppercase tracking-wider flex justify-between">
                    <span>[NO_SIGNAL]</span>
                    <span class="text-[10px] opacity-50">chat</span>
                </div>

                <div id="chat-box" class="flex-1 overflow-y-auto p-3 space-y-2 text-sm scrollbar-thin scrollbar-track-black bg-[url('/public/scanline.png')] bg-repeat"></div>

                <div class="PBoxBorder p-3 border-t">
                    <div class="flex gap-2 items-center">
                        <span class="PText text-xs animate-pulse">></span>
                        <input id="msg" type="text" placeholder="Message..." 
                            class="PText PDarkBorder PBorderFocus flex-1 bg-transparent border-b p-1 text-sm focus:outline-none transition-all">
                        
                        <button id="send-msg" 
                            class="PText PDarkBoxHover hover:text-white rounded px-2 py-1 transition-colors">
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
