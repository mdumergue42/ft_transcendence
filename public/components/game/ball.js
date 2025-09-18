import { Vector2 } from './vector2.js';
export class Ball {
    constructor(_mid) {
        this.mid = _mid;
        this.center = new Vector2();
        this.speed = new Vector2();
        this.init();
        this.speedUp = 1.1;
        this.r = 5;
        this.color = "blue";
    }
    draw(context) {
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.center.x, this.center.y, this.r, 0, Math.PI * 2, false);
        context.fill();
    }
    init() {
        this.center.copy(this.mid);
        this.speed.random(5);
    }
    move() {
        this.center.add(this.speed);
    }
}
