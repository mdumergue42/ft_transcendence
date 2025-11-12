import {Conv, Conv__lt__} from './conv.js'

export class ChatUser
{
	username:string
	ws: WebSocket
	friendList:Conv[]
	lastPeer:Conv | null
	constructor(_name:string, port:number)
	{
		this.username = _name;
		//TODO WSS
		this.ws = new WebSocket(`ws://localhost:${port}`);
		this.connect();
		this.friendList = [];
		this.lastPeer = this.friendList[0];
	}

	connect()
	{
		this.ws.onopen  = () => this.ws.send(`user+${this.username}+user`);
		this.ws.onclose = () => {}
		this.ws.onmessage = (event) => this.onMsg(event);
	}

	_getConv(name:string)
	{
		for (let conv of this.friendList)
		{
			if (name == conv.penPal)
				return conv
		}
		return null;
	}

	receiveMsg(arg1:string, arg2:string, content:string)
	{
		const other = (arg1 != this.username) ? arg1 : arg2;
		var conv = this._getConv(other);
		if (!conv)
		{
			conv = new Conv(other, 1)
			this.friendList.push(conv);
			return ;
		}
		conv.HTMLAddMsg(`${arg1}: ${content}`);
	}
	receiveBlocked(name:string)
	{
		this.friendList.push(new Conv(name, 0));
	}
	receiveInvite(arg:string, room:string)
	{
		console.log(`${arg} invited you to room ${room}`); //TODO
	}
	receiveAdd(name:string, arg:string)
	{
		var log = document.getElementById("log-add-friend");
		if (arg == "no")
		{
			var conv = this._getConv(name);
			if (conv)
				return ;
			if (log)
				log.innerHTML = "user doesn't exist";
			return ;
		}

		const newFriend = new Conv(name, 1);
		this.friendList.push(newFriend);
		if (log)
			log.innerHTML = "accpeted";
		this.reRenderFriendList(); //TODO TROP GOURMAND!
	}

	onMsg(event:MessageEvent)
	{
		const [type, arg1, arg2, ...X] = event.data.split('+');
		const content = X.join('+');

		switch (type) {
			case 'msg':
				this.receiveMsg(arg1, arg2, content);
				break ;
			case 'invited':
				this.receiveInvite(arg1, content);
				break ;
			case 'add':
				this.receiveAdd(arg1, arg2);
				break
			case 'blocked':
				this.receiveBlocked(arg1);
				break
			case 'endDb':
				this.reRenderFriendList();
				break
			default:
				break;
		}
	}

	sendBlock(friend:Conv)
	{
		this.ws.send(`block+${friend.penPal}+${friend.flag}`);
	}

	sendMsg(penPal:string, content:string)
	{
		this.ws.send(`msg+${penPal}+${content}`)
		const conv = this._getConv(penPal);
		conv?.HTMLAddMsg(`${this.username}: ${content}`);
	}

	addFriend(name:string)
	{
		//TODO refuse yourself
		var log = document.getElementById("log-add-friend");

		const conv = this._getConv(name);
		if (conv)
		{
			if (log)
				log.innerHTML = "your already friend with him!";
			return ;
		}
		this.ws.send(`add+${name}+its cool to have friend`);
		if (log)
			log.innerHTML = "searching"
	}

	HTMLChooseBtn(conv: Conv, chatBox: HTMLElement, chatHeader: HTMLElement, chooseBtn: HTMLElement)
	{
		chooseBtn.onclick = () => {
			if (conv.flag == 0)
				return ;
			conv.setChatBox(chatBox);
			this.lastPeer?.setChatBox(null);
			this.lastPeer = conv;
			conv.HTMLRenderConv();
			chatHeader.textContent = conv.penPal;
		}
	}
	HTMLBlockBtn(conv: Conv, chatBox: HTMLElement, chatHeader: HTMLElement, chooseBtn: HTMLElement, blockBtn: HTMLElement)
	{
		if (!blockBtn)
			return ;
		blockBtn.onclick = () => {
			conv.toggleBlock(chooseBtn);
			if (conv.flag == 0 && this.lastPeer == conv)
			{
				chatBox.innerHTML = "";
				conv.setChatBox(null);
				this.lastPeer = null;
				chatHeader.textContent = "Chats-init-toRename";
			}
			this.sendBlock(conv);
		}
	}

	HTMLRenderPeer(conv: Conv, friendDiv: HTMLElement, chatBox: HTMLElement, chatHeader: HTMLElement)
	{
		var li = conv.HTMLChoosePeer();
		friendDiv.appendChild(li);

		const chooseBtn = document.getElementById(`choose-peer-${conv.penPal}`);
		const blockBtn = document.getElementById(`block-peer-${conv.penPal}`);
		if (!chooseBtn || !blockBtn)
			return ;
		this.HTMLChooseBtn(conv, chatBox, chatHeader, chooseBtn);
		this.HTMLBlockBtn(conv, chatBox, chatHeader, chooseBtn, blockBtn);
	}

	reRenderFriendList()
	{
		var friendDiv = document.getElementById("friends-list");
		var chatBox = document.getElementById("chat-box");
		var chatHeader = document.getElementById("chat-header");
		if (!friendDiv || !chatHeader || !chatBox)
			return ;
		friendDiv.innerHTML = "";

		this.friendList.sort(Conv__lt__);
		for (let conv of this.friendList)
			this.HTMLRenderPeer(conv, friendDiv, chatBox, chatHeader);
	}
}
