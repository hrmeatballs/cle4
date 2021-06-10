import { GameObject } from "./gameObject.js";

export class Player {

    private angle : number = 90
    private x : number = 0
    private y : number = 0
    private div : HTMLElement
    private speed : number = 0

    constructor(target : string) {
        console.log('Created player')
        this.create(target)
    }

    public create(target : string) : void {
        //delete old player if there is one
        if (this.div !== undefined) {
            this.div.remove()
        }

        //setting position of player to bottom center
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

    public shoot() {
        this.speed = 10
        console.log('SHOOT!!')
    }

    public setSpeed(speed : number) {
        this.speed = speed
    }

    public getX() : number {
        return this.x
    }

    public getY() : number {
        return this.y
    }

    public setAngle(angle : number) : void {
        this.angle = angle
    }

    //calculate radius to degrees
    public radToDeg(angle : number) : number {
        return angle * (180 / Math.PI)
    }

    //calculate degrees to radius
    public degToRad(angle : number) : number {
        return angle * (Math.PI / 180);
    }

    public update(gameState : string) : void {

        if (gameState == 'aiming') {
            //rotating the tile facing to the mouse
            this.div.style.transform = `rotate(${this.degToRad(this.angle)}rad)`
        }

        //calculating the movement of the tile
        this.x += this.speed * -1*Math.cos(this.degToRad(this.angle))
        this.y += this.speed * -1*Math.sin(this.degToRad(this.angle))

        //updating the tile position
        this.div.style.left = `${this.x}px`
        this.div.style.top = `${this.y}px`

    }

}