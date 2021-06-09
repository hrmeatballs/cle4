import { menuWorlds } from "./classes/GameObj/menuWorlds.js"
import { menuWorldWater } from "./classes/GameObj/menuWorldWater.js"
import { bubbleShooter } from "./classes/GameObj/bubbleShooter.js"

class Game {

    private menuWorlds : menuWorlds
    private menuWorldWater : menuWorldWater
    private bubbleShooter : bubbleShooter

    constructor() {
        console.log('Created game');

        this.bubbleShooter = new bubbleShooter()

        //this.menuWorlds = new menuWorlds()
        //this.menuWorldWater = new menuWorldWater()

        document.body.addEventListener('click', (e : any) => this.clickHandler(e))

        this.gameLoop()
    }
    
    private clickHandler(e: any) {

        if (e.target.id == 'locked') {
            return
        } else if (e.target.id == 'water'){
            //document.body.removeEventListener('click', () => this.clickHandler(e))
            document.body.innerHTML = ""
            this.menuWorldWater = new menuWorldWater()
        }

    }

    private gameLoop() {
        this.bubbleShooter.update()

        requestAnimationFrame(() => this.gameLoop())
    }


}

//bubble shooter: https://github.com/davemollen/bubble-shooter-game
new Game()