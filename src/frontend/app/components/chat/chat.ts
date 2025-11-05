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
		this.ws = new WebSocket(`ws://localhost:${this.port}`);
		this.connect();
		this.friendList = [new Conv("bastien"), new Conv("gaby"), new Conv("maelys")];
		this.lastPeer = this.friendList[0];
	}

	connect()
	{
		//TODO WSS
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

	//pour le moment <pre> peut changer + tard
	onMsg(event:MessageEvent)
	{
		const message = event.data;

		const [type, arg, ...X] = message.split('+');
		const content = X.join('+');

		switch (type) {
			case 'msg':
				for (let friend of this.friendList)
				{
					if (friend.penPal == arg)
						friend.addMsg(`${arg}: ${content}`);
				}
				break ;
			case 'invited':
				return `${arg}: invited you to room ${content}`
			//todo interactiv!
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
				friend.addMsg(`You: ${content}`);
		}
	}
}
