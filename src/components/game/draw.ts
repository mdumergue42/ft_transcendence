import {Player} from './player.js'
import {Ball} from './ball.js'

export function draw(
	canvas: HTMLCanvasElement,
	p1 : Player,
	p2 : Player,
	ball: Ball)
{
    var context = <CanvasRenderingContext2D>canvas.getContext('2d');

    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.strokeStyle = "white";
    context.beginPath();
    context.moveTo(canvas.width / 2, 0);
    context.lineTo(canvas.width / 2, canvas.height);
    context.stroke();

	p1.draw(context);
	p2.draw(context);
	ball.draw(context);
}
