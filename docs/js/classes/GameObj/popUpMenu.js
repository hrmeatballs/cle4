import { levelNavigationsMenu } from "./levelNavigationMenu.js";
import { letterPlaceholder } from "./letterPlaceholder.js";
export class popUpMenu {
    constructor() {
        this.init();
        this.levelNavigationMenu = new levelNavigationsMenu();
        this.innerWrapper.append(this.letterPlaceholder.getElement());
        this.innerWrapper.append(this.createMessage('Goed gedaan Pik!'));
        this.popUp.append(this.levelNavigationMenu.getElement());
        this.popUp.append(this.innerWrapper);
    }
    init() {
        this.body = document.getElementsByTagName("BODY")[0];
        this.background = document.createElement('menu');
        this.popUp = document.createElement('div');
        this.innerWrapper = document.createElement('div');
        this.innerWrapper.classList.add('pu-inner-wrapper');
        this.popUp.classList.add('pop-up-container');
        this.popUp.addEventListener('click', this.clickHandler);
        this.letterPlaceholder = new letterPlaceholder(['K', 'A', 'M', 'E', 'R']);
        this.background.append(this.popUp);
        this.body.append(this.background);
        console.log(this.background);
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
            console.log(this.background);
            this.background.remove();
        }
        if (target.dataset.btn === 'replayBtn') {
            console.log('replay');
            console.log(this.background);
        }
        if (target.dataset.btn === 'nextBtn') {
            console.log('next');
            console.log(this.background);
        }
    }
    getHomeMenu() {
    }
}
//# sourceMappingURL=popUpMenu.js.map