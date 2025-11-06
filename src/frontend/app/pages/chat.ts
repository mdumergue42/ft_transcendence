import { ChatUser,Conv } from '../components/chat/chat.js'

const user = new ChatUser("bastien", 8080);

function peers(name:string) {
	return `
	<li class="chat-list">
		<button class="choose-peer" id="choose-peer-${name}">${name}</button>
		<button class="invite-btn">🎮 </button>
		<button class="block-btn">⛔ </button>
	</li>`
}

function renderConv(conv:Conv)
{
	var t = ``;
	for (let msg of conv.msgList)
	{
		t += `<div class="msg-chat">${msg}</div>`
	}
	return t;
}

function chat(user:ChatUser, conv:Conv)
{
	const t = `<div class="chat-header" id="chat-header" style="margin-top:100px">${conv.penPal}
	</div>
	<div class="chat" id="chat-box" style="margin-top:30px">
	${renderConv(conv)}
	</div>
	<input id="msg" type="text" placeholder="write a msg"></input>
	<button id="send">Send</button>`
	return t;
}

export function renderChat() {
	var t = `
		<h1>CHAT</h1>
		<div>addFriend ⌛TODO</div>
		<ul>`;

	for (let friend of user.friendList)
	{
		t += peers(friend.penPal);
	}
	t += `</ul>`;
	var showing = user.lastPeer;
	if (showing)
		t += chat(user, showing)
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
