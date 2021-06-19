import { GameObject } from "./gameObject.js";

export class Guideline extends GameObject {

    

    constructor() {
        super('guideline')
        super.createGuideline()
}
        
    public update(gameState:string, angle: number)
    {
        if (gameState == 'aiming') {
            //rotating the tile facing to the mouse
            this.div.style.transform = `rotate(${this.degToRad(angle)}rad)`
        }
    }
}