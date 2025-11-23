import {Conv, Conv__lt__} from './conv.js'
import {DevPongGame} from '../pongLib/game.js'
import {Historic} from './historic.js'

async function _waitWs (socket:WebSocket, loops:number = 100) {
  const isOpened = () => (socket.readyState === WebSocket.OPEN)

  if (socket.readyState !== WebSocket.CONNECTING) {
    return isOpened();
  }
  else {
    let loop = 0
    while (socket.readyState === WebSocket.CONNECTING && loop < loops) {
      await new Promise(resolve => setTimeout(resolve, 100))
      loop++
    }
    return isOpened();
  }
}

export class ChatUser
{
	username:string | null
	ws: WebSocket
	lastPeer:Conv | null
	pingInterval:any
	pongGame: DevPongGame
	historic: Historic
	friendList:Conv[] = [];
	constructor(_name:string | null)
	{
		this.username = _name;
		this.ws = new WebSocket(`wss://${window.location.hostname}/ws/`);
		this.connect();
		this.lastPeer = this.friendList[0];
		this.pongGame = new DevPongGame();
		this.pongGame.setWs(this.ws);
		this.historic = new Historic();
	}

	wsSend(obj:any)
	{
		this.ws.send(JSON.stringify(obj));
	}

	connect()
	{
		this.ws.onopen  = () => {
			this.wsSend({type: "user", name:this.username});
			this.pingInterval = setInterval(() => {
				this.wsSend({type: "ping"});
			}, 1000);
		}
		this.ws.onclose = () => {
			clearInterval(this.pingInterval);
			this.pongGame.setWs(null);
		}
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

	async askHistoric(username:string, flag:any)
	{
		const isopen = await _waitWs(this.ws);
		if (!isopen)
			return ;
		this.historic.reset(username);
		this.wsSend({type: "getHistoric", name: username, flag: flag});
	}

	receiveHistoric(msg: any)
	{
		this.historic.addGame(msg);
	}

	_createFriend(name:string, flag:number)
	{
		var conv = this._getConv(name);
		if (!conv)
		{
			conv = new Conv(name, flag)
			this.friendList.push(conv);
			return conv;
		}
		return conv;
	}

	receiveMsg(msg: any)
	{
		const other = msg.from;
		var conv;
		conv = this._getConv(other);
		if (!conv)
		{
			conv = this._createFriend(other, 1);
			conv.setStatus(1);
			this.reRenderFriendList();
		}
		conv.HTMLAddMsg(`${msg.from}: ${msg.content}`);
	}
	receiveOMsg(msg: any)
	{
		const other = (msg.from != this.username) ? msg.from : msg.to;
		var conv;
		conv = this._getConv(other);
		if (!conv)
			conv = this._createFriend(other, 1);
		conv.HTMLAddMsg(`${msg.from}: ${msg.content}`);
	}
	receiveFriendList(msg: any)
	{
		const conv = this._createFriend(msg.name, msg.flag);
		conv.setStatus(msg.status);
	}
	receiveFriendCo(msg: any)
	{
		var conv = this._getConv(msg.name);
		if (!conv)
			return ;
		conv.setStatus(msg.status);
		this.reRenderFriendList();
	}
	receiveInvite(msg: any)
	{
		console.log(`${msg.name} invited you to his room`); //TODO
	}
	receiveAdd(msg: any)
	{
		var log = document.getElementById("log-add-friend");
		if (msg.error != undefined) {
			if (msg.error == "no")
			{
				if (log)
					log.innerHTML = "user doesn't exist";
			}
			return ;
		}

		const newFriend = new Conv(msg.name, 1);
		newFriend.setStatus(msg.status);
		this.friendList.push(newFriend);
		this.reRenderFriendList();
	}

	onMsg(message:any)
	{
		const msg = JSON.parse(message.data);
		if (msg.type == "pong")
			return ;
		console.log(msg);

		switch (msg.type) {
			case 'init': //TODO c pas au back de le faire
				this.username = msg.name;
				console.log(`I'm ${msg.name}`);
				break ;
			case 'msg':
				this.receiveMsg(msg);
				break ;
			case 'friendCo':
				this.receiveFriendCo(msg);
				break ;
			case 'omsg':
				this.receiveOMsg(msg);
				break;
			case 'invited':
				this.receiveInvite(msg);
				break ;
			case 'add':
				this.receiveAdd(msg);
				break
			case 'friendList':
				this.receiveFriendList(msg);
				break
			case 'historic':
				this.receiveHistoric(msg);
				break
			case 'endDb':
				this.reRenderFriendList();
				break
			case 'game':
				this.pongGame.onMsg(msg);
				break ;
			default:
				break;
		}
	}

	sendBlock(friend:Conv)
	{
		this.wsSend({type: "block", name: friend.penPal, flag: friend.flag});
	}

	sendMsg(penPal:string, content:string)
	{
		this.wsSend({type: "msg", name: penPal, content: content})
		const conv = this._getConv(penPal);
		conv?.HTMLAddMsg(`${this.username}: ${content}`);
	}

	sendFindGame()
	{
		this.wsSend({type: "findGame"});
	}

	sendInvite(conv:Conv)
	{
		//need to create a room
		this.wsSend({type: "invite", name:conv.penPal});
		conv.HTMLAddInvite();

		//need the user to be online
		//
		//_addInvite()
		//afficher les joueurs invite dans la room
		//quand un jouer est dans la room: pouvoir lancer
		//tournois/1VS1/ mutli (3+player)
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
		this.wsSend({type:"add", name: name});
	}

	HTMLChooseBtn(conv: Conv, chatBox: HTMLElement, chatHeader: HTMLElement, chooseBtn: HTMLElement)
	{
		chooseBtn.onclick = () => {
			if (conv.flag == 0)
				return ;
			this.lastPeer?.setChatBox(null);
			conv.setChatBox(chatBox);
			this.lastPeer = conv;
			conv.HTMLRenderConv();
			chatHeader.textContent = conv.penPal;
		}
	}
	HTMLBlockBtn(conv: Conv, chatBox: HTMLElement, chatHeader: HTMLElement, chooseBtn: HTMLElement, blockBtn: HTMLElement)
	{
		blockBtn.onclick = () => {
			conv.toggleBlock(chooseBtn);
			if (conv.flag == 0 && this.lastPeer == conv)
			{
				chatBox.innerHTML = "";
				conv.setChatBox(null);
				this.lastPeer = null;
				chatHeader.textContent = "[NO_SIGNAL]";
			}
			this.sendBlock(conv);
		}
	}
	HTMLInviteBtn(conv: Conv, chatBox: HTMLElement, inviteBtn: HTMLElement)
	{
		inviteBtn.onclick = () => {
			this.sendInvite(conv);
		}
	}

	HTMLProfilePageBtn(conv: Conv, profileBtn: HTMLElement)
	{
		profileBtn.onclick = () => {
			const path = `/history/${conv.penPal}`;
			history.pushState({}, '', path);
			window.dispatchEvent(new PopStateEvent('popstate'));
		}
	}

	HTMLRenderPeer(conv: Conv, friendDiv: HTMLElement, chatBox: HTMLElement, chatHeader: HTMLElement)
	{
		var li = conv.HTMLChoosePeer();
		friendDiv.appendChild(li);

		const chooseBtn = document.getElementById(`choose-peer-${conv.penPal}`);
		const blockBtn = document.getElementById(`block-peer-${conv.penPal}`);
		const inviteBtn = document.getElementById(`invite-peer-${conv.penPal}`);
		const profileBtn = document.getElementById(`profile-peer-${conv.penPal}`);
		if (!chooseBtn || !blockBtn || !inviteBtn || !profileBtn)
		{
			console.warn("BTN ERROR:", chooseBtn, blockBtn, inviteBtn, profileBtn);
			return ;
		}
		this.HTMLChooseBtn(conv, chatBox, chatHeader, chooseBtn);
		this.HTMLBlockBtn(conv, chatBox, chatHeader, chooseBtn, blockBtn);
		this.HTMLInviteBtn(conv, chatBox, inviteBtn);
		this.HTMLProfilePageBtn(conv, profileBtn);
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
