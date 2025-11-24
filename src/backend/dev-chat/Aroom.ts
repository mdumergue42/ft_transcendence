import {Client} from './client.js';
import {DevPongGame} from './pongLib/game.js'
import {Player} from './pongLib/player.js'
import {Ball} from './pongLib/ball.js'
import {Vector2} from './pongLib/vector2.js'
import {ai} from './pongLib/ai.js'

//TODO for now assume its a 1vs1 (no turnament)
export abstract class ARoom
{
	id:number
	flag:number
	intervals: {state: any; ai: any };
	game: DevPongGame
	db: any
	inGame: number = 0;
	p1: Client | null = null;
	p2: Client | null = null;
	players: (Client | null)[] = [];
	constructor(id:number, flag:number, db : any)
	{
		//flag:
		//0 -> matchmaking
		//1 -> room
		this.id = id;
		this.flag = flag;
		this.db = db;
		this.intervals = {state: null, ai:null};
		this.game = new DevPongGame();
	}

	abstract addPlayer(user:Client, username:string): void;
	abstract gameInput(user:Client, msg:any): void;
	abstract endGame(): void;
	abstract assignPlayer(): void;

	isOpenForMM()
	{
		if (this.flag == 0 && this.inGame == 0)
			return 1;
		return 0;
	}
	broadCast(obj: any)
	{
		for (let k in this.players)
			if (this.players[k])
				this.players[k].send(obj);
	}

	startGame()
	{
		this.inGame = 1;
		this.assignPlayer();
		this.game.initGame(this.p2 == null);
		this.gameState = this.gameState.bind(this);
		this.intervals = {
			state: setInterval(this.gameState, 32, this),
			ai: this.p2 == null ? setInterval(ai, 100, this.game.ball!, this.game.p2!) : null
		}
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
			if (this.players[k])
				this.players[k].setRoomId(null);
			this.players.splice(Number(k), 1);
		}
	}
}
