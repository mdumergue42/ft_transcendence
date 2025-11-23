import WebSocket, {WebSocketServer} from 'ws';
import {FastifyInstance} from 'fastify';
import {Client} from './client.js';
import {ARoom} from './Aroom.js';
import {MMRoom} from './MMroom.js';
import {TRoom} from './Troom.js';
import {getIdByName, getNameById, getFlagFriendShip, getHistoricById, getAvatarByName ,insertUser, insertMatchs, insertMsg, insertFriend, updateFlagFriend, getCountFriend} from './sqlGet.js'


interface Dictionary<T> {
    [Key: string]: T;
}


class WsServ
{
	server: WebSocketServer
	WaintingClients: Client[] = [];
	ConnectedClients: Record<number, Client> ={};

	rooms: Record<number, ARoom> = {};
	roomsIds: number = 1;
	db: any //need to find type!!!
	constructor(_port:number, SQLserver: FastifyInstance)
	{
		this.server = new WebSocketServer({ port: _port});

		this.server.on('connection', (socket:WebSocket) => {
			this.connection(socket);
			socket.on('message', (message:any) => this.msg(message, socket));
			socket.on('close', () => this.deco(socket));
		});

		this.db = SQLserver.db;
		this.tmp() //TODO retirer car c sencer etre automatique!
	}

	async tmp()
	{
		await insertUser('bastien','a@mail.com','123', this.db);
		await insertUser('gaby','c@mail.com','123', this.db);
		await insertUser('maelys','d@mail.com','123', this.db);
		await insertUser('youenn','b@mail.com','123', this.db);

		const idB = await getIdByName('bastien', this.db);
		const idM = await getIdByName('maelys', this.db);

		await insertMatchs("test",idB, idM,1,0, this.db);
		await insertMatchs("pvp",idB, idM,10,8, this.db);
		await insertMatchs("ia",idB, idM,6,9, this.db);
		await insertMatchs("pvp",idB, idM,2,6, this.db);
	}

	connection(socket:WebSocket)
	{
		console.log('Client connected');
		this.WaintingClients.push(new Client(socket));
	}

	getClientWS(socket:WebSocket)
	{
		for (let indx in this.ConnectedClients)
		{
			let client = this.ConnectedClients[indx];
			if (client.socket == socket)
			{
				return client;
			}
		}
		for (let client of this.WaintingClients)
		{
			if (client.socket == socket)
				return client;
		}
		return null;
	}
	getClientN(id: number)
	{
		var c = this.ConnectedClients[id];
		return c;
	}
	getClientS(name:string)
	{
		for (let indx in this.ConnectedClients)
		{
			let client = this.ConnectedClients[indx];
			if (client.username == name)
				return client;
		}
		return null;
	}

	deco(socket:WebSocket)
	{
		console.log('Client disconnected')
		for (let index in this.ConnectedClients)
		{
			const client = this.ConnectedClients[index];
			if (client.socket == socket)
			{
				for (let x in this.ConnectedClients)
				{
					const friend = this.ConnectedClients[x];
					if (friend.isFriend(client))
						friend.send({type:"friendCo", name:client.username, status: 0});
				}

				delete this.ConnectedClients[index];
				return ;
			}
		}
		for (let index in this.WaintingClients)
		{
			if (this.WaintingClients[index].socket == socket)
			{
				this.WaintingClients.splice(Number(index), 1);
				return ;
			}
		}
	}

	moveArrayClient(client: Client)
	{
		for (let index in this.WaintingClients)
		{
			if (this.WaintingClients[index] == client)
			{
				this.WaintingClients.splice(Number(index), 1);
				break ;
			}
		}
		this.ConnectedClients[client.id] = client;
	}

	isOnline(name: string)
	{
		return Number((this.getClientS(name) != null));
	}

	msg(message:any, socket:WebSocket)
	{
		const msg = JSON.parse(message);

		if (msg.type == "ping")
		{
			socket.send(JSON.stringify({type: "pong"}));
			return ;
		}
		var c = this.getClientWS(socket);
		if (c)
			this.parsing(msg, c);
		else
			console.log("ALERTE LA");
	}

