import { levelNavigationsMenu } from "./levelNavigationMenu.js";
import { letterPlaceholder } from "./letterPlaceholder.js";
export class popUpMenu {
    constructor(letters, message) {
        this.stars = 3;
        this.letters = [];
        console.log(letters);
        this.letters = letters;
        this.init(letters);
        this.levelNavigationMenu = new levelNavigationsMenu();
        this.innerWrapper.append(this.letterPlaceholder.getElement());
        this.innerWrapper.append(this.createMessage(message));
        this.popUp.append(this.levelNavigationMenu.getElement());
        this.popUp.append(this.innerWrapper);
    }
    init(letters) {
        this.body = document.getElementsByTagName("BODY")[0];
        this.background = document.createElement('menu');
        this.popUp = document.createElement('div');
        this.innerWrapper = document.createElement('div');
        this.innerWrapper.classList.add('pu-inner-wrapper');
        this.popUp.classList.add('pop-up-container');
        this.popUp.addEventListener('click', this.clickHandler);
        console.log(letters);
        this.letterPlaceholder = new letterPlaceholder(letters);
        this.background.append(this.popUp);
        this.body.append(this.background);
    }
    createMessage(message) {
        let element = document.createElement('p');
        let content = document.createTextNode(message);
        element.appendChild(content);
        element.classList.add('completed-level-message');
        return element;
    }
    clickHandler(e) {
        this.background = document.querySelector('menu');
        let target = e.target;
        if (target.dataset.btn === 'homeBtn') {
            this.background.remove();
        }
        if (target.dataset.btn === 'replayBtn') {
            console.log('replay');
            console.log(this.letters);
        }
        if (target.dataset.btn === 'nextBtn') {
            console.log('next');
        }
    }
    createScore(score) {
        this.stars = document.createElement('div');
        this.stars.classList.add('score-wrapper');
        for (let i = 0; 1 < score; i++) {
            let element = document.createElement('img');
            element.src = '../img/level-score-star.svg';
            this.stars.append(element);
        }
        this.innerWrapper.append(this.stars);
    }
}
//# sourceMappingURL=popUpMenu.js.map