import {WebSocket} from 'ws';
import {getIdByName, getNameById, getAllMsg, getAllFriends} from './sqlGet.js'

export class Client
{
	socket: WebSocket
	username: string = "TBD"
	id: number = 0;
	friendList: {id:number, flag:number, name:string}[] = [];
	inviteList: number[] = [];
	roomId: number | null = null;
	inQ: number = 0;
	constructor(_socket:WebSocket)
	{
		this.socket = _socket;
	}
	send(obj:any)
	{
		this.socket.send(JSON.stringify(obj));
	}

	async user(name: string, db:any)
	{
		this.username = name;
		this.id = await getIdByName(name, db);
		await this.userGetFriends(db);
		await this.userGetMsg(db);
	}

	async userGetFriends(db:any)
	{
		const friends = await getAllFriends(this.id, db);
		for (let friend of friends)
			this.addFriend(friend.username, friend.id, friend.flag);
	}
	async userGetMsg(db: any)
	{
		const msgs = await getAllMsg(this.id, db);
		for (let msg of msgs)
		{
			await this.sendOldMsg(msg.msg, msg.id_from, msg.id_to);
		}
		this.send({type:"endDb"});
	}

	sendFriendList(clients: Record<number, Client>)
	{
		var clientConnected = function(name:string, clients:Record<number, Client>) {
			for (let i in clients) {
				if (clients[i].username == name)
					return clients[i];
			}
			return null;
		}
		for (let fr of this.friendList)
		{
			const client = clientConnected(fr.name, clients);
			this.send({type: "friendList", flag:fr.flag,
					  name: fr.name, status: Number(client != null)});
		}
		this.send({type:"endDb"});

		for (let i in clients)
		{
			const client = clients[i];
			if (client.isFriend(this))
				client.send({type: "friendStatus", name:this.username, status: 1});
		}
	}

	isFriend(client: Client)
	{
		for (let fr of this.friendList)
		{
			if (fr.id == client.id)
				return 1;
		}
		return 0;
	}
	addFriend(name: string, id:number, flag:number)
	{
		for (let fr of this.friendList)
		{
			if (fr.id == id)
				return ;
		}
		this.friendList.push({id:id, flag:flag, name:name});
	}
	blockFriend(id: number, flag:number)
	{
		for (let fr of this.friendList)
		{
			if (fr.id == id)
			{
				fr.flag = flag;
				return ;
			}
		}
	}

	sendMsg(message:string, from:Client)
	{
		this.send({type: "msg", from: from.username, to:this.username, content: message});
	}

	async sendOldMsg(message:string, id_from:number, id_to:number)
	{
		var get_name = (id:number) => {
			for (let fr of this.friendList)
			{
				if (fr.id == id)
					return fr;
			}
			return {id:-1, flag:-1, name:"no"};
		}
		var fr;
		var from, to, flag;
		if (id_from == this.id)
		{
			from = this.username;
			fr = get_name(id_to);
			flag = fr.flag;
			to = fr.name;
		}
		else
		{
			to = this.username;
			fr = get_name(id_from);
			flag = fr.flag;
			from = fr.name;
		}
		if (flag == 1)
			this.send({type: "msg", from: from, to:to, content: message});
	}

	setRoomId(id: number | null) {
		this.roomId = id;
	}
	setinQ(v: number) {this.inQ = v;}

	addInviteList(id: number) {
		this.inviteList.push(id);
	}
	delInviteList(id: number) {
		for (let index in this.inviteList) {
			if (this.inviteList[index] == id) {
				this.inviteList.splice(Number(index), 1);
				return ;
			}
		}
	}
	resetInviteList() {this.inviteList = [];}
	getInviteList() {return this.inviteList;}
}
