import { menuWorlds } from "./classes/GameObj/menuWorlds.js";
import { menuWorldWater } from "./classes/GameObj/menuWorldWater.js";
class Game {
    constructor() {
        console.log('Game Created');
        this.menuWorlds = new menuWorlds();
        document.body.addEventListener('click', this.clickHandler);
    }
    clickHandler(e) {
        console.log(e);
        this.menuWorldWater = new menuWorldWater();
    }
}
new Game();
//# sourceMappingURL=game.js.map