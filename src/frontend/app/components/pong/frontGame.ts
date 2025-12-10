import {Player} from './pongLib/player.js'
import {Ball} from './pongLib/ball.js'
import {Vector2} from './pongLib/vector2.js'
import {draw, resetCanvas} from './pongLib/draw.js'
import {CANVAS_WIDTH, CANVAS_HEIGHT} from './pongLib/global.js'

export class PongGame
{
	canvas:HTMLCanvasElement | null = null
	header:any = null
	headerInfo:any = {p1: "p1", p2: "p2", def: ""};
	vw:any = null
	trList: string[] = [];
	trTree: {m1:string, m2:string} = {m1: "", m2: ""};
	trState: number = 0;

	p1: Player | null = null
	p2: Player | null = null
	ball: Ball | null = null
	score: Vector2 | null = null

	ws: WebSocket | null = null

	setWs(ws:WebSocket | null) { this.ws = ws; }
	setTrList(l: string[]) { this.trList = l; }

	setTrTree(t: number) {
		if (t == 0) {
			this.trTree = {m1: "", m2: ""};
			return ;
		}
		var m1 = this.trList[Number(t % 2 == 1)];
		var m2 = t > 2 ? this.trList[2 + Number(t > 4)] : "";
		this.trTree = {m1: m1, m2: m2};
	}

	showTrList() {
		if (this.canvas == null)
			return ;
		this.vw.vwTrList.innerHTML = `<h1 style="margin-bottom:10px">Room:</h1>`;
		for (let name of this.trList) {
			let d = document.createElement('div');
			d.style.fontSize = "80%"
			d.innerHTML = name;
			this.vw.vwTrList.appendChild(d);
		}
	}

	showTrTree() {
		if (!this.canvas)
			return ;
		this.vw!.vwMenu.style.display = "none";
		this.vw!.vwTr.style.display = "";
		this.vw!.vwGame.style.display = "none";
		
		var d;
		for (let k in this.trList) {
			d = document.getElementById(`tr-p${k}-name`)!;
			d.innerHTML = this.trList[k];
		}
		d = document.getElementById(`tr-m1-name`)!;
		d.innerHTML = this.trTree.m1;
		d = document.getElementById(`tr-m2-name`)!;
		d.innerHTML = this.trTree.m2;

	}

	trJoin() {
		this.showTrList();
		if (this.canvas) {
			document.getElementById("select-mm")!.style.display = "none";
			document.getElementById("select-ai")!.style.display = "none";
			document.getElementById("select-pvp")!.style.display = "none";
			document.getElementById("select-start")!.style.display = this.trState == 2 ? "" : "none";
			document.getElementById("select-tr")!.style.display = "";
			document.getElementById("select-cancel")!.style.display = "";
			document.getElementById("select-list-tr")!.style.display = "";
		}

	}

	onMsg(msg:any)
	{
		switch (msg.tag) {
			case 'start':
				this.initGame(false);
				this.initCanvas(msg);
				this.initInput();
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
			case 'trJoin':
				this.trState = msg.op + 1;
				this.trJoin();
				break ;
			case 'trTree':
				this.trState = 3;
				this.setTrTree(msg.flag);
				this.showTrTree();
				break ;
			case 'trList':
				this.setTrList(msg.list);
				this.showTrList();
				break ;
			case 'cancel':
				this.trState = 0;
				this.vw!.vwCancel();
				break
			default:
				break
		}
	}

	initCanvas(msg: any | null)
	{
		if (msg)
			this.headerInfo = {p1: msg.names[0], p2: msg.names[1], def:msg.def};
		if (!this.canvas || !this.score)
		{
			if (this.trState == 1) {
				this.trJoin();
				this.showTrList();
			}
			if (this.trState == 1) {
				this.showTrTree();
			}
			return ;
		}
		this.vw!.vwMenu.style.display = "none";
		this.vw!.vwTr.style.display = "none";
		this.vw!.vwGame.style.display = "";
		this.header!.p1!.innerHTML = this.headerInfo.p1;
		this.header!.p2!.innerHTML = this.headerInfo.p2;
		this.header!.def!.innerHTML = this.headerInfo.def;
	}

	redraw()
	{
		if (!this.canvas)
			return ;
		draw(this.canvas, this.p1!, this.p2!, this.ball!);
		this.header!.s1!.innerHTML = `${this.score!.x}`;
		this.header!.s2!.innerHTML = `${this.score!.y}`;
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
