export class bubbleShooter {
    constructor() {
        this.speed = 0;
        this.gameState = 'init';
        console.log('Created bubble shooter');
        document.addEventListener('mousemove', (e) => this.onMouseMove(e));
        document.addEventListener('click', (e) => this.onMouseClick(e));
        this.canvas = document.createElement('canvas');
        this.canvas.style.height = '99vh';
        this.canvas.style.width = '99vw';
        document.body.appendChild(this.canvas);
        this.createTile();
    }
    createTile() {
        this.gameState = 'playing';
        this.player = this.getPlayerPos();
        this.playerDiv = document.createElement('div');
        this.playerDiv.style.backgroundColor = 'red';
        this.playerDiv.style.position = 'fixed';
        this.playerDiv.style.height = '100px';
        this.playerDiv.style.width = '100px';
        this.playerDiv.style.left = `${this.player.x}px`;
        this.playerDiv.style.top = `${this.player.y}px`;
        this.playerDiv.innerText = '<<<<<<<<<';
        this.playerDiv.style.color = 'white';
        document.body.appendChild(this.playerDiv);
    }
    getPlayerPos() {
        return {
            x: window.innerWidth / 2 - 50,
            y: window.innerHeight - 100,
            angle: 0
        };
    }
    radToDeg(angle) {
        return angle * (180 / Math.PI);
    }
    degToRad(angle) {
        return angle * (Math.PI / 180);
    }
    onMouseMove(e) {
        if (this.gameState == 'playing') {
            this.playerDiv.style.transform = `rotate(${this.degToRad(this.player.angle)}rad)`;
            let pos = this.getMousePos(this.canvas, e);
            let mouseangle = this.radToDeg(Math.atan2(this.player.y - pos.y, this.player.x - pos.x));
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
    getMousePos(canvas, e) {
        let rect = canvas.getBoundingClientRect();
        return {
            x: Math.round((e.clientX - rect.left) / (rect.right - rect.left) * canvas.clientWidth),
            y: Math.round((e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.clientHeight)
        };
    }
    onMouseClick(e) {
        this.speed = 10;
        this.gameState = 'shoot';
    }
    update() {
        this.player.x += this.speed * -1 * Math.cos(this.degToRad(this.player.angle));
        this.player.y += this.speed * -1 * Math.sin(this.degToRad(this.player.angle));
        this.playerDiv.style.left = `${this.player.x}px`;
        this.playerDiv.style.top = `${this.player.y}px`;
    }
}
//# sourceMappingURL=bubbleShooter.js.map