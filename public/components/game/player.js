import { Vector2 } from './vector2.js';
import { RECT_HEIGHT, RECT_WIDTH } from "./global.js";
export class Player {
    constructor(x, y) {
        if (x != 0)
            x -= RECT_WIDTH;
        this.static = new Vector2(x, y - RECT_HEIGHT / 2);
        this.racket = new Vector2();
        this.racket.copy(this.static);
        this.dir = new Vector2();
        this.color = "red";
    }
    draw(context) {
        context.fillStyle = this.color;
        context.fillRect(this.racket.x, this.racket.y, RECT_WIDTH, RECT_HEIGHT);
    }
    move() {
        this.racket.add(this.dir);
    }
}
