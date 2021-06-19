export class GameObject {

    protected bubblePlaceholder : HTMLElement
    protected div : HTMLElement
    protected x : number = 0
    protected y : number = 0
    private type : string

    constructor(type : string) {
        this.type = type

        if(this.type == 'target') {
            this.x = Math.random() * window.innerWidth
            if (this.x > window.innerWidth - 100) {
                this.x =+ 100
            }
            this.y = Math.random() * (window.innerWidth/3)
        }
    }

    public getRectangle() {
        return this.div.getBoundingClientRect()
    }

    public getX() : number {
        return this.x
    }

    public getY() : number {
        return this.y
    }

    public getWidth() : number {
        return this.div.clientWidth
    }

    protected createPlayer(target : string) {
        //delete old player if there is one
        if (this.div !== undefined) {
            this.div.remove()
            this.bubblePlaceholder.remove()
        }

        this.x = window.innerWidth/2 - 50
        this.y = window.innerHeight - 100
        this.bubblePlaceholder = document.createElement('div')
        this.bubblePlaceholder.classList.add('bubble-placeholder')
        
        this.div = document.createElement('player')
        this.div.classList.add('bubble-game-object')

        this.bubblePlaceholder.style.left = `${this.x}px`
        this.bubblePlaceholder.style.top = `${this.y}px`
        this.div.style.left = `${this.x}px`
        this.div.style.top = `${this.y}px`
        this.div.innerText = target
        
        // this.div.append(arrow)
        this.bubblePlaceholder.append(this.div)
        this.div.setAttribute('id', `${target}`)
        document.body.appendChild(this.bubblePlaceholder)
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
        console.log(this.div)
        console.log('removed')
        // this.bubblePlaceholder.remove()
        console.log(this.bubblePlaceholder)
        console.log('removed')

    }

    protected createGuideline()
    {
        this.x = window.innerWidth/2
        this.y = window.innerHeight - 100
        this.div = document.createElement('guideline')
        this.div.classList.add('guideline')
        this.div.style.left = `${this.x}px`
        this.div.style.top = `${this.y}px`
        document.body.appendChild(this.div)
    }

    //calculate radius to degrees
    public radToDeg(angle : number) : number {
        return angle * (180 / Math.PI)
    }

    //calculate degrees to radius
    public degToRad(angle : number) : number {
        return angle * (Math.PI / 180);
    }

}