import { GameObject } from "./gameObject.js";

export class Target extends GameObject {

    private letter : string

    constructor(letter : string) {
        super('target')

        this.letter = letter

        console.log('Created target')
        super.createTarget(letter)
        
    }

    public getLetter() {
        return this.letter
    }

}