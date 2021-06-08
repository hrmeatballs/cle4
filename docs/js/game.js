import { menuWorldWater } from "./classes/GameObj/menuWorldWater.js";
import { bubbleShooter } from "./classes/GameObj/bubbleShooter.js";
class Game {
    constructor() {
        console.log('Created game');
        this.bubbleShooter = new bubbleShooter();
        this.gameLoop();
    }
    clickHandler(e) {
        if (e.target.id == 'locked') {
            return;
        }
        else if (e.target.id == 'water') {
            document.body.innerHTML = "";
            this.menuWorldWater = new menuWorldWater();
        }
    }
    gameLoop() {
        this.bubbleShooter.update();
        requestAnimationFrame(() => this.gameLoop());
    }
}
new Game();
//# sourceMappingURL=game.js.map