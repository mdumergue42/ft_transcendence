import {Conv, Conv__lt__} from './conv.js'
import {PongGame} from '../pong/frontGame.js'
import {Historic} from './historic.js'
import { renderWaitScreen } from '../../pages/waitScreen.js'

export class ChatUser
{
	username:string | null = null;
	ws: WebSocket
	lastPeer:Conv | null
	pingInterval:any
	pongGame: PongGame
	historic: Historic
	friendList:Conv[] = [];
	inQ: number = 0;
	color: string = "green";
	desc: string = "";
	avatar: string = "/default/cara.jpg";
	constructor(_name:string | null)
	{
		this.username = _name;
		this.ws = new WebSocket(`wss://${window.location.hostname}/ws/`);
		this.connect();
		this.lastPeer = this.friendList[0];
		this.pongGame = new PongGame();
		this.pongGame.setWs(this.ws);
		this.historic = new Historic();
	}

	async _waitWs (socket:WebSocket) {
	  const isOpened = () => (socket.readyState === WebSocket.OPEN)

	  if (socket.readyState !== WebSocket.CONNECTING) {
		return isOpened();
	  }
	  else {
		let loops = 0;
		while (socket.readyState === WebSocket.CONNECTING && loops < 200) {
		  await new Promise(resolve => setTimeout(resolve, 500))
		  loops += 1;
		}
		return isOpened();
	  }
	}

	wsSend(obj:any)
	{
		this.ws.send(JSON.stringify(obj));
	}

	setUserName(name: string | null)
	{
		//TODO deconnection!
		if (this.username && name)
			return ;
		this.username = name;
		this.wsSend({type: "user", name:this.username});
	}
	isConnected() {return this.username != null;}

	connect()
	{
		this.ws.onopen  = () => {
			if (this.username)
				this.wsSend({type: "user", name:this.username});
			this.pingInterval = setInterval(() => {
				this.wsSend({type: "ping"});
			}, 1000);
		}
		this.ws.onclose = () => {
			const root = document.getElementById('app')!;
			root.innerHTML = renderWaitScreen();

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
	receiveFriendStatus(msg: any)
	{
		var conv = this._getConv(msg.name);
		if (!conv)
			return ;
		conv.setStatus(msg.status);
		conv.setJoinFlag(0);
		this.reRenderFriendList();
	}
	receiveInvite(msg: any)
	{
		const other = msg.from;
		var conv;
		conv = this._getConv(other);
		if (!conv)
		{
			conv = this._createFriend(other, 1);
			conv.setStatus(1);
		}
		conv.setJoinFlag(1);
		conv.HTMLAddInvite(msg.content);
		this.reRenderFriendList();
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

	receiveEnterQ(flag: number)
	{
		this.inQ = flag;
		this.reRenderFriendList();
	}

	updateColor(color:string)
	{
		if (color == "green" || color == "blue" || color == "red")
		{
			this.color = color;
			const html = document.querySelector('html')!;
			html.setAttribute("data-theme", this.color);
		}
	}
	updateDesc(desc:string)
	{
		this.desc = desc;
	}
	updateAvatar(avatar:string)
	{
		this.avatar = avatar;
	}

	onMsg(message:any)
	{
		const msg = JSON.parse(message.data);
		if (msg.type == "pong")
			return ;
		if (msg.type != "game" || msg.tag != "state")
			console.log(msg);
		switch (msg.type) {
			case 'init':
				this.username = msg.name; //TODO c pas au back de le faire
				this.updateColor(msg.color)
				this.updateDesc(msg.desc)
				break ;
			case 'msg':
				this.receiveMsg(msg);
				break ;
			case 'friendStatus':
				this.receiveFriendStatus(msg);
				break ;
			case 'enterQ':
				this.receiveEnterQ(msg.flag)
				break ;
			case 'omsg':
				this.receiveOMsg(msg);
				break;
			case 'invite':
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

	sendFindGame() { this.wsSend({type: "findGame"}); }
	sendPvAI() { this.wsSend({type: "pvai"}); }
	sendPvP() { this.wsSend({type: "pvp"}); }
	sendCancel() {
		this.wsSend({type: "cancel"});
	}

	sendInvite(conv:Conv)
	{
		this.wsSend({type: "invite", name:conv.penPal,
		content:`${this.username} has invite you`});
		conv.HTMLAddInvite("INVITATION SEND");
		//TODO msgs for types of Q
	}

	sendJoin(conv:Conv) { this.wsSend({type: "join", name: conv.penPal}); }
	createTR() { this.wsSend({type: "createTR"}); }
	startTR() { this.wsSend({type: "startTR"}); }

	addFriend(name:string)
	{
		var log = document.getElementById("log-add-friend");
		//TODO check username regex to block sql injection!
		if (name == this.username) {
			if (log)
				log.innerHTML = "can't be friend with yourself";
			return
		}

		const conv = this._getConv(name);
		if (conv)
		{
			if (log)
				log.innerHTML = "your already friend with him!";
			return ;
		}
		if (log)
			log.innerHTML = "";
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
	HTMLInviteBtn(conv: Conv, inviteBtn: HTMLElement)
	{
		inviteBtn.onclick = () => {
			this.sendInvite(conv);
		}
	}
	HTMLJoinBtn(conv: Conv, joinBtn: HTMLElement)
	{
		joinBtn.onclick = () => {
			this.sendJoin(conv);
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
		if (this.inQ == 1)
			conv.setJoinFlag(0);
		var li = conv.HTMLChoosePeer(this.inQ);
		friendDiv.appendChild(li);

		const chooseBtn = document.getElementById(`choose-peer-${conv.penPal}`);
		const blockBtn = document.getElementById(`block-peer-${conv.penPal}`);
		const inviteBtn = document.getElementById(`invite-peer-${conv.penPal}`);
		const joinBtn = document.getElementById(`join-peer-${conv.penPal}`);
		const profileBtn = document.getElementById(`profile-peer-${conv.penPal}`);
		if (!chooseBtn || !blockBtn || !inviteBtn || !profileBtn ||!joinBtn)
		{
			console.warn("BTN ERROR:", chooseBtn, blockBtn, inviteBtn, profileBtn);
			return ;
		}
		this.HTMLChooseBtn(conv, chatBox, chatHeader, chooseBtn);
		this.HTMLBlockBtn(conv, chatBox, chatHeader, chooseBtn, blockBtn);
		this.HTMLInviteBtn(conv, inviteBtn);
		this.HTMLJoinBtn(conv, joinBtn);
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
