import { ChatUser,Conv } from '../components/chat/chat.js'

const user = new ChatUser("bastien", 8080);

function peers(name:string) {
	return `
	<li class="chat-list flex items-center justify-between p-2 border-b border-green-400/30">
        
        <button class="choose-peer flex-1 text-left text-green-400 p-2 -ml-2 -my-2 transition-all duration-200 hover:bg-green-400 hover:text-black" id="choose-peer-${name}">
            > ${name}
        </button>

        <div class="space-x-1">
            <button class="invite-btn p-1 text-green-400 rounded transition-all duration-200 hover:bg-green-400 hover:text-black" title="Inviter à jouer">🎮</button>
            <button class="block-btn p-1 text-red-500 rounded transition-all duration-200 hover:bg-red-500 hover:text-black" title="Bloquer">⛔</button>
        </div>
    </li>`
}

function renderConv(conv:Conv)
{
	var t = ``;
	for (let msg of conv.msgList)
	{
		t += `<div class="msg-chat font-mono break-words">${msg}</div>`
	}
	return t;
}

function chat(user:ChatUser, conv:Conv)
{
	const t = `
    <div class="chat-header p-2 border-b-2 border-green-400 text-lg uppercase tracking-widest" id="chat-header">
        [${conv.penPal}]
    </div>
    
    <div class="chat flex-1 p-4 overflow-y-auto space-y-2" id="chat-box">
        ${renderConv(conv)}
    </div>
    
    <div class="flex p-2 border-t-2 border-green-400 gap-2">
        <input id="msg" type="text" placeholder="[ECRIRE_MESSAGE]..." 
               class="flex-1 bg-black/50 border-2 border-green-400/50 p-2 text-green-400 
                      focus:outline-none focus:border-green-400 focus:bg-black font-mono">
        
        <button id="send" 
                class="px-4 py-2 border-2 border-green-400 bg-black text-green-400 font-bold 
                       uppercase tracking-widest transition-all duration-200 
                       hover:bg-green-400 hover:text-black">
            [ENVOYER]
        </button>
    </div>`
    return t;
}

export function renderChat() {
    var t = `
    <main class="ml-[80px] min-h-screen bg-black text-green-400 font-mono p-4 flex gap-4">
        
        <div class="w-1/4 h-[calc(100vh-2rem)] flex flex-col border-2 border-green-400 bg-black/80">
            <div class="p-2 border-b-2 border-green-400">
                <h2 class="text-lg uppercase tracking-widest">[CONVERSATIONS]</h2>
                <div class="text-xs text-green-300/50">addFriend ⌛TODO</div>
            </div>
            
            <ul class="flex-1 overflow-y-auto">
    `;

    for (let friend of user.friendList)
    {
        t += peers(friend.penPal);
    }
    t += `
            </ul>
        </div>

        <div class="w-3/4 h-[calc(100vh-2rem)] flex flex-col border-2 border-green-400 bg-black/80">
    `;

    var showing = user.lastPeer;
    if (showing)
    {
        t += chat(user, showing);
    }
    else 
    {
        t += `<div class="flex-1 flex items-center justify-center text-green-400/50">
                [SELECTIONNEZ_UNE_CONVERSATION]
            </div>`;
    }
    t += `
            </div>
        </main>
    `;
    return t;
}
function choosePeer(chatBox:HTMLDivElement, chatHeader:HTMLDivElement)
{
	for (let friend of user.friendList)
	{
		const btn = <HTMLButtonElement>document.getElementById(`choose-peer-${friend.penPal}`);
		if (btn == null)
			continue ;
		btn.onclick = () => {
			friend.setChatBox(chatBox);
			user.lastPeer?.setChatBox(null);
			user.lastPeer = friend;
			friend.reRenderConv();
			chatHeader.textContent = friend.penPal;
		}
	}
}

export function devChat() {
	var chatBox = <HTMLDivElement>document.getElementById("chat-box");
	var chatHeader = <HTMLDivElement>document.getElementById("chat-header");
	if (chatBox == null)
		return ;
	choosePeer(chatBox, chatHeader);
	if (!user.lastPeer)
		return ;
	user.lastPeer.setChatBox(chatBox);

	const msgInput = <HTMLInputElement>document.getElementById("msg");
    const sendBtn = <HTMLButtonElement>document.getElementById("send");
	if (msgInput == null || sendBtn == null)
		return ;
	sendBtn.onclick = () => {
		const message = msgInput.value.trim();
		if (message && user.lastPeer != null) {
			user.sendMsg(user.lastPeer.penPal, message)
			msgInput.value = "";
		}
	};
}
