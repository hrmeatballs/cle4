export class bubbleShooter {
    constructor() {
        this.speed = 0;
        this.x = 0;
        console.log('Created bubble shooter');
        document.addEventListener('mousemove', (e) => this.onMouseMove(e));
        document.addEventListener('click', (e) => this.onMouseClick(e));
        this.canvas = document.createElement('canvas');
        this.canvas.style.height = '99vh';
        this.canvas.style.width = '99vw';
        document.body.appendChild(this.canvas);
        this.tile = document.createElement('div');
        this.tile.style.backgroundColor = 'red';
        this.tile.style.position = 'absolute';
        this.tile.style.height = '100px';
        this.tile.style.width = '100px';
        this.tile.style.left = `${(this.canvas.clientWidth / 2) - 50}px`;
        this.tile.style.top = `${this.canvas.clientHeight - 100}px`;
        this.tile.innerText = '<<<<<<<<<';
        this.tile.style.color = 'white';
        document.body.appendChild(this.tile);
        this.player = this.getPlayerPos();
    }
    getPlayerPos() {
        return {
            x: window.innerWidth / 2,
            y: window.innerHeight
        };
    }
    radToDeg(angle) {
        return angle * (180 / Math.PI);
    }
    degToRad(angle) {
        return angle * (Math.PI / 180);
    }
    onMouseMove(e) {
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
    getMousePos(canvas, e) {
        let rect = canvas.getBoundingClientRect();
        return {
            x: Math.round((e.clientX - rect.left) / (rect.right - rect.left) * canvas.clientWidth),
            y: Math.round((e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.clientHeight)
        };
    }
    onMouseClick(e) {
        this.speed = 1;
    }
    update() {
        this.x -= 1 * this.speed;
        this.tile.style.transform = `rotate(${this.degToRad(this.player.angle)}rad) translate(${this.x}px,${0}px)`;
    }
}
//# sourceMappingURL=bubbleShooter.js.map