	async parsing(msg:any, client:Client)
	{
		var type = msg.type;
		var arg;

		switch (type) {
			case 'user':
			{
				arg = msg.name;
				if (!arg) //C pas au back de le faire!
				{
					var x = ["bastien", "gaby", "maelys", "youenn"];
					var y = 0;
					for (let k = 0; k < 4; k++) {
						if (!this.ConnectedClients[k + 1]) {
							y = k;
							break;
						}
					}
					arg = x[y];
					console.log("GETNAME:", arg, y)
					client.send({type: "init", name: arg})
				}
				await client.user(arg, this.db);
				await client.sendFriendList(this.ConnectedClients);
				this.moveArrayClient(client);
				break;
			}
			case 'msg':
				this.sendTo(msg.content, msg.name, client);
				break;
			case 'add':
				this.addFriend(msg.name, client);
				break;
			case 'block':
				this.block(client, msg.name, msg.flag)
				break;
			case 'invite':
				break;
			case 'roomCreate':
				this.createRoom(client);
				break;
			case 'roomAddPlayer':
				break;
			case 'roomAddBot':
				break;
			case 'roomKickPlayer':
				break;
			case 'roomJoin':
				break;
			case 'gameInput':
				this.rooms[client.roomId!].gameInput(client, msg);
				break;
			case 'findGame':
				this.findGame(client);
				break;
			case 'getHistoric':
				this.getHistoric(client, msg.name, msg.flag);
			default:
				break;
		}
	}

	createRoom(client: Client)
	{
		var GameRoom = new TRoom(this.roomsIds, 1, this.db);
		this.rooms[this.roomsIds] = GameRoom;
		this.roomsIds += 1;
		GameRoom.addPlayer(client, client.username);
		client.setRoomId(GameRoom.id);
	}

	findGame(client: Client)
	{
		//TODO destroy rooms after using it!!  avec delete rooms[id]
		//ATTENTION ID = index -> va causer de lourd degat!
		//faire un dico ig?
		var GameRoom;
		find : {
			for (let k in this.rooms)
			{
				var room = this.rooms[k];
				if (room.isOpenForMM() == 0)
					continue ;
				GameRoom = room;
				break find;
			}
			GameRoom = new MMRoom(this.roomsIds, 0, this.db);
			this.rooms[this.roomsIds] = GameRoom;
			this.roomsIds += 1;
		}
		GameRoom.addPlayer(client, client.username);
		client.setRoomId(GameRoom.id);
	}

	async getHistoric(client: Client, name:string, flag:any)
	{
		const id = await getIdByName(name, this.db);
		if (id == undefined)
		{
			client.send({type: "historic", error: "noUser", avatar: "default/404.png"});
			return ;
		}

		const games = await getHistoricById(id, this.db, flag);
		if (games != undefined)
		{
			for (let game of games)
			{
				const p1_name = await getNameById(game.id_p1, this.db);
				var p2_name;
				if (game.id_p2)
					p2_name = await getNameById(game.id_p2, this.db);
				else
					p2_name = "-";
				client.send({type: "historic", matchName: game.match_type, p1: p1_name, p2: p2_name, s1: game.score_p1, s2: game.score_p2, date: game.date});
			}
		}

		var avatar = await getAvatarByName(name, this.db);
		if (avatar == undefined)
			avatar = "default/404.png";
		client.send({type: "historic", error: "endDb", isOnline: this.isOnline(name), avatar: avatar});
	}

	async block(client: Client, name:string, flag:number)
	{
		const id = await getIdByName(name, this.db);
		if (id == undefined)
			return ;

		const nb = await getCountFriend(client.id, id, this.db);
		if (nb == undefined)
			return ;

		if (nb != 0)
			await updateFlagFriend(client.id, id, flag, this.db)
		else
			await insertFriend(client.id, id, flag, this.db);
		client.blockFriend(id, flag);
	}

	async addFriend(name:string, from:Client)
	{
		const id = await getIdByName(name, this.db);
		if (id == undefined)
		{
			from.send({type: "add", name: name, error: "noUser"});
			return ;
		}
		else
		{
			var status = this.isOnline(name);
			from.send({type: "add", name: name, status: status});
		}

		const nb = await getCountFriend(from.id, id, this.db);
		if (nb == undefined)
			return ;
		if (nb == 0)
			await insertFriend(from.id, id, 1, this.db);
		from.addFriend(name, id, 1);

	}

	async sendTo(message:string, to:string, from:Client)
	{
		const id = await getIdByName(to, this.db);
		if (id == undefined)
			return ;

		const nb = await getCountFriend(id, from.id, this.db);
		if (nb == undefined)
			return ;
		if (nb == 0 && id != from.id) //TODO suppr c pour les tests; tu peux pas etre amis avec toi meme
			await insertFriend(id, from.id, 1, this.db);

		await insertMsg(message, from.id, id, this.db);

		const flag = await getFlagFriendShip(from.id, id, this.db);
		if (flag == undefined)
			return ;

		var pal = this.getClientN(id);
		if (pal && flag == 1)
			pal.sendMsg(message, from);
		return ;
	}
}

export function WSServInit(port:number, server:FastifyInstance)
{
	const serv = new WsServ(8080, server);
}
