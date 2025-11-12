import { ChatUser } from '../components/chat/chat.js'

export function renderChat() {
	return `
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
	`
}

function devSendMsg(user: ChatUser) {
	const msgInput = <HTMLInputElement>document.getElementById("msg");
    const sendBtn = <HTMLButtonElement>document.getElementById("send-msg");
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

function devAddFriend(user: ChatUser) {
	const addInput = <HTMLInputElement>document.getElementById("add-friend");
    const sendBtn = <HTMLButtonElement>document.getElementById("send-add");
	if (addInput == null || sendBtn == null)
		return ;
	sendBtn.onclick = () => {
		const name = addInput.value.trim();
		if (name) {
			user.addFriend(name);
			addInput.value = "";
		}
	};
}

export function devChat() {
	const user = new ChatUser("bastien", 8080);
	devSendMsg(user);
	devAddFriend(user);
}
