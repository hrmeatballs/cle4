import { menuWorlds } from "./classes/GameObj/menuWorlds.js";
import { menuWorldWater } from "./classes/GameObj/menuWorldWater.js";
class Game {
    constructor() {
        console.log('Created game');
        this.menuWorlds = new menuWorlds();
        document.body.addEventListener('click', (e) => this.clickHandler(e));
    }
    clickHandler(e) {
        if (e.target.alt == "lock") {
            if (e.target.nextSibling.classList.length != 0) {
                return;
            }
            else {
                this.goodClickHandler();
            }
        }
        else if (e.target.nodeName == "IMG") {
            if (e.target.classList.length != 0) {
                return;
            }
            else {
                this.goodClickHandler();
            }
        }
    }
    goodClickHandler() {
        let fade = document.createElement('div');
        fade.classList.add('fade-to-worldmenu');
        document.body.appendChild(fade);
        setTimeout(function () { fade.style.marginTop = '-160vh'; }, 0);
        setTimeout(function () {
            document.body.style.backgroundImage = "";
            document.body.style.backgroundColor = '#E5E0C7';
            document.body.innerHTML = "";
        }, 2500);
        this.menuWorldWater = new menuWorldWater();
    }
}
new Game();
//# sourceMappingURL=game.js.map