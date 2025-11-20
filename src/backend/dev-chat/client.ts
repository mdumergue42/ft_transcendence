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

		/*console.log("USER IS LOGIN; friendList:", this.friendList);
		await db.each(`SELECT id_friend,id_self FROM friends`, (err:any, row:any) => {console.log("RS:", row)});*/
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

		await db.each(`SELECT msg,id_from,id_to FROM msgs WHERE id_from = ? OR id_to = ? ORDER BY date`, [this.id, this.id ], async (err:any, row:any) => {
			await this.sendOldMsg(row.msg, row.id_from, row.id_to);
		});


		this.sendBlockedList();
		this.socket.send(`endDb+x+x+end of stored msg`);
	}

	sendBlockedList()
	{
		for (let fr of this.friendList)
		{
			if (fr[1] == 0)
				this.socket.send(`blocked+${fr[2]}+x+x`);
		}
	}

	send(message:string, from:Client)
	{
		this.socket.send(`msg+${from.username}+${this.username}+${message}`)
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
			this.socket.send(`msg+${from}+${to}+${message}`);
	}

	setRoomId(id: number | null)
	{
		this.roomId = id;
	}
}
