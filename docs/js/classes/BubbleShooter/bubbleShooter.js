import { Player } from "./player.js";
import { Target } from "./target.js";
import { Guideline } from "./guideline.js";
import { popUpMenu } from "../GameObj/popUpMenu.js";
import { scoreMenu } from "./scoreMenu.js";
export class bubbleShooter {
    constructor(letters, level) {
        this.targets = [];
        this.gameState = 'init';
        this.shots = 0;
        console.log('Created bubble shooter');
        this.scoreMenu = new scoreMenu();
        this.scoreMenu.updateTime();
        document.body.innerHTML = '';
        this.letters = letters.split("");
        this.level = letters.split("");
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        document.body.appendChild(this.scoreMenu.getElement());
        document.body.style.backgroundImage = 'url(img/shooter/background.png)';
        if (this.gameState != 'gameover') {
            this.player = new Player(this.getTarget());
        }
        this.gameState = 'aiming';
        this.guideline = new Guideline();
        this.createTargets();
        document.addEventListener('mousemove', (e) => this.onUserMove(e));
        document.addEventListener('mousedown', (e) => this.onUserMove(e));
        document.addEventListener('mouseup', () => {
            if (this.gameState != 'gameover') {
                this.gameState = 'shooting';
                this.player.shoot();
                this.shots += 1;
            }
        });
        document.addEventListener('touchmove', (e) => this.onUserMove(e));
        document.addEventListener('touchstart', (e) => this.onUserMove(e));
        document.addEventListener('touchend', () => {
            if (this.gameState != 'gameover') {
                this.gameState = 'shooting';
                this.player.shoot();
            }
        });
    }
    getTarget() {
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
            console.error("Method of movement is undefined");
            return {
                x: 0,
                y: 0
            };
        }
    }
    update() {
        if (this.gameState != 'gameover') {
            this.scoreMenu.updateTime();
        }
        else {
            this.scoreMenu.stopTime();
        }
        for (const target of this.targets) {
            let dx = this.player.getX() - target.getX();
            let dy = this.player.getY() - target.getY();
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < this.player.getWidth()) {
                if (this.player.getTarget() == target.getLetter()) {
                    target.hitTarget();
                    if (this.targets.length > -1) {
                        this.targets.splice(0, 1);
                    }
                    var klank = new Audio(`audio/${target.getLetter()}.mp3`);
                    klank.play();
                    this.letters.splice(0, 1);
                    if (this.letters.length == 0) {
                        this.gameState = 'gameover';
                        setTimeout(() => {
                            var klank = new Audio(`audio/${this.level.join('')}.mp3`);
                            klank.play();
                        }, 700);
                        let messages = [':)', 'Goedzo!', 'Topper!', 'Goed bezig :)', 'Goed bezig!', 'Topper :)', 'Ga zo door!', 'Ga zo door :)', ':D'];
                        let message = messages[Math.floor(Math.random() * messages.length)];
                        let scorePercent = this.level.length / this.shots;
                        let score = 0;
                        if (scorePercent == 1) {
                            score = 3;
                        }
                        else if (scorePercent <= 0.6 && scorePercent >= 0.3) {
                            score = 2;
                        }
                        else {
                            score = 1;
                        }
                        console.log(score);
                        console.log(scorePercent);
                        this.popUpMenu = new popUpMenu(this.level, `${message}`, score);
                    }
                    if (this.gameState != 'gameover') {
                        this.player.create(this.getTarget());
                        this.player.setSpeed(0);
                        this.gameState = 'aiming';
                    }
                }
                else {
                    if (this.gameState != 'gameover') {
                        this.player.create(this.getTarget());
                        this.player.setSpeed(0);
                        this.gameState = 'aiming';
                    }
                }
            }
        }
        this.player.update(this.gameState);
        this.guideline.update(this.gameState, this.userAngle);
        if (this.player.getX() < 0) {
            this.player.setAngle(180 - this.player.getAngle());
        }
        else if (this.player.getX() > (window.innerWidth - 100)) {
            this.player.setAngle(180 - this.player.getAngle());
        }
        else if (this.player.getY() < 0) {
            this.player.create(this.getTarget());
            this.player.setSpeed(0);
            if (this.gameState != 'gameover') {
                this.gameState = 'aiming';
            }
        }
    }
    gameLoop() {
        this.update();
        requestAnimationFrame(() => this.gameLoop());
    }
}
//# sourceMappingURL=bubbleShooter.js.map