var ws : WebSocket;

export class Conv
{
	penPal:string
	msgList:string[]
	chatBox:HTMLDivElement | null
	constructor(_user:string)
	{
		this.penPal = _user;
		this.msgList = [];
		this.chatBox = null;
	}

	reRenderConv()
	{
		if (this.chatBox == null)
			return ;
		this.chatBox.innerHTML = "";
		for (let msg of this.msgList)
		{
			var newMsg = document.createElement('div');
			newMsg.className = "msg-class";
			newMsg.appendChild(document.createTextNode(msg))
			this.chatBox.appendChild(newMsg);
		}
	}

	setChatBox(_div:HTMLDivElement | null)
	{
		this.chatBox = _div;
	}

	addMsg(msg:string)
	{
		this.msgList.push(msg);
		if (this.chatBox == null)
			return ;
		var newMsg = document.createElement('div');
		newMsg.className = "msg-class";
		const newContent = document.createTextNode(msg);
		newMsg.appendChild(newContent);
		this.chatBox.appendChild(newMsg);
	}

	friendDiv()
	{
		var li = document.createElement('li');
		li.className = "chat-list";
		li.innerHTML = `
		<button class="choose-peer" id="choose-peer-${this.penPal}">${this.penPal}</button>
		<button class="invite-btn">🎮 </button>
		<button class="block-btn">⛔ </button>
		`
		return li;
	}
}

export class ChatUser
{
	username:string
	port:number
	ws: WebSocket
	friendList:Conv[]
	lastPeer:Conv | null
	constructor(_name:string, _port:number)
	{
		this.username = _name;
		this.port = _port;
		//TODO WSS
		this.ws = new WebSocket(`ws://localhost:${this.port}`);
		this.connect();
		this.friendList = [];
		this.lastPeer = this.friendList[0];
	}

	connect()
	{
		this.ws.onopen  = () => 
		{
			this.ws.send(`user+${this.username}+user`);
		}
		this.ws.onclose = () =>
		{
			console.log("disocnneted\n");
		}
		this.ws.onmessage = (event) => this.onMsg(event);
	}

	receiveMsg(arg1:string, arg2:string, content:string)
	{
		find : {
			const other = (arg1 != this.username) ? arg1 : arg2;
			for (let friend of this.friendList)
			{
				if (friend.penPal == other)
				{
					friend.addMsg(`${arg1}: ${content}`);
					break find;
				}
			}
			const nc = new Conv(other)
			this.friendList.push(nc);
			nc.addMsg(`${arg1}: ${content}`);
		}
	}

	receiveInvite(arg:string, room:string)
	{
		console.log(`${arg} invited you to room ${room}`);
	}

	onMsg(event:MessageEvent)
	{
		const message = event.data;

		const [type, arg1, arg2, ...X] = message.split('+');
		const content = X.join('+');

		switch (type) {
			case 'msg':
				this.receiveMsg(arg1, arg2, content);
				break ;
			case 'invited':
				this.receiveInvite(arg1, content);
				break ;
			case 'endDb':
				this.reRenderFriendList();
				break
			case 'add':
				this.addAccepted(arg1, arg2);

			default:
				break;
		}
	}

	sendMsg(penPal:string, content:string)
	{
		this.ws.send(`msg+${penPal}+${content}`)
		for (let friend of this.friendList)
		{
			if (friend.penPal == penPal)
				friend.addMsg(`${this.username}: ${content}`);
		}
	}

	addFriend(name:string)
	{
		//TODO refuse yourself
		var log = document.getElementById("log-add-friend");
		for (let friend of this.friendList)
		{
			if (friend.penPal == name)
			{
				if (log)
					log.innerHTML = "your already friend with him!";
				return ;
			}
		}
		this.ws.send(`add+${name}+its cool to have friend`);
		if (log)
			log.innerHTML = "searching"
	}
	addAccepted(name:string, arg:string)
	{
		var log = document.getElementById("log-add-friend");

		receiveEnd : {
			if (arg == "no")
			{
				for (let friend of this.friendList)
				{
					if (friend.penPal == name)
						return ;
				}
				if (log)
					log.innerHTML = "user doesn't exist";
				return ;
			}
		};

		this.friendList.push(new Conv(name));
		if (log)
			log.innerHTML = "accpeted";
		this.reRenderFriendList();
	}

	reRenderFriendList()
	{
		var friendDiv = document.getElementById("friends-list");
		if (friendDiv == null)
			return ;

		var chatBox = <HTMLDivElement>document.getElementById("chat-box");
		var chatHeader = document.getElementById("chat-header");
		friendDiv.innerHTML = "";
		for (let fr of this.friendList)
		{
			var ele = fr.friendDiv();
			friendDiv.appendChild(ele);
			const btn = document.getElementById(`choose-peer-${fr.penPal}`);
			if (!btn)
				continue ;
			btn.onclick = () => {
				fr.setChatBox(chatBox);
				this.lastPeer?.setChatBox(null);
				this.lastPeer = fr;
				fr.reRenderConv();
				if (chatHeader)
					chatHeader.textContent = fr.penPal;
			}
		}
	}
}
