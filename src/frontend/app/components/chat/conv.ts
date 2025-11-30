import {HTMLChatListElement, HTMLColorBlocked, HTMLChatMsg} from './HTMLchat.js'

export class Conv
{
	penPal:string
	flag:number
	msgList:{msg:string, flag:number}[] = [];
	chatBox:HTMLElement | null = null;
	status:number = 0;
	joinFlag:number = 0;
	constructor(_user:string, _flag:number)
	{
		this.penPal = _user;
		this.flag = _flag;
	}

	setStatus(status: number) { this.status = status; }
	setJoinFlag(flag: number) { this.joinFlag = flag; }
	setChatBox(_div:HTMLElement | null) { this.chatBox = _div; }

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

	HTMLAddInvite(msg:string)
	{
		this.msgList.push({msg:msg, flag:1});
		this._addMsg(msg, 1);
	}

	HTMLRenderConv()
	{
		if (this.chatBox == null)
			return ;
		this.chatBox.innerHTML = "";
		for (let msg of this.msgList)
			this._addMsg(msg.msg, msg.flag);
	}

	HTMLAddMsg(msg:string)
	{
		this.msgList.push({msg:msg, flag:0});
		this._addMsg(msg, 0);
	}

	HTMLChoosePeer(inQFlag: number)
	{
		return HTMLChatListElement(this.penPal, 1 - this.flag, this.status, this.joinFlag, inQFlag);
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
