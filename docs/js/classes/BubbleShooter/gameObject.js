export class GameObject {
    constructor(type) {
        this.x = 0;
        this.y = 0;
        this.type = type;
        if (this.type == 'target') {
            this.x = Math.random() * window.innerWidth;
            if (this.x > window.innerWidth - 100) {
                this.x = +100;
            }
            this.y = Math.random() * (window.innerWidth / 3);
        }
    }
    getRectangle() {
        return this.div.getBoundingClientRect();
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    getWidth() {
        return this.div.clientWidth;
    }
    createPlayer(target) {
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
    createTarget(letter) {
        this.div = document.createElement('target');
        this.div.classList.add('bubble-game-object');
        this.div.style.left = `${this.x}px`;
        this.div.style.top = `${this.y}px`;
        this.div.innerText = `${letter}`;
        document.body.appendChild(this.div);
    }
    hitTarget() {
        this.div.remove();
        console.log('Removed target');
    }
    createGuideline() {
        console.log('Created guideline');
        this.x = window.innerWidth / 2 - 75;
        this.y = window.innerHeight - 60;
        this.div = document.createElement('guideline');
        this.div.classList.add('guideline');
        this.div.style.left = `${this.x}px`;
        this.div.style.top = `${this.y}px`;
        document.body.appendChild(this.div);
    }
    radToDeg(angle) {
        return angle * (180 / Math.PI);
    }
    degToRad(angle) {
        return angle * (Math.PI / 180);
    }
}
//# sourceMappingURL=gameObject.js.map