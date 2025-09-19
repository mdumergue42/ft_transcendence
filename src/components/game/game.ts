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
	game.p1.setObj(0);
	game.p2.setObj(canvas.height);
	console.log("PONG!!!");
	play();
}
