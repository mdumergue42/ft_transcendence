import {Client} from './client.js';
import {PongGame} from './backGame.js'
import {Player} from './pongLib/player.js'
import {Ball} from './pongLib/ball.js'
import {Vector2} from './pongLib/vector2.js'
import {ai} from './pongLib/ai.js'

export abstract class ARoom
{
	id:number
	flag:number
	intervals: {state: any; ai: any } = {state: null, ai:null};
	game: PongGame
	db: any
	inGame: number = 0;
	p1: Client | null = null;
	p2: Client | null = null;
	players: (Client | null)[] = [];
	constructor(id:number, flag:number, db : any)
	{
		this.id = id;
		this.flag = flag;
		this.db = db;
		this.game = new PongGame();
	}

	abstract addPlayer(user:Client):number;
	abstract gameInput(user:Client, msg:any): void;
	abstract endGame(): void;
	abstract assignPlayer(): void;
	abstract reconnect(user: Client): number;

	ff(user: Client)
	{
		for (let k in this.players)
		{
			var p = this.players[k];
			if (p && p.id == user.id)
			{
				if (this.inGame) {
					if (this.p1 && this.p1.id == user.id)
						this.game.score!.y = 3;
					if (this.p2 && this.p2.id == user.id)
						this.game.score!.x = 3;
					user.send({type: "game", tag:"end"});
				}
				if (this.inGame)
					this.players[k] = null;
				else {
					this.players.splice(Number(k), 1);
					if (Number(k) == 0) {
						this.inGame = 2;
						this.kickAllPlayers();
					}
					else if (this.flag == 3) {
						let names = [];
						for (let k in this.players) {
							if (this.players[k]) {
								names.push(this.players[k].username);
							}
						}
						this.broadCast({type: "game", tag:"trList", list:names})
					}
				}
				user.setRoomId(null);
				return ;
			}
		}
	}

	isOpenForMM()
	{
		if (this.flag == 0 && this.inGame == 0)
			return 1;
		return 0;
	}
	broadCast(obj: any)
	{
		for (let k in this.players)
		{
			if (this.players[k])
				this.players[k].send(obj);
		}
	}
	stream(obj: any)
	{
		for (let k in this.players)
		{
			if (this.players[k] && this.players[k] != this.p1 && this.players[k] != this.p2)
				this.players[k].send(obj);
		}
	}

	async _waitGameStatus(value: number = 0)
	{
		while (this.inGame == value) {
			await new Promise(resolve => setTimeout(resolve, 1500))
		}
		return 1;
	}
	async waitGameEnd()
	{
		var _ = await this._waitGameStatus(0);
		var _2 = await this._waitGameStatus(1);
		return 1;
	}
	async wait2s()
	{
		await new Promise(resolve => setTimeout(resolve, 2000));
		return 1;
	}

	async startGame()
	{
		this.inGame = 1;
		if (this.flag >= 3) {
			this.broadCast({type: "game", tag: "trTree",
						   flag:this.flag - 3})
			await this.wait2s();
		}
		this.assignPlayer();
		this.game.initGame(this.flag == 2);
		if (this.p2 == null && this.flag > 3)
			this.game.score!.x = 3;
		this.gameState = this.gameState.bind(this);
		this.intervals = {
			state: setInterval(this.gameState, 32, this),
			ai: this.flag == 2 ?
				setInterval(ai, 100, this.game.ball!, this.game.p2!) : null
		};
		var x = await this._waitGameStatus(1);
		return 1;
	}

	gameState()
	{
		this.game.newFrame();
		if (this.game.score!.x == 3 || this.game.score!.y == 3)
		{
			this.endGame();
			return ;
		}
		const st = {type: "game", tag: "state",
			p1: {
				x: this.game.p1!.racket.x,
				y: this.game.p1!.racket.y
			},
			p2: {
				x: this.game.p2!.racket.x,
				y: this.game.p2!.racket.y
			},
			ball: {
				x: this.game.ball!.center.x,
				y: this.game.ball!.center.y
			},
			score: {
				x: this.game.score!.x,
				y: this.game.score!.y
			}
		};
		this.broadCast(st);
	}

	kickAllPlayers()
	{
		for (let k in this.players)
		{
			if (this.players[k]) {
				this.players[k].send({type: "game", tag: "cancel"});
				this.players[k].setRoomId(null);
			}
		}
		this.players = [];
	}
}
