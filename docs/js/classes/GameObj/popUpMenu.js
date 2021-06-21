var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { levelNavigationsMenu } from "./levelNavigationMenu.js";
import { letterPlaceholder } from "./letterPlaceholder.js";
import { menuWorldWater } from "./menuWorldWater.js";
export class popUpMenu {
    constructor(letters, message, score = 0) {
        this.letters = [];
        this.letters = letters;
        this.init(letters);
        this.levelNavigationMenu = new levelNavigationsMenu();
        this.createScore(score);
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
        this.popUp.addEventListener('click', () => { this.loadWorldWater("https://api.nigelritfeld.nl/v1/levels/"); });
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
    }
    loadWorldWater(url) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield this.getJson(url);
            this.menuWorldWater = new menuWorldWater(data);
        });
    }
    getJson(url) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield fetch(url);
            let data = yield response.json();
            return data;
        });
    }
    createScore(score) {
        this.stars = document.createElement('stars');
        this.stars.classList.add('score-wrapper');
        this.innerWrapper.append(this.stars);
        for (let i = 0; i < score; i++) {
            let element = document.createElement('img');
            element.src = '../docs/img/level-score-star.svg';
            element.classList.add('star');
            this.stars.append(element);
        }
        for (let i = 0; i < 3 - score; i++) {
            let element = document.createElement('img');
            element.src = '../docs/img/level-score-star.svg';
            element.classList.add('star', 'locked');
            this.stars.append(element);
        }
    }
}
//# sourceMappingURL=popUpMenu.js.map