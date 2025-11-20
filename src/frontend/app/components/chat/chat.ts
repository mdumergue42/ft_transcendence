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
	username:string
	ws: WebSocket
	lastPeer:Conv | null
	pingInterval:any
	pongGame: DevPongGame
	historic: Historic
	friendList:Conv[] = [];
	constructor(_name:string)
	{
		this.username = _name;
		this.ws = new WebSocket(`wss://${window.location.hostname}/ws/`);
		this.connect();
		this.lastPeer = this.friendList[0];
		this.pongGame = new DevPongGame();
		this.pongGame.setWs(this.ws);
		this.historic = new Historic();
	}


	connect()
	{
		this.ws.onopen  = () => {
			this.ws.send(`user+${this.username}+user`);
			this.pingInterval = setInterval(() => {
				this.ws.send(`ping+x+x`);
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

	async askHistoric(name:string, flag:number)
	{
		const isopen = await _waitWs(this.ws);
		if (!isopen)
			return ;
		this.historic.reset(name);
		this.ws.send(`getHistoric+${name}+${flag}`);
	}
	receiveHistoric(arg1:string, arg2:string, content:string)
	{
		this.historic.addGame(arg1, arg2, content);
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
			case 'historic':
				this.receiveHistoric(arg1, arg2, content);
			case 'game':
				this.pongGame.onMsg(arg1, arg2, content);
				break ;
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

	sendFindGame()
	{
		this.ws.send(`findGame+x+x`);
	}

	sendInvite(conv:Conv)
	{
		//need to create a room
		this.ws.send(`invite+${conv.penPal}+x`);
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
		this.ws.send(`add+${name}+its cool to have friend`);
		if (log)
			log.innerHTML = "searching"
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
				chatHeader.textContent = "[CONV]";
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

	HTMLRenderPeer(conv: Conv, friendDiv: HTMLElement, chatBox: HTMLElement, chatHeader: HTMLElement)
	{
		var li = conv.HTMLChoosePeer();
		friendDiv.appendChild(li);

		const chooseBtn = document.getElementById(`choose-peer-${conv.penPal}`);
		const blockBtn = document.getElementById(`block-peer-${conv.penPal}`);
		const inviteBtn = document.getElementById(`invite-peer-${conv.penPal}`);
		console.log(chooseBtn, blockBtn, inviteBtn);
		if (!chooseBtn || !blockBtn || !inviteBtn)
			return ;
		this.HTMLChooseBtn(conv, chatBox, chatHeader, chooseBtn);
		this.HTMLBlockBtn(conv, chatBox, chatHeader, chooseBtn, blockBtn);
		this.HTMLInviteBtn(conv, chatBox, inviteBtn);
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
