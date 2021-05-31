import { menuWorldWater } from "./classes/GameObj/menuWorldWater.js";
import { bubbleShooter } from "./classes/GameObj/bubbleShooter.js";
class Game {
    constructor() {
        console.log('Created game');
        this.bubbleShooter = new bubbleShooter();
    }
    clickHandler(e) {
        console.log(e);
        this.menuWorldWater = new menuWorldWater();
    }
}
new Game();
//# sourceMappingURL=game.js.map