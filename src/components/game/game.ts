import {Player} from './player.js'
import {Ball} from './ball.js'
import {Vector2} from './vector2.js'
import {draw} from './draw.js'

var game : {p1: Player, p2: Player, ball: Ball};
var canvas : HTMLCanvasElement;

function play()
{
	draw(canvas, game.p1, game.p2, game.ball);
	game.p1.move();
	game.p2.move();
	game.ball.move();
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
		p1: new Player(0, mid.y),
		p2: new Player(canvas.width, mid.y),
		ball: new Ball(mid)
	};
	console.log("PONG!!!");
	play();
}
