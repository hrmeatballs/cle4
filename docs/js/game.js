import { menuWorldWater } from "./classes/GameObj/menuWorldWater.js";
class Game {
    constructor() {
        console.log('Created game');
        document.body.addEventListener('click', (e) => this.clickHandler(e));
    }
    clickHandler(e) {
        if (e.target.id == 'locked') {
            return;
        }
        else if (e.target.id == 'water') {
            document.body.removeEventListener('click', () => this.clickHandler(e));
            document.body.innerHTML = "";
            this.menuWorldWater = new menuWorldWater();
        }
    }
}
new Game();
//# sourceMappingURL=game.js.map