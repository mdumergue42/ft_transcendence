import { ChatUser,Conv } from '../components/chat/chat.js'

const user = new ChatUser("username", 8080);

function peers(name:string) {
	return `
	<table class="chat-list">
	<tr>
		<span class="peer-name">${name}</span>
		<button class="invite-btn">🎮 </button>
		<button class="block-btn">⛔ </button>
		</tr>
	</table>`
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
	const t = `<div class="chat-header" style="margin-top:100px">${conv.penPal}
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
		<div>addFriend ⌛TODO</div>`;

	for (let friend of user.friendList)
	{
		t += peers(friend.penPal);
	}
	var showing = user.friendList[0];
	if (showing)
		t += chat(user, showing)
	return t;
}

export function devChat() {
	const conv = user.friendList[0];

	if (!conv)
		return ;
	const msgInput = <HTMLInputElement>document.getElementById("msg");
    const sendBtn = <HTMLButtonElement>document.getElementById("send");
	if (msgInput == null || sendBtn == null)
		return ;
	sendBtn.onclick = () => {
		const message = msgInput.value.trim();
		if (message) {
			user.sendMsg(conv.penPal, message)
			msgInput.value = "";
			var chatBox = <HTMLDivElement>document.getElementById("chat-box");
			var newMsg = document.createElement('div');
			const newContent = document.createTextNode(`You: ${message}`);
			newMsg.appendChild(newContent);
			chatBox.appendChild(newMsg);
		}
	};
}
