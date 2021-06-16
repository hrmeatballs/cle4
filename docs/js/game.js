var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { menuWorlds } from "./classes/GameObj/menuWorlds.js";
import { menuWorldWater } from "./classes/GameObj/menuWorldWater.js";
class Game {
    constructor() {
        this.url = 'https://api.nigelritfeld.nl/v1/worlds/?list';
        console.log('Created game');
        this.loadMenuWorlds();
        document.body.addEventListener('click', (e) => this.clickHandler(e));
        this.gameLoop();
    }
    loadMenuWorlds() {
        return __awaiter(this, void 0, void 0, function* () {
            this.data = yield this.getJson(this.url);
            this.menuWorlds = new menuWorlds(this.data);
        });
    }
    clickHandler(e) {
        if (e.target.id == 'locked') {
            return;
        }
        else if (e.target.id == 'Atlantis') {
            document.body.removeEventListener('click', () => this.clickHandler(e));
            document.body.innerHTML = "";
            this.menuWorldWater = new menuWorldWater();
        }
    }
    getJson(url) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield fetch(url);
            let data = yield response.json();
            return data;
        });
    }
    gameLoop() {
        requestAnimationFrame(() => this.gameLoop());
    }
}
new Game();
//# sourceMappingURL=game.js.map