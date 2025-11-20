import {Player} from '../pongLib/player.js'
import {Ball} from '../pongLib/ball.js'
import {Vector2} from '../pongLib/vector2.js'
import {draw} from './draw.js'
import {ia} from './ia.js'

var game : {p1: Player, p2: Player, ball: Ball, score: Vector2};
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
	draw(canvas, game.p1, game.p2, game.ball, game.score);
	game.p1.move();
	game.p2.move();
	const res = game.ball.move(game.p1, game.p2);
	if (res != 0)
	{
		if (res == 2)
			game.score.x += 1;
		else
			game.score.y += 1;
		game.ball.init();
		game.p1.init();
		game.p2.init();
		console.log("SCORE: ", game.score);
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
		p1: new Player(0, false),
		p2: new Player(canvas.width, true),
		ball: new Ball(mid),
		score: new Vector2()
	};
	document.addEventListener('keydown', inputDown);
	document.addEventListener('keyup', inputUp);
	if (game.p2.ia == true)
		setInterval(ia, 100, game.ball, game.p2, canvas);
	play();
}
