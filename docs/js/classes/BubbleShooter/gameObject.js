export class GameObject {
    constructor() {
    }
    getRectangle() {
        return this.div.getBoundingClientRect();
    }
    create(object, x, y, angle = 0, letter = []) {
        this.x = x;
        this.y = y;
        this.div = document.createElement(`${object}`);
        this.div.classList.add('bubble-game-object');
        if (object == 'target') {
            this.div.innerText = `${letter}`;
            this.div.setAttribute('id', `${letter}`);
        }
        else if (object == 'player') {
        }
        document.body.appendChild(this.div);
    }
}
//# sourceMappingURL=gameObject.js.map