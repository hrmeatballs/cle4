export class Player {
    constructor(target) {
        this.angle = 90;
        this.x = 0;
        this.y = 0;
        this.speed = 0;
        console.log('Created player');
        this.create(target);
    }
    create(target) {
        if (this.div !== undefined) {
            this.div.remove();
        }
        this.x = window.innerWidth / 2 - 50;
        this.y = window.innerHeight - 100;
        this.div = document.createElement('player');
        this.div.classList.add('bubble-game-object');
        this.div.style.left = `${this.x}px`;
        this.div.style.top = `${this.y}px`;
        this.div.innerText = target;
        this.div.setAttribute('id', `${target}`);
        document.body.appendChild(this.div);
    }
    shoot() {
        this.speed = 10;
        console.log('SHOOT!!');
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