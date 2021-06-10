export class GameObject {
    protected div : HTMLElement
    protected x : number
    protected y : number
    protected color : string

    constructor() {

    }

    protected getRectangle() {
        return this.div.getBoundingClientRect()
    }

    protected create(object : string, x : number, y : number, angle : number = 0, letter : Array<string> = []) {
        this.x = x
        this.y = y

        this.div = document.createElement(`${object}`)
        this.div.classList.add('bubble-game-object')

        if (object == 'target') {
            this.div.innerText = `${letter}`
            this.div.setAttribute('id', `${letter}`)
        } else if (object == 'player') {
            
        }

        document.body.appendChild(this.div)
    }

    // private createTarget(letter : string) {
    //     console.log('Created Target')

    //     TARGET

    //     this.targetDiv = document.createElement('target')
    //     this.targetDiv.style.left = `${(Math.random() * window.innerWidth)}px`
    //     this.targetDiv.style.top = `${(Math.random() * (window.innerWidth/3))}px`
    //     this.targetDiv.innerText = `${letter}`
    //     document.body.appendChild(this.targetDiv)
    // }

    // private createTile() {
    //     //resetting position
    //     this.player = this.getPlayerPos()

    //     let target = this.letters[Math.floor(Math.random() * this.letters.length)]

    //     PLAYER

    //     this.playerDiv.style.left = `${this.player.x}px`
    //     this.playerDiv.style.top = `${this.player.y}px`
    //     this.playerDiv.innerText = target
    //     this.playerDiv.setAttribute('id', `${target}`)
    //     document.body.appendChild(this.playerDiv)

    //     this.gameState = 'aiming'
    // }
}