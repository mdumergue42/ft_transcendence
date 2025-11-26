import {Player} from './player.js'
import {Ball} from './ball.js'
import {Vector2} from './vector2.js'
import {draw, resetCanvas} from './draw.js'
import {CANVAS_WIDTH, CANVAS_HEIGHT} from './global.js'

export class DevPongGame
{
	canvas:HTMLCanvasElement | null = null
	header:any = null
	headerInfo:any = {p1: "p1", p2: "p2", def: ""};
	vw:any = null

	p1: Player | null = null
	p2: Player | null = null
	ball: Ball | null = null
	score: Vector2 | null = null
	ws: WebSocket | null = null

	setWs(ws:WebSocket | null)
	{
		this.ws = ws;
	}

	onMsg(msg:any)
	{
		switch (msg.tag) {
			case 'start':
				this.initGame(false);
				this.initInput();
				this.initCanvas(msg);
				break ;
			case 'state':
				this.p1!.racket.x = msg.p1.x;
				this.p1!.racket.y = msg.p1.y;
				this.p2!.racket.x = msg.p2.x;
				this.p2!.racket.y = msg.p2.y;
				this.ball!.center.x = msg.ball.x;
				this.ball!.center.y = msg.ball.y;
				this.score!.x = msg.score.x;
				this.score!.y = msg.score.y;
				this.redraw();
				break ;
			case 'end':
				this.endGame();
				break ;
			default:
				break
		}
	}

	initCanvas(msg: any | null)
	{
		if (!this.canvas || !this.score)
			return ;
		this.vw!.vwMenu.style.display = "none";
		this.vw!.vwTr.style.display = "none";
		this.vw!.vwGame.style.display = "";
		if (msg)
			this.headerInfo = {p1: msg.names[0], p2: msg.names[1], def:msg.def};
		this.header!.p1!.innerHTML = this.headerInfo.p1;
		this.header!.p2!.innerHTML = this.headerInfo.p1;
		this.header!.def!.innerHTML = this.headerInfo.def;
	}

	redraw() //quand je recois les infos (balle)
	{
		if (!this.canvas)
			return ;
		draw(this.canvas, this.p1!, this.p2!, this.ball!);
		this.header!.s1!.innerHTML = `${this.score!.x}`;
		this.header!.s2!.innerHTML = `${this.score!.y}`;
	}

	newFrame()
	{
		if (!this.p1 || !this.p2 || !this.ball || !this.score)
			return ;
		this.p1.move();
		this.p2.move();
		const res = this.ball.move(this.p1, this.p2);
		if (res != 0)
		{
			if (res == 2)
			{
				this.score.x += 1;
				this.ball.init(0);
			}
			else
			{
				this.score.y += 1;
				this.ball.init(1);
			}
			this.p1.init();
			this.p2.init();
		}
	}

	setCanvas(canvas:HTMLCanvasElement, header:any, vw:any)
	{
		this.canvas = canvas;
		this.header = header;
		this.vw = vw;
	}

	setGame(p1:Player, p2:Player, ball:Ball, score:Vector2)
	{
		this.p1 = p1;
		this.p2 = p2;
		this.ball = ball;
		this.score = score;
	}

	initInput()
	{
		this.inputDown = this.inputDown.bind(this);
		this.inputUp = this.inputUp.bind(this);
		document.addEventListener('keydown', this.inputDown);
		document.addEventListener('keyup', this.inputUp);
	}
	sendGameInput(player:number, state:string, dir:string)
	{
		this.ws?.send(JSON.stringify({
			type: "gameInput",
			player: player,
			pressState: state,
			dir:dir
		}));
	}
	inputDown(event : KeyboardEvent)
	{
		if (event.code == "KeyW")
			this.sendGameInput(1, "down", "up");
		if (event.code == "KeyS")
			this.sendGameInput(1, "down", "down");
		if (event.code == "ArrowUp")
			this.sendGameInput(2, "down", "up");
		if (event.code == "ArrowDown")
			this.sendGameInput(2, "down", "down");
	}
	inputUp(event : KeyboardEvent)
	{
		if (event.code == "KeyW")
			this.sendGameInput(1, "up", "up");
		if (event.code == "KeyS")
			this.sendGameInput(1, "up", "down");
		if (event.code == "ArrowUp")
			this.sendGameInput(2, "up", "up");
		if (event.code == "ArrowDown")
			this.sendGameInput(2, "up", "down");
	}

	initGame(p2isBot:boolean)
	{
		var mid = new Vector2(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
		this.p1 = new Player(0, false);
		this.p2 = new Player(CANVAS_WIDTH, p2isBot);
		this.ball = new Ball(mid);
		this.score = new Vector2();
	}

	endGame()
	{
		this.p1 = null;
		this.p2 = null;
		this.ball = null;
		this.score = null;

		if (this.canvas)
		{
			this.header!.p1!.innerHTML = `P1`;
			this.header!.p2!.innerHTML = `P2`;
			this.header!.s1!.innerHTML = `0`;
			this.header!.s2!.innerHTML = `0`;
			this.header!.def!.innerHTML = `match def`;
			resetCanvas(this.canvas!);
			this.vw!.vwMenu.style.display = "";
			this.vw!.vwTr.style.display = "none";
			this.vw!.vwGame.style.display = "none";
			this.vw!.vwCancel();
			document.removeEventListener('keydown', this.inputDown);
			document.removeEventListener('keyup', this.inputUp);
		}
	}
}
