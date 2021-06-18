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
    createPlayer(target) {
        if (this.div !== undefined) {
            this.div.remove();
            this.bubblePlaceholder.remove();
        }
        this.x = window.innerWidth / 2 - 50;
        this.y = window.innerHeight - 100;
        this.bubblePlaceholder = document.createElement('div');
        this.bubblePlaceholder.classList.add('bubble-placeholder');
        this.div = document.createElement('player');
        let arrow = document.createElement('div');
        let content = document.createTextNode('I');
        this.div.classList.add('bubble-game-object');
        this.div.style.left = `${this.x}px`;
        this.div.style.top = `${this.y}px`;
        this.div.innerText = target;
        arrow.appendChild(content);
        arrow.classList.add('guideline');
        this.bubblePlaceholder.append(arrow);
        this.bubblePlaceholder.append(this.div);
        this.div.setAttribute('id', `${target}`);
        document.body.appendChild(this.bubblePlaceholder);
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
        console.log(this.div);
        console.log('removed');
        console.log(this.bubblePlaceholder);
        console.log('removed');
    }
}
//# sourceMappingURL=gameObject.js.map