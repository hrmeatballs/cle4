export class GameObject {

    protected div : HTMLElement
    protected x : number = 0
    protected y : number = 0
    private type : string

    constructor(type : string) {
        this.type = type

        if(this.type == 'target') {
            //generate random x
            this.x = Math.random() * window.innerWidth

            //making sure target isnt out of screen
            if (this.x > window.innerWidth - 100) {
                this.x =+ 100
            }

            //generate random y
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
        }

        this.x = window.innerWidth/2 - 50
        this.y = window.innerHeight - 100
        
        this.div = document.createElement('player')
        this.div.classList.add('bubble-game-object')

        this.div.style.left = `${this.x}px`
        this.div.style.top = `${this.y}px`
        this.div.innerText = target
        
        // this.div.append(arrow)
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
        console.log('Removed target')
    }

    protected createGuideline()
    {
        this.x = window.innerWidth/2 -75
        this.y = window.innerHeight - 60
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