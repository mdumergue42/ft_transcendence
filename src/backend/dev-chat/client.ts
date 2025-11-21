import {WebSocket} from 'ws';
import {getIdByName, getNameById} from './sqlGet.js'

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
		console.log("this.username:", this.username);

		this.id = await getIdByName(name, db);

		await db.each(`SELECT friends.id_friend, friends.flag, users.username FROM friends JOIN users ON users.id_user = friends.id_friend WHERE id_self = ?`, [this.id], (err:any, row:any) =>
		{
			this.friendList.push([row.id_friend, row.flag, row.username]);
		});
		//TODO prepare SQL

		await db.each(`SELECT msg,id_from,id_to FROM msgs WHERE id_from = ? OR id_to = ? ORDER BY date`, [this.id, this.id ], async (err:any, row:any) => {
			await this.sendOldMsg(row.msg, row.id_from, row.id_to);
		});


		this.sendBlockedList();
		this.send({type:"endDb"});
	}

	sendBlockedList()
	{
		for (let fr of this.friendList)
		{
			if (fr[1] == 0)
				this.send({type: "blocked", name: fr[2]});
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
