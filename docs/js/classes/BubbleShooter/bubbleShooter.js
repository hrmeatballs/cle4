import { Player } from "./player.js";
export class bubbleShooter {
    constructor() {
        this.gameState = 'init';
        this.letters = ['a', 'k', 'm'];
        this.h = 0;
        console.log('Created bubble shooter');
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.player = new Player(this.targetRandomiser());
        this.gameState = 'aiming';
        document.addEventListener('mousemove', (e) => this.onUserMove(e));
        document.addEventListener('click', () => {
            this.gameState = 'shooting';
            this.player.shoot();
        });
        document.addEventListener('touchmove', (e) => this.onUserMove(e));
        document.addEventListener('touchstart', (e) => this.onUserMove(e));
        document.addEventListener('touchend', () => {
            this.gameState = 'shooting';
            this.player.shoot();
        });
    }
    targetRandomiser() {
        return this.letters[Math.floor(Math.random() * this.letters.length)];
    }
    onUserMove(e) {
        if (this.gameState == 'aiming') {
            let userPos = this.getUserPos(this.canvas, e);
            let mouseAngle = this.player.radToDeg(Math.atan2(this.player.getY() - userPos.y + 50, this.player.getX() - userPos.x + 50));
            if (mouseAngle < 0) {
                mouseAngle = 180 + (180 + mouseAngle);
            }
            var lbound = 8;
            var ubound = 172;
            if (mouseAngle > 90 && mouseAngle < 270) {
                if (mouseAngle > ubound) {
                    mouseAngle = ubound;
                }
            }
            else {
                if (mouseAngle < lbound || mouseAngle >= 270) {
                    mouseAngle = lbound;
                }
            }
            this.player.setAngle(mouseAngle);
        }
    }
    getUserPos(canvas, e) {
        let rect = canvas.getBoundingClientRect();
        if (e.type == 'mousemove') {
            return {
                x: Math.round((e.clientX - rect.left) / (rect.right - rect.left) * canvas.clientWidth),
                y: Math.round((e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.clientHeight)
            };
        }
        else if (e.type == 'touchmove') {
            return {
                x: Math.round((e.touches[0].clientX - rect.left) / (rect.right - rect.left) * canvas.clientWidth),
                y: Math.round((e.touches[0].clientY - rect.top) / (rect.bottom - rect.top) * canvas.clientHeight)
            };
        }
        else {
            return {
                x: 0,
                y: 0
            };
        }
    }
    update() {
        this.player.update(this.gameState);
        if (this.player.getX() < -100 || this.player.getX() > window.innerWidth || this.player.getY() < -100 || this.player.getY() > window.innerHeight) {
            this.player.create(this.targetRandomiser());
            this.player.setSpeed(0);
            this.gameState = 'aiming';
        }
    }
    checkCollision(a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    }
}
//# sourceMappingURL=bubbleShooter.js.map