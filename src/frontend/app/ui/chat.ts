export class AppChat extends HTMLElement {

	constructor() {
		super();
	}

	async connectedCallback() {


		const chat = document.createElement('chat');
		chat.className = `chat-dev`;

		const bubble = document.createElement('button');
		bubble.id = "chat-bubble-toggle";
		bubble.innerHTML = '💬';
		bubble.className = `fixed bottom-4 right-4 w-16 h-16 border-2 border-green-400 bg-black 
			text-green-400 text-3xl rounded-full z-50 
			hover:bg-green-400 hover:text-black transition-all duration-200 
			hover:shadow-[0_0_20px_rgba(0,255,0,0.8)] animate-pulse`;
		chat.appendChild(bubble);




		const topHeaderText = document.createElement('h3');
		topHeaderText.className = `text-lg uppercase tracking-widest text-green-400`;
		topHeaderText.innerHTML = "[CHAT]";

		const closeBtn = document.createElement('button');
		closeBtn.id = "chat-close-btn";
		closeBtn.innerHTML = '[CLOSE]';
		closeBtn.className = `p-2 text-green-400 hover:bg-green-400 hover:text-black`;

		const topHeader = document.createElement('div');
		topHeader.className = `flex justify-between items-center p-2 border-b-2 border-green-400`;
		topHeader.appendChild(topHeaderText);
		topHeader.appendChild(closeBtn);

		const chatBox = document.createElement('div');
		chatBox.className = `flex-1 p-4 text-green-400/50`;
		chatBox.innerHTML = `
		<input id="add-friend" type="text" placeholder="add a friend"></input>
		<button id="send-add">ADD</button>
		<div id="log-add-friend" style="height:2rem;color:grey;">logs</div>
		<div style="overflow-y: scroll; overflow-x: hidden;;height:5rem;">
		<ul class="list-frinds" id="friends-list">
		</ul>
		</div>
		<div class="chat-header" id="chat-header" style="margin-top:10px">Chats-init-toRename</div>
		<div class="chat" id="chat-box" style="margin-top:30px">
		</div>
		<input id="msg" type="text" placeholder="write a msg"></input>
		<button id="send-msg">Send</button>
		`;

		const sidebar = document.createElement('div');
		sidebar.id = "chat-sidebar";
		sidebar.className = `fixed top-0 right-0 h-screen w-80 bg-black border-l-2 border-green-400 z-[60]
			transform transition-transform duration-300 ease-in-out translate-x-full
			flex flex-col`;
		sidebar.appendChild(topHeader);
		sidebar.appendChild(chatBox);
		chat.appendChild(sidebar);

		this.appendChild(chat);
		this.initHome(bubble, sidebar, closeBtn);
	}

		
	private initHome(bubble:HTMLButtonElement, sidebar:HTMLDivElement, closeBtn:HTMLButtonElement) {

		if (!bubble || !sidebar || !closeBtn) {
			console.warn('Éléments du chat (bulle/sidebar) non trouvés.');
			return;
		}

		const openChat = () => {
			sidebar.classList.remove('translate-x-full');
		};

		const closeChat = () => {
			sidebar.classList.add('translate-x-full');
		};

		bubble.addEventListener('click', openChat);
		closeBtn.addEventListener('click', closeChat);
	}
}

customElements.define('app-chat', AppChat);


