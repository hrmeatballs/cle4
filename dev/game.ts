import { menuWorlds } from "./classes/GameObj/menuWorlds.js"
import { menuWorldWater } from "./classes/GameObj/menuWorldWater.js"

class Game {

    private menuWorlds : menuWorlds
    private menuWorldWater : menuWorldWater

    constructor() {
        console.log('Game Created');

        this.menuWorlds = new menuWorlds()

        document.body.addEventListener('click', this.clickHandler)
    }
    
    private clickHandler(e: any) {
        //console.log(e.target.parentElement.children[1].alt)
        console.log(e)
        this.menuWorldWater = new menuWorldWater()
    }

}
// TODO: Create bubble shooter game
//bubble shooter: https://github.com/davemollen/bubble-shooter-game
new Game()