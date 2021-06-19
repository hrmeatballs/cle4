import { Player } from "./player.js";
import { Target } from "./target.js";
import { Guideline } from "./Guideline.js";
export class bubbleShooter {
    constructor(letters = [], level) {
        this.targets = [];
        this.gameState = 'init';
        console.log('Created bubble shooter');
        this.letters = letters;
        this.level = level;
        var audio = new Audio('audio/theme.mp3');
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.player = new Player(this.targetRandomiser());
        this.gameState = 'aiming';
        this.guideline = new Guideline();
        this.createTargets();
        document.addEventListener('mousemove', (e) => this.onUserMove(e));
        document.addEventListener('mousedown', (e) => this.onUserMove(e));
        document.addEventListener('mouseup', () => {
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
        return this.letters[0];
    }
    createTargets() {
        for (let i = 0; i < this.letters.length; i++) {
            this.targets.push(new Target(this.letters[i]));
        }
    }
    onUserMove(e) {
        if (this.gameState == 'aiming') {
            let userPos = this.getUserPos(this.canvas, e);
            let mouseAngle = this.player.radToDeg(Math.atan2(this.player.getY() - userPos.y + this.player.getWidth(), this.player.getX() - userPos.x + this.player.getWidth()));
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
            this.userAngle = mouseAngle;
        }
    }
    getUserPos(canvas, e) {
        let rect = canvas.getBoundingClientRect();
        if (e.type == 'mousemove' || e.type == 'mousedown') {
            return {
                x: Math.round((e.clientX - rect.left) / (rect.right - rect.left) * canvas.clientWidth),
                y: Math.round((e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.clientHeight)
            };
        }
        else if (e.type == 'touchmove' || e.type == 'touchstart') {
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
        for (const target of this.targets) {
            let dx = this.player.getX() - target.getX();
            let dy = this.player.getY() - target.getY();
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < this.player.getWidth()) {
                if (this.player.getTarget() == target.getLetter()) {
                    target.hitTarget();
                    var klank = new Audio(`audio/${target.getLetter()}.mp3`);
                    klank.play();
                    const index = this.letters.indexOf(target.getLetter());
                    if (index > -1) {
                        this.letters.splice(index, 1);
                    }
                    if (this.letters.length == 0) {
                        this.letters = ['m', 'a', 'k'];
                        this.createTargets();
                    }
                    this.player.create(this.targetRandomiser());
                    this.player.setSpeed(0);
                    this.gameState = 'aiming';
                }
                else {
                    this.player.create(this.targetRandomiser());
                    this.player.setSpeed(0);
                    this.gameState = 'aiming';
                }
            }
        }
        this.player.update(this.gameState);
        this.guideline.update(this.gameState, this.userAngle);
        if (this.player.getX() < -100 || this.player.getX() > window.innerWidth || this.player.getY() < -100 || this.player.getY() > window.innerHeight) {
            this.player.create(this.targetRandomiser());
            this.player.setSpeed(0);
            this.gameState = 'aiming';
        }
    }
    gameLoop() {
        this.update();
        requestAnimationFrame(() => this.gameLoop());
    }
}
//# sourceMappingURL=bubbleShooter.js.map