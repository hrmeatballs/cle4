export class bubbleShooter {
    constructor() {
        this.speed = 0;
        this.gameState = 'init';
        this.letters = ['a', 'k', 'm'];
        this.h = 0;
        console.log('Created bubble shooter');
        document.addEventListener('mousemove', (e) => this.onMouseMove(e));
        document.addEventListener('mousedown', (e) => this.onMouseMove(e));
        document.addEventListener('click', (e) => this.onMouseClick(e));
        document.addEventListener('touchmove', (e) => this.onTouchMove(e));
        document.addEventListener('touchstart', (e) => this.onTouchMove(e));
        document.addEventListener('touchend', (e) => this.onTouchEnd(e));
        this.canvas = document.createElement('canvas');
        this.canvas.style.height = '100vh';
        this.canvas.style.width = '100vw';
        this.canvas.style.position = 'fixed';
        document.body.appendChild(this.canvas);
        this.createTile();
        for (const letter of this.letters) {
            this.createTarget(letter);
        }
    }
    createTarget(letter) {
        console.log('Created Target');
        this.targetDiv = document.createElement('target');
        this.targetDiv.style.backgroundColor = 'red';
        this.targetDiv.style.position = 'fixed';
        this.targetDiv.style.height = '100px';
        this.targetDiv.style.width = '100px';
        this.targetDiv.style.left = `${(Math.random() * window.innerWidth)}px`;
        this.targetDiv.style.top = `${(Math.random() * (window.innerWidth / 3))}px`;
        this.targetDiv.innerText = `${letter}`;
        this.targetDiv.style.color = 'white';
        this.targetDiv.setAttribute('id', `${letter}`);
        document.body.appendChild(this.targetDiv);
    }
    createTile() {
        this.player = this.getPlayerPos();
        let target = this.letters[Math.floor(Math.random() * this.letters.length)];
        this.playerDiv = document.createElement('player');
        this.playerDiv.style.backgroundColor = 'red';
        this.playerDiv.style.position = 'fixed';
        this.playerDiv.style.height = '100px';
        this.playerDiv.style.width = '100px';
        this.playerDiv.style.left = `${this.player.x}px`;
        this.playerDiv.style.top = `${this.player.y}px`;
        this.playerDiv.innerText = target;
        this.playerDiv.setAttribute('id', `${target}`);
        this.playerDiv.style.color = 'white';
        document.body.appendChild(this.playerDiv);
        this.gameState = 'aiming';
    }
    getPlayerPos() {
        return {
            x: window.innerWidth / 2 - 50,
            y: window.innerHeight - 100,
            angle: 90
        };
    }
    radToDeg(angle) {
        return angle * (180 / Math.PI);
    }
    degToRad(angle) {
        return angle * (Math.PI / 180);
    }
    onTouchMove(e) {
        if (this.gameState == 'aiming') {
            let pos = this.getTouchPos(this.canvas, e);
            let mouseangle = this.radToDeg(Math.atan2(this.player.y - pos.y + 50, this.player.x - pos.x + 50));
            if (mouseangle < 0) {
                mouseangle = 180 + (180 + mouseangle);
            }
            var lbound = 8;
            var ubound = 172;
            if (mouseangle > 90 && mouseangle < 270) {
                if (mouseangle > ubound) {
                    mouseangle = ubound;
                }
            }
            else {
                if (mouseangle < lbound || mouseangle >= 270) {
                    mouseangle = lbound;
                }
            }
            this.player.angle = mouseangle;
        }
    }
    onMouseMove(e) {
        if (this.gameState == 'aiming') {
            let pos = this.getMousePos(this.canvas, e);
            let mouseangle = this.radToDeg(Math.atan2(this.player.y - pos.y + 50, this.player.x - pos.x + 50));
            if (mouseangle < 0) {
                mouseangle = 180 + (180 + mouseangle);
            }
            var lbound = 8;
            var ubound = 172;
            if (mouseangle > 90 && mouseangle < 270) {
                if (mouseangle > ubound) {
                    mouseangle = ubound;
                }
            }
            else {
                if (mouseangle < lbound || mouseangle >= 270) {
                    mouseangle = lbound;
                }
            }
            this.player.angle = mouseangle;
        }
    }
    getTouchPos(canvas, e) {
        let rect = canvas.getBoundingClientRect();
        return {
            x: Math.round((e.touches[0].clientX - rect.left) / (rect.right - rect.left) * canvas.clientWidth),
            y: Math.round((e.touches[0].clientY - rect.top) / (rect.bottom - rect.top) * canvas.clientHeight)
        };
    }
    getMousePos(canvas, e) {
        let rect = canvas.getBoundingClientRect();
        return {
            x: Math.round((e.clientX - rect.left) / (rect.right - rect.left) * canvas.clientWidth),
            y: Math.round((e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.clientHeight)
        };
    }
    onTouchEnd(e) {
        this.speed = 10;
        this.gameState = 'shoot';
    }
    onMouseClick(e) {
        this.speed = 10;
        this.gameState = 'shoot';
    }
    update() {
        let movingTargets = document.getElementsByTagName('target');
        if (this.gameState == 'aiming') {
            this.playerDiv.style.transform = `rotate(${this.degToRad(this.player.angle)}rad)`;
        }
        this.player.x += this.speed * -1 * Math.cos(this.degToRad(this.player.angle));
        this.player.y += this.speed * -1 * Math.sin(this.degToRad(this.player.angle));
        this.playerDiv.style.left = `${this.player.x}px`;
        this.playerDiv.style.top = `${this.player.y}px`;
        if (this.player.x < -100 || this.player.x > window.innerWidth || this.player.y < -100 || this.player.y > window.innerHeight) {
            this.playerDiv.remove();
            this.createTile();
            this.speed = 0;
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