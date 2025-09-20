import {Player} from './player.js'
import {Ball} from './ball.js'
import {Vector2} from './vector2.js'
import {draw} from './draw.js'

var game : {p1: Player, p2: Player, ball: Ball};
var canvas : HTMLCanvasElement;

function inputDown(event: KeyboardEvent)
{
	if (event.code == "KeyW")
		game.p1.keysPressed[0] = 1;
	if (event.code == "KeyS")
		game.p1.keysPressed[1] = 1;
	if (event.code == "KeyO")
		game.p2.keysPressed[0] = 1;
	if (event.code == "KeyL")
		game.p2.keysPressed[1] = 1;
}
function inputUp(event: KeyboardEvent)
{
	if (event.code == "KeyW")
		game.p1.keysPressed[0] = 0;
	if (event.code == "KeyS")
		game.p1.keysPressed[1] = 0;
	if (event.code == "KeyO")
		game.p2.keysPressed[0] = 0;
	if (event.code == "KeyL")
		game.p2.keysPressed[1] = 0;
}

function play()
{
	draw(canvas, game.p1, game.p2, game.ball);
	game.p1.move();
	game.p2.move();
	const res = game.ball.move(canvas, game.p1, game.p2);
	if (res != 0)
	{
		//goal so +1 score;
		game.ball.init();
		game.p1.init();
		game.p2.init();
	}
	var anim = requestAnimationFrame(play);

}

export function Pong()
{
	canvas = <HTMLCanvasElement>document.getElementById('pong-canvas');
	if (canvas == null)
	{
		console.log("wtf canvas null");
		return ;
	}
	var mid = new Vector2(canvas.width / 2, canvas.height / 2);
	game = {
		p1: new Player(0, mid.y, -1),
		p2: new Player(canvas.width, mid.y, 1),
		ball: new Ball(mid)
	};
	document.addEventListener('keydown', inputDown);
	document.addEventListener('keyup', inputUp);

	console.log("PONG!!!");
	play();
}
