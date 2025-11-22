const colorBlock = ["black", "red"];
const colorBGMsg = ["Cornsilk", "CornflowerBlue", "grey"];

export function HTMLColorBlocked(btn: HTMLElement, isBlocked: number)
{
    if (isBlocked)
	{
        btn.classList.add('text-red-500', 'line-through', 'opacity-50');
        btn.classList.remove('text-green-400');
    }
	else
	{
        btn.classList.remove('text-red-500', 'line-through', 'opacity-50');
        btn.classList.add('text-green-400');
    }
}

export function HTMLChatListElement(name: string, isBlocked: number, status: number = 0) {
    const li = document.createElement('li');
    li.className = "chat-list flex items-center justify-between p-2 border-b border-green-900/50 hover:bg-green-900/20 transition-colors group";

    const btn1 = document.createElement('button');
    btn1.id = `choose-peer-${name}`;
    btn1.className = "flex-1 flex items-center gap-2 text-left font-mono text-sm truncate transition-all group-hover:translate-x-1";
    
    const statusDot = document.createElement('span');
    if (status === 1)
        statusDot.className = "w-2 h-2 rounded-full bg-green-600 shadow-[0_0_5px_rgba(22,163,74,0.8)]";
    else
    	statusDot.className = "w-2 h-2 rounded-full border border-green-600 bg-transparent opacity-50";

    
    const nameSpan = document.createElement('span');
    nameSpan.textContent = `> ${name}`;

    btn1.appendChild(statusDot);
    btn1.appendChild(nameSpan);
	HTMLColorBlocked(btn1, isBlocked);

    const actionDiv = document.createElement('div');
    actionDiv.className = "flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity";

    const btn2 = document.createElement('button');
    btn2.id = `invite-peer-${name}`;
    btn2.className = "text-green-400 hover:text-white hover:scale-110 transition-transform px-1";
    btn2.innerHTML = `🎮`;
    btn2.title = "Inviter";

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

    actionDiv.appendChild(btn2);
    actionDiv.appendChild(btn4);
    actionDiv.appendChild(btn3);

    li.appendChild(btn1);
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
        newMsg.className = "text-center text-[10px] text-green-600/70 italic my-2 w-full border-t border-b border-green-900/30 py-1";
    else if (colorNb)
        newMsg.className = `${baseClass} ml-auto bg-green-600 text-black rounded-br-none`;
    else
        newMsg.className = `${baseClass} mr-auto bg-black border border-green-600 text-green-400 rounded-bl-none`;

    newMsg.appendChild(content);
    return newMsg;
}
