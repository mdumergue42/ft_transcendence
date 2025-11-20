import { ChatUser } from '../components/chat/chat.js'

function devSendMsg(user: ChatUser) {
	const msgInput = <HTMLInputElement>document.getElementById("msg");
    const sendBtn = <HTMLButtonElement>document.getElementById("send-msg");
	if (msgInput == null || sendBtn == null) {
		console.warn("DEV SEND MSG PRB");
		return ;
	}
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
	if (addInput == null || sendBtn == null) {
		console.warn("DEV SEND MSG PRB");
		return ;
	}
	sendBtn.onclick = () => {
		const name = addInput.value.trim();
		if (name) {
			user.addFriend(name);
			addInput.value = "";
		}
	};
}

export function devChat(user: ChatUser) {
	devSendMsg(user);
	devAddFriend(user);
	user.reRenderFriendList();
}
