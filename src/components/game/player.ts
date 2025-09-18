import {Vector2} from './vector2.js'
import {RECT_HEIGHT, RECT_WIDTH} from "./global.js"

export class Player
{
	static: Vector2
	racket: Vector2
	dir: Vector2
	color: string
    constructor(x: number, y: number)
    {
		if (x != 0)
			x -= RECT_WIDTH;
        this.static = new Vector2(x, y - RECT_HEIGHT / 2);
		this.racket = new Vector2();
		this.racket.copy(this.static);
		this.dir = new Vector2();
		this.color = "red";
    }

	draw(context: CanvasRenderingContext2D)
	{
		context.fillStyle = this.color;
		context.fillRect(this.racket.x, this.racket.y,
			RECT_WIDTH, RECT_HEIGHT);
	}

	move()
	{
		this.racket.add(this.dir);
	}
}
