const colorBlock = ["red", "black"];
const colorBGMsg = ["Cornsilk", "CornflowerBlue", "grey"];

export class Conv
{
	penPal:string
	msgList:string[]
	chatBox:HTMLElement | null
	flag:number
	constructor(_user:string, _flag:number)
	{
		this.penPal = _user;
		this.msgList = [];
		this.chatBox = null;
		this.flag = _flag;
	}

	setChatBox(_div:HTMLElement | null)
	{
		this.chatBox = _div;
	}
	toggleBlock(chooseBtn: HTMLElement | null)
	{
		this.flag = 1 - this.flag;
		
		if (chooseBtn)
		{
			chooseBtn.style.color = colorBlock[this.flag];
		}
		return this.flag;
	}

	_addMsg(msg:string, flagColor: number)
	{
		var colorNb;
		var newMsg = document.createElement('div');
		newMsg.className = "msg-class";
		if (flagColor)
			colorNb = 2;
		else
			colorNb = msg.substring(0, this.penPal.length) == this.penPal;
		newMsg.style.backgroundColor = colorBGMsg[Number(colorNb)];
		newMsg.appendChild(document.createTextNode(msg))
		this.chatBox?.appendChild(newMsg);
	}

	HTMLAddInvite()
	{
		this._addMsg("you invatation was send!", 1);
	}

	HTMLRenderConv()
	{
		if (this.chatBox == null)
			return ;
		this.chatBox.innerHTML = "";
		for (let msg of this.msgList)
			this._addMsg(msg, 0)
	}

	HTMLAddMsg(msg:string)
	{
		this.msgList.push(msg);
		if (this.chatBox == null)
			return ;
		this._addMsg(msg, 0);
	}

	HTMLChoosePeer()
	{
		var li = document.createElement('li');
		li.className = "chat-list";
		li.innerHTML = `
		<button class="choose-peer" id="choose-peer-${this.penPal}" style="color:${colorBlock[this.flag]}">${this.penPal}</button>
		<button class="invite-btn" id="invite-peer-${this.penPal}">🎮 </button>
		<button class="block-btn" id="block-peer-${this.penPal}">⛔ </button>
		`
		return li;
	}
}

export function Conv__lt__(self:Conv, other:Conv)
{
	console.log(self, other);
	if (self.flag != other.flag)
	{
		return other.flag - self.flag;
	}
	return self.penPal.localeCompare(other.penPal);
}
