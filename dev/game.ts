import { menuWorlds } from "./classes/GameObj/menuWorlds.js"
import { menuWorldWater } from "./classes/GameObj/menuWorldWater.js"
import { bubbleShooter } from "./classes/GameObj/bubbleShooter.js"

class Game {

    private menuWorlds : menuWorlds
    private menuWorldWater : menuWorldWater
    private bubbleShooter : bubbleShooter

    constructor() {
        console.log('Created game');

        //this.bubbleShooter = new bubbleShooter()

        this.menuWorlds = new menuWorlds()

        document.body.addEventListener('click', (e : any) => this.clickHandler(e))
    }
    
    private clickHandler(e: any) {
        if (e.target.alt == "lock") {

            if (e.target.nextSibling.classList.length != 0) {
                return
            } else {
                this.goodClickHandler()
            }
        } else if (e.target.nodeName == "IMG") {
            if (e.target.classList.length != 0) {
                return
            } else {
                this.goodClickHandler()
            }
        }

    }

    private goodClickHandler() {

        let fade : HTMLElement = document.createElement('div')
        fade.classList.add('fade-to-worldmenu')

        document.body.appendChild(fade)
        //document.body.style.removeProperty('background-image')
        setTimeout(function(){fade.style.marginTop = '-160vh'}, 0)
        setTimeout(function(){
            document.body.style.backgroundImage = ""
            document.body.style.backgroundColor = '#E5E0C7'
            document.body.innerHTML = ""
        }, 2500)
        this.menuWorldWater = new menuWorldWater()

        
    }


}

//bubble shooter: https://github.com/davemollen/bubble-shooter-game
new Game()