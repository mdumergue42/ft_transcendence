import {Player} from '../pongLib/player.js'
import {Ball} from '../pongLib/ball.js'
import {Vector2} from '../pongLib/vector2.js'

export function draw(
	canvas: HTMLCanvasElement,
	p1 : Player,
	p2 : Player,
	ball: Ball,
	score: Vector2)
{
    var context = <CanvasRenderingContext2D>canvas.getContext('2d');

    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.strokeStyle = "white";
    context.beginPath();
    context.moveTo(canvas.width / 2, 0);
    context.lineTo(canvas.width / 2, canvas.height);
    context.stroke();

	context.font='30px Verdana';
	context.fillStyle = "white";
	context.fillText(score.x.toString(), canvas.width * 0.25, canvas.height * 0.1);
	context.fillText(score.y.toString(), canvas.width * 0.75, canvas.height * 0.1);

	p1.draw(context, "green");
	p2.draw(context, "green");
	ball.draw(context, "white");
}

export function resetCanvas(canvas: HTMLCanvasElement)
{
    var context = <CanvasRenderingContext2D>canvas.getContext('2d');

    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
}
