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
        console.log('Created game');
        this.loadMenuWorlds("https://api.nigelritfeld.nl/v1/worlds/?list");
        document.body.addEventListener('click', (e) => this.clickHandler(e));
    }
    loadWorldWater(url) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield this.getJson(url);
            this.menuWorldWater = new menuWorldWater(data);
        });
    }
    loadMenuWorlds(url) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield this.getJson(url);
            this.menuWorlds = new menuWorlds(data);
            document.body.append(this.menuWorlds.getElement());
        });
    }
    clickHandler(e) {
        if (e.target.id == 'locked') {
        }
        else if (e.target.id == 'Amazone') {
            document.body.removeEventListener('click', (e) => this.clickHandler(e));
            this.loadWorldWater("https://api.nigelritfeld.nl/v1/levels/");
        }
    }
    getJson(url) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield fetch(url);
            let data = yield response.json();
            return data;
        });
    }
}
new Game();
//# sourceMappingURL=game.js.map