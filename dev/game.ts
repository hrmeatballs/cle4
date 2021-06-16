import { bubbleShooter } from "./classes/BubbleShooter/bubbleShooter.js"
import { menuWorlds } from "./classes/GameObj/menuWorlds.js"
import { menuWorldWater } from "./classes/GameObj/menuWorldWater.js"
import { popUpMenu } from "./classes/GameObj/popUpMenu.js"



class Game {

    private menuWorlds : menuWorlds
    private menuWorldWater : menuWorldWater
    private bubbleShooter : bubbleShooter
    private popUpMenu : popUpMenu

    constructor() {
        console.log('Created game');

    
        this.loadMenuWorlds("https://api.nigelritfeld.nl/v1/worlds/?list")
        
        //this.menuWorldWater = new menuWorldWater()

        document.body.addEventListener('click', (e : any) => this.clickHandler(e))
        
        this.gameLoop()
    }

    private async loadWorldWater(url : string) {
        let data = await this.getJson(url)
        this.menuWorldWater = new menuWorldWater(data)
    }

    private async loadMenuWorlds(url : string) {
        let data = await this.getJson(url)
        this.menuWorlds = new menuWorlds(data)
    }
    
    private clickHandler(e: any) {

        if (e.target.id == 'locked') {
            this.popUpMenu = new popUpMenu()
        } else if (e.target.id == 'Europe'){
            document.body.removeEventListener('click', () => this.clickHandler(e))
            document.body.innerHTML = ""
            this.loadWorldWater("https://api.nigelritfeld.nl/v1/levels/")
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