import { World } from "./classes/GameObj/world.js"

class Game {

    world : any

    constructor() {
        console.log('Game Created');

        this.world = new World()
    }
    

}
//bubble shooter: https://github.com/davemollen/bubble-shooter-game
new Game()