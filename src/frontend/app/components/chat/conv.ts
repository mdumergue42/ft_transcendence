const colorBlock = ["red", "black"];
const colorBackGroundMsg = ["Cornsilk", "CornflowerBlue"];

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

	_addMsg(msg:string)
	{
		var newMsg = document.createElement('div');
		newMsg.className = "msg-class";
		newMsg.style.backgroundColor = colorBackGroundMsg[Number(msg.substring(0, this.penPal.length) == this.penPal)];
		newMsg.appendChild(document.createTextNode(msg))
		this.chatBox?.appendChild(newMsg);
	}

	HTMLRenderConv()
	{
		if (this.chatBox == null)
			return ;
		this.chatBox.innerHTML = "";
		for (let msg of this.msgList)
			this._addMsg(msg)
	}

	HTMLAddMsg(msg:string)
	{
		this.msgList.push(msg);
		if (this.chatBox == null)
			return ;
		this._addMsg(msg);
	}

	HTMLChoosePeer()
	{
		var li = document.createElement('li');
		li.className = "chat-list";
		li.innerHTML = `
		<button class="choose-peer" id="choose-peer-${this.penPal}" style="color:${colorBlock[this.flag]}">${this.penPal}</button>
		<button class="invite-btn">🎮 </button>
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
