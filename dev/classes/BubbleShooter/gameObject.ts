export class GameObject {

    protected div : HTMLElement
    protected x : number = 0
    protected y : number = 0
    private type : string

    constructor(type : string) {
        this.type = type

        if(this.type == 'target') {
            this.x = Math.random() * window.innerWidth
            this.y = Math.random() * (window.innerWidth/3)
        }
    }

    public getRectangle() {
        return this.div.getBoundingClientRect()
    }

    protected createPlayer(target : string) {
        //delete old player if there is one
        if (this.div !== undefined) {
            this.div.remove()
        }

        console.log(target)

        this.x = window.innerWidth/2 - 50
        this.y = window.innerHeight - 100

        this.div = document.createElement('player')
        this.div.classList.add('bubble-game-object')

        this.div.style.left = `${this.x}px`
        this.div.style.top = `${this.y}px`
        this.div.innerText = target
        this.div.setAttribute('id', `${target}`)
        document.body.appendChild(this.div)
    }

    protected createTarget(letter : string) {
        this.div = document.createElement('target')
        this.div.classList.add('bubble-game-object')

        this.div.style.left = `${this.x}px`
        this.div.style.top = `${this.y}px`
        this.div.innerText = `${letter}`
        document.body.appendChild(this.div)
    }

    public hitTarget() {
        this.div.remove()
    }

}