export class GameObject {
    constructor(type) {
        this.x = 0;
        this.y = 0;
        this.type = type;
        if (this.type == 'target') {
            this.x = Math.random() * window.innerWidth;
            this.y = Math.random() * (window.innerWidth / 3);
        }
    }
    getRectangle() {
        return this.div.getBoundingClientRect();
    }
    createPlayer(target) {
        if (this.div !== undefined) {
            this.div.remove();
        }
        console.log(target);
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
    }
}
//# sourceMappingURL=gameObject.js.map