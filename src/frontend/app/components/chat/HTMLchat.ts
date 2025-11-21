const colorBlock = ["black", "red"];
const colorBGMsg = ["Cornsilk", "CornflowerBlue", "grey"];

export function HTMLColorBlocked(btn: HTMLElement, isBlocked:number)
{
	btn.style.cssText = `color:${colorBlock[isBlocked]}`;
	btn.className = "";
}

export function HTMLChatListElement(name:string, isBlocked:number)
{
	var li = document.createElement('li');
	li.className = "chat-list";

	var btn1 = document.createElement('button');
	btn1.id = `choose-peer-${name}`;
	btn1.innerHTML = `${name}`;
	HTMLColorBlocked(btn1, isBlocked);

	var btn2 = document.createElement('button');
	btn2.id = `invite-peer-${name}`;
	btn2.className = "";
	btn2.innerHTML = `🎮`;

	var btn3 = document.createElement('button');
	btn3.id = `block-peer-${name}`;
	btn3.className = "";
	btn3.innerHTML = `⛔`;

	var btn4 = document.createElement('button');
	btn3.id = `profile-peer-${name}`;
	btn3.className = "";
	btn3.innerHTML = `👤`;

	li.appendChild(btn1);
	li.appendChild(btn2);
	li.appendChild(btn3);
	li.appendChild(btn4);
	return li;
}

export function HTMLChatMsg(name:string, msg:string, flagColor: number)
{
	var colorNb;
	if (flagColor)
		colorNb = 2;
	else
		colorNb = msg.substring(0, name.length) == name;
	//colorNb: 0:je recois le msg 1:j'envoie le msg 2:notif msg

	var newMsg = document.createElement('div');

	newMsg.className = "msg-class";
	newMsg.style.backgroundColor = colorBGMsg[Number(colorNb)];

	newMsg.appendChild(document.createTextNode(msg))
	return newMsg;
}
