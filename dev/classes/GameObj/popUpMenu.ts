import { levelNavigationsMenu } from "./levelNavigationMenu.js";
import { letterPlaceholder } from "./letterPlaceholder.js";
import { bubbleShooter } from "../BubbleShooter/bubbleShooter.js";

export class popUpMenu
{
    private body: any;
    private background: HTMLElement;
    private popUp: HTMLElement;
    private innerWrapper: HTMLElement;
    private stars: any = 3
    private level: any;
    private message: any;
    private letterPlaceholder: letterPlaceholder;
    private levelNavigationMenu: levelNavigationsMenu;
    private bubbleShooter: bubbleShooter
    private letters : Array<string> = []

    constructor(letters : Array<string>, message : string) {
        console.log(letters)
        this.letters = letters
        this.init(letters)
        this.levelNavigationMenu = new levelNavigationsMenu()
        this.innerWrapper.append(this.letterPlaceholder.getElement())
        this.innerWrapper.append(this.createMessage(message))
        // this.createScore(3)
        this.popUp.append(this.levelNavigationMenu.getElement())
        this.popUp.append(this.innerWrapper)     
    }

    init(letters : Array<string>) {
        this.body = document.getElementsByTagName("BODY")[0]
        this.background = document.createElement('menu')
        this.popUp = document.createElement('div')
        this.innerWrapper = document.createElement('div')
        this.innerWrapper.classList.add('pu-inner-wrapper')
        this.popUp.classList.add('pop-up-container')
        this.popUp.addEventListener('click', this.clickHandler)
        console.log(letters)
        this.letterPlaceholder = new letterPlaceholder(letters)
        this.background.append(this.popUp)
        this.body.append(this.background)
    }
    createMessage(message:string)
    {
        let element = document.createElement('p')
        let content = document.createTextNode(message)
        element.appendChild(content)
        element.classList.add('completed-level-message')
        return element
    }

    clickHandler(e: Event)
    {
        this.background = document.querySelector('menu') as HTMLElement
        let target = e.target as HTMLElement
        if(target.dataset.btn === 'homeBtn')
        {
            this.background.remove()
        }
        if(target.dataset.btn === 'replayBtn')
        {
            console.log('replay')
            // this.background.remove()
            console.log(this.letters)
            // this.bubbleShooter = new bubbleShooter(this.letters.join(), 'Replaying!')
        }
        if(target.dataset.btn === 'nextBtn')
        {
            console.log('next')
        }
    }
    createScore(score:number)
    {
        this.stars = document.createElement('div')
        this.stars.classList.add('score-wrapper')
        for(let i = 0; 1< score; i++)
        {
            let element = document.createElement('img')
            element.src = '../img/level-score-star.svg'
            this.stars.append(element)
        }
        this.innerWrapper.append(this.stars)
    }
}
