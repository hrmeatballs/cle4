import { bubbleShooter } from "./classes/BubbleShooter/bubbleShooter.js"
import { menuWorlds } from "./classes/GameObj/menuWorlds.js"
import { menuWorldWater } from "./classes/GameObj/menuWorldWater.js"
import { popUpMenu } from "./classes/GameObj/popUpMenu.js"



class Game {

    private menuWorlds : menuWorlds
    private menuWorldWater : menuWorldWater
    private bubbleShooter : bubbleShooter
    private popUpMenu : popUpMenu

    private playingMusic : boolean = false
    private audio = new Audio('audio/theme.mp3')

    constructor() {

        console.log('Created game');
    
        this.loadMenuWorlds("https://api.nigelritfeld.nl/v1/worlds/?list")
        
        //this.menuWorldWater = new menuWorldWater()

        document.body.addEventListener('click', (e : any) => this.clickHandler(e))
        document.body.addEventListener('keydown', (e : any) => this.keyHandler(e))
        
    }

    private async loadWorldWater(url : string) {
        let data = await this.getJson(url)
        this.menuWorldWater = new menuWorldWater(data)
    }

    private async loadMenuWorlds(url : string) {
        let data = await this.getJson(url)
        this.menuWorlds = new menuWorlds(data)
        document.body.append(this.menuWorlds.getElement())
    }

    private keyHandler(e : any) {
        this.audio.loop = true;

        if (e.key == 'm' && this.playingMusic == false) {
            // Creating music
            this.audio.play();
            this.playingMusic = true
        } else if (e.key == 'm' && this.playingMusic){
            this.audio.pause();
            this.playingMusic = false
        }
    }
    
    private clickHandler(e: any) {

        if (e.target.id == 'locked') {
            // this.popUpMenu = new popUpMenu(['k', 'a', 'm'] , 'Je eerste level!')
        } else if (e.target.id == 'Amazone'){
            // this.bubbleShooter = new bubbleShooter(['K', 'U', 'T'] , 'Kut level')
            // this.bubbleShooter.gameLoop()
            document.body.removeEventListener('click', (e : any) => this.clickHandler(e))
            // this.menuWorlds.gridRemover()
            // document.body.innerHTML = ""
            // this.loadWorldWater("https://api.nigelritfeld.nl/v1/levels/")

            this.loadWorldWater("https://api.nigelritfeld.nl/v1/levels/")
            
        }

    }

    private async getJson(url : string) {
        let response = await fetch(url);
        let data = await response.json()
        return data;
    }
    

}

new Game()