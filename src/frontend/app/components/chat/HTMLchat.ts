const colorBlock = ["black", "red"];
const colorBGMsg = ["Cornsilk", "CornflowerBlue", "grey"];

export function HTMLColorBlocked(btn: HTMLElement, isBlocked: number)
{
    if (isBlocked)
	{
        btn.classList.add('text-red-500', 'line-through', 'opacity-50');
        btn.classList.remove('PText');
    }
	else
	{
        btn.classList.remove('text-red-500', 'line-through', 'opacity-50');
        btn.classList.add('PText');
    }
}

export function HTMLChatListElement(name: string, isBlocked: number, status: number = 0, joinFlag: number = 0, inQFlag: number) {
    const li = document.createElement('li');
    li.className = "chat-list flex items-center justify-between p-2 border-b PDarkBorder PDarkBoxHover transition-colors group";

    const btn0 = document.createElement('button');
    btn0.id = `choose-peer-${name}`;
    btn0.className = "flex-1 flex items-center gap-2 text-left font-mono text-sm truncate transition-all group-hover:translate-x-1";
    
    const statusDot = document.createElement('span');
    if (status)
        statusDot.className = "w-2 h-2 rounded-full PBoxBg shadow-[0_0_5px_rgba(22,163,74,0.8)]";
    else
    	statusDot.className = "w-2 h-2 rounded-full border PBorder bg-transparent opacity-50";

    
    const nameSpan = document.createElement('span');
    nameSpan.textContent = `> ${name}`;

    btn0.appendChild(statusDot);
    btn0.appendChild(nameSpan);
	HTMLColorBlocked(btn0, isBlocked);

    const actionDiv = document.createElement('div');
    actionDiv.className = "flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity";

    const btn1 = document.createElement('button');
    btn1.id = `join-peer-${name}`;
    btn1.className = "PText hover:text-white hover:scale-110 transition-transform px-1";
    btn1.innerHTML = `➜]`;
    btn1.title = "Join";
    if (joinFlag % 2 == 1 && inQFlag == 0)
		btn1.style.visibility = "visible";
	else 
		btn1.style.visibility = "hidden";

    const btn2 = document.createElement('button');
    btn2.id = `invite-peer-${name}`;
    btn2.className = "PText hover:text-white hover:scale-110 transition-transform px-1";
    btn2.innerHTML = `🎮`;
    btn2.title = "Inviter";
    if (status === 1 && inQFlag != 1)
		btn2.style.visibility = "visible";
	else 
		btn2.style.visibility = "hidden";

    const btn3 = document.createElement('button');
    btn3.id = `block-peer-${name}`;
    btn3.className = "text-red-500 hover:text-red-300 hover:scale-110 transition-transform px-1";
    btn3.innerHTML = `⛔`;
    btn3.title = "Bloquer";

    const btn4 = document.createElement('button');
    btn4.id = `profile-peer-${name}`;
    btn4.className = "text-blue-400 hover:text-blue-200 hover:scale-110 transition-transform px-1";
    btn4.innerHTML = `👤`;
    btn4.title = "Profil";

    actionDiv.appendChild(btn1);
    actionDiv.appendChild(btn2);
    actionDiv.appendChild(btn4);
    actionDiv.appendChild(btn3);

    li.appendChild(btn0);
    li.appendChild(actionDiv);
    
    return li;
}

export function HTMLChatMsg(name: string, msg: string, flagColor: number)
{
    const newMsg = document.createElement('div');
    const content = document.createTextNode(msg);

    let colorNb;
    if (flagColor)
        colorNb = 2;
    else
        colorNb = msg.substring(0, name.length) == name;

    let baseClass = "p-2 rounded text-xs font-mono break-words max-w-[85%] mb-1 shadow-sm";

    if (colorNb === 2)
        newMsg.className = "text-center text-[10px] PText italic my-2 w-full border-t border-b PDarkBox py-1";
    else if (colorNb)
		newMsg.className = `${baseClass} mr-auto border PBoxBorder PText rounded-bl-none`;
    else
		newMsg.className = `${baseClass} ml-auto PBoxBg text-black rounded-br-none`;

    newMsg.appendChild(content);
    return newMsg;
}
