import {ChatUser} from '../components/chat/chat.js'



function devSendMsg(user: ChatUser)
{
	const msgInput = <HTMLInputElement>document.getElementById("msg");
    const sendBtn = <HTMLButtonElement>document.getElementById("send-msg");
	if (msgInput == null || sendBtn == null)
		return ;

	const fctSendMsg = () => {
		const message = msgInput.value.trim();
		if (message && user.lastPeer != null)
		{
			user.sendMsg(user.lastPeer.penPal, message)
			msgInput.value = "";
		}
	}

	sendBtn.onclick = fctSendMsg;
	msgInput.addEventListener("keyup", ({key}) => { if (key === "Enter") { fctSendMsg(); }})
}

function devAddFriend(user: ChatUser)
{
	const addInput = <HTMLInputElement>document.getElementById("add-friend");
    const sendBtn = <HTMLButtonElement>document.getElementById("send-add");

	const fctAddFriend = () => {
		const name = addInput.value.trim();
		if (name)
		{
			user.addFriend(name);
			addInput.value = "";
		}
	}
	if (addInput == null || sendBtn == null)
		return ;
	addInput.addEventListener("keyup", ({key}) => { if (key === "Enter") { fctAddFriend(); }})
	sendBtn.onclick = fctAddFriend;
}

export function devChat(user: ChatUser)
{
	devSendMsg(user);
	devAddFriend(user);
	user.reRenderFriendList();
}
