import { bubbleShooter } from "./classes/BubbleShooter/bubbleShooter.js"
import { menuWorlds } from "./classes/GameObj/menuWorlds.js"
import { menuWorldWater } from "./classes/GameObj/menuWorldWater.js"


class Game {

    private menuWorlds : menuWorlds
    private menuWorldWater : menuWorldWater
    private bubbleShooter : bubbleShooter

    private data : any
    private url : string = 'https://api.nigelritfeld.nl/v1/worlds/?list'


    constructor() {
        console.log('Created game');

        //this.bubbleShooter = new bubbleShooter()

        this.loadMenuWorlds()
        
        //this.menuWorldWater = new menuWorldWater()

        document.body.addEventListener('click', (e : any) => this.clickHandler(e))

        this.gameLoop()
    }

    private async loadMenuWorlds() {
        this.data = await this.getJson(this.url)
        this.menuWorlds = new menuWorlds(this.data)
    }
    
    private clickHandler(e: any) {

        if (e.target.id == 'locked') {
            return
        } else if (e.target.id == 'Atlantis'){
            document.body.removeEventListener('click', () => this.clickHandler(e))
            document.body.innerHTML = ""
            this.menuWorldWater = new menuWorldWater()
        }

    }

    private async getJson(url : string) {
        let response = await fetch(url);
        let data = await response.json()
        return data;
    }
    
    // async function main() {
    //     //OPTION 1
    //     getJson(apiUrl)
    //         .then(data => console.log(data));
    
    //     //OPTION 2
    //     jsondata = await getJson(apiUrl)
    //     console.log(jsondata);
    // }

    private gameLoop() {
        //this.bubbleShooter.update()
        
        requestAnimationFrame(() => this.gameLoop())
    }


}

//bubble shooter: https://github.com/davemollen/bubble-shooter-game
new Game()