import {Player} from './player.js'
import {Ball} from './ball.js'
import {Vector2} from './vector2.js'
import {draw, resetCanvas} from './draw.js'
import {CANVAS_WIDTH, CANVAS_HEIGHT} from './global.js'

export class DevPongGame
{
	canvas:HTMLCanvasElement | null
	p1: Player | null
	p2: Player | null
	ball: Ball | null
	score: Vector2 | null
	ws: WebSocket | null
	constructor()
	{
		this.canvas = null;
		this.p1 = null;
		this.p2 = null;
		this.ball = null;
		this.score = null;
		this.ws = null;
	}

	setWs(ws:WebSocket | null)
	{
		this.ws = ws;
	}

	onMsg(tag:string, x:string, y:string)
	{
		switch (tag) {
			case 'start':
				this.initGame();
				this.initInput();
				break ;
			case 'p1':
				this.p1!.racket.x = parseInt(x);
				this.p1!.racket.y = parseInt(y);
				break ;
			case 'p2':
				this.p2!.racket.x = parseInt(x);
				this.p2!.racket.y = parseInt(y);
				break ;
			case 'ball':
				this.ball!.center.x = parseInt(x);
				this.ball!.center.y = parseInt(y);
				break ;
			case 'score':
				this.score!.x = parseInt(x);
				this.score!.y = parseInt(y);
				this.redraw();
				break ;
			case 'end':
				this.endGame();
				break ;
			default:
				break
		}
	}

	redraw() //quand je recois les infos (balle)
	{
		if (!this.canvas)
			return ;
		draw(this.canvas, this.p1!, this.p2!, this.ball!, this.score!);
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
				this.score.x += 1;
			else
				this.score.y += 1;
			this.ball.init();
			this.p1.init();
			this.p2.init();
		}
	}

	setCanvas(canvas:HTMLCanvasElement)
	{
		this.canvas = canvas;
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
	inputDown(event : KeyboardEvent)
	{
		if (event.code == "ArrowUp")
			this.ws?.send(`gameInput+down+up`);
		if (event.code == "ArrowDown")
			this.ws?.send(`gameInput+down+down`);
	}
	inputUp(event : KeyboardEvent)
	{
		if (event.code == "ArrowUp")
			this.ws?.send(`gameInput+up+up`);
		if (event.code == "ArrowDown")
			this.ws?.send(`gameInput+up+down`);
	}

	initGame()
	{
		var mid = new Vector2(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
		this.p1 = new Player(0, false);
		this.p2 = new Player(CANVAS_WIDTH, false);
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
			resetCanvas(this.canvas!);
	}
}
