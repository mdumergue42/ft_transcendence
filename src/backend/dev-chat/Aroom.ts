import {Client} from './client.js';
import {DevPongGame} from './pongLib/game.js'
import {Player} from './pongLib/player.js'
import {Ball} from './pongLib/ball.js'
import {Vector2} from './pongLib/vector2.js'

//TODO for now assume its a 1vs1 (no turnament)
export abstract class ARoom
{
	id:number
	flag:number
	newFrameInterval:any
	game: DevPongGame
	db: any
	inGame: number = 0;
	p1: Client | null = null;
	p2: Client | null = null;
	players: Record<number, Client> = {};
	constructor(id:number, flag:number, db : any)
	{
		//flag:
		//0 -> matchmaking
		//1 -> room
		this.id = id;
		this.flag = flag;
		this.db = db;
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
			this.players[k].send(obj);
	}

	startGame()
	{
		this.inGame = 1;
		this.assignPlayer();
		this.game.initGame();
		this.gameState = this.gameState.bind(this);
		this.newFrameInterval = setInterval(this.gameState, 32, this);
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
			this.players[k].setRoomId(null);
			delete this.players[k];
		}
	}
}
