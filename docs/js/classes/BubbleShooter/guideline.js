import { GameObject } from "./gameObject.js";
export class Guideline extends GameObject {
    constructor() {
        super('guideline');
        super.createGuideline();
    }
    update(gameState, angle) {
        if (gameState == 'aiming') {
            this.div.style.transform = `rotate(${this.degToRad(angle)}rad)`;
        }
    }
}
//# sourceMappingURL=Guideline.js.map