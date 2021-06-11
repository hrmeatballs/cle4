import { GameObject } from "./gameObject.js";
export class Target extends GameObject {
    constructor(letter) {
        super('target');
        this.letter = letter;
        console.log('Created target');
        super.createTarget(letter);
    }
    getLetter() {
        return this.letter;
    }
}
//# sourceMappingURL=target.js.map