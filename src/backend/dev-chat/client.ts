import {WebSocket} from 'ws';
import {getIdByName, getNameById, getAllMsg, getAllFriends} from './sqlGet.js'

export class Client
{
	socket: WebSocket
	username: string
	id: number
	friendList: [number, number, string][]
	roomId: number | null
	constructor(_socket:WebSocket)
	{
		this.socket = _socket;
		this.username = "TBD";
		this.id = 0
		this.friendList = [];
		this.roomId = null;

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
			const client = clientConnected(fr[2], clients);
			this.send({type: "friendList", flag:fr[1],
					  name: fr[2], status: Number(client != null)});
		}
		this.send({type:"endDb"});

		for (let i in clients)
		{
			const client = clients[i];
			if (client.isFriend(this))
				client.send({type: "friendCo", name:this.username, status: 1});
		}
	}

	isFriend(client: Client)
	{
		for (let fr of this.friendList)
		{
			if (fr[0] == client.id)
				return 1;
		}
		return 0;
	}
	addFriend(name: string, id:number, flag:number)
	{
		for (let fr of this.friendList)
		{
			if (fr[0] == id)
				return ;
		}
		this.friendList.push([id, flag, name]);
	}
	blockFriend(id: number, flag:number)
	{
		for (let fr of this.friendList)
		{
			if (fr[0] == id)
			{
				fr[1] = flag;
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
				if (fr[0] == id)
					return fr;
			}
			return [-1, -1, "no"];
		}
		var from, to, _, flag;
		if (id_from == this.id)
		{
			from = this.username;
			[_,flag,to] = get_name(id_to);
		}
		else
		{
			to = this.username;
			[_,flag,from] = get_name(id_from);
		}
		if (flag == 1)
			this.send({type: "msg", from: from, to:to, content: message});
	}

	setRoomId(id: number | null)
	{
		this.roomId = id;
	}
}
