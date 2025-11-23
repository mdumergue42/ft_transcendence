import {HTMLChatListElement, HTMLColorBlocked, HTMLChatMsg} from './HTMLchat.js'

export class Conv
{
	penPal:string
	msgList:string[]
	chatBox:HTMLElement | null
	flag:number
	status:number;
	constructor(_user:string, _flag:number)
	{
		this.penPal = _user;
		this.msgList = [];
		this.chatBox = null;
		this.flag = _flag;
		this.status = 0;
	}

	setStatus(status: number)
	{
		this.status = status;
		//actualisez
	}

	setChatBox(_div:HTMLElement | null)
	{
		this.chatBox = _div;
	}
	toggleBlock(chooseBtn: HTMLElement | null)
	{
		this.flag = 1 - this.flag;
		
		if (chooseBtn)
			HTMLColorBlocked(chooseBtn, 1 - this.flag);
		return this.flag;
	}

	_addMsg(msg:string, flagColor: number)
	{
		this.chatBox?.appendChild(HTMLChatMsg(this.penPal, msg, flagColor));
	}

	HTMLAddInvite()
	{
		this._addMsg("you invitation was send!", 1);
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
		return HTMLChatListElement(this.penPal, 1 - this.flag, this.status);
	}
}

export function Conv__lt__(self:Conv, other:Conv)
{
	if (self.flag != other.flag)
	{
		return other.flag - self.flag;
	}
	return self.penPal.localeCompare(other.penPal);
}
