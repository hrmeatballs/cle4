import { World } from "./classes/GameObj/world.js"

class Game {

    world : any

    constructor() {
        console.log('Game Created');

        this.world = new World()
    }
    

}
// Todo: Create bubble shooter game
//bubble shooter: https://github.com/davemollen/bubble-shooter-game
new Game()