import { bubbleShooter } from "./classes/BubbleShooter/bubbleShooter.js";
import { menuWorldWater } from "./classes/GameObj/menuWorldWater.js";
class Game {
    constructor() {
        console.log('Created game');
        this.bubbleShooter = new bubbleShooter();
        document.body.addEventListener('click', (e) => this.clickHandler(e));
        this.gameLoop();
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
    gameLoop() {
        this.bubbleShooter.update();
        requestAnimationFrame(() => this.gameLoop());
    }
}
new Game();
//# sourceMappingURL=game.js.map