import { GameObject } from "./gameObject.js";
export class Player extends GameObject {
    constructor(target) {
        super('player');
        this.angle = 90;
        this.speed = 0;
        console.log('Created player');
        this.create(target);
    }
    create(target) {
        this.target = target;
        super.createPlayer(target);
    }
    shoot() {
        this.speed = 12;
    }
    setSpeed(speed) {
        this.speed = speed;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    getTarget() {
        return this.target;
    }
    setAngle(angle) {
        this.angle = angle;
    }
    radToDeg(angle) {
        return angle * (180 / Math.PI);
    }
    degToRad(angle) {
        return angle * (Math.PI / 180);
    }
    update(gameState) {
        if (gameState == 'aiming') {
            this.div.style.transform = `rotate(${this.degToRad(this.angle)}rad)`;
        }
        this.x += this.speed * -1 * Math.cos(this.degToRad(this.angle));
        this.y += this.speed * -1 * Math.sin(this.degToRad(this.angle));
        this.div.style.left = `${this.x}px`;
        this.div.style.top = `${this.y}px`;
    }
}
//# sourceMappingURL=player.js.map