import WebSocket, {WebSocketServer} from 'ws';
import {FastifyInstance} from 'fastify';
import {Client} from './client.js';
import {ARoom} from './Aroom.js';
import {MMRoom} from './MMroom.js';
import {getIdByName, getNameById, getFlagFriendShip, getHistoricById, getAvatarByName, getDescByName ,insertUser, insertMatchs, insertMsg, insertFriend, updateFlagFriend, getCountFriend} from './sqlGet.js'


interface Dictionary<T> {
    [Key: string]: T;
}


class WsServ
{
	server: WebSocketServer
	WaintingClients: Client[] = [];
	connectedClients: Record<number, Client> ={};

	rooms: Record<number, ARoom> = {};
	roomIds: number = 1;
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
		for (let indx in this.connectedClients) {
			let client = this.connectedClients[indx];
			if (client.socket == socket)
				return client;
		}
		for (let client of this.WaintingClients) {
			if (client.socket == socket)
				return client;
		}
		return null;
	}
	getClientN(id: number)
	{
		var c = this.connectedClients[id];
		return c;
	}
	getClientS(name:string)
	{
		for (let indx in this.connectedClients) {
			let client = this.connectedClients[indx];
			if (client.username == name)
				return client;
		}
		return null;
	}

	friendStatusUp(client:Client, status:number)
	{
		for (let x in this.connectedClients) {
			const friend = this.connectedClients[x];
			if (friend.isFriend(client)) {
				friend.send({type:"friendStatus", name:client.username, status: status});
			}
		}
	}

	deco(socket:WebSocket)
	{
		for (let index in this.connectedClients) {
			const client = this.connectedClients[index];
			if (client.socket == socket)
			{
				delete this.connectedClients[index];
				this.friendStatusUp(client, 0);
				if (client.roomId) {
					if (this.rooms[client.roomId].inGame == 0)
						this.rooms[client.roomId].ff(client);
				}
				return ;
			}
		}
		for (let index in this.WaintingClients) {
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
		this.connectedClients[client.id] = client;
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

	async user(msg:any, client:Client)
	{
		var arg;
		arg = msg.name;
		if (arg == "TD") //C pas au back de le faire!
		{
			var x = ["bastien", "gaby", "maelys", "youenn"];
			var y = 0;
			for (let k = 0; k < 4; k++) {
				if (!this.connectedClients[k + 1]) {
					y = k;
					break;
				}
			}
			arg = x[y];
			console.log("GETNAME:", arg, y)
			client.send({type: "init", name: arg})
		}
		if (!arg)
		{
		//TODO => DECONNECTION
			return ;
		}
		await client.user(arg, this.db);
		await client.sendFriendList(this.connectedClients);
		this.moveArrayClient(client);

		for (let roomIndx in this.rooms)
		{
			const room = this.rooms[roomIndx];
			if (room.inGame != 1)
				continue ;
			if (room.reconnect(client))
			{
				client.setRoomId(room.id);
				break ;
			}
		}
	}

	parsing(msg:any, client:Client)
	{
		var type = msg.type;

		switch (type) {
			case 'user':
				this.user(msg, client);
				break;
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
				this.invite(client, msg.content, msg.name);
				break;
			case 'join':
				this.join(client, msg.name);
				break;
			case 'createTR':
				this.createTR(client);
				break;
			case 'startTR':
				this.startTR(client);
				break;
			case 'gameInput':
				this.rooms[client.roomId!].gameInput(client, msg);
				break;
			case 'findGame':
				this.findGame(client);
				break;
			case 'pvp':
				this.pvp(client);
				break ;
			case 'pvai':
				this.pvai(client);
				break ;
			case 'cancel':
				this.cancelGame(client);
				break; 
			case 'getHistoric':
				this.getHistoric(client, msg.name, msg.flag);
			default:
				break;
		}
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
				if (game.id_p2 && game.id_p2 != -1)
					p2_name = await getNameById(game.id_p2, this.db);
				else
					p2_name = "CP";
				client.send({type: "historic", matchName: game.match_type, p1: p1_name, p2: p2_name, s1: game.score_p1, s2: game.score_p2, date: game.date});
			}
		}

		var avatar = await getAvatarByName(name, this.db);
		if (avatar == undefined || !avatar)
			avatar = "default/404.png";
		var desc = await getDescByName(name, this.db);
		if (desc == undefined)
			desc = "";
		client.send({type: "historic", error: "endDb", isOnline: this.isOnline(name), avatar: avatar, desc: desc});
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
		const c = this.getClientN(id);
		from.addFriend(name, id, c ? c.inQ : 0);

	}

	async _getFlagMsg(idTo: number, idFrom: number)
	{
		const nb = await getCountFriend(idTo, idFrom, this.db);
		if (nb == undefined)
			return null;

		var wasNotFriendWithYou = 0;
		if (nb == 0) {
			await insertFriend(idTo, idFrom, 1, this.db);
			wasNotFriendWithYou = 1;
		}

		const flag = await getFlagFriendShip(idFrom, idTo, this.db);
		if (flag == undefined)
			return null;
		return [flag, wasNotFriendWithYou];
	}

	async sendTo(message:string, to:string, client:Client)
	{
		const id = await getIdByName(to, this.db);
		if (id == undefined)
			return ;

		const flags = await this._getFlagMsg(id, client.id);
		if (flags == null)
			return ;

		await insertMsg(message, client.id, id, this.db);

		var pal = this.getClientN(id);
		if (pal && flags[0] == 1) {
			if (flags[1]) {
				pal.send({type:"friendList", name:client.username, status: 1 + client.inQ});
				pal.send({type:"enDb"});
				pal.addFriend(client.username, client.id, client.inQ);
			}
			pal.sendMsg(message, client);
		}
		return ;
	}

	async invite(client: Client, msg:string, name: string)
	{
		const id = await getIdByName(name, this.db);
		if (id == undefined)
			return ;

		const flags = await this._getFlagMsg(id, client.id);
		if (flags == null)
			return ;

		var pal = this.getClientN(id);
		if (pal && flags[0] == 1) {
			if (flags[1]) {
				pal.send({type:"friendList", name:client.username, status: 1 + client.inQ});
				pal.addFriend(client.username, client.id, client.inQ);
			}
			pal.send({type:"invite", content:msg, from:client.username});
			client.addInviteList(id);
		}
		return ;
	}

	enterQ(client: Client, Qtype: number = 1) {
		client.resetInviteList();
		client.send({type: "enterQ", flag: Qtype});
		client.inQ = Qtype;
		this.friendStatusUp(client, 1 + Qtype);
	}
	exitQ(client: Client) {
		if (this.connectedClients[client.id] == client) {
			client.inQ = 0;
			client.send({type: "enterQ", flag: 0});
			this.friendStatusUp(client, 1);
		}
	}

	async pvai(client: Client)
	{
		this.enterQ(client);
		var roomIds = this.roomIds;
		this.roomIds += 1;

		var GameRoom;
		GameRoom = new MMRoom(roomIds, 2, this.db);
		this.rooms[roomIds] = GameRoom;
		GameRoom.addPlayer(client);
		GameRoom.addPlayer(null);
		client.setRoomId(GameRoom.id);
		var x = await GameRoom.startGame();
		delete this.rooms[roomIds];
		this.exitQ(client);
	}

	async pvp(client: Client)
	{
		this.enterQ(client);
		var roomIds = this.roomIds;
		this.roomIds += 1;

		var GameRoom;
		GameRoom = new MMRoom(roomIds, 1, this.db);
		this.rooms[roomIds] = GameRoom;
		GameRoom.addPlayer(client);
		GameRoom.addPlayer(null);
		client.setRoomId(GameRoom.id);
		var x = await GameRoom.startGame();
		delete this.rooms[roomIds];
		this.exitQ(client);
	}

	cancelGame(client: Client)
	{
		//TODO Creating Tournament -> cancel + kick other
		//TODO Tournament -> ff + other continue
		//TODO in game -> ff + stop
		var roomIds = client.roomId;
		if (!roomIds)
			return ;
		var GameRoom = this.rooms[roomIds];
		GameRoom.ff(client);
		client.send({type:"game", tag:"cancel"});
		this.exitQ(client);
	}

	async join(client: Client, name: string)
	{
		const id = await getIdByName(name, this.db);
		if (id == undefined)
			return ;

		const flags = await this._getFlagMsg(id, client.id);
		if (flags == null)
			return ;

		var pal = this.getClientN(id);
		if (flags[0] != 1)
			return ;

		this.enterQ(client);

		var roomIds;
		var GameRoom;
		roomIds = pal.roomId
		if (!roomIds) {
			roomIds = this.roomIds;
			this.roomIds += 1;
		}
		GameRoom = this.rooms[roomIds];
		if (!GameRoom) {
			this.enterQ(pal);
			GameRoom = new MMRoom(roomIds, 0, this.db);
			this.rooms[roomIds] = GameRoom;
			pal.setRoomId(roomIds);
			GameRoom.addPlayer(pal);
		}
		client.setRoomId(roomIds);
		GameRoom.addPlayer(client);
		if (GameRoom.flag < 3) {
			var x = await GameRoom.startGame();
			delete this.rooms[roomIds];
			this.exitQ(client);
			this.exitQ(pal);
		}
		else {
			client.send({type: "game", tag:"trJoin", op:0});
			var x = await GameRoom.waitGameEnd(); //TODO cancel should stop this wait
			this.exitQ(client);
		}
	}

	async createTR(client: Client)
	{
		this.enterQ(client, 2);

		var roomIds = this.roomIds;
		this.roomIds += 1;

		var GameRoom;
		GameRoom = new MMRoom(roomIds, 3, this.db);
		this.rooms[roomIds] = GameRoom;
		GameRoom.addPlayer(client);
		client.send({type: "game", tag:"trJoin", op:1});
		client.setRoomId(GameRoom.id);
		var x = await GameRoom.waitGameEnd();
		delete this.rooms[roomIds];
		this.exitQ(client);
	}
	async startTR(client: Client)
	{
		var roomIds = client.roomId;
		if (!roomIds)
			return ;
		var GameRoom = this.rooms[roomIds];
		if (GameRoom.players.length >= 4)
			GameRoom.startGame();
	}

	async findGame(client: Client)
	{
		var roomIds;
		var GameRoom;
		if (client.inQ)
			return ;
		this.enterQ(client);

		find : {
			for (let k in this.rooms)
			{
				var room = this.rooms[k];
				if (room.isOpenForMM() == 0)
					continue ;
				GameRoom = room;
				roomIds = Number(k);
				break find;
			}
			roomIds = this.roomIds;
			this.roomIds += 1;
			GameRoom = new MMRoom(roomIds, 0, this.db);
			this.rooms[roomIds] = GameRoom;
		}
		client.setRoomId(roomIds);
		if (GameRoom.addPlayer(client))
		{
			var x = await GameRoom.startGame();
			delete this.rooms[roomIds];
		}
		else
			var x = await GameRoom.waitGameEnd();
		this.exitQ(client);
	}
}

export function WSServInit(port:number, server:FastifyInstance)
{
	const serv = new WsServ(8080, server);
}
